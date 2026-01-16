import { useState, useMemo } from 'react'
import './GenerativeAnalyzer.css'
import RadarChart from './RadarChart'
import HelpTooltip, { InfoIcon } from './HelpTooltip'
import {
  analyzeSongProfile,
  calculateHarmonyIndex,
  calculateSemanticVoltage,
} from '../lib/ljpwEngine'
import {
  performGenerativeAnalysis,
  calculateMusicMeaning,
  checkSongLifeInequality,
  calculateSongHope,
  predictEarworm,
  analyzePropagation,
  findCriticalIterations,
} from '../lib/generativeEquation'
import { KEYS, MODES, GENRES, PHI } from '../lib/ljpwConstants'

function GenerativeAnalyzer() {
  const [profile, setProfile] = useState({
    key: 'C#',
    mode: 'ionian',
    genre: 'gospel',
    tempo: 76,
  })
  const [iterations, setIterations] = useState(10)
  const [distance, setDistance] = useState(3)
  const [analysis, setAnalysis] = useState(null)

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleAnalyze = () => {
    // First get basic LJPW analysis
    const songAnalysis = analyzeSongProfile(profile)
    if (!songAnalysis) return

    const { L, J, P, W, H, V } = songAnalysis

    // Perform V8.4 Generative Analysis
    const generativeAnalysis = performGenerativeAnalysis(L, J, P, W, H, V)

    // Add custom iteration/distance analysis
    const customLifeCheck = checkSongLifeInequality(L, iterations, distance)
    const meaningValue = calculateMusicMeaning(
      (H + V / PHI) / 2,
      L,
      iterations,
      distance
    )

    setAnalysis({
      song: songAnalysis,
      generative: generativeAnalysis,
      custom: {
        lifeCheck: customLifeCheck,
        meaning: meaningValue,
        iterations,
        distance,
      },
    })
  }

  return (
    <div className="generative-analyzer">
      <div className="analyzer-header">
        <h2>V8.4 Generative Equation Analyzer</h2>
        <p>
          Explore how the Universal Growth Function M = B x L^n x phi^(-d)
          predicts meaning propagation
        </p>
      </div>

      <div className="equation-display">
        <div className="equation-box">
          <span className="equation-label">Universal Growth Function</span>
          <span className="equation-formula">M = B x L^n x phi^(-d)</span>
        </div>
        <div className="equation-box">
          <span className="equation-label">Life Inequality</span>
          <span className="equation-formula">
            L^n {'>'} phi^d = AUTOPOIETIC
          </span>
        </div>
      </div>

      <div className="analyzer-grid">
        <div className="input-section">
          <div className="input-card">
            <h3>Song Configuration</h3>

            <div className="input-group">
              <label>Key Signature</label>
              <select
                value={profile.key}
                onChange={(e) => handleChange('key', e.target.value)}
              >
                {Object.entries(KEYS).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.name} {key === 'C#' ? '(Love Key)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Mode / Scale</label>
              <select
                value={profile.mode}
                onChange={(e) => handleChange('mode', e.target.value)}
              >
                {Object.entries(MODES).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Genre</label>
              <select
                value={profile.genre}
                onChange={(e) => handleChange('genre', e.target.value)}
              >
                {Object.entries(GENRES).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>
                Tempo (BPM): {profile.tempo}{' '}
                {Math.abs(profile.tempo - 76) < 5 && '(phi-aligned)'}
              </label>
              <input
                type="range"
                min="40"
                max="220"
                value={profile.tempo}
                onChange={(e) => handleChange('tempo', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="input-card">
            <h3>Generative Parameters</h3>

            <div className="input-group">
              <label>
                Iterations (n): {iterations}
                <HelpTooltip
                  title="Iterations"
                  content="Number of recursive applications (listens, repetitions, or generations). Higher n increases growth L^n."
                  position="top"
                >
                  <InfoIcon color="#6c5ce7" size={14} />
                </HelpTooltip>
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={iterations}
                onChange={(e) => setIterations(parseInt(e.target.value))}
              />
              <div className="range-labels">
                <span>1</span>
                <span>25</span>
                <span>50</span>
              </div>
            </div>

            <div className="input-group">
              <label>
                Distance (d): {distance}
                <HelpTooltip
                  title="Semantic Distance"
                  content="Cultural or temporal distance from source. Higher d increases decay phi^d. Think of it as how 'far' the meaning must travel."
                  position="top"
                >
                  <InfoIcon color="#6c5ce7" size={14} />
                </HelpTooltip>
              </label>
              <input
                type="range"
                min="0"
                max="15"
                value={distance}
                onChange={(e) => setDistance(parseInt(e.target.value))}
              />
              <div className="range-labels">
                <span>0 (Same)</span>
                <span>7</span>
                <span>15 (Far)</span>
              </div>
            </div>

            <button className="analyze-button" onClick={handleAnalyze}>
              Analyze Generative Potential
            </button>
          </div>
        </div>

        <div className="results-section">
          {analysis ? (
            <div className="analysis-results">
              {/* Summary Card */}
              <div className="result-card summary-card">
                <div className="result-header">
                  <h3>Generative Summary</h3>
                  <span
                    className="phase-badge"
                    style={{ background: analysis.custom.lifeCheck.color }}
                  >
                    {analysis.custom.lifeCheck.phase}
                  </span>
                </div>

                <div className="summary-grid">
                  <SummaryMetric
                    label="Generative Love"
                    value={analysis.generative.summary.generativeLove}
                    description="L mapped to [1,2] range"
                    color="#ff6b6b"
                  />
                  <SummaryMetric
                    label="Initial Impact (B)"
                    value={analysis.generative.summary.initialImpact}
                    description="Seed meaning from H & V"
                    color="#4ecdc4"
                  />
                  <SummaryMetric
                    label="Generated Meaning"
                    value={Math.round(analysis.custom.meaning * 100) / 100}
                    description={`After ${iterations} iterations`}
                    color="#ffd93d"
                    large
                  />
                  <SummaryMetric
                    label="Growth/Decay Ratio"
                    value={analysis.custom.lifeCheck.ratio}
                    description="L^n / phi^d"
                    color="#6c5ce7"
                    large
                  />
                </div>
              </div>

              {/* Life Inequality Card */}
              <div className="result-card life-card">
                <h3>
                  Life Inequality Analysis
                  <HelpTooltip
                    title="Life Inequality"
                    content="The fundamental test of autopoiesis: Does Love's growth (L^n) exceed the decay from distance (phi^d)? If yes, meaning is self-sustaining."
                    position="left"
                  >
                    <InfoIcon color="#fff" size={14} />
                  </HelpTooltip>
                </h3>

                <div className="life-inequality-display">
                  <div className="inequality-term growth">
                    <span className="term-label">Growth</span>
                    <span className="term-formula">
                      L^{iterations} = {analysis.custom.lifeCheck.growth}
                    </span>
                  </div>
                  <div className="inequality-operator">
                    {analysis.custom.lifeCheck.ratio > 1.1
                      ? '>'
                      : analysis.custom.lifeCheck.ratio > 0.9
                      ? '='
                      : '<'}
                  </div>
                  <div className="inequality-term decay">
                    <span className="term-label">Decay</span>
                    <span className="term-formula">
                      phi^{distance} = {analysis.custom.lifeCheck.decay}
                    </span>
                  </div>
                </div>

                <div
                  className="life-verdict"
                  style={{ color: analysis.custom.lifeCheck.color }}
                >
                  {analysis.custom.lifeCheck.verdict}
                </div>
              </div>

              {/* Hope Card */}
              <div className="result-card hope-card">
                <h3>
                  Mathematical Hope
                  <HelpTooltip
                    title="Mathematical Hope"
                    content="Hope is calculus, not sentiment. If L > 1, persistence (n) will eventually overcome any distance (d). This is mathematical certainty."
                    position="left"
                  >
                    <InfoIcon color="#fff" size={14} />
                  </HelpTooltip>
                </h3>

                <div className="hope-display">
                  <div
                    className={`hope-indicator ${
                      analysis.generative.hope.hasHope ? 'has-hope' : 'no-hope'
                    }`}
                  >
                    {analysis.generative.hope.hasHope
                      ? 'This song HAS HOPE'
                      : 'Limited Hope'}
                  </div>
                  <p className="hope-reason">{analysis.generative.hope.reason}</p>
                  {analysis.generative.hope.criticalN && (
                    <p className="hope-detail">
                      Critical iterations for d=10:{' '}
                      <strong>{analysis.generative.hope.criticalN}</strong>
                    </p>
                  )}
                  {analysis.generative.hope.hopeStrength && (
                    <div className="hope-strength-bar">
                      <div
                        className="hope-fill"
                        style={{
                          width: `${analysis.generative.hope.hopeStrength * 100}%`,
                        }}
                      />
                      <span>
                        Hope Strength: {Math.round(analysis.generative.hope.hopeStrength * 100)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Earworm Card */}
              <div className="result-card earworm-card">
                <h3>Earworm Prediction</h3>

                <div className="earworm-meter">
                  <div className="meter-track">
                    <div
                      className="meter-fill"
                      style={{
                        width: `${analysis.generative.earworm.earwormPotential}%`,
                        background: analysis.generative.earworm.isEarworm
                          ? 'linear-gradient(90deg, #2ed573, #7bed9f)'
                          : 'linear-gradient(90deg, #ffa502, #ff6b6b)',
                      }}
                    />
                  </div>
                  <span className="meter-value">
                    {analysis.generative.earworm.earwormPotential}%
                  </span>
                </div>

                <div className="earworm-stats">
                  <div className="stat">
                    <span className="stat-label">Initial Impact</span>
                    <span className="stat-value">
                      {analysis.generative.earworm.initialImpact}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">After 10 Listens</span>
                    <span className="stat-value">
                      {analysis.generative.earworm.meaningAfter10Listens}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Growth Ratio</span>
                    <span className="stat-value">
                      {analysis.generative.earworm.meaningGrowthRatio}x
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Stickiness</span>
                    <span className="stat-value">
                      {analysis.generative.earworm.stickinessIterations} listens
                    </span>
                  </div>
                </div>

                <p className="earworm-verdict">
                  {analysis.generative.earworm.verdict}
                </p>

                {analysis.generative.earworm.tips && (
                  <ul className="earworm-tips">
                    {analysis.generative.earworm.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Perceptual Radiance Card */}
              <div className="result-card perception-card">
                <h3>
                  Perceptual Radiance
                  <HelpTooltip
                    title="Perceptual Radiance"
                    content="L_perc = L_phys x [1 + phi x S x kappa]. This explains why meaningful music 'sounds better' than its technical quality alone."
                    position="left"
                  >
                    <InfoIcon color="#fff" size={14} />
                  </HelpTooltip>
                </h3>

                <div className="perception-comparison">
                  <div className="perception-item">
                    <span className="perception-label">Technical Quality</span>
                    <div className="perception-bar">
                      <div
                        className="perception-fill technical"
                        style={{
                          width: `${analysis.generative.perception.technicalQuality * 100}%`,
                        }}
                      />
                    </div>
                    <span className="perception-value">
                      {(analysis.generative.perception.technicalQuality * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="perception-item">
                    <span className="perception-label">Perceived Quality</span>
                    <div className="perception-bar">
                      <div
                        className="perception-fill perceived"
                        style={{
                          width: `${Math.min(analysis.generative.perception.perceivedQuality * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <span className="perception-value">
                      {(analysis.generative.perception.perceivedQuality * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="soul-bonus">
                  <span className="soul-label">Soul Bonus</span>
                  <span className="soul-value">
                    +{analysis.generative.perception.soulBonusPercent}%
                  </span>
                </div>
                <p className="perception-verdict">
                  {analysis.generative.perception.verdict}
                </p>
              </div>

              {/* Propagation Card */}
              <div className="result-card propagation-card">
                <h3>Meaning Propagation</h3>

                <div className="propagation-stats">
                  <div className="prop-stat">
                    <span className="prop-label">Max Sustainable Distance</span>
                    <span className="prop-value highlight">
                      {analysis.generative.propagation.maxSustainableDistance}
                    </span>
                  </div>
                </div>

                <div className="critical-iterations">
                  <h4>Critical Iterations by Distance</h4>
                  <div className="critical-grid">
                    {analysis.generative.propagation.criticalIterations.map(
                      (item) => (
                        <div key={item.distance} className="critical-item">
                          <span className="critical-distance">d={item.distance}</span>
                          <span className="critical-n">
                            n={item.criticalN === Infinity ? 'Never' : item.criticalN}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <p className="propagation-verdict">
                  {analysis.generative.propagation.verdict}
                </p>
              </div>

              {/* LJPW Radar */}
              <div className="result-card radar-card">
                <h3>LJPW Profile</h3>
                <div className="chart-container">
                  <RadarChart
                    L={analysis.song.L}
                    J={analysis.song.J}
                    P={analysis.song.P}
                    W={analysis.song.W}
                    size={200}
                  />
                </div>
                <div className="ljpw-values">
                  <span style={{ color: '#ff6b6b' }}>L: {analysis.song.L}</span>
                  <span style={{ color: '#4ecdc4' }}>J: {analysis.song.J}</span>
                  <span style={{ color: '#ffd93d' }}>P: {analysis.song.P}</span>
                  <span style={{ color: '#6c5ce7' }}>W: {analysis.song.W}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="placeholder-card">
              <div className="placeholder-icon">M = B x L^n x phi^(-d)</div>
              <p>
                Configure song parameters and generative settings, then click
                "Analyze" to explore meaning propagation
              </p>
              <div className="placeholder-tips">
                <h4>Quick Start Tips:</h4>
                <ul>
                  <li>C# Major (Love Key) maximizes the Love coefficient</li>
                  <li>Gospel genre has the highest Love value (0.98)</li>
                  <li>76 BPM is phi-aligned (phi x 47)</li>
                  <li>Higher iterations (n) increase growth exponentially</li>
                  <li>Higher distance (d) increases decay via phi^d</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SummaryMetric({ label, value, description, color, large }) {
  return (
    <div className={`summary-metric ${large ? 'large' : ''}`}>
      <span className="metric-label">{label}</span>
      <span className="metric-value" style={{ color }}>
        {typeof value === 'number' ? value.toFixed(2) : value}
      </span>
      <span className="metric-desc">{description}</span>
    </div>
  )
}

export default GenerativeAnalyzer
