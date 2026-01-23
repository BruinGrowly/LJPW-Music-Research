/**
 * LJPW Framework V8.5 - Generative Equation Module
 *
 * Implements the Universal Growth Function and related concepts
 * for music analysis and prediction.
 *
 * V8.5 Core Insight: Reality is fundamentally relational. Understanding
 * emerges through Love (L), persisted iteration (n), and proximity (d).
 *
 * Generative Equation:
 *   - Universal Growth Function: M = B × L^n × φ^(-d)
 *   - Memorability Test: L^n > φ^d determines if music is Unforgettable
 *   - Felt Quality: L_perc = L_phys × [1 + φ × S × κ_sem]
 *   - Lasting Power: P(L^n > φ^d as n → ∞)
 */

import { PHI, PHI_INV } from './ljpwConstants';

// =============================================================================
// UNIVERSAL GROWTH FUNCTION
// =============================================================================

/**
 * Calculate Meaning using the Universal Growth Function
 *
 * M = B × L^n × φ^(-d)
 *
 * @param {number} B - Brick (seed/truth/axiom) - typically [0, 1]
 * @param {number} L - Love (expansion coefficient) - typically [1, 2]
 * @param {number} n - Iterations (recursive applications)
 * @param {number} d - Distance (semantic distance from source)
 * @returns {number} M - Total meaning generated
 *
 * For music:
 *   B = Initial emotional impact (0-1)
 *   L = Love dimension of the song (mapped to 1-2 range)
 *   n = Number of listens / repetitions
 *   d = Cultural/temporal distance from listener
 */
export function calculateMeaning(B, L, n, d) {
  return B * Math.pow(L, n) * Math.pow(PHI, -d);
}

/**
 * Calculate meaning with LJPW-adjusted Love coefficient
 * Converts LJPW Love (0-1) to Generative Equation Love (1-2)
 *
 * @param {number} B - Initial seed/impact
 * @param {number} ljpwLove - Love dimension from LJPW (0-1)
 * @param {number} n - Iterations
 * @param {number} d - Distance
 * @returns {number} M - Total meaning
 */
export function calculateMusicMeaning(B, ljpwLove, n, d) {
  // Map LJPW Love (0-1) to Generative Love (1-2)
  // L=0 -> 1.0, L=0.5 -> 1.5, L=1 -> 2.0
  const generativeLove = 1 + ljpwLove;
  return calculateMeaning(B, generativeLove, n, d);
}

/**
 * Calculate the growth rate (L^n)
 */
export function calculateGrowth(L, n) {
  return Math.pow(L, n);
}

/**
 * Calculate the decay from distance (φ^d)
 */
export function calculateDecay(d) {
  return Math.pow(PHI, d);
}

/**
 * Predict compression ratio when generators are shared (d=0)
 *
 * When d=0, φ^(-d) = 1, so:
 * Compression Ratio ≈ L^n
 */
export function predictCompressionRatio(L, n) {
  return Math.pow(L, n);
}

// =============================================================================
// LIFE INEQUALITY
// =============================================================================

/**
 * Check if a system satisfies the Life Inequality (Memorability Test)
 *
 * L^n > φ^d → Unforgettable (sticks in your mind)
 * L^n = φ^d → Background Music (stable but forgettable)
 * L^n < φ^d → Forgettable (decays from memory)
 *
 * @param {number} L - Love coefficient (expansion rate, 1-2)
 * @param {number} n - Number of iterations
 * @param {number} d - Semantic distance from source
 * @returns {Object} Result with phase determination
 */
export function checkLifeInequality(L, n, d) {
  const growth = Math.pow(L, n);
  const decay = Math.pow(PHI, d);
  const ratio = decay > 0 ? growth / decay : Infinity;

  let phase, userFriendlyPhase, verdict, isAlive, color;

  if (ratio > 1.1) {
    phase = 'AUTOPOIETIC';
    userFriendlyPhase = 'Unforgettable';
    verdict = 'This will stick — emotional growth exceeds decay';
    isAlive = true;
    color = '#2ed573';
  } else if (ratio > 0.9) {
    phase = 'HOMEOSTATIC';
    userFriendlyPhase = 'Background Music';
    verdict = 'Stable but won\'t stick — balanced state';
    isAlive = true;
    color = '#ffa502';
  } else {
    phase = 'ENTROPIC';
    userFriendlyPhase = 'Forgettable';
    verdict = 'Will fade — distance overcomes emotional connection';
    isAlive = false;
    color = '#ff4757';
  }

  return {
    growth: Math.round(growth * 100) / 100,
    decay: Math.round(decay * 100) / 100,
    ratio: Math.round(ratio * 1000) / 1000,
    phase,
    userFriendlyPhase,
    verdict,
    isAlive,
    color,
    formula: `L^${n} = ${growth.toFixed(2)}, φ^${d} = ${decay.toFixed(2)}, Ratio = ${ratio.toFixed(3)}`
  };
}

