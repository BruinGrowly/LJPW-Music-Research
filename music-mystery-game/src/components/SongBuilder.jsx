import { useState, useEffect } from 'react'
import './SongBuilder.css'
import { playNote, playMelody, playChord, buildChord } from '../lib/midiSynth'
import { MODES, CHORDS } from '../lib/musicTheory'
import { analyzeMelody, checkLifeInequality, calculateHope, PHI } from '../lib/generativeEngine'

function SongBuilder({ gameState, onComplete, onClose }) {
  const [melody, setMelody] = useState([])
  const [selectedMode, setSelectedMode] = useState('ionian')
  const [isPlaying, setIsPlaying] = useState(false)
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

  // Analyze melody whenever it changes
  useEffect(() => {
    if (melody.length >= 2) {
      const notes = melody.map(m => m.note)
      const result = analyzeMelody(notes)
      setAnalysis(result)
    } else {
      setAnalysis(null)
    }
  }, [melody])

  // Add note to melody
  const addNote = (note) => {
    if (melody.length >= 16) return // Max 16 notes

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

    // Play with chord accompaniment
    const chordNotes = buildChord(`${rootNote}${octave}`, 'major')
    if (chordNotes) {
      playChord(chordNotes, melody.length * 0.4, 'pad', 0.1)
    }

    await new Promise(resolve => setTimeout(resolve, 200))
    playMelody(melody, 150, 'piano', 0.5)

    setTimeout(() => setIsPlaying(false), melody.length * 400 + 500)
  }

  // Check if melody is "complete" enough and passes the equation
  const isMelodyComplete = melody.length >= 7 && melody.length <= 16
  const isMelodyUnforgettable = analysis?.lifeInequality?.phase === 'AUTOPOIETIC'
  const isMelodyStable = analysis?.lifeInequality?.phase === 'HOMEOSTATIC'
  const canComplete = isMelodyComplete && (isMelodyUnforgettable || isMelodyStable)

  // Handle completion
  const handleComplete = () => {
    if (!canComplete) return

    // Play the final melody with celebration
    playCurrentMelody()

    setTimeout(() => {
      onComplete(analysis)
    }, melody.length * 400 + 1000)
  }

  // Get feedback color based on phase
  const getPhaseColor = (phase) => {
    switch (phase) {
      case 'AUTOPOIETIC': return '#2ed573'
      case 'HOMEOSTATIC': return '#ffa502'
      case 'ENTROPIC': return '#ff6b6b'
      default: return '#ccc'
    }
  }

  return (
    <div className="song-builder-modal">
      <div className="song-builder-content">
        <button className="close-btn" onClick={onClose}>×</button>

        <h2>The Silence Breaker</h2>
        <p className="builder-intro">
          Compose the final melody. Use what you've learned about intervals,
          modes, and melodic contour to create a phrase that will overcome
          the silence and complete Edmund Ashworth's masterpiece.
        </p>

        {/* Mode selector */}
        <div className="mode-selector">
          <label>Choose your mode (emotional color):</label>
          <div className="mode-buttons">
            {Object.entries(MODES).slice(0, 4).map(([key, m]) => (
              <button
                key={key}
                className={`mode-btn ${selectedMode === key ? 'selected' : ''}`}
                onClick={() => setSelectedMode(key)}
              >
                <strong>{m.name}</strong>
                <span>{m.feeling.split(',')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Scale notes to choose from */}
        <div className="note-palette">
          <label>Build your melody (click notes to add):</label>
          <div className="scale-notes">
            {scaleNotes.map((note, i) => (
              <button
                key={i}
                className="scale-note"
                onClick={() => addNote(note)}
                disabled={melody.length >= 16}
              >
                {note.display}
              </button>
            ))}
          </div>
        </div>

        {/* Current melody display */}
        <div className="melody-display">
          <label>Your melody ({melody.length}/16 notes):</label>
          <div className="melody-notes">
            {melody.length === 0 ? (
              <span className="empty-melody">Click notes above to begin composing...</span>
            ) : (
              melody.map((note, i) => (
                <span key={i} className="melody-note">
                  {note.note.replace(/[0-9]/g, '')}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Generative Equation Analysis */}
        {analysis && analysis.valid && (
          <div className="equation-analysis">
            <h3>Melody Analysis</h3>

            {/* Memorability Score */}
            <div className="memorability-meter">
              <div className="meter-label">
                <span>Memorability</span>
                <span className="score">{analysis.memorabilityScore}%</span>
              </div>
              <div className="meter-track">
                <div
                  className="meter-fill"
                  style={{
                    width: `${analysis.memorabilityScore}%`,
                    backgroundColor: getPhaseColor(analysis.lifeInequality.phase)
                  }}
                />
              </div>
            </div>

            {/* Life Inequality Result */}
            <div
              className="life-inequality-result"
              style={{ borderColor: analysis.lifeInequality.color }}
            >
              <div className="inequality-header">
                <span className="phase-emoji">{analysis.lifeInequality.emoji}</span>
                <span className="phase-name" style={{ color: analysis.lifeInequality.color }}>
                  {analysis.lifeInequality.userPhase}
                </span>
              </div>
              <p className="verdict">{analysis.lifeInequality.verdict}</p>
              <div className="formula-display">
                <span className="growth-side">
                  Growth: L<sup>{10}</sup> = {analysis.lifeInequality.growth}
                </span>
                <span className="vs">vs</span>
                <span className="decay-side">
                  Decay: φ<sup>3</sup> = {analysis.lifeInequality.decay}
                </span>
              </div>
            </div>

            {/* LJPW Values */}
            <div className="ljpw-values">
              <div className="ljpw-item">
                <span className="ljpw-label">Emotion</span>
                <div className="ljpw-bar">
                  <div className="ljpw-fill" style={{ width: `${analysis.ljpw.L * 100}%`, backgroundColor: '#ff6b6b' }} />
                </div>
                <span className="ljpw-value">{(analysis.ljpw.L * 100).toFixed(0)}%</span>
              </div>
              <div className="ljpw-item">
                <span className="ljpw-label">Harmony</span>
                <div className="ljpw-bar">
                  <div className="ljpw-fill" style={{ width: `${analysis.ljpw.J * 100}%`, backgroundColor: '#ffa502' }} />
                </div>
                <span className="ljpw-value">{(analysis.ljpw.J * 100).toFixed(0)}%</span>
              </div>
              <div className="ljpw-item">
                <span className="ljpw-label">Rhythm</span>
                <div className="ljpw-bar">
                  <div className="ljpw-fill" style={{ width: `${analysis.ljpw.P * 100}%`, backgroundColor: '#2ed573' }} />
                </div>
                <span className="ljpw-value">{(analysis.ljpw.P * 100).toFixed(0)}%</span>
              </div>
              <div className="ljpw-item">
                <span className="ljpw-label">Character</span>
                <div className="ljpw-bar">
                  <div className="ljpw-fill" style={{ width: `${analysis.ljpw.W * 100}%`, backgroundColor: '#6b5b95' }} />
                </div>
                <span className="ljpw-value">{(analysis.ljpw.W * 100).toFixed(0)}%</span>
              </div>
            </div>

            {/* Feedback */}
            {analysis.feedback && analysis.feedback.length > 0 && (
              <div className="analysis-feedback">
                {analysis.feedback.map((fb, i) => (
                  <div key={i} className={`feedback-item feedback-${fb.type}`}>
                    <span className="feedback-icon">
                      {fb.type === 'success' ? '✓' : fb.type === 'warning' ? '!' : fb.type === 'tip' ? '💡' : 'ℹ'}
                    </span>
                    {fb.message}
                  </div>
                ))}
              </div>
            )}

            {/* Hope indicator */}
            {analysis.hope && (
              <div className={`hope-indicator ${analysis.hope.hasHope ? 'has-hope' : 'no-hope'}`}>
                {analysis.hope.hasHope ? (
                  <>
                    <span className="hope-icon">✨</span>
                    <span>{analysis.hope.detail}</span>
                  </>
                ) : (
                  <>
                    <span className="hope-icon">⚠</span>
                    <span>{analysis.hope.message}</span>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Controls */}
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
            {isPlaying ? 'Playing...' : 'Play Melody'}
          </button>
        </div>

        {/* Completion */}
        <div className="completion-section">
          {canComplete ? (
            <>
              <p className="ready-message">
                {isMelodyUnforgettable
                  ? '✨ Your melody is UNFORGETTABLE! It will persist through time and break the silence forever.'
                  : '⚖️ Your melody is STABLE. It will hold the silence at bay.'}
              </p>
              <button
                className={`complete-btn ${isMelodyUnforgettable ? 'unforgettable' : ''}`}
                onClick={handleComplete}
                disabled={isPlaying}
              >
                Break the Silence
              </button>
            </>
          ) : (
            <p className="progress-message">
              {melody.length < 7
                ? `Add ${7 - melody.length} more notes to complete your melody.`
                : melody.length >= 7 && analysis?.lifeInequality?.phase === 'ENTROPIC'
                  ? 'Your melody is fading... Try adding warmer intervals (major 3rds, 6ths) to increase its memorability.'
                  : 'Keep composing until your melody can overcome the silence!'}
            </p>
          )}
        </div>

        {/* Tips */}
        <div className="builder-tips">
          <h4>Composition Tips from the Generative Equation:</h4>
          <ul>
            <li><strong>Major 3rds & 6ths</strong> have the highest emotional connection (L value)</li>
            <li><strong>Perfect 5ths & 4ths</strong> create stability and consonance</li>
            <li><strong>Repetition</strong> increases iterations (n), making melodies grow faster</li>
            <li>Your melody must <em>grow faster than it fades</em> to be unforgettable</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SongBuilder
