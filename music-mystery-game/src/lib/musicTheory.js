/**
 * Music Theory Educational Content
 *
 * All the music theory concepts taught throughout the game,
 * presented in accessible, memorable ways.
 */

// =============================================================================
// INTERVALS - The building blocks of melody and harmony
// =============================================================================

export const INTERVALS = {
  unison: {
    name: 'Unison',
    semitones: 0,
    symbol: 'P1',
    feeling: 'Identity, sameness',
    description: 'The same note played twice. Like looking in a mirror - perfect agreement.',
    example: 'When a choir sings the same note together',
    inGame: 'The echo of your own footsteps in the silent halls',
  },
  minor_2nd: {
    name: 'Minor 2nd',
    semitones: 1,
    symbol: 'm2',
    feeling: 'Tension, dissonance, unease',
    description: 'The smallest step in Western music. It creates an uncomfortable, grinding tension - like two things that don\'t quite fit.',
    example: 'The "Jaws" theme uses this interval to create dread',
    inGame: 'The creak of a door that shouldn\'t be opening',
  },
  major_2nd: {
    name: 'Major 2nd',
    semitones: 2,
    symbol: 'M2',
    feeling: 'Movement, stepping forward',
    description: 'A whole step - the standard "walking" distance between notes. It feels like natural progression.',
    example: 'The first two notes of "Happy Birthday"',
    inGame: 'Climbing the stairs, one step at a time',
  },
  minor_3rd: {
    name: 'Minor 3rd',
    semitones: 3,
    symbol: 'm3',
    feeling: 'Sadness, longing, depth',
    description: 'The interval that makes minor chords sound "sad". It has a dark, emotional quality that touches the heart.',
    example: 'The start of "Greensleeves" or Beethoven\'s 5th Symphony',
    inGame: 'The portrait of Lady Ashworth, her eyes full of unspoken sorrow',
  },
  major_3rd: {
    name: 'Major 3rd',
    semitones: 4,
    symbol: 'M3',
    feeling: 'Joy, brightness, warmth',
    description: 'The "happy" interval. It\'s what makes major chords sound uplifting and positive. Pure sunshine in sound.',
    example: 'The first two notes of "When the Saints Go Marching In"',
    inGame: 'A beam of light breaking through the dusty window',
  },
  perfect_4th: {
    name: 'Perfect 4th',
    semitones: 5,
    symbol: 'P4',
    feeling: 'Anticipation, openness, seeking',
    description: 'A strong, stable interval that feels like a question waiting to be answered. It creates expectation.',
    example: 'The beginning of "Here Comes the Bride"',
    inGame: 'Standing before a locked door, knowing something lies beyond',
  },
  tritone: {
    name: 'Tritone',
    semitones: 6,
    symbol: 'TT',
    feeling: 'Unrest, instability, the uncanny',
    description: 'Historically called "the devil\'s interval" - exactly halfway through the octave. It creates maximum tension and demands resolution.',
    example: 'The opening of "The Simpsons" theme, "Maria" from West Side Story',
    inGame: 'The grandfather clock that strikes at impossible hours',
  },
  perfect_5th: {
    name: 'Perfect 5th',
    semitones: 7,
    symbol: 'P5',
    feeling: 'Power, stability, heroism',
    description: 'The most stable interval after the octave. It sounds open, strong, and confident. The backbone of rock music.',
    example: 'The "Star Wars" theme opening, power chords in rock',
    inGame: 'The strength to push open the heavy library doors',
  },
  minor_6th: {
    name: 'Minor 6th',
    semitones: 8,
    symbol: 'm6',
    feeling: 'Yearning, bittersweet beauty',
    description: 'A poignant, reaching interval. It combines sadness with a strange beauty, like remembering something precious that\'s gone.',
    example: 'The theme from "Love Story"',
    inGame: 'The faded photograph of the composer in happier times',
  },
  major_6th: {
    name: 'Major 6th',
    semitones: 9,
    symbol: 'M6',
    feeling: 'Warmth, tenderness, nostalgia',
    description: 'A warm, gentle interval that feels like coming home. It\'s comforting and familiar.',
    example: 'The NBC chimes, "My Bonnie Lies Over the Ocean"',
    inGame: 'The warmth of the fireplace, still somehow burning',
  },
  minor_7th: {
    name: 'Minor 7th',
    semitones: 10,
    symbol: 'm7',
    feeling: 'Blues, coolness, sophistication',
    description: 'The soul of blues and jazz. It adds color and complexity, a touch of worldly wisdom.',
    example: 'The opening of the original "Star Trek" theme',
    inGame: 'The jazz records still stacked by the silent gramophone',
  },
  major_7th: {
    name: 'Major 7th',
    semitones: 11,
    symbol: 'M7',
    feeling: 'Dreamy, ethereal, questioning',
    description: 'One step away from resolution. It creates a floating, dreamy quality - sophisticated and slightly unresolved.',
    example: 'The first two notes of "Take On Me" (A-ha)',
    inGame: 'The view from the tower window, the world spread out below',
  },
  octave: {
    name: 'Octave',
    semitones: 12,
    symbol: 'P8',
    feeling: 'Completeness, transcendence, unity',
    description: 'The same note, doubled in frequency. It feels like the same thing at a higher level - completion of a cycle.',
    example: '"Somewhere Over the Rainbow" starts with an octave leap',
    inGame: 'The revelation that connects past and present, the mystery solved',
  },
}

