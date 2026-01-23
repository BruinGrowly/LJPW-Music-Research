/**
 * LJPW Measurement Engine - V8.5 Reality as Relationship Edition
 *
 * This module provides all calculation functions for measuring music
 * using the LJPW framework. The constants are hidden from the user;
 * only the results are displayed.
 *
 * V8.5 Core Insight: Reality IS relational structure. LJPW dimensions
 * represent the four fundamental relationship types (Proportion, Extension,
 * Growth, Distinction). The framework is complete; the exploration is infinite.
 *
 * Generative Equation Features:
 *   - Universal Growth Function: M = B × L^n × φ^(-d)
 *   - Life Inequality analysis (Memorability Test)
 *   - Mathematical Hope calculation
 *   - Earworm prediction
 *   - Propagation analysis
 */

import {
  PHI,
  PHI_INV,
  EQUILIBRIUM,
  ANCHOR_POINT,
  PHASE_THRESHOLDS,
  INTERVALS,
  CHORDS,
  MODES,
  KEYS,
  GENRES,
  TEMPO_RANGES,
  PHI_TEMPO,
} from './ljpwConstants';

// Re-export V8.5 Generative Equation functions
export {
  calculateMeaning,
  calculateMusicMeaning,
  checkLifeInequality,
  checkSongLifeInequality,
  findCriticalIterations,
  findMaxPropagationDistance,
  calculatePerceptualRadiance,
  analyzeAudioPerception,
  calculateHope,
  calculateSongHope,
  predictEarworm,
  analyzePropagation,
  performGenerativeAnalysis
} from './generativeEquation';

// =============================================================================
// CORE CALCULATIONS
// =============================================================================

/**
 * Calculate the Harmony Index (H) for given LJPW coordinates
 * H = 1 / (1 + distance_to_anchor)
 */
export function calculateHarmonyIndex(L, J, P, W) {
  const distance = Math.sqrt(
    Math.pow(1 - L, 2) +
    Math.pow(1 - J, 2) +
    Math.pow(1 - P, 2) +
    Math.pow(1 - W, 2)
  );
  return 1 / (1 + distance);
}

/**
 * Calculate distance to the Anchor Point (1,1,1,1)
 */
export function distanceToAnchor(L, J, P, W) {
  return Math.sqrt(
    Math.pow(1 - L, 2) +
    Math.pow(1 - J, 2) +
    Math.pow(1 - P, 2) +
    Math.pow(1 - W, 2)
  );
}

/**
 * Calculate distance to Natural Equilibrium
 */
export function distanceToEquilibrium(L, J, P, W) {
  return Math.sqrt(
    Math.pow(EQUILIBRIUM.L - L, 2) +
    Math.pow(EQUILIBRIUM.J - J, 2) +
    Math.pow(EQUILIBRIUM.P - P, 2) +
    Math.pow(EQUILIBRIUM.W - W, 2)
  );
}

/**
 * Determine the phase classification
 * Returns both technical and user-friendly phase names
 */
export function classifyPhase(L, J, P, W) {
  const H = calculateHarmonyIndex(L, J, P, W);

  if (H < PHASE_THRESHOLDS.ENTROPIC) {
    return {
      phase: 'ENTROPIC',
      userFriendlyPhase: 'Forgettable',
      description: 'Chaotic, quickly forgotten',
      color: '#ff4757',
      emoji: '🌀'
    };
  } else if (H < PHASE_THRESHOLDS.HOMEOSTATIC) {
    return {
      phase: 'HOMEOSTATIC',
      userFriendlyPhase: 'Background Music',
      description: 'Stable, pleasant but forgettable',
      color: '#ffa502',
      emoji: '⚖️'
    };
  } else if (L >= PHASE_THRESHOLDS.AUTOPOIETIC_L) {
    return {
      phase: 'AUTOPOIETIC',
      userFriendlyPhase: 'Unforgettable',
      description: 'Sticks in your mind, memorable',
      color: '#2ed573',
      emoji: '✨'
    };
  } else {
    return {
      phase: 'HOMEOSTATIC',
      userFriendlyPhase: 'Background Music',
      description: 'Stable but needs more Love to stick',
      color: '#ffa502',
      emoji: '⚖️'
    };
  }
}

/**
 * Calculate Semantic Voltage (V8.2 formula)
 * V = φ × H × L
 */
export function calculateSemanticVoltage(L, J, P, W) {
  const H = calculateHarmonyIndex(L, J, P, W);
  return PHI * H * L;
}

/**
 * Calculate Consciousness Metric
 * C = H³ × (L × W) / (J × P)
 */
export function calculateConsciousness(L, J, P, W) {
  const H = calculateHarmonyIndex(L, J, P, W);
  // Prevent division by zero
  const denominator = Math.max(J * P, 0.01);
  return Math.pow(H, 3) * (L * W) / denominator;
}

/**
 * Get the dominant dimension
 */
