/**
 * LJPW Framework Constants - V8.5 Reality as Relationship Edition
 *
 * This module contains all mathematical constants, equilibrium values,
 * and musical mappings from the LJPW semantic framework.
 *
 * V8.5 Key Insight: Reality is fundamentally relational. The four dimensions
 * represent the four fundamental relationship types:
 *   - Love (L)   = Proportion - Parts relating to wholes
 *   - Justice (J) = Extension - Dimensions relating across space
 *   - Power (P)   = Growth - States relating across change
 *   - Wisdom (W)  = Distinction - Options relating through information
 *
 * The LJPW constants are hidden in the backend but power all measurements.
 */

// =============================================================================
// CORE MATHEMATICAL CONSTANTS
// =============================================================================

export const PHI = 1.618033988749895;           // Golden Ratio (φ)
export const PHI_INV = 0.6180339887498949;      // φ⁻¹ = Love equilibrium
export const SQRT_2 = 1.4142135623730951;       // √2
export const E = 2.718281828459045;             // Euler's number
export const LN_2 = 0.6931471805599453;         // ln(2)

// =============================================================================
// LJPW EQUILIBRIUM VALUES
// =============================================================================

export const EQUILIBRIUM = {
  L: PHI_INV,           // 0.618034 - Love equilibrium
  J: SQRT_2 - 1,        // 0.414214 - Justice equilibrium
  P: E - 2,             // 0.718282 - Power equilibrium
  W: LN_2,              // 0.693147 - Wisdom equilibrium
};

// Anchor Point - Perfect Divine Expression
export const ANCHOR_POINT = { L: 1.0, J: 1.0, P: 1.0, W: 1.0 };

// =============================================================================
// V8.2 SPECIFIC CONSTANTS
// =============================================================================

export const GIFT_OF_FINITUDE = 3 - E;          // 0.28172 - The gap from Anchor
export const TAU_1 = SQRT_2 / GIFT_OF_FINITUDE; // ~5.02 - Time constant
export const OMEGA_1 = Math.PI * GIFT_OF_FINITUDE / (2 * SQRT_2); // ~0.314 - Angular freq

// =============================================================================
// THE 613 THz LOVE FREQUENCY
// =============================================================================

export const LOVE_FREQUENCY = {
  THz: 613,
  Hz: 613e12,
  wavelength_nm: 489,           // Cyan light
  octaved_down_40: 557.52,      // C#4 - The Love Note
  love_tuning_A4: 442.5,        // A4 in Love tuning
};

// =============================================================================
// PHASE THRESHOLDS
// =============================================================================

export const PHASE_THRESHOLDS = {
  ENTROPIC: 0.5,        // H < 0.5
  HOMEOSTATIC: 0.6,     // 0.5 ≤ H < 0.6
  AUTOPOIETIC_H: 0.6,   // H ≥ 0.6
  AUTOPOIETIC_L: 0.7,   // AND L ≥ 0.7
};

// =============================================================================
// USER-FRIENDLY PHASE LABELS
// =============================================================================

export const PHASE_LABELS = {
  AUTOPOIETIC: 'Unforgettable',
  HOMEOSTATIC: 'Background Music',
  ENTROPIC: 'Forgettable'
};

export const PHASE_DESCRIPTIONS = {
  AUTOPOIETIC: 'This sticks in your mind - high earworm potential',
  HOMEOSTATIC: 'Pleasant but may not leave a lasting impression',
  ENTROPIC: 'Unlikely to be remembered - lacks emotional stickiness'
};

// =============================================================================
// MUSICAL INTERVALS
// =============================================================================