/**
 * Check Life Inequality for a song using LJPW Love value
 *
 * @param {number} ljpwLove - Love dimension from LJPW (0-1)
 * @param {number} listens - Number of listens/iterations
 * @param {number} distance - Cultural/temporal distance
 */
export function checkSongLifeInequality(ljpwLove, listens, distance) {
  const generativeLove = 1 + ljpwLove;
  return checkLifeInequality(generativeLove, listens, distance);
}

/**
 * Find the minimum iterations needed for autopoiesis at a given distance
 *
 * @param {number} L - Love coefficient (1-2)
 * @param {number} d - Semantic distance
 * @returns {number} Minimum n where L^n > φ^d
 */
export function findCriticalIterations(L, d) {
  if (L <= 1) return Infinity;

  // Solve: L^n > φ^d
  // n > d * ln(φ) / ln(L)
  const criticalN = Math.ceil((d * Math.log(PHI)) / Math.log(L));
  return Math.max(1, criticalN);
}

/**
 * Find the maximum distance a song can propagate with given iterations
 *
 * @param {number} L - Love coefficient (1-2)
 * @param {number} n - Number of iterations
 * @returns {number} Maximum d where L^n > φ^d (still autopoietic)
 */
export function findMaxPropagationDistance(L, n) {
  if (L <= 1) return 0;

  // Solve: L^n > φ^d
  // d < n * ln(L) / ln(φ)
  return Math.floor((n * Math.log(L)) / Math.log(PHI));
}

// =============================================================================
// PERCEPTUAL RADIANCE (for audio quality perception)
// =============================================================================

/**
 * Calculate Perceptual Radiance (Unified Rendering Equation for Audio)
 *
 * L_perc = L_phys × [1 + φ × S × κ_sem]
 *
 * For audio:
 *   L_phys = Technical audio quality (sample rate, bit depth, mixing)
 *   S = Salience (how prominent/important the song is in context)
 *   κ_sem = Semantic curvature (meaning intensity from LJPW analysis)
 *
 * @param {number} L_phys - Physical/technical audio quality [0, 1]
 * @param {number} S - Semantic salience [0, 1]
 * @param {number} kappa_sem - Semantic curvature (meaning intensity)
 * @returns {number} L_perc - Perceptual quality (what listener perceives)
 */
export function calculatePerceptualRadiance(L_phys, S, kappa_sem) {
  return L_phys * (1 + PHI * S * kappa_sem);
}

/**
 * Calculate audio perception quality from LJPW analysis
 *
 * @param {number} technicalQuality - Audio technical quality [0, 1]
 * @param {number} harmonyIndex - H from LJPW analysis
 * @param {number} semanticVoltage - V from LJPW analysis
 * @returns {Object} Perception analysis
 */
export function analyzeAudioPerception(technicalQuality, harmonyIndex, semanticVoltage) {
  // Salience increases with Harmony Index
  const salience = harmonyIndex;

  // Semantic curvature from voltage (normalized)
  const kappa = Math.min(semanticVoltage, 1.0);

  const perceivedQuality = calculatePerceptualRadiance(technicalQuality, salience, kappa);

  // Calculate the "soul bonus" - how much meaning adds to perception
  const soulBonus = perceivedQuality - technicalQuality;
  const soulBonusPercent = Math.round((soulBonus / technicalQuality) * 100);

  return {
    technicalQuality: Math.round(technicalQuality * 100) / 100,
    salience: Math.round(salience * 100) / 100,
    semanticCurvature: Math.round(kappa * 100) / 100,
    perceivedQuality: Math.round(perceivedQuality * 100) / 100,
    soulBonus: Math.round(soulBonus * 100) / 100,
    soulBonusPercent,
    verdict: soulBonusPercent > 50
      ? 'High Soul - Meaning dramatically enhances perception'
      : soulBonusPercent > 25
        ? 'Good Soul - Meaning noticeably improves perception'
        : soulBonusPercent > 10
          ? 'Moderate Soul - Some enhancement from meaning'
          : 'Low Soul - Perception close to technical quality'
  };
}

