/**
 * MIDI Synthesizer - Evocative of 90s LucasArts Adventure Games
 *
 * Creates that nostalgic FM synthesis / wavetable sound using Web Audio API.
 * Think Monkey Island, Indiana Jones and the Fate of Atlantis, Day of the Tentacle.
 */

let audioContext = null
let masterGain = null
let reverbNode = null
let initialized = false

// Note frequencies (A4 = 440Hz)
const NOTE_FREQUENCIES = {}
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

// Pre-calculate all note frequencies
for (let octave = 0; octave <= 8; octave++) {
  for (let i = 0; i < 12; i++) {
    const noteName = `${NOTE_NAMES[i]}${octave}`
    const semitones = (octave - 4) * 12 + (i - 9) // A4 is reference
    NOTE_FREQUENCIES[noteName] = 440 * Math.pow(2, semitones / 12)
  }
}

/**
 * Initialize the audio context (must be called after user interaction)
 */
export function initAudio() {
  if (initialized) return true

  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()

    // Master gain
    masterGain = audioContext.createGain()
    masterGain.gain.value = 0.3

    // Create reverb for that atmospheric sound
    reverbNode = createReverb()

    // Connect: source -> reverb -> master -> destination
    reverbNode.connect(masterGain)
    masterGain.connect(audioContext.destination)

    initialized = true
    return true
  } catch (e) {
    console.error('Failed to initialize audio:', e)
    return false
  }
}

/**
 * Create a simple convolution reverb for atmosphere
 */
function createReverb() {
  const convolver = audioContext.createConvolver()

  // Create impulse response for reverb (simulates a large hall)
  const sampleRate = audioContext.sampleRate
  const length = sampleRate * 2 // 2 seconds reverb tail
  const impulse = audioContext.createBuffer(2, length, sampleRate)

  for (let channel = 0; channel < 2; channel++) {
    const channelData = impulse.getChannelData(channel)
    for (let i = 0; i < length; i++) {
      // Exponential decay with some randomness
      channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2)
    }
  }

  convolver.buffer = impulse
  return convolver
}

/**
 * Create an FM synthesis voice (classic 90s sound)
 */
function createFMVoice(frequency, time, duration, params = {}) {
  const {
    carrierType = 'sine',
    modulatorRatio = 2,
    modulationIndex = 1.5,
    attack = 0.02,
    decay = 0.1,
    sustain = 0.6,
    release = 0.3,
    volume = 0.5,
  } = params

  // Carrier oscillator
  const carrier = audioContext.createOscillator()
  carrier.type = carrierType
  carrier.frequency.value = frequency

  // Modulator oscillator (for FM synthesis)
  const modulator = audioContext.createOscillator()
  modulator.type = 'sine'
  modulator.frequency.value = frequency * modulatorRatio

  // Modulation gain
  const modGain = audioContext.createGain()
  modGain.gain.value = frequency * modulationIndex

  // Output envelope
  const envelope = audioContext.createGain()
  envelope.gain.value = 0

  // Connect FM: modulator -> modGain -> carrier.frequency
  modulator.connect(modGain)
  modGain.connect(carrier.frequency)

  // Connect output: carrier -> envelope -> reverb
  carrier.connect(envelope)
  envelope.connect(reverbNode)

  // ADSR envelope
  const now = time
  const attackEnd = now + attack
  const decayEnd = attackEnd + decay
  const sustainEnd = now + duration - release
  const releaseEnd = now + duration

  envelope.gain.setValueAtTime(0, now)
  envelope.gain.linearRampToValueAtTime(volume, attackEnd)
  envelope.gain.linearRampToValueAtTime(volume * sustain, decayEnd)
  envelope.gain.setValueAtTime(volume * sustain, sustainEnd)
  envelope.gain.linearRampToValueAtTime(0, releaseEnd)

  // Start and stop
  carrier.start(time)
  modulator.start(time)
  carrier.stop(time + duration + 0.1)
  modulator.stop(time + duration + 0.1)

  return { carrier, modulator, envelope }
}

/**
 * Create a piano-like voice (for teaching purposes)
 */
function createPianoVoice(frequency, time, duration, volume = 0.4) {
  return createFMVoice(frequency, time, duration, {
    carrierType: 'triangle',
    modulatorRatio: 1,
    modulationIndex: 0.5,
    attack: 0.005,
    decay: 0.2,
    sustain: 0.3,
    release: 0.5,
    volume,
  })
}

/**
 * Create a mysterious pad sound (for atmosphere)
 */
function createPadVoice(frequency, time, duration, volume = 0.2) {
  return createFMVoice(frequency, time, duration, {
    carrierType: 'sine',
    modulatorRatio: 0.5,
    modulationIndex: 0.3,
    attack: 0.5,
    decay: 0.3,
    sustain: 0.8,
    release: 1.0,
    volume,
  })
}

/**
 * Create a bass voice
 */
