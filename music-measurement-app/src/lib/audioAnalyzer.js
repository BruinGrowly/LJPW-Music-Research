/**
 * Audio Analyzer - LJPW Music Measurement
 *
 * Analyzes audio files (MP3, WAV) and extracts features that map to LJPW dimensions.
 * Uses Web Audio API and Meyda for feature extraction.
 */

import Meyda from 'meyda';
import {
  calculateHarmonyIndex,
  calculateSemanticVoltage,
  classifyPhase,
  getDominantDimension,
  calculateConsciousness,
} from './ljpwEngine';

// Feature extraction configuration
const BUFFER_SIZE = 2048;
const HOP_SIZE = 512;

/**
 * Load an audio file and return an AudioBuffer
 */
export async function loadAudioFile(file) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Resume context if suspended (required by browsers)
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }

  const arrayBuffer = await file.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return { audioContext, audioBuffer };
}

/**
 * Extract audio features from an AudioBuffer using Meyda
 */
export function extractFeatures(audioBuffer, onProgress) {
  const channelData = audioBuffer.getChannelData(0); // Use first channel
  const sampleRate = audioBuffer.sampleRate;
  const duration = audioBuffer.duration;

  // Configure Meyda
  Meyda.bufferSize = BUFFER_SIZE;
  Meyda.sampleRate = sampleRate;

  // Features to extract
  const features = {
    rms: [],           // Energy (Power)
    spectralCentroid: [], // Brightness (Wisdom)
    spectralFlatness: [], // Tonality vs noise
    spectralRolloff: [],  // High frequency content
    zcr: [],           // Zero crossing rate (texture)
    mfcc: [],          // Mel-frequency cepstral coefficients
    chroma: [],        // Pitch class distribution (Love/Justice)
    loudness: [],      // Perceptual loudness
  };

  // Process audio in chunks
  const numChunks = Math.floor((channelData.length - BUFFER_SIZE) / HOP_SIZE);

  if (numChunks <= 0) {
    console.warn('Audio file too short for analysis');
    return { features, duration, sampleRate, numChunks: 0 };
  }

  for (let i = 0; i < numChunks; i++) {
    const start = i * HOP_SIZE;
    const chunk = channelData.slice(start, start + BUFFER_SIZE);

    // Create properly sized buffer
    const signal = new Float32Array(BUFFER_SIZE);
    signal.set(chunk);

    try {
      const extracted = Meyda.extract(
        ['rms', 'spectralCentroid', 'spectralFlatness', 'spectralRolloff', 'zcr', 'mfcc', 'chroma', 'loudness'],
        signal
      );

      if (extracted) {
        features.rms.push(extracted.rms || 0);
        features.spectralCentroid.push(extracted.spectralCentroid || 0);
        features.spectralFlatness.push(extracted.spectralFlatness || 0);
        features.spectralRolloff.push(extracted.spectralRolloff || 0);
        features.zcr.push(extracted.zcr || 0);
        features.mfcc.push(extracted.mfcc || new Array(13).fill(0));
        features.chroma.push(extracted.chroma || new Array(12).fill(0));
        features.loudness.push(extracted.loudness?.total || 0);
      }
    } catch (e) {
      // Skip problematic chunks silently
    }

    // Report progress every 10%
    if (i % Math.floor(numChunks / 10) === 0 && onProgress) {
      const progressPct = Math.round((i / numChunks) * 40) + 20; // 20-60%
      onProgress({ stage: 'extracting', progress: progressPct, message: `Extracting features... ${Math.round((i / numChunks) * 100)}%` });
    }
  }

  return {
    features,
    duration,
    sampleRate,
    numChunks,
  };
}

/**
 * Calculate statistics for a feature array
 */
function calculateStats(arr) {
  if (!arr || arr.length === 0) return { mean: 0, std: 0, max: 0, min: 0 };

  const validArr = arr.filter(x => !isNaN(x) && isFinite(x));
  if (validArr.length === 0) return { mean: 0, std: 0, max: 0, min: 0 };

  const mean = validArr.reduce((a, b) => a + b, 0) / validArr.length;
  const variance = validArr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / validArr.length;
  const std = Math.sqrt(variance);
  const max = Math.max(...validArr);
  const min = Math.min(...validArr);

  return { mean, std, max, min };
}

/**
 * Detect tempo using onset detection
 */
