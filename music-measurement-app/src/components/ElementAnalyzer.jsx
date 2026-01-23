import { useState, useEffect } from 'react'
import './ElementAnalyzer.css'
import RadarChart from './RadarChart'
import HarmonyGauge from './HarmonyGauge'
import HelpTooltip, { InfoIcon } from './HelpTooltip'
import {
  analyzeInterval,
  analyzeChord,
  analyzeMode,
} from '../lib/ljpwEngine'
import { INTERVALS, CHORDS, MODES, PHASE_LABELS } from '../lib/ljpwConstants'
import {
  DIMENSION_EXPLANATIONS,
  METRIC_EXPLANATIONS,
  INTERVAL_INSIGHTS,
  CHORD_INSIGHTS,
  MODE_INSIGHTS,
} from '../lib/explanationData'
import { exportAsJSON, exportAsCSV, formatAnalysisForExport } from '../lib/exportUtils'

const STORAGE_KEY = 'ljpw-element-analyzer'

function ElementAnalyzer() {
  const [elementType, setElementType] = useState(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved).elementType || 'interval'
    }
    return 'interval'
  })
  const [selectedElement, setSelectedElement] = useState(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved).selectedElement || 'major_3rd'
    }
    return 'major_3rd'
  })
  const [analysis, setAnalysis] = useState(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved).analysis || null
    }
    return null
  })

  // Save to session storage when state changes
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      elementType,
      selectedElement,
      analysis
    }))
  }, [elementType, selectedElement, analysis])

  const handleAnalyze = () => {
    let result
    switch (elementType) {
      case 'interval':
        result = analyzeInterval(selectedElement)
        break
      case 'chord':
        result = analyzeChord(selectedElement)
        break
      case 'mode':
        result = analyzeMode(selectedElement)
        break
      default:
        result = null
    }
    setAnalysis(result)
  }

  const getOptions = () => {
    switch (elementType) {
      case 'interval':
        return Object.entries(INTERVALS).map(([key, val]) => ({
          key,
          label: `${val.name} (${val.semitones} semitones)`,
        }))
      case 'chord':
        return Object.entries(CHORDS).map(([key, val]) => ({
          key,
          label: val.name,
        }))
      case 'mode':
        return Object.entries(MODES).map(([key, val]) => ({
          key,
          label: `${val.name}`,
        }))
      default:
        return []
    }
  }

  // Get insight for the selected element
  const getInsight = () => {
    switch (elementType) {
      case 'interval':
        return INTERVAL_INSIGHTS[selectedElement]
      case 'chord':
        return CHORD_INSIGHTS[selectedElement]
      case 'mode':
        return MODE_INSIGHTS[selectedElement]
      default:
        return null
    }
  }

  // Set default selection when type changes
  const handleTypeChange = (type) => {
    setElementType(type)
    setAnalysis(null)
    switch (type) {
      case 'interval':
        setSelectedElement('major_3rd')
        break
      case 'chord':
        setSelectedElement('major')
        break
      case 'mode':
        setSelectedElement('ionian')
        break
    }
  }

  const handleExportJSON = () => {
    if (analysis) {
      const data = {
        exportedAt: new Date().toISOString(),
        appVersion: 'LJPW V8.5',
        elementType,
        elementName: analysis.name,
        dimensions: { love: analysis.L, justice: analysis.J, power: analysis.P, wisdom: analysis.W },
        metrics: { harmonyIndex: analysis.H, semanticVoltage: analysis.V },
        dominant: analysis.dominant?.name,
        phase: analysis.phase?.phase,
      }
      exportAsJSON(data, `${elementType}-analysis`)
    }
  }

  const handleExportCSV = () => {
    if (analysis) {
      const data = {
        exportedAt: new Date().toISOString(),
        appVersion: 'LJPW V8.5',
        elementType,
        elementName: analysis.name,
        love: analysis.L,
        justice: analysis.J,
        power: analysis.P,
        wisdom: analysis.W,
        harmonyIndex: analysis.H,
        semanticVoltage: analysis.V,
        dominant: analysis.dominant?.name,
        phase: analysis.phase?.phase,
      }
      exportAsCSV(data, `${elementType}-analysis`)
    }
  }

  const insight = getInsight()

  return (
    <div className="element-analyzer">
      <div className="analyzer-header">
        <h2>Musical Element Analyzer</h2>
        <p>Select a musical element to see its semantic profile and learn what it means</p>
      </div>

      <div className="analyzer-controls">
        <div className="control-group">
          <label>
            Element Type
            <HelpTooltip
              title="Element Types"
              content="Intervals: Distance between two notes
Chords: Multiple notes played together
Modes: Scales that define the tonal character"
              position="right"
            >
              <InfoIcon color="#6c5ce7" size={14} />
            </HelpTooltip>
          </label>
          <div className="type-buttons">
            <button
              className={elementType === 'interval' ? 'active' : ''}
              onClick={() => handleTypeChange('interval')}
            >
              Intervals
            </button>
            <button
              className={elementType === 'chord' ? 'active' : ''}
              onClick={() => handleTypeChange('chord')}
            >
              Chords
            </button>
            <button
              className={elementType === 'mode' ? 'active' : ''}
              onClick={() => handleTypeChange('mode')}
            >
              Modes
            </button>
          </div>
        </div>

        <div className="control-group">
          <label>Select {elementType}</label>
          <select
            value={selectedElement}
            onChange={(e) => setSelectedElement(e.target.value)}
          >
            {getOptions().map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <button className="analyze-button" onClick={handleAnalyze}>
          Analyze
        </button>
      </div>

      {/* Insight Preview */}
      {insight && (
        <div className="insight-preview">
          <div className="insight-summary">{insight.summary}</div>
        </div>
      )}

      {analysis && (
        <div className="analysis-results">
          <div className="result-header">
            <h3>{analysis.name}</h3>
            <span
              className="phase-badge"
              style={{ background: analysis.phase.color }}
            >
              {analysis.phase.emoji} {PHASE_LABELS[analysis.phase.phase] || analysis.phase.phase}
            </span>
          </div>

          <div className="export-actions">
            <button
              className="export-btn"
              onClick={handleExportJSON}
              aria-label="Export analysis as JSON"
            >
              <span aria-hidden="true">Export JSON</span>
            </button>
            <button
              className="export-btn"
              onClick={handleExportCSV}
              aria-label="Export analysis as CSV"
            >
              <span aria-hidden="true">Export CSV</span>
            </button>
          </div>

          <div className="result-grid">
            <div className="chart-section">
              <RadarChart
                L={analysis.L}
                J={analysis.J}
                P={analysis.P}
                W={analysis.W}
                size={220}
              />
            </div>

            <div className="metrics-section">
              <div className="dimension-bars">
                <DimensionBar
                  label="Love"
                  dim="L"
                  value={analysis.L}
                  color="#ff6b6b"
                />
                <DimensionBar
                  label="Justice"
                  dim="J"
                  value={analysis.J}
                  color="#4ecdc4"
                />
                <DimensionBar
                  label="Power"
                  dim="P"
                  value={analysis.P}
                  color="#ffd93d"
                />
                <DimensionBar
                  label="Wisdom"
                  dim="W"
                  value={analysis.W}
                  color="#6c5ce7"
                />
              </div>

              <HarmonyGauge
                value={analysis.H}
                showVoltage={true}
                voltage={analysis.V}
              />

              <div className="dominant-section">
                <span className="dominant-label">
                  Dominant Dimension:
                  <HelpTooltip
                    title="What's the Dominant Dimension?"
                    content="The highest-valued dimension determines the 'character' of this element. A Love-dominant element creates emotional connection; Power-dominant brings energy."
                    position="top"
                  >
                    <InfoIcon color="#6c5ce7" size={14} />
                  </HelpTooltip>
                </span>
                <span
                  className="dominant-value"
                  style={{ color: analysis.dominant.color }}
                >
                  {analysis.dominant.name}
                </span>
              </div>
            </div>
          </div>

          <div className="phase-description">
            {analysis.phase.description}
          </div>

          {/* What This Means For Your Music */}
          <div className="usage-guide">
            <h4>🎯 What This Means For Your Music</h4>

            {insight ? (
              <div className="insight-content">
                <p className="insight-main">{insight.insight}</p>
                <div className="insight-uses">
                  <strong>Best Uses:</strong> {insight.uses}
                </div>
              </div>
            ) : (
              <div className="insight-content">
                <p>
                  {analysis.dominant.name === 'Love' &&
                    'This element creates strong emotional connection. Use it for memorable melodies and hooks.'}
                  {analysis.dominant.name === 'Justice' &&
                    'This element provides stability and structure. Use it for foundation and harmonic clarity.'}
                  {analysis.dominant.name === 'Power' &&
                    'This element brings energy and drive. Use it for dynamic, exciting passages.'}
                  {analysis.dominant.name === 'Wisdom' &&
                    'This element adds depth and complexity. Use it for sophisticated, interesting moments.'}
                </p>
              </div>
            )}

            {/* Earworm Indicator */}
            <div className="earworm-indicator">
              <span className="earworm-label">Earworm Potential:</span>
              <EarwormRating L={analysis.L} H={analysis.H} V={analysis.V} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DimensionBar({ label, dim, value, color }) {
  const explanation = DIMENSION_EXPLANATIONS[dim]

  return (
    <div className="dimension-bar">
      <div className="bar-label">
        <span>
          {label}
          <HelpTooltip
            title={explanation.name}
            content={explanation.shortDesc + '\n\n' + explanation.whatItMeans.substring(0, 200) + '...'}
            position="right"
          >
            <InfoIcon color={color} size={12} />
          </HelpTooltip>
        </span>
        <span style={{ color }}>{value.toFixed(2)}</span>
      </div>
      <div className="bar-track">
        <div
          className="bar-fill"
          style={{
            width: `${value * 100}%`,
            background: color,
          }}
        />
        {/* Threshold marker for Love */}
        {dim === 'L' && (
          <div className="threshold-marker" style={{ left: '70%' }} title="Earworm threshold (0.7)" />
        )}
      </div>
    </div>
  )
}

function EarwormRating({ L, H, V }) {
  // Calculate earworm potential
  let rating = 0
  let label = ''
  let className = ''

  if (L >= 0.7 && H >= 0.6) {
    if (V > 1.0) {
      rating = 5
      label = '🌟 Extremely High'
      className = 'excellent'
    } else if (V > 0.8) {
      rating = 4
      label = '✨ High'
      className = 'high'
    } else {
      rating = 3
      label = '👍 Good'
      className = 'good'
    }
  } else if (L >= 0.6 || H >= 0.5) {
    rating = 2
    label = '😐 Moderate'
    className = 'moderate'
  } else {
    rating = 1
    label = '🔇 Low'
    className = 'low'
  }

  return (
    <div className={`earworm-rating ${className}`}>
      <span className="rating-label">{label}</span>
      <HelpTooltip
        title="Earworm Potential"
        content={`Love (L) = ${L.toFixed(2)} ${L >= 0.7 ? '✓' : '✗ needs ≥0.7'}
Harmony (H) = ${H.toFixed(2)} ${H >= 0.6 ? '✓' : '✗ needs ≥0.6'}
Voltage (V) = ${V.toFixed(2)}

${L >= 0.7 && H >= 0.6
            ? 'This element has earworm potential!'
            : 'Increase Love and Harmony for earworm potential.'}`}
        position="left"
      >
        <InfoIcon color="#6c5ce7" size={14} />
      </HelpTooltip>
    </div>
  )
}

export default ElementAnalyzer