// =============================================================================
// SCALES AND MODES - The palettes of emotion
// =============================================================================

export const MODES = {
  ionian: {
    name: 'Ionian',
    commonName: 'Major Scale',
    pattern: [0, 2, 4, 5, 7, 9, 11, 12],
    feeling: 'Bright, happy, triumphant',
    description: 'The standard major scale. It\'s the sound of victory, sunshine, and simple joy. Most pop songs use this.',
    character: 'The hero at the end of the story, triumphant',
    example: 'Most pop music, "Happy Birthday", Disney songs',
    inGame: 'The melody that dispels the deepest darkness',
  },
  dorian: {
    name: 'Dorian',
    commonName: 'Minor with a bright spot',
    pattern: [0, 2, 3, 5, 7, 9, 10, 12],
    feeling: 'Cool, sophisticated, mysteriously hopeful',
    description: 'A minor scale with one bright note (raised 6th). It\'s sad but not defeated - like hope in darkness.',
    character: 'The detective who\'s seen it all but still believes in justice',
    example: '"Scarborough Fair", "Eleanor Rigby", much of jazz',
    inGame: 'The first clue that suggests not all is lost',
  },
  phrygian: {
    name: 'Phrygian',
    commonName: 'The exotic minor',
    pattern: [0, 1, 3, 5, 7, 8, 10, 12],
    feeling: 'Exotic, mysterious, ancient',
    description: 'Instantly recognizable as "Spanish" or "Middle Eastern". The lowered 2nd creates an exotic, ancient tension.',
    character: 'An ancient secret, a ritual from forgotten times',
    example: 'Flamenco music, "White Rabbit" by Jefferson Airplane',
    inGame: 'The hidden passage that leads to the composer\'s true study',
  },
  lydian: {
    name: 'Lydian',
    commonName: 'The dreamy major',
    pattern: [0, 2, 4, 6, 7, 9, 11, 12],
    feeling: 'Floating, dreamy, otherworldly, magical',
    description: 'Major scale with a raised 4th. It sounds like floating, like magic, like anything is possible.',
    character: 'A dream that feels more real than waking life',
    example: '"The Simpsons" theme, much of John Williams\' work',
    inGame: 'The music box that plays by itself at midnight',
  },
  mixolydian: {
    name: 'Mixolydian',
    commonName: 'The rock mode',
    pattern: [0, 2, 4, 5, 7, 9, 10, 12],
    feeling: 'Bluesy, rock, earthy confidence',
    description: 'Major scale with a lowered 7th. It\'s the sound of rock and roll, blues, and earthy confidence.',
    character: 'Someone who\'s lived hard but smiles anyway',
    example: '"Sweet Home Alabama", "Norwegian Wood"',
    inGame: 'The composer\'s rebellious youth, captured in an old recording',
  },
  aeolian: {
    name: 'Aeolian',
    commonName: 'Natural Minor Scale',
    pattern: [0, 2, 3, 5, 7, 8, 10, 12],
    feeling: 'Sad, serious, deeply emotional',
    description: 'The standard minor scale. It\'s the sound of sadness, drama, and deep emotion without pretense.',
    character: 'The weight of sorrow, honestly felt',
    example: '"Stairway to Heaven", most sad songs',
    inGame: 'The melody that echoes through empty rooms',
  },
  locrian: {
    name: 'Locrian',
    commonName: 'The unstable mode',
    pattern: [0, 1, 3, 5, 6, 8, 10, 12],
    feeling: 'Unstable, disturbing, unresolved',
    description: 'The only mode where the tonic chord is diminished. Nothing feels stable - pure unease.',
    character: 'A nightmare that won\'t quite resolve',
    example: 'Rarely used - too unstable for most music',
    inGame: 'The fragment of melody the composer could never complete',
  },
}

