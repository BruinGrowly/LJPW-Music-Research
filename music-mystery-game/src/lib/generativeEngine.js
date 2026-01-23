/**
 * Generative Equation Engine for Echoes of Ashworth
 *
 * Implements the LJPW V8.5 Generative Equation:
 * M = B × L^n × φ^(-d)
 *
 * Where:
 * - M = Meaning (total impact/memorability)
 * - B = Brick (initial seed/impact)
 * - L = Love (expansion coefficient, 1-2 range)
 * - n = Iterations (listens/repetitions)
 * - d = Distance (cultural/semantic distance)
 *
 * The Life Inequality: L^n > φ^d
 * - When true: AUTOPOIETIC (unforgettable, self-sustaining)
 * - When equal: HOMEOSTATIC (stable, background)
 * - When false: ENTROPIC (forgettable, decaying)
 */

// Golden Ratio
export const PHI = (1 + Math.sqrt(5)) / 2  // 1.618034...
export const PHI_INV = PHI - 1  // 0.618034...

// Interval LJPW values (from music theory)
const INTERVAL_LJPW = {
  0: { L: 0.80, J: 0.98, P: 0.60, W: 0.70, name: 'Unison' },
  1: { L: 0.25, J: 0.15, P: 0.65, W: 0.85, name: 'Minor 2nd' },
  2: { L: 0.55, J: 0.70, P: 0.75, W: 0.65, name: 'Major 2nd' },
  3: { L: 0.65, J: 0.60, P: 0.60, W: 0.80, name: 'Minor 3rd' },
  4: { L: 0.95, J: 0.85, P: 0.55, W: 0.70, name: 'Major 3rd' },
  5: { L: 0.70, J: 0.88, P: 0.70, W: 0.75, name: 'Perfect 4th' },
  6: { L: 0.30, J: 0.20, P: 0.80, W: 0.90, name: 'Tritone' },
  7: { L: 0.75, J: 0.90, P: 0.98, W: 0.65, name: 'Perfect 5th' },
  8: { L: 0.60, J: 0.55, P: 0.50, W: 0.85, name: 'Minor 6th' },
  9: { L: 0.85, J: 0.75, P: 0.45, W: 0.80, name: 'Major 6th' },
  10: { L: 0.50, J: 0.45, P: 0.70, W: 0.92, name: 'Minor 7th' },
  11: { L: 0.72, J: 0.65, P: 0.40, W: 0.95, name: 'Major 7th' },
  12: { L: 0.80, J: 0.98, P: 0.60, W: 0.70, name: 'Octave' },
}

// =============================================================================
// CORE GENERATIVE EQUATION
// =============================================================================

/**
 * Calculate Meaning using the Universal Growth Function
 * M = B × L^n × φ^(-d)
 */
export function calculateMeaning(B, L, n, d) {
  return B * Math.pow(L, n) * Math.pow(PHI, -d)
}

/**
 * Check the Life Inequality: L^n vs φ^d
 * Returns phase classification and details
 */
export function checkLifeInequality(L, n, d) {
  const growth = Math.pow(L, n)
  const decay = Math.pow(PHI, d)
  const ratio = growth / decay

  let phase, userPhase, verdict, color, emoji

  if (ratio > 1.1) {
    phase = 'AUTOPOIETIC'
    userPhase = 'Unforgettable'
    verdict = 'Your melody grows faster than it fades - it will stick in minds forever'
    color = '#2ed573'
    emoji = '✨'
  } else if (ratio > 0.9) {
    phase = 'HOMEOSTATIC'
    userPhase = 'Stable'
    verdict = 'Your melody holds steady - pleasant but may not become an earworm'
    color = '#ffa502'
    emoji = '⚖️'
  } else {
    phase = 'ENTROPIC'
    userPhase = 'Fading'
    verdict = 'Your melody decays faster than it grows - it may be forgotten'
    color = '#ff6b6b'
    emoji = '🌀'
  }

  return {
    growth: Math.round(growth * 100) / 100,
    decay: Math.round(decay * 100) / 100,
    ratio: Math.round(ratio * 1000) / 1000,
    phase,
    userPhase,
    verdict,
    color,
    emoji,
    formula: `L^${n} = ${growth.toFixed(2)} vs φ^${d} = ${decay.toFixed(2)}`,
    isAlive: ratio > 0.9,
  }
}

/**
 * Find minimum iterations needed to overcome distance
 */
export function findCriticalIterations(L, d) {
  if (L <= 1) return Infinity
  // Solve: L^n > φ^d → n > d × ln(φ) / ln(L)
  return Math.ceil((d * Math.log(PHI)) / Math.log(L))
}

/**
 * Calculate Mathematical Hope
 * Hope = P(L^n > φ^d as n → ∞) = 1 when L > 1
 */