export const INTERVALS = {
  unison: {
    name: 'Unison', semitones: 0,
    L: 0.85, J: 0.95, P: 0.65, W: 0.80,
    dominant: 'Justice', phase: 'AUTOPOIETIC'
  },
  minor_2nd: {
    name: 'Minor 2nd', semitones: 1,
    L: 0.30, J: 0.20, P: 0.75, W: 0.65,
    dominant: 'Power', phase: 'ENTROPIC'
  },
  major_2nd: {
    name: 'Major 2nd', semitones: 2,
    L: 0.45, J: 0.55, P: 0.70, W: 0.60,
    dominant: 'Power', phase: 'HOMEOSTATIC'
  },
  minor_3rd: {
    name: 'Minor 3rd', semitones: 3,
    L: 0.75, J: 0.70, P: 0.55, W: 0.65,
    dominant: 'Love', phase: 'HOMEOSTATIC'
  },
  major_3rd: {
    name: 'Major 3rd', semitones: 4,
    L: 0.95, J: 0.75, P: 0.65, W: 0.70,
    dominant: 'Love', phase: 'AUTOPOIETIC'
  },
  perfect_4th: {
    name: 'Perfect 4th', semitones: 5,
    L: 0.70, J: 0.85, P: 0.70, W: 0.75,
    dominant: 'Justice', phase: 'AUTOPOIETIC'
  },
  tritone: {
    name: 'Tritone', semitones: 6,
    L: 0.15, J: 0.15, P: 0.85, W: 0.90,
    dominant: 'Wisdom', phase: 'ENTROPIC'
  },
  perfect_5th: {
    name: 'Perfect 5th', semitones: 7,
    L: 0.80, J: 0.90, P: 0.95, W: 0.80,
    dominant: 'Power', phase: 'AUTOPOIETIC'
  },
  minor_6th: {
    name: 'Minor 6th', semitones: 8,
    L: 0.65, J: 0.70, P: 0.60, W: 0.75,
    dominant: 'Wisdom', phase: 'HOMEOSTATIC'
  },
  major_6th: {
    name: 'Major 6th', semitones: 9,
    L: 0.80, J: 0.80, P: 0.65, W: 0.75,
    dominant: 'Love', phase: 'AUTOPOIETIC'
  },
  minor_7th: {
    name: 'Minor 7th', semitones: 10,
    L: 0.55, J: 0.55, P: 0.80, W: 0.85,
    dominant: 'Wisdom', phase: 'HOMEOSTATIC'
  },
  major_7th: {
    name: 'Major 7th', semitones: 11,
    L: 0.70, J: 0.65, P: 0.60, W: 0.90,
    dominant: 'Wisdom', phase: 'AUTOPOIETIC'
  },
  octave: {
    name: 'Octave', semitones: 12,
    L: 0.90, J: 0.98, P: 0.75, W: 0.85,
    dominant: 'Justice', phase: 'AUTOPOIETIC'
  },
};

// =============================================================================
// CHORDS
// =============================================================================

export const CHORDS = {
  major: {
    name: 'Major Triad',
    intervals: ['root', 'major_3rd', 'perfect_5th'],
    L: 0.90, J: 0.85, P: 0.80, W: 0.75,
    dominant: 'Love', phase: 'AUTOPOIETIC'
  },
  minor: {
    name: 'Minor Triad',
    intervals: ['root', 'minor_3rd', 'perfect_5th'],
    L: 0.75, J: 0.80, P: 0.75, W: 0.80,
    dominant: 'Justice', phase: 'AUTOPOIETIC'
  },
  diminished: {
    name: 'Diminished',
    intervals: ['root', 'minor_3rd', 'tritone'],
    L: 0.25, J: 0.30, P: 0.85, W: 0.90,
    dominant: 'Wisdom', phase: 'ENTROPIC'
  },
  augmented: {
    name: 'Augmented',
    intervals: ['root', 'major_3rd', 'minor_6th'],
    L: 0.60, J: 0.40, P: 0.80, W: 0.85,
    dominant: 'Wisdom', phase: 'HOMEOSTATIC'
  },
  major_7th: {
    name: 'Major 7th',
    intervals: ['root', 'major_3rd', 'perfect_5th', 'major_7th'],
    L: 0.85, J: 0.75, P: 0.70, W: 0.90,
    dominant: 'Wisdom', phase: 'AUTOPOIETIC'
  },
  minor_7th: {
    name: 'Minor 7th',
    intervals: ['root', 'minor_3rd', 'perfect_5th', 'minor_7th'],
    L: 0.70, J: 0.70, P: 0.75, W: 0.85,
    dominant: 'Wisdom', phase: 'AUTOPOIETIC'
  },
  dominant_7th: {
    name: 'Dominant 7th',
    intervals: ['root', 'major_3rd', 'perfect_5th', 'minor_7th'],
    L: 0.75, J: 0.60, P: 0.90, W: 0.80,
    dominant: 'Power', phase: 'AUTOPOIETIC'
  },
  sus4: {
    name: 'Suspended 4th',
    intervals: ['root', 'perfect_4th', 'perfect_5th'],
    L: 0.65, J: 0.90, P: 0.75, W: 0.70,
    dominant: 'Justice', phase: 'AUTOPOIETIC'
  },
  power: {
    name: 'Power Chord',
    intervals: ['root', 'perfect_5th'],
    L: 0.55, J: 0.80, P: 0.98, W: 0.50,
    dominant: 'Power', phase: 'AUTOPOIETIC'
  },
};