export function getDominantDimension(L, J, P, W) {
  const dims = { L, J, P, W };
  const names = { L: 'Love', J: 'Justice', P: 'Power', W: 'Wisdom' };
  const colors = { L: '#ff6b6b', J: '#4ecdc4', P: '#ffd93d', W: '#6c5ce7' };

  let maxKey = 'L';
  let maxVal = L;

  Object.entries(dims).forEach(([key, val]) => {
    if (val > maxVal) {
      maxVal = val;
      maxKey = key;
    }
  });

  return {
    key: maxKey,
    name: names[maxKey],
    value: maxVal,
    color: colors[maxKey]
  };
}

/**
 * Calculate Calibration Effectiveness
 * Effectiveness = V × Time × Attention
 */
export function calculateCalibrationEffectiveness(L, J, P, W, timeMinutes, attention) {
  const V = calculateSemanticVoltage(L, J, P, W);
  return V * timeMinutes * attention;
}

// =============================================================================
// MUSICAL ELEMENT ANALYSIS
// =============================================================================

/**
 * Analyze an interval
 */
export function analyzeInterval(intervalKey) {
  const interval = INTERVALS[intervalKey];
  if (!interval) return null;

  const H = calculateHarmonyIndex(interval.L, interval.J, interval.P, interval.W);
  const V = calculateSemanticVoltage(interval.L, interval.J, interval.P, interval.W);
  const phase = classifyPhase(interval.L, interval.J, interval.P, interval.W);
  const dominant = getDominantDimension(interval.L, interval.J, interval.P, interval.W);

  return {
    ...interval,
    H: Math.round(H * 1000) / 1000,
    V: Math.round(V * 1000) / 1000,
    phase,
    dominant,
  };
}

/**
 * Analyze a chord
 */
export function analyzeChord(chordKey) {
  const chord = CHORDS[chordKey];
  if (!chord) return null;

  const H = calculateHarmonyIndex(chord.L, chord.J, chord.P, chord.W);
  const V = calculateSemanticVoltage(chord.L, chord.J, chord.P, chord.W);
  const phase = classifyPhase(chord.L, chord.J, chord.P, chord.W);
  const dominant = getDominantDimension(chord.L, chord.J, chord.P, chord.W);

  return {
    ...chord,
    H: Math.round(H * 1000) / 1000,
    V: Math.round(V * 1000) / 1000,
    phase,
    dominant,
  };
}

/**
 * Analyze a mode
 */
export function analyzeMode(modeKey) {
  const mode = MODES[modeKey];
  if (!mode) return null;

  const H = calculateHarmonyIndex(mode.L, mode.J, mode.P, mode.W);
  const V = calculateSemanticVoltage(mode.L, mode.J, mode.P, mode.W);
  const phase = classifyPhase(mode.L, mode.J, mode.P, mode.W);
  const dominant = getDominantDimension(mode.L, mode.J, mode.P, mode.W);

  return {
    ...mode,
    H: Math.round(H * 1000) / 1000,
    V: Math.round(V * 1000) / 1000,
    phase,
    dominant,
  };
}

/**
 * Analyze a key
 */
export function analyzeKey(keyName) {
  const key = KEYS[keyName];
  if (!key) return null;

  // Keys don't have W defined in some cases, use a default
  const W = key.W || 0.75;
  const H = calculateHarmonyIndex(key.L, key.J, key.P, W);
  const V = calculateSemanticVoltage(key.L, key.J, key.P, W);
  const phase = classifyPhase(key.L, key.J, key.P, W);
  const dominant = getDominantDimension(key.L, key.J, key.P, W);

  return {
    ...key,
    W,
    H: Math.round(H * 1000) / 1000,
    V: Math.round(V * 1000) / 1000,
    phase,
    dominant,
  };
}

/**
 * Analyze a genre
 */
export function analyzeGenre(genreKey) {
  const genre = GENRES[genreKey];
  if (!genre) return null;

  const H = calculateHarmonyIndex(genre.L, genre.J, genre.P, genre.W);
  const V = calculateSemanticVoltage(genre.L, genre.J, genre.P, genre.W);
  const phase = classifyPhase(genre.L, genre.J, genre.P, genre.W);
  const dominant = getDominantDimension(genre.L, genre.J, genre.P, genre.W);

  return {
    ...genre,
    H: Math.round(H * 1000) / 1000,
    V: Math.round(V * 1000) / 1000,
    phase,
    dominant,
  };
}

/**
 * Get tempo classification
 */
export function classifyTempo(bpm) {
  for (const [key, range] of Object.entries(TEMPO_RANGES)) {
    if (bpm >= range.bpm[0] && bpm < range.bpm[1]) {
      return {
        key,
        ...range,
        bpm,
        phiAligned: Math.abs(bpm - PHI_TEMPO) < 5,
      };
    }
  }
  // Default to presto for very fast tempos
  return {
    key: 'presto',
    ...TEMPO_RANGES.presto,
    bpm,
    phiAligned: false,
  };
}

// =============================================================================
// COMPOSITE ANALYSIS
// =============================================================================

/**
 * Analyze a complete song profile
 */