// =============================================================================
// CHORDS - Harmony and emotion
// =============================================================================

export const CHORDS = {
  major: {
    name: 'Major Triad',
    intervals: [0, 4, 7],
    symbol: 'C',
    feeling: 'Happy, bright, stable, resolved',
    description: 'The happiest, most stable chord. Built on a major 3rd and perfect 5th. It says "everything is good."',
    construction: 'Root + Major 3rd (4 semitones) + Perfect 5th (7 semitones)',
    example: 'The final chord of almost any happy song',
  },
  minor: {
    name: 'Minor Triad',
    intervals: [0, 3, 7],
    symbol: 'Cm',
    feeling: 'Sad, serious, introspective',
    description: 'The sad chord. Same as major but with a minor 3rd. It turns sunshine into moonlight.',
    construction: 'Root + Minor 3rd (3 semitones) + Perfect 5th (7 semitones)',
    example: '"House of the Rising Sun", opening of Moonlight Sonata',
  },
  diminished: {
    name: 'Diminished Triad',
    intervals: [0, 3, 6],
    symbol: 'Cdim',
    feeling: 'Tense, scary, unstable',
    description: 'Two minor 3rds stacked. Everything is shrunk, tense. Used for suspense and horror.',
    construction: 'Root + Minor 3rd (3 semitones) + Tritone (6 semitones)',
    example: 'Villain entrances in old movies, dramatic tension',
  },
  augmented: {
    name: 'Augmented Triad',
    intervals: [0, 4, 8],
    symbol: 'Caug',
    feeling: 'Dreamlike, strange, unresolved',
    description: 'Two major 3rds stacked. Symmetrical and weird - it doesn\'t know where it wants to go.',
    construction: 'Root + Major 3rd (4 semitones) + Augmented 5th (8 semitones)',
    example: 'Scene transitions, dreamy passages',
  },
  major7: {
    name: 'Major 7th',
    intervals: [0, 4, 7, 11],
    symbol: 'Cmaj7',
    feeling: 'Sophisticated, jazzy, bittersweet beauty',
    description: 'A major chord with added complexity. Simultaneously happy and longing. The sound of jazz and sophistication.',
    construction: 'Major Triad + Major 7th (11 semitones)',
    example: 'Jazz standards, sophisticated pop',
  },
  minor7: {
    name: 'Minor 7th',
    intervals: [0, 3, 7, 10],
    symbol: 'Cm7',
    feeling: 'Cool, soulful, melancholic sophistication',
    description: 'A minor chord with added depth. It\'s sad but worldly-wise, the sound of late-night jazz.',
    construction: 'Minor Triad + Minor 7th (10 semitones)',
    example: 'R&B, soul music, jazz',
  },
  dominant7: {
    name: 'Dominant 7th',
    intervals: [0, 4, 7, 10],
    symbol: 'C7',
    feeling: 'Tension seeking resolution, bluesy',
    description: 'A major chord that NEEDS to resolve. Contains a tritone, creating movement. The engine of blues and jazz.',
    construction: 'Major Triad + Minor 7th (10 semitones)',
    example: 'Every blues song ever, "tension" chords',
  },
  suspended4: {
    name: 'Suspended 4th',
    intervals: [0, 5, 7],
    symbol: 'Csus4',
    feeling: 'Suspended, waiting, anticipation',
    description: 'Neither major nor minor - the 3rd is replaced with a 4th. It hovers, waiting to resolve.',
    construction: 'Root + Perfect 4th (5 semitones) + Perfect 5th (7 semitones)',
    example: 'The Who\'s "Pinball Wizard", many rock intros',
  },
  suspended2: {
    name: 'Suspended 2nd',
    intervals: [0, 2, 7],
    symbol: 'Csus2',
    feeling: 'Open, ambiguous, fresh',
    description: 'The 3rd replaced with a 2nd. It\'s open and fresh, neither happy nor sad - just possibility.',
    construction: 'Root + Major 2nd (2 semitones) + Perfect 5th (7 semitones)',
    example: 'Ambient music, "atmospheric" passages',
  },
}

// =============================================================================
// MELODY CONCEPTS
// =============================================================================