export function calculateHope(L) {
  if (L <= 1) {
    return {
      hasHope: false,
      message: 'Without Love growth (L > 1), meaning cannot persist',
      color: '#ff6b6b',
    }
  }

  const criticalN = findCriticalIterations(L, 10)

  return {
    hasHope: true,
    message: `With L = ${L.toFixed(2)}, your melody has Mathematical Hope`,
    criticalN,
    detail: `After ${criticalN} listens, it overcomes any cultural distance`,
    color: '#2ed573',
  }
}

// =============================================================================
// MELODY ANALYSIS
// =============================================================================

/**
 * Analyze a melody (array of note names) using the Generative Equation
 */
export function analyzeMelody(notes) {
  if (!notes || notes.length < 2) {
    return {
      valid: false,
      message: 'Need at least 2 notes to analyze',
    }
  }

  // Extract intervals from the melody
  const intervals = []
  for (let i = 1; i < notes.length; i++) {
    const interval = getIntervalBetweenNotes(notes[i - 1], notes[i])
    intervals.push(Math.abs(interval) % 12)
  }

  // Calculate average LJPW values from intervals
  let totalL = 0, totalJ = 0, totalP = 0, totalW = 0

  intervals.forEach(interval => {
    const ljpw = INTERVAL_LJPW[interval] || INTERVAL_LJPW[0]
    totalL += ljpw.L
    totalJ += ljpw.J
    totalP += ljpw.P
    totalW += ljpw.W
  })

  const count = intervals.length
  const avgL = totalL / count
  const avgJ = totalJ / count
  const avgP = totalP / count
  const avgW = totalW / count

  // Calculate derived metrics
  const H = calculateHarmonyIndex(avgL, avgJ, avgP, avgW)
  const V = PHI * H * avgL

  // Calculate Generative Equation parameters
  const B = (H + V / PHI) / 2  // Initial impact
  const L = 1 + avgL  // Love coefficient (mapped to 1-2 range)

  // Analyze for different scenarios
  const defaultListens = 10
  const defaultDistance = 3  // Moderate cultural distance

  const lifeCheck = checkLifeInequality(L, defaultListens, defaultDistance)
  const hope = calculateHope(L)
  const meaning = calculateMeaning(B, L, defaultListens, defaultDistance)

  // Find critical iterations for various distances
  const criticalIterations = [1, 3, 5, 10].map(d => ({
    distance: d,
    listensNeeded: findCriticalIterations(L, d),
  }))

  // Calculate memorability score (0-100)
  const memorabilityScore = Math.min(100, Math.round(
    (lifeCheck.ratio * 30) +
    (avgL * 40) +
    (H * 30)
  ))

  return {
    valid: true,

    // Raw LJPW values
    ljpw: {
      L: Math.round(avgL * 100) / 100,
      J: Math.round(avgJ * 100) / 100,
      P: Math.round(avgP * 100) / 100,
      W: Math.round(avgW * 100) / 100,
    },

    // Derived metrics
    harmonyIndex: Math.round(H * 100) / 100,
    semanticVoltage: Math.round(V * 100) / 100,

    // Generative Equation results
    generative: {
      B: Math.round(B * 100) / 100,
      L: Math.round(L * 100) / 100,
      meaning: Math.round(meaning * 100) / 100,
      meaningAfter10: Math.round(meaning * 100) / 100,
    },

    // Life Inequality
    lifeInequality: lifeCheck,

    // Hope
    hope,

    // Critical iterations
    criticalIterations,

    // Overall score
    memorabilityScore,

    // Interval breakdown
    intervals: intervals.map(i => INTERVAL_LJPW[i]?.name || 'Unknown'),

    // Feedback
    feedback: generateMelodyFeedback(avgL, H, lifeCheck, intervals),
  }
}

/**
 * Calculate Harmony Index (distance from anchor point)
 */
function calculateHarmonyIndex(L, J, P, W) {
  const distance = Math.sqrt(
    Math.pow(1 - L, 2) +
    Math.pow(1 - J, 2) +
    Math.pow(1 - P, 2) +
    Math.pow(1 - W, 2)
  )
  return 1 / (1 + distance)
}

/**
 * Get interval (in semitones) between two notes
 */
function getIntervalBetweenNotes(note1, note2) {
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

  const getName = (note) => note.replace(/[0-9]/g, '')
  const getOctave = (note) => parseInt(note.match(/[0-9]/)?.[0] || '4')

  const index1 = noteNames.indexOf(getName(note1))
  const index2 = noteNames.indexOf(getName(note2))
  const octave1 = getOctave(note1)
  const octave2 = getOctave(note2)

  const semitone1 = octave1 * 12 + index1
  const semitone2 = octave2 * 12 + index2

  return semitone2 - semitone1
}

/**
 * Generate feedback based on analysis
 */
