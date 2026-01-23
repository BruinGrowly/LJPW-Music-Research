import { useState } from 'react'
import './Lesson.css'
import { INTERVALS, MODES, CHORDS } from '../lib/musicTheory'
import { playNote, playInterval, playScale, playChord, buildChord } from '../lib/midiSynth'

function Lesson({ lesson, onComplete, onClose }) {
  const [showInteractive, setShowInteractive] = useState(false)

  return (
    <div className="lesson-modal">
      <div className="lesson-content">
        <button className="close-btn" onClick={onClose}>x</button>

        <h2 className="lesson-title">{lesson.title}</h2>

        <div className="lesson-text">
          {lesson.content.trim().split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph.trim()}</p>
          ))}
        </div>

        {/* Interactive section */}
        <div className="interactive-section">
          <button
            className="try-btn"
            onClick={() => setShowInteractive(!showInteractive)}
          >
            {showInteractive ? 'Hide Examples' : 'Try It Yourself'}
          </button>

          {showInteractive && (
            <div className="interactive-content">
              {lesson.interactive === 'interval_explorer' && <IntervalExplorer />}
              {lesson.interactive === 'mode_explorer' && <ModeExplorer />}
              {lesson.interactive === 'chord_builder' && <ChordExplorer />}
              {lesson.interactive === 'melody_builder' && <MelodyExplorer />}
              {lesson.interactive === 'piano' && <SimplePiano />}
            </div>
          )}
        </div>

        <button className="complete-btn" onClick={onComplete}>
          I Understand - Continue
        </button>
      </div>
    </div>
  )
}

// =============================================================================
// INTERVAL EXPLORER
// =============================================================================

