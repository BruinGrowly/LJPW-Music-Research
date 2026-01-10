import { useState, useRef, useCallback } from 'react';
import { analyzeAudioFile } from '../lib/audioAnalyzer';
import RadarChart from './RadarChart';
import HarmonyGauge from './HarmonyGauge';
import './AudioAnalyzer.css';

function AudioAnalyzer() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState({ stage: '', progress: 0, message: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = useCallback(async (selectedFile) => {
    if (!selectedFile) return;

    // Validate file type
    if (!selectedFile.type.includes('audio')) {
      setError('Please select an audio file (MP3, WAV, etc.)');
      return;
    }

    setFile(selectedFile);
    setError(null);
    setAnalyzing(true);
    setResult(null);

    try {
      const analysis = await analyzeAudioFile(selectedFile, setProgress);
      setResult(analysis);
    } catch (err) {
      setError(err.message);
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
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleInputChange}
          style={{ display: 'none' }}
        />

        {!file && !analyzing && (
          <div className="upload-prompt">
            <div className="upload-icon">🎵</div>
            <h3>Drop an audio file here</h3>
            <p>or click to browse</p>
            <span className="file-types">Supports MP3, WAV, OGG, FLAC</span>
          </div>
        )}

        {analyzing && (
          <div className="analyzing-state">
            <div className="spinner"></div>
            <h3>{progress.message || 'Analyzing...'}</h3>
            <div className="progress-bar">
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
            <div className="file-icon">🎧</div>
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
              }}
            >
              Change
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="analysis-results">
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
              <svg viewBox="0 0 200 50" className="waveform-svg">
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
                    <stop offset="0%" stopColor="#ff6b6b" />
                    <stop offset="50%" stopColor="#6c5ce7" />
                    <stop offset="100%" stopColor="#ff6b6b" />
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
              >
                {result.phase.emoji} {result.phase.phase}
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
              </div>

              <div className="metrics-container">
                {/* Dimension Bars */}
                <div className="dimension-bars">
                  {[
                    { key: 'L', label: 'Love', color: '#ff6b6b', value: result.ljpw.L },
                    { key: 'J', label: 'Justice', color: '#4ecdc4', value: result.ljpw.J },
                    { key: 'P', label: 'Power', color: '#ffd93d', value: result.ljpw.P },
                    { key: 'W', label: 'Wisdom', color: '#6c5ce7', value: result.ljpw.W },
                  ].map(dim => (
                    <div key={dim.key} className="dimension-bar">
                      <div className="bar-label">
                        <span style={{ color: dim.color }}>{dim.label}</span>
                        <span>{dim.value.toFixed(2)}</span>
                      </div>
                      <div className="bar-track">
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
                <div className="key-metrics">
                  <div className="metric-card">
                    <span className="metric-label">Harmony Index</span>
                    <span className="metric-value harmony">{result.metrics.H}</span>
                  </div>
                  <div className="metric-card">
                    <span className="metric-label">Semantic Voltage</span>
                    <span className="metric-value voltage">{result.metrics.V}</span>
                  </div>
                  <div className="metric-card">
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
