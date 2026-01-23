import './SilenceMeter.css'
import { calculateSilence, PHI } from '../lib/generativeEngine'

function SilenceMeter({ lessonsComplete, totalLessons }) {
  // Calculate silence using the Generative Equation
  const silenceData = calculateSilence(lessonsComplete, totalLessons)
  const level = silenceData.level

  // Color transitions based on the Life Inequality
  // When growth > decay (ratio < 1), color shifts to hope
  const hue = silenceData.ratio > 1 ? 0 : 180 - Math.min(180, silenceData.ratio * 180)
  const saturation = 70
  const lightness = 30 + (100 - level) * 0.3
  const silenceColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`

  // Phase description based on the equation
  const getPhaseDescription = () => {
    if (silenceData.isBroken) return 'The silence is broken!'
    if (silenceData.ratio > 5) return 'The silence is overwhelming...'
    if (silenceData.ratio > 2) return 'The silence presses heavily...'
    if (silenceData.ratio > 1) return 'Music begins to stir...'
    if (silenceData.ratio > 0.5) return 'The manor awakens...'
    return 'Sound returns to these halls...'
  }

  return (
    <div className="silence-meter">
      <div className="meter-header">
        <span className="meter-label">The Silence</span>
        <span className="meter-value">{level}%</span>
      </div>

      <div className="meter-bar">
        <div
          className="meter-fill"
          style={{
            width: `${level}%`,
            background: `linear-gradient(90deg, ${silenceColor} 0%, #1a1a2e 100%)`,
          }}
        />
        <div className="meter-markers">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="marker" />
          ))}
        </div>
      </div>

      {/* Equation visualization */}
      <div className="equation-visual">
        <div className="equation-side growth">
          <span className="eq-label">Growth</span>
          <span className="eq-value">L<sup>{lessonsComplete}</sup> = {silenceData.growth}</span>
        </div>
        <div className="equation-vs">
          <span className={silenceData.ratio <= 1 ? 'winning' : 'losing'}>
            {silenceData.ratio <= 1 ? '>' : '<'}
          </span>
        </div>
        <div className="equation-side decay">
          <span className="eq-label">Decay</span>
          <span className="eq-value">φ<sup>{totalLessons - lessonsComplete}</sup> = {silenceData.decay}</span>
        </div>
      </div>

      <div className="meter-footer">
        <span className="lessons-count">
          {lessonsComplete}/{totalLessons} concepts learned
        </span>
        <span className="meter-hint">
          {getPhaseDescription()}
        </span>
      </div>
    </div>
  )
}

export default SilenceMeter