export function detectTempo(features) {
  const rms = features.features.rms;
  if (rms.length < 10) return 120; // Default tempo

  // Simple onset detection using RMS peaks
  const threshold = calculateStats(rms).mean * 1.5;
  const onsets = [];

  for (let i = 1; i < rms.length - 1; i++) {
    if (rms[i] > threshold && rms[i] > rms[i-1] && rms[i] > rms[i+1]) {
      onsets.push(i);
    }
  }

  if (onsets.length < 2) return 120;

  // Calculate average interval between onsets
  const intervals = [];
  for (let i = 1; i < onsets.length; i++) {
    intervals.push(onsets[i] - onsets[i-1]);
  }

  const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
  const secondsPerBeat = (avgInterval * HOP_SIZE) / features.sampleRate;
  const bpm = Math.round(60 / secondsPerBeat);

  // Clamp to reasonable range
  return Math.max(40, Math.min(220, bpm));
}

/**
 * Detect key from chroma features
 */
export function detectKey(features) {
  const chromaFrames = features.features.chroma;
  if (!chromaFrames || chromaFrames.length === 0) return { key: 'C', mode: 'major', confidence: 0 };

  // Average chroma across all frames
  const avgChroma = new Array(12).fill(0);
  let validFrames = 0;

  for (const frame of chromaFrames) {
    if (frame && frame.length === 12) {
      for (let i = 0; i < 12; i++) {
        avgChroma[i] += frame[i] || 0;
      }
      validFrames++;
    }
  }

  if (validFrames === 0) return { key: 'C', mode: 'major', confidence: 0 };

  for (let i = 0; i < 12; i++) {
    avgChroma[i] /= validFrames;
  }

  // Key profiles (Krumhansl-Schmuckler)
  const majorProfile = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88];
  const minorProfile = [6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17];

  const keyNames = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

  let bestKey = 'C';
  let bestMode = 'major';
  let bestCorrelation = -Infinity;

  // Try all keys and modes
  for (let shift = 0; shift < 12; shift++) {
    const rotatedChroma = [...avgChroma.slice(shift), ...avgChroma.slice(0, shift)];

    // Correlate with major profile
    const majorCorr = correlate(rotatedChroma, majorProfile);
    if (majorCorr > bestCorrelation) {
      bestCorrelation = majorCorr;
      bestKey = keyNames[shift];
      bestMode = 'major';
    }

    // Correlate with minor profile
    const minorCorr = correlate(rotatedChroma, minorProfile);
    if (minorCorr > bestCorrelation) {
      bestCorrelation = minorCorr;
      bestKey = keyNames[shift];
      bestMode = 'minor';
    }
  }

  return {
    key: bestKey,
    mode: bestMode,
    confidence: Math.max(0, Math.min(1, (bestCorrelation + 1) / 2)),
  };
}

/**
 * Pearson correlation coefficient
 */
function correlate(a, b) {
  const n = a.length;
  const meanA = a.reduce((x, y) => x + y, 0) / n;
  const meanB = b.reduce((x, y) => x + y, 0) / n;

  let num = 0, denA = 0, denB = 0;
  for (let i = 0; i < n; i++) {
    const diffA = a[i] - meanA;
    const diffB = b[i] - meanB;
    num += diffA * diffB;
    denA += diffA * diffA;
    denB += diffB * diffB;
  }

  const den = Math.sqrt(denA * denB);
  return den === 0 ? 0 : num / den;
}

/**
 * Map audio features to LJPW dimensions
 */
export function mapToLJPW(features, tempo, keyInfo) {
  const rmsStats = calculateStats(features.features.rms);
  const centroidStats = calculateStats(features.features.spectralCentroid);
  const flatnessStats = calculateStats(features.features.spectralFlatness);
  const zcrStats = calculateStats(features.features.zcr);

  // Calculate chroma strength (how tonal the music is)
  let chromaStrength = 0;
  if (features.features.chroma.length > 0) {
    for (const frame of features.features.chroma) {
      if (frame) {
        const maxChroma = Math.max(...frame);
        const avgChroma = frame.reduce((a, b) => a + b, 0) / 12;
        chromaStrength += maxChroma - avgChroma;
      }
    }
    chromaStrength /= features.features.chroma.length;
  }

  // Normalize features to 0-1 range
  const normalizedEnergy = Math.min(1, rmsStats.mean * 5);
  const normalizedBrightness = Math.min(1, centroidStats.mean / 8000);
  const normalizedTonality = 1 - Math.min(1, flatnessStats.mean);
  const normalizedComplexity = Math.min(1, zcrStats.std / 0.1);
  const normalizedDynamics = rmsStats.mean > 0 ? Math.min(1, rmsStats.std / rmsStats.mean) : 0;

  // === LJPW MAPPING ===

  // LOVE (L): Connection, melody, tonality
  let L = 0.5;
  L += normalizedTonality * 0.25;
  L += chromaStrength * 0.15;
  L += (1 - normalizedBrightness) * 0.1;

  // Adjust for key (C# = Love Key)
  if (keyInfo.key === 'C#') L += 0.1;
  if (keyInfo.mode === 'major') L += 0.05;

  L = Math.max(0.2, Math.min(0.98, L));

  // JUSTICE (J): Balance, structure, harmony
  let J = 0.5;
  J += (1 - normalizedDynamics) * 0.2;
  J += normalizedTonality * 0.15;
  J += keyInfo.confidence * 0.15;

  J = Math.max(0.2, Math.min(0.95, J));

  // POWER (P): Energy, rhythm, drive
  let P = 0.4;
  P += normalizedEnergy * 0.3;
  P += Math.min(1, tempo / 180) * 0.2;
  P += normalizedDynamics * 0.1;

  P = Math.max(0.2, Math.min(0.98, P));

  // WISDOM (W): Complexity, information, timbre
  let W = 0.5;
  W += normalizedComplexity * 0.2;
  W += normalizedBrightness * 0.15;
  W += (centroidStats.std / (centroidStats.mean + 1)) * 0.15;

  W = Math.max(0.2, Math.min(0.98, W));

  return { L, J, P, W };
}

