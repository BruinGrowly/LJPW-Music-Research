import { useState, useRef, useCallback, useEffect } from 'react';
import { analyzeAudioFile } from '../lib/audioAnalyzer';
import { exportAsJSON, exportAsCSV, formatAnalysisForExport } from '../lib/exportUtils';
import RadarChart from './RadarChart';
import HarmonyGauge from './HarmonyGauge';
import './AudioAnalyzer.css';

// Session storage key for preserving analysis
const AUDIO_RESULT_KEY = 'ljpw-audio-result';
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB limit

function AudioAnalyzer() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState({ stage: '', progress: 0, message: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Restore result from session storage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(AUDIO_RESULT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setResult(parsed.result);
        // We can't restore the file object, but we can show the result
      }
    } catch (e) {
      // Ignore parse errors
    }
  }, []);

  // Save result to session storage when it changes
  useEffect(() => {
    if (result) {
      try {
        sessionStorage.setItem(AUDIO_RESULT_KEY, JSON.stringify({
          result,
          savedAt: new Date().toISOString()
        }));
      } catch (e) {
        // Ignore storage errors (quota exceeded, etc.)
      }
    }
  }, [result]);

  const handleFileSelect = useCallback(async (selectedFile) => {
    if (!selectedFile) return;

    // Clear previous errors
    setError(null);

    // Validate file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError(`File is too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB. Your file is ${(selectedFile.size / (1024 * 1024)).toFixed(1)}MB.`);
      return;
    }

    // Validate file type - check both MIME type and extension
    const validExtensions = ['.mp3', '.wav', '.ogg', '.flac', '.m4a', '.aac', '.webm'];
    const fileName = selectedFile.name.toLowerCase();
    const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
    const hasAudioMime = selectedFile.type.includes('audio');

    if (!hasValidExtension && !hasAudioMime) {
      setError('Please select an audio file (MP3, WAV, OGG, FLAC, M4A, AAC, or WebM)');
      return;
    }

    // Check for Web Audio API support
    if (!window.AudioContext && !window.webkitAudioContext) {
      setError('Your browser does not support audio analysis. Please try a modern browser like Chrome, Firefox, or Safari.');
      return;
    }

    setFile(selectedFile);
    setAnalyzing(true);
    setResult(null);
    setProgress({ stage: 'loading', progress: 0, message: 'Loading audio file...' });

    try {
      const analysis = await analyzeAudioFile(selectedFile, setProgress);

      // Validate that we got meaningful results
      if (!analysis || !analysis.ljpw) {
        throw new Error('Analysis returned incomplete results. The audio file may be corrupted or too short.');
      }

      // Check for minimum audio length
      if (analysis.file?.duration < 1) {
        throw new Error('Audio file is too short (less than 1 second). Please use a longer audio file.');
      }

      setResult(analysis);
    } catch (err) {
      console.error('Analysis failed:', err);

      // Provide user-friendly error messages
      let userMessage = err.message || 'Failed to analyze audio file';

      if (err.message?.includes('decode')) {
        userMessage = 'Could not decode this audio file. It may be corrupted or in an unsupported format. Try converting it to MP3 or WAV.';
      } else if (err.message?.includes('network') || err.message?.includes('fetch')) {
        userMessage = 'Network error while loading the file. Please check your connection and try again.';
      } else if (err.message?.includes('memory') || err.message?.includes('allocation')) {
        userMessage = 'The audio file is too large to process. Try a shorter or lower-quality version.';
      }

      setError(userMessage);
    } finally {
      setAnalyzing(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const selectedFile = e.target.files?.[0];
    handleFileSelect(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files?.[0];
    handleFileSelect(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleExportJSON = () => {
    if (!result) return;
    const data = formatAnalysisForExport({
      ...result.ljpw,
      H: result.metrics.H,
      V: result.metrics.V,
      consciousness: result.metrics.consciousness,
      phase: result.phase,
      dominant: result.dominant,
      fileName: file?.name,
      duration: result.file?.duration,
      audioFeatures: {
        tempo: result.audio?.tempo,
        key: result.audio?.key,
        mode: result.audio?.mode,
      }
    });
    const filename = file?.name?.replace(/\.[^/.]+$/, '') || 'audio-analysis';
    exportAsJSON(data, filename);
  };

  const handleExportCSV = () => {
    if (!result) return;
    const data = formatAnalysisForExport({
      ...result.ljpw,
      H: result.metrics.H,
      V: result.metrics.V,
      consciousness: result.metrics.consciousness,
      phase: result.phase,
      dominant: result.dominant,
      fileName: file?.name,
      duration: result.file?.duration,
    });
    const filename = file?.name?.replace(/\.[^/.]+$/, '') || 'audio-analysis';
    exportAsCSV(data, filename);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="audio-analyzer">
      <div className="analyzer-header">
        <h2>Audio File Analyzer</h2>
        <p>Upload an MP3 or WAV file to analyze its LJPW semantic properties</p>
      </div>

      {/* Upload Area */}
      <div
        className={`upload-area ${dragOver ? 'drag-over' : ''} ${file ? 'has-file' : ''}`}
        role="button"
        tabIndex={0}
        aria-label="Upload audio file. Click or drag and drop."
        aria-describedby="upload-instructions"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleInputChange}
          aria-hidden="true"
          tabIndex={-1}
          style={{ display: 'none' }}
        />

        {!file && !analyzing && (
          <div className="upload-prompt" id="upload-instructions">
            <div className="upload-icon" aria-hidden="true">🎵</div>
            <h3>Drop an audio file here</h3>
            <p>or click to browse</p>
            <span className="file-types">Supports MP3, WAV, OGG, FLAC (max 100MB)</span>
          </div>
        )}

        {analyzing && (
          <div className="analyzing-state" role="status" aria-live="polite">
            <div className="spinner" aria-hidden="true"></div>
            <h3>{progress.message || 'Analyzing...'}</h3>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={progress.progress}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="Analysis progress"
            >
              <div
                className="progress-fill"
                style={{ width: `${progress.progress}%` }}
              ></div>
            </div>
            <span className="progress-percent">{progress.progress}%</span>
          </div>
        )}

        {file && !analyzing && (
          <div className="file-info">
            <div className="file-icon" aria-hidden="true">🎧</div>
            <div className="file-details">
              <h4>{file.name}</h4>
              <span>{formatFileSize(file.size)}</span>
              {result && <span> • {formatDuration(result.file.duration)}</span>}
            </div>
            <button
              className="change-file-btn"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                setResult(null);
                sessionStorage.removeItem(AUDIO_RESULT_KEY);
              }}
              aria-label="Remove current file and choose another"
            >
              Change
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="error-message" role="alert" aria-live="assertive">
          <span className="error-icon" aria-hidden="true">⚠️</span>
          <div className="error-content">
            <strong>Analysis Error</strong>
            <p>{error}</p>
          </div>
          <button
            className="error-dismiss"
            onClick={() => setError(null)}
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="analysis-results" role="region" aria-label="Analysis Results">
          {/* Export Buttons */}
          <div className="export-actions">
            <button
              onClick={handleExportJSON}
              className="export-btn"
              aria-label="Export analysis as JSON file"
            >
              <span aria-hidden="true">📄</span> Export JSON
            </button>
            <button
              onClick={handleExportCSV}
              className="export-btn"
              aria-label="Export analysis as CSV file"
            >
              <span aria-hidden="true">📊</span> Export CSV
            </button>
          </div>

          {/* Audio Info */}
          <div className="result-section audio-info-section">
            <h3>Audio Properties</h3>
            <div className="audio-properties">
              <div className="property">
                <span className="property-label">Tempo</span>
                <span className="property-value">{result.audio.tempo} BPM</span>
              </div>
              <div className="property">
                <span className="property-label">Key</span>
                <span className="property-value">
                  {result.audio.key} {result.audio.mode}
                  <span className="confidence">
                    ({Math.round(result.audio.keyConfidence * 100)}% confidence)
                  </span>
                </span>
              </div>
              <div className="property">
                <span className="property-label">Duration</span>
                <span className="property-value">{formatDuration(result.file.duration)}</span>
              </div>
            </div>
          </div>

          {/* Waveform */}
          <div className="result-section waveform-section">
            <h3>Waveform</h3>
            <div className="waveform-container">
              <svg
                viewBox="0 0 200 50"
                className="waveform-svg"
                role="img"
                aria-label="Audio waveform visualization showing amplitude over time"
              >
                <title>Waveform visualization</title>
                {result.waveform.map((val, i) => (
                  <rect
                    key={i}
                    x={i}
                    y={25 - val * 24}
                    width="0.8"
                    height={val * 48}
                    fill="url(#waveformGradient)"
                  />
                ))}
                <defs>
                  <linearGradient id="waveformGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-love)" />
                    <stop offset="50%" stopColor="var(--color-wisdom)" />
                    <stop offset="100%" stopColor="var(--color-love)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* LJPW Analysis */}
          <div className="result-section ljpw-section">
            <div className="ljpw-header">
              <h3>LJPW Analysis</h3>
              <div
                className="phase-badge"
                style={{ backgroundColor: result.phase.color }}
                role="status"
                aria-label={`Phase: ${result.phase.phase}`}
              >
                <span aria-hidden="true">{result.phase.emoji}</span> {result.phase.phase}
              </div>
            </div>

            <div className="ljpw-content">
              <div className="chart-container">
                <RadarChart
                  L={result.ljpw.L}
                  J={result.ljpw.J}
                  P={result.ljpw.P}
                  W={result.ljpw.W}
                  size={220}
                />
                {/* Screen reader description */}
                <span className="sr-only">
                  LJPW radar chart showing Love at {(result.ljpw.L * 100).toFixed(0)}%,
                  Justice at {(result.ljpw.J * 100).toFixed(0)}%,
                  Power at {(result.ljpw.P * 100).toFixed(0)}%,
                  Wisdom at {(result.ljpw.W * 100).toFixed(0)}%
                </span>
              </div>

              <div className="metrics-container">
                {/* Dimension Bars */}
                <div className="dimension-bars" role="list" aria-label="LJPW Dimensions">
                  {[
                    { key: 'L', label: 'Love', color: 'var(--color-love)', value: result.ljpw.L },
                    { key: 'J', label: 'Justice', color: 'var(--color-justice)', value: result.ljpw.J },
                    { key: 'P', label: 'Power', color: 'var(--color-power)', value: result.ljpw.P },
                    { key: 'W', label: 'Wisdom', color: 'var(--color-wisdom)', value: result.ljpw.W },
                  ].map(dim => (
                    <div key={dim.key} className="dimension-bar" role="listitem">
                      <div className="bar-label">
                        <span style={{ color: dim.color }}>{dim.label}</span>
                        <span>{dim.value.toFixed(2)}</span>
                      </div>
                      <div
                        className="bar-track"
                        role="progressbar"
                        aria-valuenow={Math.round(dim.value * 100)}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-label={`${dim.label}: ${(dim.value * 100).toFixed(0)}%`}
                      >
                        <div
                          className="bar-fill"
                          style={{
                            width: `${dim.value * 100}%`,
                            backgroundColor: dim.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key Metrics */}
                <div className="key-metrics" role="list" aria-label="Key Metrics">
                  <div className="metric-card" role="listitem">
                    <span className="metric-label">Harmony Index</span>
                    <span className="metric-value harmony">{result.metrics.H}</span>
                  </div>
                  <div className="metric-card" role="listitem">
                    <span className="metric-label">Semantic Voltage</span>
                    <span className="metric-value voltage">{result.metrics.V}</span>
                  </div>
                  <div className="metric-card" role="listitem">
                    <span className="metric-label">Consciousness</span>
                    <span className="metric-value consciousness">{result.metrics.consciousness}</span>
                  </div>
                </div>

                {/* Dominant */}
                <div className="dominant-display">
                  <span className="dominant-label">Dominant Dimension:</span>
                  <span
                    className="dominant-value"
                    style={{ color: result.dominant.color }}
                  >
                    {result.dominant.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Interpretation */}
            <div className="interpretation">
              <h4>Interpretation</h4>
              <p>
                This track is <strong>{result.phase.phase.toLowerCase()}</strong> in nature — {result.phase.description.toLowerCase()}.
                {result.metrics.V > 1.0 && (
                  <> With a semantic voltage of <strong>{result.metrics.V}</strong>, this music has high transformative potential.</>
                )}
                {result.metrics.V <= 1.0 && result.metrics.V > 0.7 && (
                  <> With a semantic voltage of <strong>{result.metrics.V}</strong>, this music has good impact potential.</>
                )}
                {result.metrics.V <= 0.7 && (
                  <> The semantic voltage of <strong>{result.metrics.V}</strong> indicates moderate impact.</>
                )}
                {' '}The dominant dimension is <strong>{result.dominant.name}</strong>,
                {result.dominant.name === 'Love' && ' emphasizing connection and melody.'}
                {result.dominant.name === 'Justice' && ' emphasizing balance and structure.'}
                {result.dominant.name === 'Power' && ' emphasizing energy and rhythm.'}
                {result.dominant.name === 'Wisdom' && ' emphasizing complexity and depth.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AudioAnalyzer;