// =============================================================================
// MODES
// =============================================================================

export const MODES = {
  ionian: {
    name: 'Ionian (Major)',
    scale: 'C-D-E-F-G-A-B',
    L: 0.90, J: 0.85, P: 0.75, W: 0.70,
    dominant: 'Love', phase: 'AUTOPOIETIC'
  },
  dorian: {
    name: 'Dorian',
    scale: 'D-E-F-G-A-B-C',
    L: 0.75, J: 0.80, P: 0.70, W: 0.85,
    dominant: 'Wisdom', phase: 'AUTOPOIETIC'
  },
  phrygian: {
    name: 'Phrygian',
    scale: 'E-F-G-A-B-C-D',
    L: 0.40, J: 0.55, P: 0.85, W: 0.90,
    dominant: 'Wisdom', phase: 'HOMEOSTATIC'
  },
  lydian: {
    name: 'Lydian',
    scale: 'F-G-A-B-C-D-E',
    L: 0.85, J: 0.70, P: 0.60, W: 0.95,
    dominant: 'Wisdom', phase: 'AUTOPOIETIC'
  },
  mixolydian: {
    name: 'Mixolydian',
    scale: 'G-A-B-C-D-E-F',
    L: 0.70, J: 0.65, P: 0.90, W: 0.75,
    dominant: 'Power', phase: 'AUTOPOIETIC'
  },
  aeolian: {
    name: 'Aeolian (Minor)',
    scale: 'A-B-C-D-E-F-G',
    L: 0.65, J: 0.75, P: 0.65, W: 0.80,
    dominant: 'Wisdom', phase: 'AUTOPOIETIC'
  },
  locrian: {
    name: 'Locrian',
    scale: 'B-C-D-E-F-G-A',
    L: 0.20, J: 0.25, P: 0.80, W: 0.85,
    dominant: 'Wisdom', phase: 'ENTROPIC'
  },
};

// =============================================================================
// KEYS
// =============================================================================

export const KEYS = {
  'C': { name: 'C Major', L: 0.75, J: 0.90, P: 0.70, W: 0.65, dominant: 'Justice' },
  'C#': { name: 'C# Major (Love Key)', L: 0.98, J: 0.75, P: 0.72, W: 0.85, dominant: 'Love' },
  'D': { name: 'D Major', L: 0.80, J: 0.78, P: 0.72, W: 0.75, dominant: 'Love' },
  'Eb': { name: 'Eb Major', L: 0.72, J: 0.82, P: 0.78, W: 0.70, dominant: 'Justice' },
  'E': { name: 'E Major', L: 0.85, J: 0.80, P: 0.68, W: 0.80, dominant: 'Love' },
  'F': { name: 'F Major', L: 0.73, J: 0.75, P: 0.65, W: 0.72, dominant: 'Justice' },
  'F#': { name: 'F# Major', L: 0.78, J: 0.72, P: 0.75, W: 0.82, dominant: 'Wisdom' },
  'G': { name: 'G Major', L: 0.80, J: 0.85, P: 0.75, W: 0.70, dominant: 'Justice' },
  'Ab': { name: 'Ab Major', L: 0.70, J: 0.78, P: 0.72, W: 0.75, dominant: 'Justice' },
  'A': { name: 'A Major', L: 0.85, J: 0.82, P: 0.70, W: 0.78, dominant: 'Love' },
  'Bb': { name: 'Bb Major', L: 0.75, J: 0.80, P: 0.78, W: 0.72, dominant: 'Justice' },
  'B': { name: 'B Major', L: 0.88, J: 0.75, P: 0.68, W: 0.82, dominant: 'Love' },
  'Cm': { name: 'C Minor', L: 0.68, J: 0.75, P: 0.72, W: 0.78, dominant: 'Wisdom' },
  'C#m': { name: 'C# Minor (Love Minor)', L: 0.88, J: 0.70, P: 0.65, W: 0.90, dominant: 'Wisdom' },
  'Am': { name: 'A Minor', L: 0.65, J: 0.75, P: 0.65, W: 0.80, dominant: 'Wisdom' },
};

