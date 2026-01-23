import { useState, useEffect, useCallback } from 'react'
import './SongBuilder.css'
import { playNote, playMelody, playChord, buildChord } from '../lib/midiSynth'
import { MODES } from '../lib/musicTheory'
import { analyzeMelody } from '../lib/generativeEngine'

function SongBuilder({ gameState, onComplete, onClose }) {
  const [melody, setMelody] = useState([])
  const [selectedMode, setSelectedMode] = useState('ionian')
  const [isPlaying, setIsPlaying] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [analysis, setAnalysis] = useState(null)

  // Available notes based on selected mode
  const mode = MODES[selectedMode]
  const rootNote = 'C'
  const octave = 4

  const scaleNotes = mode.pattern.map(semitone => {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    const noteIndex = semitone % 12
    const noteOctave = octave + Math.floor(semitone / 12)
    return {
      name: `${noteNames[noteIndex]}${noteOctave}`,
      display: noteNames[noteIndex],
      semitone,
    }
  })

  // Analyze melody whenever it changes (quietly in background)
  useEffect(() => {
    if (melody.length >= 2) {
      const notes = melody.map(m => m.note)
      const result = analyzeMelody(notes)
      setAnalysis(result)
    } else {
      setAnalysis(null)
    }
  }, [melody])

  // Subtle hover sound - very quiet preview
  const handleNoteHover = useCallback((note) => {
    if (!isPlaying) {
      playNote(note.name, 0.15, 'piano', 0.08) // Very quiet, short
    }
  }, [isPlaying])

  // Add note to melody
  const addNote = (note) => {
    if (melody.length >= 16) return

    playNote(note.name, 0.4, 'piano', 0.4)
    setMelody(prev => [...prev, { note: note.name, duration: 1 }])
  }

  // Remove last note
  const removeLastNote = () => {
    setMelody(prev => prev.slice(0, -1))
  }

  // Clear melody
  const clearMelody = () => {
    setMelody([])
    setAnalysis(null)
  }

  // Play the melody
  const playCurrentMelody = async () => {
    if (melody.length === 0 || isPlaying) return

    setIsPlaying(true)

    // Subtle chord accompaniment
    const chordNotes = buildChord(`${rootNote}${octave}`, 'major')
    if (chordNotes) {
      playChord(chordNotes, melody.length * 0.4, 'pad', 0.08)
    }

    await new Promise(resolve => setTimeout(resolve, 200))
    playMelody(melody, 150, 'piano', 0.5)

    setTimeout(() => setIsPlaying(false), melody.length * 400 + 500)
  }

  // Check completion - just needs 7+ notes and not "entropic"
  const isMelodyComplete = melody.length >= 7 && melody.length <= 16
  const isEntropic = analysis?.lifeInequality?.phase === 'ENTROPIC'
  const canComplete = isMelodyComplete && !isEntropic

  // Handle completion
  const handleComplete = () => {
    if (!canComplete) return
    playCurrentMelody()
    setTimeout(() => {
      onComplete(analysis)
    }, melody.length * 400 + 1000)
  }

  // Simple visual indicator of melody "health" - just a color
  const getMelodyColor = () => {
    if (!analysis) return 'var(--text-muted)'
    if (analysis.lifeInequality?.phase === 'AUTOPOIETIC') return 'var(--accent-hope)'
    if (analysis.lifeInequality?.phase === 'HOMEOSTATIC') return 'var(--accent-gold)'
    return 'var(--accent-warning)'
  }

  return (
    <div className="song-builder-modal">
      <div className="song-builder-content">
        <button className="close-btn" onClick={onClose}>×</button>

        <h2>The Silence Breaker</h2>
        <p className="builder-intro">
          Compose the final melody. Hover over notes to preview them.
        </p>

        {/* Mode selector - compact */}
        <div className="mode-selector">
          <div className="mode-chips">
            {Object.entries(MODES).slice(0, 4).map(([key, m]) => (
              <button
                key={key}
                className={`mode-chip ${selectedMode === key ? 'selected' : ''}`}
                onClick={() => setSelectedMode(key)}
                title={m.feeling}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        {/* Note palette - clean grid */}
        <div className="note-palette">
          <div className="scale-notes">
            {scaleNotes.map((note, i) => (
              <button
                key={i}
                className="scale-note"
                onClick={() => addNote(note)}
                onMouseEnter={() => handleNoteHover(note)}
                disabled={melody.length >= 16}
              >
                {note.display}
              </button>
            ))}
          </div>
        </div>

        {/* Melody display - visual with subtle color indicator */}
        <div className="melody-display">
          <div className="melody-header">
            <span className="note-count" style={{ color: getMelodyColor() }}>
              {melody.length}/16
            </span>
          </div>
          <div className="melody-notes">
            {melody.length === 0 ? (
              <span className="empty-melody">Hover to preview, click to add...</span>
            ) : (
              melody.map((note, i) => (
                <span
                  key={i}
                  className="melody-note"
                  style={{
                    animationDelay: `${i * 0.05}s`,
                    borderColor: getMelodyColor()
                  }}
                >
                  {note.note.replace(/[0-9]/g, '')}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Controls - minimal */}
        <div className="builder-controls">
          <button onClick={removeLastNote} disabled={melody.length === 0}>
            Undo
          </button>
          <button onClick={clearMelody} disabled={melody.length === 0}>
            Clear
          </button>
          <button
            onClick={playCurrentMelody}
            disabled={melody.length === 0 || isPlaying}
            className="play-btn"
          >
            {isPlaying ? '...' : '▶ Play'}
          </button>
        </div>

        {/* Completion section */}
        <div className="completion-section">
          {canComplete ? (
            <button
              className="complete-btn"
              onClick={handleComplete}
              disabled={isPlaying}
            >
              Break the Silence
            </button>
          ) : (
            <p className="progress-hint">
              {melody.length < 7
                ? `${7 - melody.length} more notes needed`
                : isEntropic
                  ? 'Add warmer intervals...'
                  : ''}
            </p>
          )}
        </div>

        {/* Analysis toggle - small, optional */}
        {analysis && analysis.valid && (
          <div className="analysis-section">
            <button
              className="analysis-toggle"
              onClick={() => setShowAnalysis(!showAnalysis)}
            >
              {showAnalysis ? '− Hide Analysis' : '+ Show Analysis'}
            </button>

            {showAnalysis && (
              <div className="analysis-panel">
                <div className="analysis-row">
                  <span className="analysis-label">Memorability</span>
                  <div className="mini-meter">
                    <div
                      className="mini-fill"
                      style={{
                        width: `${analysis.memorabilityScore}%`,
                        backgroundColor: getMelodyColor()
                      }}
                    />
                  </div>
                  <span className="analysis-value">{analysis.memorabilityScore}%</span>
                </div>

                <div className="analysis-row">
                  <span className="analysis-label">Status</span>
                  <span
                    className="analysis-status"
                    style={{ color: analysis.lifeInequality?.color }}
                  >
                    {analysis.lifeInequality?.userPhase}
                  </span>
                </div>

                <div className="analysis-formula">
                  <span>L<sup>{10}</sup>={analysis.lifeInequality?.growth}</span>
                  <span className="vs">{analysis.lifeInequality?.phase === 'AUTOPOIETIC' ? '>' : analysis.lifeInequality?.phase === 'HOMEOSTATIC' ? '≈' : '<'}</span>
                  <span>φ<sup>3</sup>={analysis.lifeInequality?.decay}</span>
                </div>

                {analysis.feedback && analysis.feedback.length > 0 && (
                  <div className="analysis-tips">
                    {analysis.feedback.slice(0, 2).map((fb, i) => (
                      <p key={i} className={`tip tip-${fb.type}`}>{fb.message}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SongBuilder