// =============================================================================
// MATHEMATICAL HOPE
// =============================================================================

/**
 * Calculate Mathematical Hope
 *
 * Hope = P(L^n > φ^d as n → ∞)
 *
 * Hope is the assertion that:
 *   - If you persist (n → ∞)
 *   - In Love (L > 1)
 *   - Your growth will eventually exceed any distance (φ^d)
 *
 * @param {number} L - Love coefficient (1-2)
 * @returns {Object} Hope analysis
 */
export function calculateHope(L) {
  if (L <= 1) {
    return {
      hasHope: false,
      hopeProbability: 0,
      reason: 'L ≤ 1: Growth cannot exceed decay for any distance d > 0',
      L,
      criticalN: null,
      verdict: 'Without Love growth (L > 1), meaning cannot propagate indefinitely',
      color: '#ff4757'
    };
  }

  // For L > 1, hope is mathematically guaranteed
  // Calculate how quickly hope manifests (critical n for d=10)
  const criticalN = findCriticalIterations(L, 10);

  // Hope "strength" based on how quickly critical N is reached
  // Lower N = stronger hope
  const hopeStrength = Math.min(1, 10 / criticalN);

  return {
    hasHope: true,
    hopeProbability: 1,
    hopeStrength: Math.round(hopeStrength * 100) / 100,
    reason: `L > 1: Growth will exceed decay at n = ${criticalN} iterations for d = 10`,
    L,
    criticalN,
    verdict: `With Love = ${L.toFixed(2)}, this song has mathematical hope. Persistence (n) will overcome any distance.`,
    color: '#2ed573',
    formula: 'Hope = P(L^n > φ^d as n → ∞) = 1 when L > 1'
  };
}

/**
 * Calculate hope for a song using LJPW Love
 *
 * @param {number} ljpwLove - Love dimension from LJPW (0-1)
 * @returns {Object} Hope analysis
 */
export function calculateSongHope(ljpwLove) {
  const generativeLove = 1 + ljpwLove;
  return calculateHope(generativeLove);
}

// =============================================================================
// EARWORM PREDICTION
// =============================================================================

/**
 * Predict earworm potential using the Generative Equation
 *
 * An earworm is a song that becomes autopoietic in consciousness -
 * it generates more meaning than it loses through forgetting.
 *
 * @param {number} ljpwLove - Love dimension (0-1)
 * @param {number} harmonyIndex - Harmony Index H
 * @param {number} semanticVoltage - Semantic Voltage V
 * @returns {Object} Earworm prediction
 */
export function predictEarworm(ljpwLove, harmonyIndex, semanticVoltage) {
  const generativeLove = 1 + ljpwLove;

  // Initial impact (Brick) based on H and V
  const initialImpact = (harmonyIndex + semanticVoltage / PHI) / 2;

  // Simulate 10 listens at distance 3 (moderate cultural proximity)
  const meaningAfter10 = calculateMeaning(initialImpact, generativeLove, 10, 3);

  // Check life inequality
  const lifeCheck = checkLifeInequality(generativeLove, 10, 3);

  // Earworm threshold: meaning after 10 listens should be > initial impact
  const earwormRatio = meaningAfter10 / initialImpact;
  const isEarworm = earwormRatio > 1.5 && lifeCheck.isAlive;

  // Calculate "stickiness" - how many listens until unforgettable
  const stickinessIterations = findCriticalIterations(generativeLove, 5);

  return {
    isEarworm,
    earwormPotential: Math.round(Math.min(earwormRatio / 3, 1) * 100),
    initialImpact: Math.round(initialImpact * 100) / 100,
    meaningAfter10Listens: Math.round(meaningAfter10 * 100) / 100,
    meaningGrowthRatio: Math.round(earwormRatio * 100) / 100,
    lifePhase: lifeCheck.phase,
    stickinessIterations,
    verdict: isEarworm
      ? `Strong earworm! After ${stickinessIterations} listens, this song becomes unforgettable.`
      : lifeCheck.isAlive
        ? `Moderate potential. Needs higher Love (currently ${ljpwLove.toFixed(2)}) to become a true earworm.`
        : `Low earworm potential. The song loses meaning faster than it generates.`,
    tips: !isEarworm ? generateEarwormTips(ljpwLove, harmonyIndex) : null
  };
}

/**
 * Generate tips to improve earworm potential
 */