function IntervalExplorer() {
  const [selectedInterval, setSelectedInterval] = useState(null)

  const intervals = Object.entries(INTERVALS).map(([key, data]) => ({
    key,
    ...data,
  }))

  const handlePlay = (interval, sequential = true) => {
    setSelectedInterval(interval.key)
    playInterval('C4', interval.semitones, sequential)
  }

  return (
    <div className="interval-explorer">
      <p className="instruction">Click an interval to hear it. First melodically (one after another), then harmonically (both together).</p>

      <div className="interval-grid">
        {intervals.map((interval) => (
          <div
            key={interval.key}
            className={`interval-card ${selectedInterval === interval.key ? 'selected' : ''}`}
          >
            <h4>{interval.name}</h4>
            <span className="semitones">{interval.semitones} semitones</span>
            <p className="feeling">{interval.feeling}</p>
            <div className="interval-buttons">
              <button onClick={() => handlePlay(interval, true)}>
                Melodic
              </button>
              <button onClick={() => handlePlay(interval, false)}>
                Harmonic
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// MODE EXPLORER
// =============================================================================

function ModeExplorer() {
  const [selectedMode, setSelectedMode] = useState(null)

  const modes = Object.entries(MODES).map(([key, data]) => ({
    key,
    ...data,
  }))

  const handlePlay = (mode) => {
    setSelectedMode(mode.key)
    playScale('C4', mode.pattern)
  }

  return (
    <div className="mode-explorer">
      <p className="instruction">Click a mode to hear its scale. Notice how each has a different emotional color.</p>

      <div className="mode-grid">
        {modes.map((mode) => (
          <div
            key={mode.key}
            className={`mode-card ${selectedMode === mode.key ? 'selected' : ''}`}
            onClick={() => handlePlay(mode)}
          >
            <h4>{mode.name}</h4>
            <span className="common-name">{mode.commonName}</span>
            <p className="feeling">{mode.feeling}</p>
            <p className="character"><em>"{mode.character}"</em></p>
          </div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// CHORD EXPLORER
// =============================================================================

function ChordExplorer() {
  const [selectedChord, setSelectedChord] = useState(null)
  const [rootNote, setRootNote] = useState('C4')

  const chords = Object.entries(CHORDS).map(([key, data]) => ({
    key,
    ...data,
  }))

  const handlePlay = (chord) => {
    setSelectedChord(chord.key)
    const notes = buildChord(rootNote, chord.key)
    if (notes) {
      playChord(notes, 1.5, 'piano', 0.3)
    }
  }

  return (
    <div className="chord-explorer">
      <p className="instruction">Click a chord type to hear it. Each chord has its own emotional quality.</p>

      <div className="root-selector">
        <label>Root Note:</label>
        <select value={rootNote} onChange={(e) => setRootNote(e.target.value)}>
          {['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'].map(note => (
            <option key={note} value={note}>{note}</option>
          ))}
        </select>
      </div>

      <div className="chord-grid">
        {chords.map((chord) => (
          <div
            key={chord.key}
            className={`chord-card ${selectedChord === chord.key ? 'selected' : ''}`}
            onClick={() => handlePlay(chord)}
          >
            <h4>{chord.name}</h4>
            <span className="symbol">{chord.symbol}</span>
            <p className="feeling">{chord.feeling}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// MELODY EXPLORER
// =============================================================================

function MelodyExplorer() {
  const [playing, setPlaying] = useState(false)

  const melodyExamples = [
    {
      name: 'Stepwise Motion',
      description: 'Moving by small intervals (2nds)',
      notes: [
        { note: 'C4', duration: 1 },
        { note: 'D4', duration: 1 },
        { note: 'E4', duration: 1 },
        { note: 'F4', duration: 1 },
        { note: 'E4', duration: 1 },
        { note: 'D4', duration: 1 },
        { note: 'C4', duration: 2 },
      ],
    },
    {
      name: 'With Leaps',
      description: 'Adding dramatic jumps',
      notes: [
        { note: 'C4', duration: 1 },
        { note: 'E4', duration: 1 },
        { note: 'G4', duration: 1 },
        { note: 'C5', duration: 2 },
        { note: 'G4', duration: 1 },
        { note: 'E4', duration: 1 },
        { note: 'C4', duration: 2 },
      ],
    },
    {
      name: 'Repetition & Sequence',
      description: 'Patterns that build',
      notes: [
        { note: 'C4', duration: 0.5 },
        { note: 'D4', duration: 0.5 },
        { note: 'E4', duration: 1 },
        { note: 'D4', duration: 0.5 },
        { note: 'E4', duration: 0.5 },
        { note: 'F4', duration: 1 },
        { note: 'E4', duration: 0.5 },
        { note: 'F4', duration: 0.5 },
        { note: 'G4', duration: 2 },
      ],
    },
    {
      name: 'Question & Answer',
      description: 'Tension and resolution',
      notes: [
        { note: 'C4', duration: 1 },
        { note: 'E4', duration: 1 },
        { note: 'G4', duration: 1 },
        { note: 'A4', duration: 1 },
        { note: 'G4', duration: 1 },
        { note: 'F4', duration: 1 },
        { note: 'E4', duration: 1 },
        { note: 'C4', duration: 2 },
      ],
    },
  ]

  const playMelody = async (melody) => {
    if (playing) return
    setPlaying(true)

    const tempo = 120
    const beatDuration = 60 / tempo

    for (const { note, duration } of melody.notes) {
      playNote(note, duration * beatDuration * 0.9, 'piano', 0.4)
      await new Promise(resolve => setTimeout(resolve, duration * beatDuration * 1000))
    }

    setPlaying(false)
  }

  return (
    <div className="melody-explorer">
      <p className="instruction">Click each example to hear different melodic techniques.</p>

      <div className="melody-grid">
        {melodyExamples.map((melody, i) => (
          <div
            key={i}
            className={`melody-card ${playing ? 'disabled' : ''}`}
            onClick={() => playMelody(melody)}
          >
            <h4>{melody.name}</h4>
            <p>{melody.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// SIMPLE PIANO
// =============================================================================

function SimplePiano() {
  const whiteKeys = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']
  const blackKeys = [
    { note: 'C#4', position: 1 },
    { note: 'D#4', position: 2 },
    { note: 'F#4', position: 4 },
    { note: 'G#4', position: 5 },
    { note: 'A#4', position: 6 },
  ]

  return (
    <div className="simple-piano">
      <p className="instruction">Click the keys to play notes.</p>

      <div className="piano-keys">
        {whiteKeys.map((note, i) => (
          <div
            key={note}
            className="white-key"
            onClick={() => playNote(note, 0.5)}
          >
            <span className="key-label">{note.replace('4', '').replace('5', '')}</span>
          </div>
        ))}
        {blackKeys.map(({ note, position }) => (
          <div
            key={note}
            className="black-key"
            style={{ left: `${position * 12.5 + 9}%` }}
            onClick={() => playNote(note, 0.5)}
          >
          </div>
        ))}
      </div>
    </div>
  )
}

export default Lesson