/**
 * Generate waveform data for visualization
 */
export function generateWaveform(audioBuffer, numPoints = 200) {
  const channelData = audioBuffer.getChannelData(0);
  const blockSize = Math.floor(channelData.length / numPoints);
  const waveform = [];

  for (let i = 0; i < numPoints; i++) {
    const start = i * blockSize;
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum += Math.abs(channelData[start + j] || 0);
    }
    waveform.push(sum / blockSize);
  }

  // Normalize
  const max = Math.max(...waveform);
  if (max === 0) return waveform.map(() => 0);
  return waveform.map(v => v / max);
}

/**
 * Analyze an audio file and return complete LJPW analysis
 */
export async function analyzeAudioFile(file, onProgress) {
  try {
    onProgress?.({ stage: 'loading', progress: 5, message: 'Loading audio file...' });

    const { audioContext, audioBuffer } = await loadAudioFile(file);

    onProgress?.({ stage: 'extracting', progress: 20, message: 'Extracting features...' });

    const features = extractFeatures(audioBuffer, onProgress);

    onProgress?.({ stage: 'analyzing', progress: 65, message: 'Detecting tempo and key...' });

    const tempo = detectTempo(features);
    const keyInfo = detectKey(features);

    onProgress?.({ stage: 'mapping', progress: 80, message: 'Mapping to LJPW dimensions...' });

    const ljpw = mapToLJPW(features, tempo, keyInfo);

    // Calculate derived metrics
    const H = calculateHarmonyIndex(ljpw.L, ljpw.J, ljpw.P, ljpw.W);
    const V = calculateSemanticVoltage(ljpw.L, ljpw.J, ljpw.P, ljpw.W);
    const phase = classifyPhase(ljpw.L, ljpw.J, ljpw.P, ljpw.W);
    const dominant = getDominantDimension(ljpw.L, ljpw.J, ljpw.P, ljpw.W);
    const consciousness = calculateConsciousness(ljpw.L, ljpw.J, ljpw.P, ljpw.W);

    onProgress?.({ stage: 'waveform', progress: 90, message: 'Generating waveform...' });

    // Generate waveform
    const waveform = generateWaveform(audioBuffer);

    onProgress?.({ stage: 'complete', progress: 100, message: 'Analysis complete!' });

    // Clean up
    await audioContext.close();

    return {
      file: {
        name: file.name,
        size: file.size,
        type: file.type,
        duration: audioBuffer.duration,
      },
      audio: {
        tempo,
        key: keyInfo.key,
        mode: keyInfo.mode,
        keyConfidence: keyInfo.confidence,
      },
      ljpw: {
        L: Math.round(ljpw.L * 100) / 100,
        J: Math.round(ljpw.J * 100) / 100,
        P: Math.round(ljpw.P * 100) / 100,
        W: Math.round(ljpw.W * 100) / 100,
      },
      metrics: {
        H: Math.round(H * 1000) / 1000,
        V: Math.round(V * 1000) / 1000,
        consciousness: Math.round(consciousness * 1000) / 1000,
      },
      phase,
      dominant,
      waveform,
      rawFeatures: {
        rmsStats: calculateStats(features.features.rms),
        centroidStats: calculateStats(features.features.spectralCentroid),
      },
    };
  } catch (error) {
    console.error('Audio analysis error:', error);
    throw new Error(`Failed to analyze audio: ${error.message}`);
  }
}