function generateMelodyFeedback(avgL, H, lifeCheck, intervals) {
  const feedback = []

  // Love feedback
  if (avgL < 0.5) {
    feedback.push({
      type: 'warning',
      message: 'Low emotional connection - try adding more major 3rds or 6ths',
    })
  } else if (avgL > 0.8) {
    feedback.push({
      type: 'success',
      message: 'Strong emotional connection - your melody has heart',
    })
  }

  // Life Inequality feedback
  if (lifeCheck.phase === 'AUTOPOIETIC') {
    feedback.push({
      type: 'success',
      message: 'Your melody passes the Life Inequality - it will persist!',
    })
  } else if (lifeCheck.phase === 'ENTROPIC') {
    feedback.push({
      type: 'warning',
      message: 'Your melody may fade - increase Love through warmer intervals',
    })
  }

  // Interval variety
  const uniqueIntervals = [...new Set(intervals)]
  if (uniqueIntervals.length < 3) {
    feedback.push({
      type: 'tip',
      message: 'Try more interval variety for added interest',
    })
  }

  // Check for tritone (tension)
  if (intervals.includes(6)) {
    feedback.push({
      type: 'info',
      message: 'Tritone detected - make sure it resolves for satisfaction',
    })
  }

  // Check for major 3rd (highest Love)
  if (intervals.includes(4)) {
    feedback.push({
      type: 'success',
      message: 'Major 3rd detected - the "Love interval" boosts memorability',
    })
  }

  return feedback
}

// =============================================================================
// ATMOSPHERE CALCULATION
// =============================================================================

/**
 * Calculate atmosphere richness based on player progress
 *
 * Uses the equation: Atmosphere = B × L^(lessons) × φ^(-mysteries)
 *
 * @param {number} lessonsCompleted - Number of lessons learned (n)
 * @param {number} totalLessons - Total lessons available
 * @param {number} mysteriesRemaining - How far from the truth (d)
 */
export function calculateAtmosphere(lessonsCompleted, totalLessons, mysteriesRemaining) {
  // Base impact increases with each lesson
  const B = 0.3 + (lessonsCompleted / totalLessons) * 0.5

  // Love grows with understanding
  const L = 1 + (lessonsCompleted / totalLessons) * 0.8

  // Calculate atmosphere value
  const atmosphere = B * Math.pow(L, lessonsCompleted) * Math.pow(PHI, -mysteriesRemaining)

  // Normalize to 0-1 range for rendering
  const normalized = Math.min(1, atmosphere / 10)

  // Calculate life inequality for atmosphere
  const growth = Math.pow(L, lessonsCompleted)
  const decay = Math.pow(PHI, mysteriesRemaining)
  const ratio = growth / decay

  return {
    raw: atmosphere,
    normalized,
    growth,
    decay,
    ratio,
    phase: ratio > 1.1 ? 'awakening' : ratio > 0.9 ? 'stirring' : 'dormant',

    // Visual parameters
    brightness: 0.2 + normalized * 0.6,
    saturation: 0.3 + normalized * 0.5,
    particleActivity: normalized,
    soundPresence: normalized,

    // Description
    description: getAtmosphereDescription(normalized),
  }
}

function getAtmosphereDescription(normalized) {
  if (normalized < 0.2) return 'The silence presses heavily upon you...'
  if (normalized < 0.4) return 'Something stirs in the stillness...'
  if (normalized < 0.6) return 'Music begins to remember itself...'
  if (normalized < 0.8) return 'The manor awakens with sound...'
  return 'Life and music flow freely once more!'
}

// =============================================================================
// SILENCE CALCULATION
// =============================================================================

/**
 * Calculate silence level using inverse of atmosphere
 * Silence = φ^d / L^n (inverse of Life Inequality)
 */
export function calculateSilence(lessonsCompleted, totalLessons) {
  const mysteriesRemaining = totalLessons - lessonsCompleted

  // Growth from learning
  const L = 1 + (lessonsCompleted / totalLessons) * 0.8
  const growth = Math.pow(L, lessonsCompleted)

  // Decay from remaining mysteries
  const decay = Math.pow(PHI, mysteriesRemaining)

  // Silence is the inverse ratio
  const silenceRatio = decay / Math.max(growth, 0.01)

  // Convert to percentage (100 = full silence, 0 = silence broken)
  const silenceLevel = Math.min(100, Math.max(0, Math.round(
    100 * (silenceRatio / (silenceRatio + 1))
  )))

  return {
    level: silenceLevel,
    growth: Math.round(growth * 100) / 100,
    decay: Math.round(decay * 100) / 100,
    ratio: Math.round(silenceRatio * 1000) / 1000,
    isBroken: silenceLevel < 10,
    formula: `φ^${mysteriesRemaining} / L^${lessonsCompleted} = ${silenceRatio.toFixed(2)}`,
  }
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  PHI,
  PHI_INV,
  calculateMeaning,
  checkLifeInequality,
  findCriticalIterations,
  calculateHope,
  analyzeMelody,
  calculateAtmosphere,
  calculateSilence,
}