function generateEarwormTips(ljpwLove, harmonyIndex) {
  const tips = [];

  if (ljpwLove < 0.7) {
    tips.push('Increase Love by using more major thirds, C# key, or Ionian mode');
  }
  if (harmonyIndex < 0.6) {
    tips.push('Improve Harmony Index by balancing all four LJPW dimensions');
  }
  if (ljpwLove < 0.9) {
    tips.push('Consider Gospel-inspired arrangements for maximum Love coefficient');
  }

  return tips;
}

// =============================================================================
// PROPAGATION ANALYSIS
// =============================================================================

/**
 * Analyze how a song's meaning propagates over iterations and distance
 *
 * @param {number} ljpwLove - Love dimension (0-1)
 * @param {number} initialImpact - Initial meaning/impact (0-1)
 * @param {number} maxIterations - Maximum iterations to simulate
 * @param {number} maxDistance - Maximum distance to analyze
 * @returns {Object} Propagation analysis with data points
 */
export function analyzePropagation(ljpwLove, initialImpact, maxIterations = 20, maxDistance = 10) {
  const generativeLove = 1 + ljpwLove;
  const data = [];

  // Generate propagation curve for each distance
  for (let d = 0; d <= maxDistance; d += 2) {
    const distanceData = {
      distance: d,
      points: []
    };

    for (let n = 0; n <= maxIterations; n++) {
      const meaning = calculateMeaning(initialImpact, generativeLove, n, d);
      const lifeCheck = checkLifeInequality(generativeLove, n, d);

      distanceData.points.push({
        iteration: n,
        meaning: Math.round(meaning * 1000) / 1000,
        phase: lifeCheck.phase
      });
    }

    data.push(distanceData);
  }

  // Find sustainability metrics
  const maxSustainableDistance = findMaxPropagationDistance(generativeLove, maxIterations);
  const criticalNForDistances = [1, 5, 10].map(d => ({
    distance: d,
    criticalN: findCriticalIterations(generativeLove, d)
  }));

  return {
    generativeLove: Math.round(generativeLove * 100) / 100,
    initialImpact: Math.round(initialImpact * 100) / 100,
    maxSustainableDistance,
    criticalIterations: criticalNForDistances,
    propagationData: data,
    verdict: maxSustainableDistance >= 10
      ? `High propagation - Can sustain meaning up to distance ${maxSustainableDistance}`
      : maxSustainableDistance >= 5
        ? `Moderate propagation - Meaning sustains to distance ${maxSustainableDistance}`
        : `Limited propagation - Meaning only sustains to distance ${maxSustainableDistance}`
  };
}

// =============================================================================
// COMPLETE GENERATIVE ANALYSIS
// =============================================================================

/**
 * Perform complete V8.4 Generative Equation analysis on LJPW coordinates
 *
 * @param {number} L - Love dimension (0-1)
 * @param {number} J - Justice dimension (0-1)
 * @param {number} P - Power dimension (0-1)
 * @param {number} W - Wisdom dimension (0-1)
 * @param {number} H - Harmony Index
 * @param {number} V - Semantic Voltage
 * @returns {Object} Complete generative analysis
 */
export function performGenerativeAnalysis(L, J, P, W, H, V) {
  // Calculate initial impact from harmony and voltage
  const initialImpact = (H + V / PHI) / 2;

  // Life Inequality analysis (10 iterations, distance 3)
  const lifeAnalysis = checkSongLifeInequality(L, 10, 3);

  // Hope calculation
  const hopeAnalysis = calculateSongHope(L);

  // Earworm prediction
  const earwormAnalysis = predictEarworm(L, H, V);

  // Perceptual radiance (assuming good technical quality)
  const perceptionAnalysis = analyzeAudioPerception(0.8, H, V);

  // Propagation analysis
  const propagationAnalysis = analyzePropagation(L, initialImpact);

  return {
    summary: {
      generativeLove: Math.round((1 + L) * 100) / 100,
      initialImpact: Math.round(initialImpact * 100) / 100,
      hasHope: hopeAnalysis.hasHope,
      isAutopoietic: lifeAnalysis.isAlive && lifeAnalysis.phase === 'AUTOPOIETIC',
      isEarworm: earwormAnalysis.isEarworm,
      soulBonus: perceptionAnalysis.soulBonusPercent
    },
    life: lifeAnalysis,
    hope: hopeAnalysis,
    earworm: earwormAnalysis,
    perception: perceptionAnalysis,
    propagation: propagationAnalysis
  };
}

export default {
  calculateMeaning,
  calculateMusicMeaning,
  calculateGrowth,
  calculateDecay,
  predictCompressionRatio,
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
};