function createBassVoice(frequency, time, duration, volume = 0.5) {
  return createFMVoice(frequency, time, duration, {
    carrierType: 'sawtooth',
    modulatorRatio: 1,
    modulationIndex: 0.2,
    attack: 0.01,
    decay: 0.15,
    sustain: 0.7,
    release: 0.2,
    volume,
  })
}

/**
 * Play a single note
 */
export function playNote(noteName, duration = 0.5, voiceType = 'piano', volume = 0.4) {
  if (!initialized) {
    if (!initAudio()) return
  }

  const frequency = NOTE_FREQUENCIES[noteName]
  if (!frequency) {
    console.warn(`Unknown note: ${noteName}`)
    return
  }

  const time = audioContext.currentTime

  switch (voiceType) {
    case 'pad':
      createPadVoice(frequency, time, duration, volume)
      break
    case 'bass':
      createBassVoice(frequency, time, duration, volume)
      break
    case 'piano':
    default:
      createPianoVoice(frequency, time, duration, volume)
  }
}

/**
 * Play a chord (multiple notes)
 */
export function playChord(noteNames, duration = 1.0, voiceType = 'piano', volume = 0.3) {
  noteNames.forEach(note => playNote(note, duration, voiceType, volume))
}

/**
 * Build a chord from a root note and chord type
 * Returns an array of note names
 */
export function buildChord(rootNote, chordType = 'major') {
  const rootFreq = NOTE_FREQUENCIES[rootNote]
  if (!rootFreq) return null

  // Get the base note name and octave
  const noteName = rootNote.replace(/[0-9]/g, '')
  const octave = parseInt(rootNote.match(/[0-9]/)?.[0] || '4')

  const noteIndex = NOTE_NAMES.indexOf(noteName)
  if (noteIndex === -1) return null

  // Chord intervals in semitones
  const chordIntervals = {
    'major': [0, 4, 7],
    'minor': [0, 3, 7],
    'diminished': [0, 3, 6],
    'augmented': [0, 4, 8],
    'major7': [0, 4, 7, 11],
    'minor7': [0, 3, 7, 10],
    'dominant7': [0, 4, 7, 10],
    'sus2': [0, 2, 7],
    'sus4': [0, 5, 7],
  }

  const intervals = chordIntervals[chordType] || chordIntervals['major']

  // Build the chord notes
  const chordNotes = intervals.map(interval => {
    const newNoteIndex = (noteIndex + interval) % 12
    const newOctave = octave + Math.floor((noteIndex + interval) / 12)
    return `${NOTE_NAMES[newNoteIndex]}${newOctave}`
  })

  return chordNotes
}

/**
 * Play a melody (sequence of notes)
 */
export function playMelody(notes, tempo = 120, voiceType = 'piano', volume = 0.4) {
  if (!initialized) {
    if (!initAudio()) return
  }

  const beatDuration = 60 / tempo
  let time = audioContext.currentTime

  notes.forEach(({ note, duration = 1, rest = false }) => {
    const noteDuration = duration * beatDuration

    if (!rest && note) {
      const frequency = NOTE_FREQUENCIES[note]
      if (frequency) {
        switch (voiceType) {
          case 'pad':
            createPadVoice(frequency, time, noteDuration * 0.9, volume)
            break
          case 'bass':
            createBassVoice(frequency, time, noteDuration * 0.9, volume)
            break
          case 'piano':
          default:
            createPianoVoice(frequency, time, noteDuration * 0.9, volume)
        }
      }
    }

    time += noteDuration
  })

  return time - audioContext.currentTime // Total duration
}

/**
 * Play interval demonstration
 */
export function playInterval(rootNote, intervalSemitones, sequential = true) {
  if (!initialized) {
    if (!initAudio()) return
  }

  const rootFreq = NOTE_FREQUENCIES[rootNote]
  if (!rootFreq) return

  const secondFreq = rootFreq * Math.pow(2, intervalSemitones / 12)
  const time = audioContext.currentTime

  if (sequential) {
    createPianoVoice(rootFreq, time, 0.6, 0.4)
    createPianoVoice(secondFreq, time + 0.7, 0.6, 0.4)
  } else {
    // Harmonic (both at once)
    createPianoVoice(rootFreq, time, 1.0, 0.35)
    createPianoVoice(secondFreq, time, 1.0, 0.35)
  }
}

/**
 * Play a scale
 */
export function playScale(rootNote, scalePattern, ascending = true) {
  if (!initialized) {
    if (!initAudio()) return
  }

  const rootFreq = NOTE_FREQUENCIES[rootNote]
  if (!rootFreq) return

  let time = audioContext.currentTime
  const pattern = ascending ? scalePattern : [...scalePattern].reverse()

  pattern.forEach((semitones, i) => {
    const freq = rootFreq * Math.pow(2, semitones / 12)
    createPianoVoice(freq, time, 0.4, 0.4)
    time += 0.35
  })

  // Play root again at the end
  if (ascending) {
    const octaveFreq = rootFreq * 2
    createPianoVoice(octaveFreq, time, 0.6, 0.4)
  }
}

// Track the current atmosphere controller
let atmosphereController = null

/**
 * Play atmospheric background music
 * Can accept either a mood string or intensity number (0-1) from the Generative Equation
 */