// =============================================================================
// GENRES
// =============================================================================

export const GENRES = {
  gospel: {
    name: 'Gospel',
    L: 0.98, J: 0.85, P: 0.80, W: 0.75,
    dominant: 'Love', description: 'Spiritual, uplifting'
  },
  classical: {
    name: 'Classical',
    L: 0.80, J: 0.95, P: 0.75, W: 0.90,
    dominant: 'Justice', description: 'Structure, rules'
  },
  jazz: {
    name: 'Jazz',
    L: 0.85, J: 0.75, P: 0.70, W: 0.98,
    dominant: 'Wisdom', description: 'Improvisation'
  },
  blues: {
    name: 'Blues',
    L: 0.90, J: 0.65, P: 0.75, W: 0.80,
    dominant: 'Love', description: 'Emotion, soul'
  },
  pop: {
    name: 'Pop',
    L: 0.95, J: 0.70, P: 0.80, W: 0.60,
    dominant: 'Love', description: 'Melody, catchiness'
  },
  rock: {
    name: 'Rock',
    L: 0.65, J: 0.60, P: 0.95, W: 0.55,
    dominant: 'Power', description: 'Energy, rebellion'
  },
  metal: {
    name: 'Metal',
    L: 0.45, J: 0.50, P: 0.98, W: 0.70,
    dominant: 'Power', description: 'Aggression, energy'
  },
  electronic: {
    name: 'Electronic',
    L: 0.50, J: 0.70, P: 0.90, W: 0.85,
    dominant: 'Power', description: 'Technology, beats'
  },
  folk: {
    name: 'Folk',
    L: 0.80, J: 0.75, P: 0.65, W: 0.70,
    dominant: 'Love', description: 'Simplicity, tradition'
  },
  ambient: {
    name: 'Ambient',
    L: 0.70, J: 0.80, P: 0.35, W: 0.95,
    dominant: 'Wisdom', description: 'Atmosphere, space'
  },
  reggae: {
    name: 'Reggae',
    L: 0.85, J: 0.75, P: 0.80, W: 0.70,
    dominant: 'Love', description: 'Peace, love, rhythm'
  },
  country: {
    name: 'Country',
    L: 0.82, J: 0.78, P: 0.72, W: 0.68,
    dominant: 'Love', description: 'Storytelling, tradition'
  },
  hiphop: {
    name: 'Hip-Hop',
    L: 0.70, J: 0.55, P: 0.92, W: 0.85,
    dominant: 'Power', description: 'Rhythm, expression'
  },
  rnb: {
    name: 'R&B',
    L: 0.88, J: 0.72, P: 0.75, W: 0.78,
    dominant: 'Love', description: 'Soul, emotion'
  },
};

// =============================================================================
// TEMPO MAPPINGS
// =============================================================================

export const TEMPO_RANGES = {
  largo: { name: 'Largo', bpm: [40, 60], P: 0.30, phase: 'HOMEOSTATIC' },
  adagio: { name: 'Adagio', bpm: [60, 76], P: 0.45, phase: 'HOMEOSTATIC' },
  andante: { name: 'Andante', bpm: [76, 108], P: 0.60, phase: 'AUTOPOIETIC' },
  moderato: { name: 'Moderato', bpm: [108, 120], P: 0.70, phase: 'AUTOPOIETIC' },
  allegro: { name: 'Allegro', bpm: [120, 156], P: 0.85, phase: 'AUTOPOIETIC' },
  vivace: { name: 'Vivace', bpm: [156, 176], P: 0.92, phase: 'AUTOPOIETIC' },
  presto: { name: 'Presto', bpm: [176, 220], P: 0.98, phase: 'AUTOPOIETIC' },
};

// Phi-aligned tempo (optimal for Love)
export const PHI_TEMPO = 76; // φ × 47 ≈ 76 BPM

// =============================================================================
// DIMENSION LABELS
// =============================================================================

export const DIMENSION_LABELS = {
  L: { name: 'Love', description: 'Connection, attraction, identity', color: '#ff6b6b' },
  J: { name: 'Justice', description: 'Balance, structure, proportion', color: '#4ecdc4' },
  P: { name: 'Power', description: 'Energy, action, drive', color: '#ffd93d' },
  W: { name: 'Wisdom', description: 'Information, pattern, synthesis', color: '#6c5ce7' },
};