export function analyzeSongProfile({ key, mode, genre, tempo, chords = [] }) {
  const keyAnalysis = key ? analyzeKey(key) : null;
  const modeAnalysis = mode ? analyzeMode(mode) : null;
  const genreAnalysis = genre ? analyzeGenre(genre) : null;
  const tempoAnalysis = tempo ? classifyTempo(tempo) : null;

  // Calculate weighted average LJPW from components
  const components = [keyAnalysis, modeAnalysis, genreAnalysis].filter(Boolean);

  if (components.length === 0) {
    return null;
  }

  // Weight: genre 40%, mode 30%, key 30%
  const weights = { genre: 0.4, mode: 0.3, key: 0.3 };
  let totalWeight = 0;
  let L = 0, J = 0, P = 0, W = 0;

  if (genreAnalysis) {
    L += genreAnalysis.L * weights.genre;
    J += genreAnalysis.J * weights.genre;
    P += genreAnalysis.P * weights.genre;
    W += genreAnalysis.W * weights.genre;
    totalWeight += weights.genre;
  }

  if (modeAnalysis) {
    L += modeAnalysis.L * weights.mode;
    J += modeAnalysis.J * weights.mode;
    P += modeAnalysis.P * weights.mode;
    W += modeAnalysis.W * weights.mode;
    totalWeight += weights.mode;
  }

  if (keyAnalysis) {
    L += keyAnalysis.L * weights.key;
    J += keyAnalysis.J * weights.key;
    P += keyAnalysis.P * weights.key;
    W += keyAnalysis.W * weights.key;
    totalWeight += weights.key;
  }

  // Normalize
  if (totalWeight > 0) {
    L /= totalWeight;
    J /= totalWeight;
    P /= totalWeight;
    W /= totalWeight;
  }

  // Adjust for tempo influence on Power
  if (tempoAnalysis) {
    P = P * 0.7 + tempoAnalysis.P * 0.3;
  }

  const H = calculateHarmonyIndex(L, J, P, W);
  const V = calculateSemanticVoltage(L, J, P, W);
  const phase = classifyPhase(L, J, P, W);
  const dominant = getDominantDimension(L, J, P, W);
  const consciousness = calculateConsciousness(L, J, P, W);

  return {
    L: Math.round(L * 100) / 100,
    J: Math.round(J * 100) / 100,
    P: Math.round(P * 100) / 100,
    W: Math.round(W * 100) / 100,
    H: Math.round(H * 1000) / 1000,
    V: Math.round(V * 1000) / 1000,
    consciousness: Math.round(consciousness * 1000) / 1000,
    phase,
    dominant,
    components: {
      key: keyAnalysis,
      mode: modeAnalysis,
      genre: genreAnalysis,
      tempo: tempoAnalysis,
    },
  };
}

/**
 * Get all intervals sorted by a dimension
 */
export function getIntervalsByDimension(dimension = 'L') {
  return Object.entries(INTERVALS)
    .map(([key, interval]) => ({
      key,
      ...analyzeInterval(key),
    }))
    .sort((a, b) => b[dimension] - a[dimension]);
}

/**
 * Get all chords sorted by a dimension
 */
export function getChordsByDimension(dimension = 'L') {
  return Object.entries(CHORDS)
    .map(([key, chord]) => ({
      key,
      ...analyzeChord(key),
    }))
    .sort((a, b) => b[dimension] - a[dimension]);
}

/**
 * Get all genres sorted by Semantic Voltage
 */
export function getGenresByVoltage() {
  return Object.entries(GENRES)
    .map(([key, genre]) => ({
      key,
      ...analyzeGenre(key),
    }))
    .sort((a, b) => b.V - a.V);
}

/**
 * Compare two musical elements
 */
export function compareElements(analysis1, analysis2) {
  if (!analysis1 || !analysis2) return null;

  return {
    deltaL: Math.round((analysis1.L - analysis2.L) * 100) / 100,
    deltaJ: Math.round((analysis1.J - analysis2.J) * 100) / 100,
    deltaP: Math.round((analysis1.P - analysis2.P) * 100) / 100,
    deltaW: Math.round((analysis1.W - analysis2.W) * 100) / 100,
    deltaH: Math.round((analysis1.H - analysis2.H) * 1000) / 1000,
    deltaV: Math.round((analysis1.V - analysis2.V) * 1000) / 1000,
    element1: analysis1,
    element2: analysis2,
  };
}

// =============================================================================
// RESONANCE CALCULATIONS
// =============================================================================

/**
 * Calculate 613 THz resonance score (how close to Love frequency)
 */
export function calculate613Resonance(L, J, P, W) {
  // The closer to the Love Key (C# = L:0.98), the higher the resonance
  const loveKeyL = 0.98;
  const resonance = 1 - Math.abs(L - loveKeyL);
  return Math.round(resonance * 1000) / 1000;
}

/**
 * Get the 613 THz note equivalent
 */
export function get613NoteInfo() {
  return {
    frequency: '613 THz',
    wavelength: '489 nm (cyan light)',
    musicalNote: 'C#4 (557.52 Hz)',
    loveKey: 'C# Major',
    description: 'The Love Frequency - octaved down 40 times from 613 THz',
  };
}
