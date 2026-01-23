import { useState, useEffect } from 'react'
import './Piano.css'
import { playNote, playChord, buildChord } from '../lib/midiSynth'
import { CHORDS } from '../lib/musicTheory'

function Piano({ onClose }) {
  const [activeKeys, setActiveKeys] = useState(new Set())
  const [selectedChord, setSelectedChord] = useState(null)

  // Two octaves of keys
  const octaves = [3, 4]
  const whiteKeyNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  const blackKeyNotes = ['C#', 'D#', null, 'F#', 'G#', 'A#', null]

  // Generate all keys
  const allWhiteKeys = []
  const allBlackKeys = []

  octaves.forEach(octave => {
    whiteKeyNotes.forEach((note, i) => {
      allWhiteKeys.push({ note: `${note}${octave}`, index: allWhiteKeys.length })
    })
    blackKeyNotes.forEach((note, i) => {
      if (note) {
        allBlackKeys.push({
          note: `${note}${octave}`,
          position: allWhiteKeys.length - whiteKeyNotes.length + i,
        })
      }
    })
  })

  // Handle key press
  const handleKeyPress = (note) => {
    playNote(note, 0.6, 'piano', 0.4)
    setActiveKeys(prev => new Set([...prev, note]))
    setTimeout(() => {
      setActiveKeys(prev => {
        const next = new Set(prev)
        next.delete(note)
        return next
      })
    }, 300)
  }

  // Handle chord play
  const handleChordPlay = (chordType) => {
    setSelectedChord(chordType)
    const notes = buildChord('C4', chordType)
    if (notes) {
      playChord(notes, 1.5, 'piano', 0.3)
      notes.forEach(note => {
        setActiveKeys(prev => new Set([...prev, note]))
      })
      setTimeout(() => {
        setActiveKeys(new Set())
      }, 500)
    }
  }

  // Keyboard support
  useEffect(() => {
    const keyMap = {
      'a': 'C4', 'w': 'C#4', 's': 'D4', 'e': 'D#4', 'd': 'E4',
      'f': 'F4', 't': 'F#4', 'g': 'G4', 'y': 'G#4', 'h': 'A4',
      'u': 'A#4', 'j': 'B4', 'k': 'C5',
    }

    const handleKeyDown = (e) => {
      const note = keyMap[e.key.toLowerCase()]
      if (note && !e.repeat) {
        handleKeyPress(note)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="piano-modal">
      <div className="piano-content">
        <button className="close-btn" onClick={onClose}>x</button>

        <h2>The Piano</h2>
        <p className="piano-instruction">
          Click the keys or use your keyboard (A-K for white keys, W,E,T,Y,U for black keys)
        </p>

        <div className="piano-keyboard">
          <div className="white-keys">
            {allWhiteKeys.map(({ note, index }) => (
              <div
                key={note}
                className={`white-key ${activeKeys.has(note) ? 'active' : ''}`}
                onClick={() => handleKeyPress(note)}
              >
                <span className="key-label">{note}</span>
              </div>
            ))}
          </div>
          <div className="black-keys">
            {allBlackKeys.map(({ note, position }) => (
              <div
                key={note}
                className={`black-key ${activeKeys.has(note) ? 'active' : ''}`}
                style={{ left: `calc(${position} * (100% / ${allWhiteKeys.length}) + (100% / ${allWhiteKeys.length} / 2) - 15px)` }}
                onClick={() => handleKeyPress(note)}
              >
              </div>
            ))}
          </div>
        </div>

        <div className="chord-buttons">
          <h3>Quick Chords (from C):</h3>
          <div className="chord-grid">
            {Object.entries(CHORDS).slice(0, 6).map(([key, chord]) => (
              <button
                key={key}
                className={`chord-btn ${selectedChord === key ? 'active' : ''}`}
                onClick={() => handleChordPlay(key)}
              >
                {chord.name}
              </button>
            ))}
          </div>
        </div>

        <p className="piano-hint">
          The silence thins when music plays. Every note you strike pushes back
          the oppressive quiet of Ashworth Manor.
        </p>
      </div>
    </div>
  )
}

export default Piano