export const MELODY_CONCEPTS = {
  contour: {
    name: 'Melodic Contour',
    description: 'The shape of a melody - does it go up, down, or stay the same? Our brains love melodies that have a clear shape.',
    principle: 'Good melodies often rise to a climax, then fall to resolution.',
    inGame: 'Like the path through Ashworth Manor - it must lead somewhere.',
  },
  stepwise: {
    name: 'Stepwise Motion',
    description: 'Moving by small intervals (2nds). It feels natural, like walking. Most of any melody is stepwise.',
    principle: 'Stepwise motion is easier to sing and remember.',
    inGame: 'Following footprints in the dust, one step leading to the next.',
  },
  leaps: {
    name: 'Melodic Leaps',
    description: 'Jumping by larger intervals. Leaps create drama and catch attention, but use them sparingly.',
    principle: 'Leaps are powerful but should be balanced by stepwise motion.',
    inGame: 'The moment of revelation that changes everything.',
  },
  repetition: {
    name: 'Repetition',
    description: 'Repeating phrases with small variations. It\'s how we remember - the brain loves patterns.',
    principle: 'Repeat enough to be memorable, vary enough to stay interesting.',
    inGame: 'The recurring motif in the composer\'s work - what was he trying to say?',
  },
  sequence: {
    name: 'Sequence',
    description: 'A melodic phrase repeated at a different pitch level. It creates momentum and development.',
    principle: 'Sequences drive music forward while maintaining coherence.',
    inGame: 'Each room of the manor echoes the last, but slightly changed.',
  },
  climax: {
    name: 'Climax',
    description: 'The highest or most intense point of a melody. Good melodies build toward and release from the climax.',
    principle: 'The climax should feel earned through what comes before.',
    inGame: 'The moment in the tower when all truths converge.',
  },
}

// =============================================================================
// RHYTHM CONCEPTS
// =============================================================================

export const RHYTHM_CONCEPTS = {
  beat: {
    name: 'The Beat',
    description: 'The steady pulse underlying all music. Like a heartbeat, it\'s what you tap your foot to.',
    principle: 'The beat is the foundation everything else is built on.',
  },
  tempo: {
    name: 'Tempo',
    description: 'How fast or slow the beat is. Measured in BPM (beats per minute). It profoundly affects mood.',
    ranges: {
      largo: '40-60 BPM - Very slow, solemn',
      adagio: '66-76 BPM - Slow, peaceful',
      andante: '76-108 BPM - Walking pace, comfortable',
      moderato: '108-120 BPM - Moderate, conversational',
      allegro: '120-156 BPM - Fast, lively',
      presto: '168-200 BPM - Very fast, exciting',
    },
  },
  meter: {
    name: 'Meter',
    description: 'How beats are grouped. 4/4 means four beats per measure. 3/4 (waltz) means three.',
    common: {
      '4/4': 'Most common - rock, pop, jazz. Steady and predictable.',
      '3/4': 'Waltz feel - elegant, flowing, dance-like.',
      '6/8': 'Compound - feels like two groups of three. Rolling, lilting.',
    },
  },
  syncopation: {
    name: 'Syncopation',
    description: 'Accenting the "off" beats. It creates tension and groove - the spice of rhythm.',
    principle: 'Syncopation makes music feel alive and unpredictable.',
  },
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get interval info by semitones
 */
export function getIntervalBySemitones(semitones) {
  return Object.values(INTERVALS).find(i => i.semitones === semitones)
}

/**
 * Build a chord from a root note
 */
export function buildChord(rootNote, chordType) {
  const chord = CHORDS[chordType]
  if (!chord) return null

  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const rootIndex = noteNames.indexOf(rootNote.replace(/[0-9]/g, ''))
  const octave = parseInt(rootNote.match(/[0-9]/)?.[0] || '4')

  return chord.intervals.map(interval => {
    const noteIndex = (rootIndex + interval) % 12
    const noteOctave = octave + Math.floor((rootIndex + interval) / 12)
    return `${noteNames[noteIndex]}${noteOctave}`
  })
}

/**
 * Build a scale from a root note
 */
export function buildScale(rootNote, modeName) {
  const mode = MODES[modeName]
  if (!mode) return null

  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const rootIndex = noteNames.indexOf(rootNote.replace(/[0-9]/g, ''))
  const octave = parseInt(rootNote.match(/[0-9]/)?.[0] || '4')

  return mode.pattern.map(interval => {
    const noteIndex = (rootIndex + interval) % 12
    const noteOctave = octave + Math.floor((rootIndex + interval) / 12)
    return `${noteNames[noteIndex]}${noteOctave}`
  })
}

export default {
  INTERVALS,
  MODES,
  CHORDS,
  MELODY_CONCEPTS,
  RHYTHM_CONCEPTS,
  getIntervalBySemitones,
  buildChord,
  buildScale,
}
