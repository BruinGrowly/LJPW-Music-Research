import { useState } from 'react'
import './GenerativeAnalyzer.css'
import RadarChart from './RadarChart'
import HelpTooltip, { InfoIcon } from './HelpTooltip'
import {
  analyzeSongProfile,
} from '../lib/ljpwEngine'
import {
  performGenerativeAnalysis,
  calculateMusicMeaning,
  checkSongLifeInequality,
} from '../lib/generativeEquation'
import { KEYS, MODES, GENRES, PHI } from '../lib/ljpwConstants'

// User-friendly phase labels
const PHASE_LABELS = {
  AUTOPOIETIC: 'Unforgettable',
  HOMEOSTATIC: 'Background Music',
  ENTROPIC: 'Forgettable'
}

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
    const songAnalysis = analyzeSongProfile(profile)
    if (!songAnalysis) return

    const { L, J, P, W, H, V } = songAnalysis
    const generativeAnalysis = performGenerativeAnalysis(L, J, P, W, H, V)
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

  // Get user-friendly verdict text
  const getFriendlyVerdict = (lifeCheck) => {
    if (lifeCheck.ratio > 1.1) {
      return "This song grows stronger with each listen - it'll stick in your head!"
    } else if (lifeCheck.ratio > 0.9) {
      return "This song holds steady - pleasant but may not become a favorite"
    } else {
      return "This song fades over time - listeners may forget it quickly"
    }
  }

  return (
    <div className="generative-analyzer">
      <div className="analyzer-header">
        <h2>Song Impact Analyzer</h2>
        <p>
          Discover how memorable and sticky your song will be based on its musical DNA
        </p>
      </div>

      <div className="equation-display">
        <div className="equation-box">
          <span className="equation-label">What We Measure</span>
          <span className="equation-formula">Emotional Impact Over Time</span>
        </div>
        <div className="equation-box">
          <span className="equation-label">The Goal</span>
          <span className="equation-formula">
            Connection {'>'} Forgetting = Unforgettable
          </span>
        </div>
      </div>

      <div className="analyzer-grid">
        <div className="input-section">
          <div className="input-card">
            <h3>Build Your Song</h3>

            <div className="input-group">
              <label>Key Signature</label>
              <select
                value={profile.key}
                onChange={(e) => handleChange('key', e.target.value)}
              >
                {Object.entries(KEYS).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.name} {key === 'C#' ? '(Most Emotional)' : ''}
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
                {Math.abs(profile.tempo - 76) < 5 && '(Sweet Spot)'}
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
            <h3>Listener Settings</h3>

            <div className="input-group">
              <label>
                Number of Listens: {iterations}
                <HelpTooltip
                  title="Listens"
                  content="How many times will someone hear this song? More listens = more chances to stick."
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
                <span>1x</span>
                <span>25x</span>
                <span>50x</span>
              </div>
            </div>

            <div className="input-group">
              <label>
                Cultural Gap: {distance}
                <HelpTooltip
                  title="Cultural Gap"
                  content="How different is the listener from your target audience? 0 = perfect match, 15 = very different background/culture."
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
                <span>Perfect Match</span>
                <span>Different</span>
                <span>Very Different</span>
              </div>
            </div>

            <button className="analyze-button" onClick={handleAnalyze}>
              Analyze Song Impact
            </button>
          </div>
        </div>

        <div className="results-section">
          {analysis ? (
            <div className="analysis-results">
              {/* Summary Card */}
              <div className="result-card summary-card">
                <div className="result-header">
                  <h3>Impact Summary</h3>
                  <span
                    className="phase-badge"
                    style={{ background: analysis.custom.lifeCheck.color }}
                  >
                    {PHASE_LABELS[analysis.custom.lifeCheck.phase] || analysis.custom.lifeCheck.phase}
                  </span>
                </div>

                <div className="summary-grid">
                  <SummaryMetric
                    label="Emotional Connection"
                    value={analysis.generative.summary.generativeLove}
                    description="How deeply it connects"
                    color="#ff6b6b"
                  />
                  <SummaryMetric
                    label="First Impression"
                    value={analysis.generative.summary.initialImpact}
                    description="Initial hook strength"
                    color="#4ecdc4"
                  />
                  <SummaryMetric
                    label="Total Impact"
                    value={Math.round(analysis.custom.meaning * 100) / 100}
                    description={`After ${iterations} listens`}
                    color="#ffd93d"
                    large
                  />
                  <SummaryMetric
                    label="Stickiness Score"
                    value={analysis.custom.lifeCheck.ratio}
                    description="How well it sticks"
                    color="#6c5ce7"
                    large
                  />
                </div>
              </div>

              {/* Memorability Test Card */}
              <div className="result-card life-card">
                <h3>
                  Memorability Test
                  <HelpTooltip
                    title="Memorability"
                    content="Does the emotional connection grow faster than natural forgetting? If yes, the song becomes unforgettable."
                    position="left"
                  >
                    <InfoIcon color="#fff" size={14} />
                  </HelpTooltip>
                </h3>

                <div className="life-inequality-display">
                  <div className="inequality-term growth">
                    <span className="term-label">Connection Growth</span>
                    <span className="term-formula">
                      {analysis.custom.lifeCheck.growth}
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
                    <span className="term-label">Forgetting Rate</span>
                    <span className="term-formula">
                      {analysis.custom.lifeCheck.decay}
                    </span>
                  </div>
                </div>

                <div
                  className="life-verdict"
                  style={{ color: analysis.custom.lifeCheck.color }}
                >
                  {getFriendlyVerdict(analysis.custom.lifeCheck)}
                </div>
              </div>

              {/* Lasting Power Card */}
              <div className="result-card hope-card">
                <h3>
                  Lasting Power
                  <HelpTooltip
                    title="Lasting Power"
                    content="Will this song stand the test of time? Songs with strong emotional connection can overcome any cultural barrier with enough exposure."
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
                      ? 'Built to Last'
                      : 'May Fade Over Time'}
                  </div>
                  <p className="hope-reason">
                    {analysis.generative.hope.hasHope
                      ? `With enough plays, this song can reach anyone - even across big cultural gaps.`
                      : `This song may struggle to connect with listeners outside its core audience.`}
                  </p>
                  {analysis.generative.hope.criticalN && (
                    <p className="hope-detail">
                      Listens needed to reach distant audiences:{' '}
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
                        Longevity: {Math.round(analysis.generative.hope.hopeStrength * 100)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Earworm Card */}
              <div className="result-card earworm-card">
                <h3>Earworm Potential</h3>

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
                    <span className="stat-label">First Listen</span>
                    <span className="stat-value">
                      {analysis.generative.earworm.initialImpact}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">After 10 Plays</span>
                    <span className="stat-value">
                      {analysis.generative.earworm.meaningAfter10Listens}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Impact Growth</span>
                    <span className="stat-value">
                      {analysis.generative.earworm.meaningGrowthRatio}x
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Hooks After</span>
                    <span className="stat-value">
                      {analysis.generative.earworm.stickinessIterations} plays
                    </span>
                  </div>
                </div>

                <p className="earworm-verdict">
                  {analysis.generative.earworm.isEarworm
                    ? `This song has strong earworm potential! Listeners will find it stuck in their head after just ${analysis.generative.earworm.stickinessIterations} plays.`
                    : analysis.generative.earworm.earwormPotential > 50
                    ? `Good potential, but could be stickier. Consider boosting the emotional connection.`
                    : `This song may not stick easily. Try the tips below to make it more memorable.`}
                </p>

                {analysis.generative.earworm.tips && (
                  <ul className="earworm-tips">
                    {analysis.generative.earworm.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Felt Quality Card */}
              <div className="result-card perception-card">
                <h3>
                  Felt Quality
                  <HelpTooltip
                    title="Felt Quality"
                    content="Music with meaning 'feels' better than its technical quality. This is the emotional boost your song gets from its content."
                    position="left"
                  >
                    <InfoIcon color="#fff" size={14} />
                  </HelpTooltip>
                </h3>

                <div className="perception-comparison">
                  <div className="perception-item">
                    <span className="perception-label">Production Quality</span>
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
                    <span className="perception-label">How It Feels</span>
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
                  <span className="soul-label">Emotion Boost</span>
                  <span className="soul-value">
                    +{analysis.generative.perception.soulBonusPercent}%
                  </span>
                </div>
                <p className="perception-verdict">
                  {analysis.generative.perception.soulBonusPercent > 50
                    ? "This song punches way above its weight - meaning makes it feel incredible!"
                    : analysis.generative.perception.soulBonusPercent > 25
                    ? "Good emotional content noticeably improves how this sounds."
                    : analysis.generative.perception.soulBonusPercent > 10
                    ? "Some emotional lift, but there's room to add more meaning."
                    : "Consider adding more emotional depth to enhance the listening experience."}
                </p>
              </div>

              {/* Reach Card */}
              <div className="result-card propagation-card">
                <h3>Audience Reach</h3>

                <div className="propagation-stats">
                  <div className="prop-stat">
                    <span className="prop-label">How Far Can It Spread?</span>
                    <span className="prop-value highlight">
                      {analysis.generative.propagation.maxSustainableDistance >= 10
                        ? 'Worldwide'
                        : analysis.generative.propagation.maxSustainableDistance >= 5
                        ? 'Regional'
                        : 'Local Niche'}
                    </span>
                  </div>
                </div>

                <div className="critical-iterations">
                  <h4>Plays Needed by Audience Type</h4>
                  <div className="critical-grid">
                    {analysis.generative.propagation.criticalIterations.map(
                      (item) => (
                        <div key={item.distance} className="critical-item">
                          <span className="critical-distance">
                            {item.distance === 1 ? 'Core Fans' : item.distance === 5 ? 'Casual Listeners' : 'New Audiences'}
                          </span>
                          <span className="critical-n">
                            {item.criticalN === Infinity ? "Won't reach" : `${item.criticalN} plays`}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <p className="propagation-verdict">
                  {analysis.generative.propagation.maxSustainableDistance >= 10
                    ? "This song can cross cultural boundaries and find fans everywhere!"
                    : analysis.generative.propagation.maxSustainableDistance >= 5
                    ? "This song can grow beyond its core audience with promotion."
                    : "This song works best for a specific, dedicated audience."}
                </p>
              </div>

              {/* LJPW Radar */}
              <div className="result-card radar-card">
                <h3>Musical DNA</h3>
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
                  <span style={{ color: '#ff6b6b' }}>Love: {analysis.song.L}</span>
                  <span style={{ color: '#4ecdc4' }}>Structure: {analysis.song.J}</span>
                  <span style={{ color: '#ffd93d' }}>Energy: {analysis.song.P}</span>
                  <span style={{ color: '#6c5ce7' }}>Depth: {analysis.song.W}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="placeholder-card">
              <div className="placeholder-icon">How Sticky Is Your Song?</div>
              <p>
                Configure your song and listener settings, then click
                "Analyze" to see how memorable it will be
              </p>
              <div className="placeholder-tips">
                <h4>Tips for Memorable Songs:</h4>
                <ul>
                  <li>C# Major is the most emotionally resonant key</li>
                  <li>Gospel has the strongest emotional connection</li>
                  <li>76 BPM hits a natural sweet spot</li>
                  <li>More listens = more chances to hook listeners</li>
                  <li>Songs with high emotion can cross cultural barriers</li>
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