export function playAtmosphere(moodOrIntensity = 'mysterious') {
  if (!initialized) {
    if (!initAudio()) return null
  }

  // Stop any existing atmosphere
  stopAtmosphere()

  // Determine if we're using intensity (number) or mood (string)
  const isIntensity = typeof moodOrIntensity === 'number'
  const intensity = isIntensity ? moodOrIntensity : 0.5
  const mood = isIntensity
    ? (intensity > 0.6 ? 'discovery' : intensity > 0.3 ? 'mysterious' : 'tension')
    : moodOrIntensity

  // Return a controller to stop the atmosphere
  let isPlaying = true

  const playLoop = () => {
    if (!isPlaying) return

    const time = audioContext.currentTime

    // Volume scales with intensity from the Generative Equation
    const baseVolume = isIntensity ? 0.05 + intensity * 0.1 : 0.08

    if (mood === 'mysterious' || intensity <= 0.3) {
      // Eerie, sparse pad sounds
      const notes = ['E3', 'B3', 'D4', 'A3']
      const note = notes[Math.floor(Math.random() * notes.length)]
      createPadVoice(NOTE_FREQUENCIES[note], time, 4 + Math.random() * 2, baseVolume)

      // Occasional low bass note
      if (Math.random() > 0.7) {
        const bassNotes = ['E2', 'A2', 'D2']
        const bassNote = bassNotes[Math.floor(Math.random() * bassNotes.length)]
        createBassVoice(NOTE_FREQUENCIES[bassNote], time + 2, 2, baseVolume * 1.2)
      }
    } else if (mood === 'discovery' || intensity > 0.6) {
      // Lighter, more hopeful - scales with intensity
      const notes = ['C4', 'E4', 'G4', 'A4', 'B4']
      const numNotes = Math.floor(1 + intensity * 2)
      for (let i = 0; i < numNotes; i++) {
        const note = notes[Math.floor(Math.random() * notes.length)]
        createPadVoice(NOTE_FREQUENCIES[note], time + i * 0.5, 3 - i * 0.3, baseVolume * (1 - i * 0.2))
      }

      // Add bass for fuller sound at high intensity
      if (intensity > 0.7 && Math.random() > 0.5) {
        createBassVoice(NOTE_FREQUENCIES['C3'], time + 1, 2, baseVolume * 0.8)
      }
    } else if (mood === 'tension') {
      // Dissonant, unsettling
      const notes = ['D#3', 'A3', 'E4', 'Bb3']
      const note = notes[Math.floor(Math.random() * notes.length)]
      createPadVoice(NOTE_FREQUENCIES[note], time, 5, baseVolume * 0.7)
    }

    // Interval scales inversely with intensity (more intense = more frequent)
    const interval = isIntensity
      ? 2000 + (1 - intensity) * 4000 + Math.random() * 2000
      : 3000 + Math.random() * 4000

    // Schedule next iteration
    setTimeout(playLoop, interval)
  }

  playLoop()

  atmosphereController = {
    stop: () => { isPlaying = false }
  }

  return atmosphereController
}

/**
 * Stop the atmospheric background music
 */
export function stopAtmosphere() {
  if (atmosphereController) {
    atmosphereController.stop()
    atmosphereController = null
  }
}

/**
 * Play the "silence breaking" sound effect
 */
export function playSilenceBreak() {
  if (!initialized) {
    if (!initAudio()) return
  }

  const time = audioContext.currentTime

  // Rising arpeggio suggesting hope/discovery
  const notes = ['C4', 'E4', 'G4', 'C5', 'E5']
  notes.forEach((note, i) => {
    createPianoVoice(NOTE_FREQUENCIES[note], time + i * 0.15, 0.8, 0.3)
  })

  // Add a pad chord underneath
  setTimeout(() => {
    createPadVoice(NOTE_FREQUENCIES['C3'], audioContext.currentTime, 2, 0.15)
    createPadVoice(NOTE_FREQUENCIES['G3'], audioContext.currentTime, 2, 0.12)
    createPadVoice(NOTE_FREQUENCIES['E4'], audioContext.currentTime, 2, 0.1)
  }, 300)
}

/**
 * Get note frequency for display purposes
 */
export function getNoteFrequency(noteName) {
  return NOTE_FREQUENCIES[noteName]
}

/**
 * Get all available note names
 */
export function getNoteNames() {
  return NOTE_NAMES
}

/**
 * Set master volume
 */
export function setMasterVolume(value) {
  if (masterGain) {
    masterGain.gain.value = Math.max(0, Math.min(1, value))
  }
}

/**
 * Check if audio is initialized
 */
export function isInitialized() {
  return initialized
}

export default {
  initAudio,
  playNote,
  playChord,
  buildChord,
  playMelody,
  playInterval,
  playScale,
  playAtmosphere,
  stopAtmosphere,
  playSilenceBreak,
  getNoteFrequency,
  getNoteNames,
  setMasterVolume,
  isInitialized,
  NOTE_FREQUENCIES,
}
