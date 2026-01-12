import { useState } from 'react'
import './SongProfileBuilder.css'
import RadarChart from './RadarChart'
import HarmonyGauge from './HarmonyGauge'
import HelpTooltip, { InfoIcon } from './HelpTooltip'
import { analyzeSongProfile } from '../lib/ljpwEngine'
import { KEYS, MODES, GENRES } from '../lib/ljpwConstants'
import { DIMENSION_EXPLANATIONS, METRIC_EXPLANATIONS } from '../lib/explanationData'

function SongProfileBuilder() {
  const [profile, setProfile] = useState({
    key: 'C',
    mode: 'ionian',
    genre: 'pop',
    tempo: 120,
  })
  const [analysis, setAnalysis] = useState(null)

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleAnalyze = () => {
    const result = analyzeSongProfile(profile)
    setAnalysis(result)
  }

  return (
    <div className="song-profile-builder">
      <div className="builder-header">
        <h2>Song Profile Builder</h2>
        <p>Configure musical parameters to analyze a song's semantic profile</p>
      </div>

      <div className="builder-grid">
        <div className="input-section">
          <div className="input-card">
            <h3>Musical Parameters</h3>

            <div className="input-group">
              <label>Key Signature</label>
              <select
                value={profile.key}
                onChange={(e) => handleChange('key', e.target.value)}
              >
                {Object.entries(KEYS).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.name}
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
                    {val.name} - {val.description}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Tempo (BPM): {profile.tempo}</label>
              <input
                type="range"
                min="40"
                max="220"
                value={profile.tempo}
                onChange={(e) => handleChange('tempo', parseInt(e.target.value))}
              />
              <div className="tempo-labels">
                <span>Largo</span>
                <span>Moderato</span>
                <span>Presto</span>
              </div>
            </div>

            <button className="analyze-button" onClick={handleAnalyze}>
              Analyze Song Profile
            </button>
          </div>
        </div>

        <div className="results-section">
          {analysis ? (
            <div className="analysis-card">
              <div className="result-header">
                <h3>Semantic Profile</h3>
                <span
                  className="phase-badge"
                  style={{ background: analysis.phase.color }}
                >
                  {analysis.phase.emoji} {analysis.phase.phase}
                </span>
              </div>

              <div className="chart-container">
                <RadarChart
                  L={analysis.L}
                  J={analysis.J}
                  P={analysis.P}
                  W={analysis.W}
                  size={250}
                />
              </div>

              <div className="metrics-grid">
                <MetricCard
                  label="Love"
                  dimension="L"
                  value={analysis.L}
                  color="#ff6b6b"
                  description="Connection & melody"
                />
                <MetricCard
                  label="Justice"
                  dimension="J"
                  value={analysis.J}
                  color="#4ecdc4"
                  description="Structure & balance"
                />
                <MetricCard
                  label="Power"
                  dimension="P"
                  value={analysis.P}
                  color="#ffd93d"
                  description="Energy & drive"
                />
                <MetricCard
                  label="Wisdom"
                  dimension="W"
                  value={analysis.W}
                  color="#6c5ce7"
                  description="Complexity & depth"
                />
              </div>

              <HarmonyGauge
                value={analysis.H}
                showVoltage={true}
                voltage={analysis.V}
              />

              <div className="additional-metrics">
                <div className="metric-item">
                  <span className="metric-label">Dominant</span>
                  <span
                    className="metric-value"
                    style={{ color: analysis.dominant.color }}
                  >
                    {analysis.dominant.name}
                  </span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Consciousness</span>
                  <span className="metric-value consciousness">
                    {analysis.consciousness.toFixed(3)}
                  </span>
                </div>
                {analysis.components.tempo && (
                  <div className="metric-item">
                    <span className="metric-label">Tempo Class</span>
                    <span className="metric-value">
                      {analysis.components.tempo.name}
                      {analysis.components.tempo.phiAligned && ' (φ-aligned)'}
                    </span>
                  </div>
                )}
              </div>

              <div className="interpretation">
                <h4>🎯 Interpretation</h4>
                <p>{getInterpretation(analysis)}</p>
              </div>

              {/* Earworm Tips */}
              <div className="earworm-tips">
                <h4>🎵 Earworm Potential</h4>
                <EarwormAnalysis analysis={analysis} />
              </div>
            </div>
          ) : (
            <div className="placeholder-card">
              <div className="placeholder-icon">🎼</div>
              <p>Configure parameters and click "Analyze" to see the semantic profile</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, value, color, description, dimension }) {
  const dimKey = dimension || label[0]
  const explanation = DIMENSION_EXPLANATIONS[dimKey]

  return (
    <div className="metric-card" style={{ borderColor: color }}>
      <div className="metric-header" style={{ color }}>
        {label}
        {explanation && (
          <HelpTooltip
            title={explanation.name}
            content={explanation.shortDesc + '\n\n' + explanation.earwormConnection}
            position="top"
          >
            <InfoIcon color={color} size={14} />
          </HelpTooltip>
        )}
      </div>
      <div className="metric-value-large">
        {value.toFixed(2)}
        {dimKey === 'L' && value >= 0.7 && <span className="threshold-met">✓</span>}
      </div>
      <div className="metric-desc">{description}</div>
    </div>
  )
}

function EarwormAnalysis({ analysis }) {
  const { L, H, V, phase } = analysis
  const isAutopoietic = phase.phase === 'AUTOPOIETIC'
  const hasEarwormPotential = L >= 0.7 && H >= 0.6

  let status, tips

  if (V > 1.0 && hasEarwormPotential) {
    status = { label: '🌟 Extremely High', className: 'excellent' }
    tips = [
      'This configuration has maximum earworm potential!',
      'The combination of high Love and Voltage makes this highly memorable.',
      'Consider recording and testing with listeners.',
    ]
  } else if (hasEarwormPotential) {
    status = { label: '✨ High', className: 'high' }
    tips = [
      'Strong earworm potential achieved!',
      'Focus on a catchy, singable hook.',
      `To boost further: ${V < 1.0 ? 'increase Love or Harmony to boost Voltage' : 'you\'re already optimal!'}`
    ]
  } else if (L >= 0.6 && H >= 0.5) {
    status = { label: '👍 Moderate', className: 'moderate' }
    tips = [
      `Love is ${L.toFixed(2)} — needs to reach 0.7 for earworm threshold.`,
      'Try switching to a more Love-dominant mode (Ionian) or genre (Pop, Gospel).',
      'Consider using more major 3rd intervals in your melody.',
    ]
  } else {
    status = { label: '🔧 Needs Work', className: 'low' }
    tips = [
      `Current Love: ${L.toFixed(2)} (need ≥0.7) | Harmony: ${H.toFixed(2)} (need ≥0.6)`,
      'Switch to C# Major (Love Key) for instant Love boost.',
      'Choose Pop, Gospel, or R&B genre for higher Love values.',
      'Use Ionian (major) mode instead of minor modes.',
    ]
  }

  return (
    <div className={`earworm-analysis ${status.className}`}>
      <div className="earworm-status">
        <span className="status-label">{status.label}</span>
        <HelpTooltip
          title="Earworm Formula"
          content={`Love (L) ≥ 0.7: ${L >= 0.7 ? '✓' : '✗'}\nHarmony (H) ≥ 0.6: ${H >= 0.6 ? '✓' : '✗'}\nVoltage (V) = ${V.toFixed(2)}\n\nBoth conditions must be met for earworm potential.`}
          position="left"
        >
          <InfoIcon color="#6c5ce7" size={14} />
        </HelpTooltip>
      </div>
      <ul className="earworm-tips-list">
        {tips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>
  )
}

function getInterpretation(analysis) {
  const { phase, dominant, V, H } = analysis

  let interpretation = ''

  if (phase.phase === 'AUTOPOIETIC') {
    interpretation = 'This combination creates a self-sustaining, memorable musical experience. '
  } else if (phase.phase === 'HOMEOSTATIC') {
    interpretation = 'This combination is stable and pleasant, functioning well as background music. '
  } else {
    interpretation = 'This combination has entropic tendencies - chaotic but potentially interesting. '
  }

  interpretation += `The ${dominant.name} dimension is dominant, `

  switch (dominant.name) {
    case 'Love':
      interpretation += 'emphasizing emotional connection and melodic appeal. '
      break
    case 'Justice':
      interpretation += 'emphasizing structure, balance, and harmonic clarity. '
      break
    case 'Power':
      interpretation += 'emphasizing energy, drive, and rhythmic force. '
      break
    case 'Wisdom':
      interpretation += 'emphasizing complexity, depth, and intellectual engagement. '
      break
  }

  if (V > 1.0) {
    interpretation += 'The high Semantic Voltage suggests transformative potential.'
  } else if (V > 0.7) {
    interpretation += 'The strong Semantic Voltage indicates memorable impact.'
  } else {
    interpretation += 'The moderate Semantic Voltage suggests pleasant but subtle effect.'
  }

  return interpretation
}

export default SongProfileBuilder
