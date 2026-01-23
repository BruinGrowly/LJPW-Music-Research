/**
 * Echoes of Ashworth - Game Data
 *
 * The story, rooms, puzzles, and progression of the musical mystery.
 * Silence is the antagonist. Music is the solution.
 */

// =============================================================================
// THE STORY
// =============================================================================

export const STORY = {
  title: 'Echoes of Ashworth',
  subtitle: 'A Musical Mystery',
  premise: `
    Ten years ago, the renowned composer Edmund Ashworth vanished from his family manor
    on the night he was to debut his masterpiece - a composition he called "The Silence Breaker."

    The music was never found. The mystery was never solved.

    Since that night, Ashworth Manor has been consumed by an unnatural stillness.
    No birds sing in the gardens. The grandfather clock has stopped. Even the wind
    seems to hold its breath within these walls.

    You are a music scholar, drawn here by a cryptic letter found among your
    late mentor's effects. The letter contains only coordinates, a date - today -
    and seven words:

    "The silence can only be broken by understanding."

    As you step through the manor's doors, the weight of the quiet presses against you.
    Somewhere in this house, a song waits to be completed. And with it, perhaps,
    the truth of what happened to Edmund Ashworth.
  `,

  chapters: [
    {
      id: 'arrival',
      title: 'Chapter I: The Weight of Silence',
      description: 'You enter Ashworth Manor and feel the oppressive stillness.',
    },
    {
      id: 'foundations',
      title: 'Chapter II: Building Blocks',
      description: 'In the music room, you begin to understand the language of sound.',
    },
    {
      id: 'scales',
      title: 'Chapter III: The Seven Colors',
      description: 'The library reveals the emotional palettes of music.',
    },
    {
      id: 'harmony',
      title: 'Chapter IV: Voices Together',
      description: 'In the conservatory, you learn how notes combine.',
    },
    {
      id: 'melody',
      title: 'Chapter V: The Thread',
      description: 'The composer\'s study teaches you how melodies speak.',
    },
    {
      id: 'revelation',
      title: 'Chapter VI: The Silence Breaker',
      description: 'In the tower, you complete the song and learn the truth.',
    },
  ],
}

// =============================================================================
// ROOMS AND PROGRESSION
// =============================================================================

export const ROOMS = {
  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 1: ARRIVAL
  // ═══════════════════════════════════════════════════════════════════════════
  entrance: {
    id: 'entrance',
    name: 'Manor Entrance',
    chapter: 'arrival',
    atmosphere: 'mysterious',

    description: `
      The great doors of Ashworth Manor close behind you with an almost apologetic whisper.

      Before you stretches a grand entrance hall, frozen in time. A crystal chandelier
      hangs motionless - not a single pendant stirs. Portraits line the walls: generations
      of Ashworths gazing down with expressions you cannot quite read.

      The silence here is not mere absence of sound. It has presence. Weight. It presses
      against your ears like deep water.

      On a small table near the door, you notice a framed photograph: a man at a piano,
      his hands poised above the keys, his face captured in a moment of profound concentration.

      Edmund Ashworth. The night before he disappeared.

      Three doorways lead deeper into the manor: a music room to the east, a library
      to the west, and stairs ascending into shadow.
    `,

    interactables: {
      photograph: {
        name: 'The Photograph',
        examined: false,
        description: `
          You study the photograph more closely. Edmund Ashworth's hands hover above
          the piano keys with obvious intention - but which notes? The black and white
          image cannot tell you.

          Written on the back, in faded ink: "The first truth is this: all music
          begins with a single sound. Before harmony, before melody - there is the note."
        `,
        teaches: 'notes',
        unlocks: 'lesson_notes',
      },
      portraits: {
        name: 'The Portraits',
        examined: false,
        description: `
          The portraits show five generations of Ashworths, each somehow connected
          to music. A cellist. A singer. A conductor. A composer. And Edmund,
          captured not at an instrument but simply... listening. His head tilted,
          as if hearing something no one else could.

          The silence in this room feels almost like a question he never finished asking.
        `,
      },
      chandelier: {
        name: 'The Chandelier',
        examined: false,
        description: `
          Hundreds of crystal pendants hang perfectly still. In any normal house,
          the slightest draft would set them tinkling like frozen music. Here,
          they are silent sentinels.

          You notice something: the pendants are arranged in a pattern. Twelve distinct
          groups, like... like notes on a piano. The twelve tones that make up all
          Western music.
        `,
      },
    },

    exits: {
      east: { to: 'music_room', description: 'The music room awaits.' },
      west: { to: 'library', description: 'The library doors are slightly ajar.', locked: true, requires: 'lesson_notes' },
      up: { to: 'upstairs_hall', description: 'Stairs ascend into shadow.', locked: true, requires: 'lesson_modes' },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 2: THE MUSIC ROOM - INTERVALS
  // ═══════════════════════════════════════════════════════════════════════════
  music_room: {
    id: 'music_room',
    name: 'The Music Room',
    chapter: 'foundations',
    atmosphere: 'mysterious',

    description: `
      The music room is a shrine to sound trapped in silence.

      A grand piano dominates the space, its lid open as if awaiting a performer
      who will never return. Sheet music lies scattered across the floor - pages
      torn from what must have been dozens of compositions.

      Along one wall, a collection of instruments hangs in glass cases: a violin,
      a flute, a guitar. Each perfectly preserved. Each perfectly mute.

      But it's the piano that draws you. Even silent, it seems to pulse with
      potential. The keys are ivory and ebony, eighty-eight possibilities
      waiting to break this terrible quiet.

      On the music stand, a single page remains: not music, but words.
      "The distance between two notes is called an interval. Each interval
      has its own emotional character. Learn these distances, and you learn
      the vocabulary of feeling."
    `,

    lesson: 'intervals',

    interactables: {
      piano: {
        name: 'The Grand Piano',
        examined: false,
        description: `
          You approach the piano and press a key. The note rings out - the first
          true sound you've heard since entering the manor. The silence seems to
          recoil, just slightly.

          But one note is not enough. On the piano's frame, carved in small letters:
          "A single note is just a sound. Two notes together tell a story."

          Perhaps you should explore the INTERVALS between notes...
        `,
        interactive: true,
        type: 'piano',
      },
      sheet_music: {
        name: 'Scattered Sheet Music',
        examined: false,
        description: `
          You gather some of the scattered pages. They're fragments of different
          pieces, but each is annotated in the same hand - Ashworth's.

          Notes in the margins: "The minor 2nd - tension, the grinding of gears
          that don't quite mesh. The major 3rd - pure sunshine. The tritone -
          the devil's own interval, demanding resolution..."

          These are lessons. He was teaching someone. But who?
        `,
      },
      instruments: {
        name: 'The Instrument Collection',
        examined: false,
        description: `
          Each instrument in its case bears a small plaque:

          "The Violin - built for melody, for the singing line."
          "The Flute - breath made visible through sound."
          "The Guitar - six strings, infinite possibilities."

          But it's the empty case at the end that catches your attention.
          Its plaque reads only: "For the one who completes the song."
        `,
        reveals: 'The composer expected someone to come. Someone to finish what he started.',
      },
    },

    exits: {
      west: { to: 'entrance', description: 'Return to the entrance hall.' },
    },

    onComplete: {
      message: 'The piano keys glow faintly as you master the intervals. The silence loosens its grip, just slightly.',
      unlocks: ['lesson_intervals'],
      reveals: 'library',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 3: THE LIBRARY - SCALES AND MODES
  // ═══════════════════════════════════════════════════════════════════════════
  library: {
    id: 'library',
    name: 'The Library',
    chapter: 'scales',
    atmosphere: 'mysterious',

    description: `
      The library is vast and vertical - shelves climbing three stories high,
      connected by wrought-iron spiral staircases that seem to twist into infinity.

      Books on every subject fill the shelves, but one section has been cleared
      entirely. Seven books remain, each bound in a different color, arranged
      on a reading table with obvious intentionality.

      A reading lamp casts a pool of amber light in the otherwise dim space.
      Dust motes hang suspended in the beam, motionless. Even dust does not
      dare to dance in this silence.

      On the wall, a faded tapestry depicts seven figures in robes of different
      colors, each playing the same instrument but somehow producing different
      music. Below them, text in archaic script:

      "Seven modes of the same scale. Seven colors of the same light.
       Each begins in the same place but travels through different emotions."
    `,

    lesson: 'modes',

    interactables: {
      seven_books: {
        name: 'The Seven Colored Books',
        examined: false,
        description: `
          Each book is labeled with a strange name:

          IONIAN (White) - "The brightness of day, uncomplicated joy"
          DORIAN (Blue) - "Cool shadows with a hint of warmth"
          PHRYGIAN (Crimson) - "Ancient sands and sacred mysteries"
          LYDIAN (Gold) - "Floating above the world, dreaming of flight"
          MIXOLYDIAN (Orange) - "Earthen roads and honest work"
          AEOLIAN (Grey) - "The natural minor, unadorned sadness"
          LOCRIAN (Black) - "Unstable ground, a nightmare's edge"

          These are the modes - seven different emotional palettes using
          the same notes in different configurations. Ashworth has annotated
          each: "The song requires understanding of ALL seven emotional states."
        `,
        teaches: 'modes',
        unlocks: 'lesson_modes',
      },
      tapestry: {
        name: 'The Seven Musicians',
        examined: false,
        description: `
          You study the tapestry more closely. The seven figures are identical
          in every way except their expression and the color of their robes.

          One smiles broadly (white robes).
          One gazes with cool sophistication (blue).
          One seems lost in an ancient trance (crimson).
          One floats slightly above the ground (gold).
          One has dirt on their hands but peace in their eyes (orange).
          One weeps openly (grey).
          One... the one in black... their face is obscured, as if the
          weaver couldn't bear to complete it.

          At the bottom of the tapestry, newer thread spells out:
          "I could never complete the Locrian section. It felt too much like giving up."
        `,
      },
      reading_lamp: {
        name: 'The Reading Lamp',
        examined: false,
        description: `
          The lamp burns steadily, impossibly - there's no oil, no electricity
          running to it that you can see. Yet it burns.

          Then you understand: it's not truly burning. It's a memory of light,
          held in place by the same strange physics that holds the silence.

          Something happened in this house that stopped time itself. Or at least,
          stopped everything that makes time feel real: motion, sound, change.

          Music, you realize, is literally made of change. Notes move through time.
          Without music, perhaps time itself grows still.
        `,
      },
    },

    exits: {
      east: { to: 'entrance', description: 'Return to the entrance hall.' },
      north: { to: 'conservatory', description: 'A door leads to what appears to be a conservatory.', locked: true, requires: 'lesson_modes' },
    },

    onComplete: {
      message: 'As you internalize the seven modes, you feel the manor shift almost imperceptibly. Somewhere, a clock begins to tick.',
      unlocks: ['lesson_modes'],
      reveals: 'conservatory',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 4: THE CONSERVATORY - CHORDS
  // ═══════════════════════════════════════════════════════════════════════════
  conservatory: {
    id: 'conservatory',
    name: 'The Conservatory',
    chapter: 'harmony',
    atmosphere: 'discovery',

    description: `
      Glass walls reveal a garden frozen in eternal twilight. Plants grow here,
      somehow, despite the stillness - as if life itself refuses to be fully
      extinguished.

      At the center of the conservatory, a small ensemble is arranged:
      four music stands, four chairs, as if for a string quartet. Sheet music
      sits on each stand, but the pages show not notes - only questions.

      "What happens when notes sound TOGETHER instead of one after another?"
      "How do voices combine to create something neither could achieve alone?"
      "Why does a minor chord feel sad and a major chord feel happy?"

      On a nearby table, a set of tuning forks has been arranged in groups
      of three and four. Each group is labeled:

      "Major" "Minor" "Diminished" "Augmented" "Seventh"

      Chords. The building blocks of harmony.
    `,

    lesson: 'chords',

    interactables: {
      tuning_forks: {
        name: 'The Tuning Forks',
        examined: false,
        description: `
          You strike the forks grouped together as "Major." Three notes ring out
          simultaneously - bright, stable, happy. The silence in the room
          seems to thin, like fog burning off in morning sun.

          You try "Minor." The same three notes, but one is lowered. The mood
          shifts immediately - still beautiful, but tinged with sorrow.

          "Diminished" creates tension. "Augmented" floats, unresolved.
          "Seventh" adds complexity, sophistication, a question inside a statement.

          Each chord is a different emotional color, made by combining simple intervals
          in different ways. This is how composers paint with sound.
        `,
        teaches: 'chords',
        unlocks: 'lesson_chords',
      },
      quartet_stands: {
        name: 'The String Quartet Arrangement',
        examined: false,
        description: `
          Each music stand bears not only questions but also personal notes
          from four different musicians:

          FIRST VIOLIN: "Edmund says the melody must soar above the others,
          but never forget it is supported by them."

          SECOND VIOLIN: "My part echoes the first, but from a different angle.
          Harmony is not agreement - it is conversation."

          VIOLA: "I am the middle voice. I connect the high and the low.
          Without me, there is no warmth."

          CELLO: "The foundation. Without bass, the others float away into nothing."

          These were real musicians. Real collaborators. What happened to them?
        `,
      },
      garden: {
        name: 'The Frozen Garden',
        examined: false,
        description: `
          You press your hand against the glass. The garden beyond is beautiful
          in its stillness - flowers perpetually about to bloom, butterflies
          suspended mid-flight.

          But in one corner, something has changed. A single rosebush shows
          signs of recent growth - a bud that wasn't there before, you're
          certain of it.

          The silence is breaking. Slowly. Your understanding of music is
          literally bringing this place back to life.
        `,
        reveals: 'The music you are learning is affecting the manor itself.',
      },
    },

    exits: {
      south: { to: 'library', description: 'Return to the library.' },
    },

    onComplete: {
      message: 'The tuning forks continue to resonate. In the garden, a flower opens.',
      unlocks: ['lesson_chords'],
      reveals: 'upstairs_hall',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 5: THE STUDY - MELODY
  // ═══════════════════════════════════════════════════════════════════════════
  upstairs_hall: {
    id: 'upstairs_hall',
    name: 'The Upper Hall',
    chapter: 'melody',
    atmosphere: 'tension',

    description: `
      The stairs creak - actual sound, not silence - as you ascend.

      The upper hall is narrower than expected, lined with doors. Most are
      locked, but one stands slightly open, light spilling from within.

      The walls here are covered not with portraits but with handwritten
      musical notation - measures and measures scrawled directly onto the
      wallpaper in what looks like charcoal. Some passages are crossed out.
      Others are circled, starred, annotated with single words:

      "Almost." "Not yet." "CLOSE." "This is the one... no, still missing something."

      The open door leads to what must be Ashworth's private study.
      A final door at the end of the hall, locked with an elaborate mechanism,
      is labeled simply: "THE TOWER."
    `,

    interactables: {
      wall_notation: {
        name: 'The Wall Notation',
        examined: false,
        description: `
          You trace the musical notation with your fingers. It's all the same
          melody, attempted over and over in different variations.

          Some versions step carefully, note to note.
          Some leap dramatically.
          Some repeat phrases, building momentum.
          All of them stop at the same point - a measure left incomplete.

          One annotation stands out: "The melody must tell a story. It must
          rise, it must fall, it must take the listener on a journey. But where
          is the destination? I know the intervals, the modes, the chords...
          but the thread that connects them eludes me."

          He was so close. What was he missing?
        `,
      },
      tower_door: {
        name: 'The Tower Door',
        examined: false,
        description: `
          The door mechanism is not a lock in the traditional sense. Instead,
          it's a musical one - a series of wooden keys that must be played in
          sequence.

          Seven keys. Seven notes.

          The answer must be in the study. When you understand melody itself -
          how it tells stories, how it completes itself - you will know
          what sequence to play.
        `,
        locked: true,
        requires: 'lesson_melody',
      },
    },

    exits: {
      down: { to: 'entrance', description: 'Descend to the entrance hall.' },
      east: { to: 'study', description: 'Enter the composer\'s study.' },
      north: { to: 'tower', description: 'The tower awaits.', locked: true, requires: 'lesson_melody' },
    },
  },

  study: {
    id: 'study',
    name: 'The Composer\'s Study',
    chapter: 'melody',
    atmosphere: 'tension',

    description: `
      This is where Edmund Ashworth created.

      A small room, intimate, with a window overlooking the frozen garden.
      A desk covered in manuscript paper. A smaller piano - an upright,
      worn from use. Photographs on the walls of performances, collaborators,
      moments of triumph.

      And in the center of the desk, a leather-bound journal, still open
      to its final entry.

      The silence here is different. Not oppressive but... waiting.
      Patient. As if this room knows that you were always meant to come here,
      and it has been holding its breath for ten years awaiting this moment.

      On the music stand of the upright piano: the incomplete final page
      of "The Silence Breaker."
    `,

    lesson: 'melody',

    interactables: {
      journal: {
        name: 'Ashworth\'s Journal',
        examined: false,
        description: `
          You read the final entry:

          "October 14th.

          I understand now what the Silence wants. It is not malevolent.
          It is a question, waiting for an answer.

          All my life I have composed - intervals, modes, harmonies. But I have
          been assembling pieces without seeing the whole. Tonight, I will
          attempt to complete The Silence Breaker. If I succeed, this manor
          will live again. If I fail...

          The melody is the key. Not the individual notes but how they CONNECT.
          The contour. The shape. The journey from tension to release.

          To whoever finds this: the door to the tower requires the melody's
          final phrase. Seven notes that answer the silence's question.
          I believe I know them now.

          I am going to the tower.

          E.A."

          He never returned from the tower. But perhaps you can finish what he started.
        `,
        reveals: 'The tower holds the final truth.',
      },
      incomplete_score: {
        name: 'The Incomplete Score',
        examined: false,
        description: `
          "The Silence Breaker" - the masterpiece that was never performed.

          It is beautiful, even on paper. You can almost hear it:

          The first movement uses intervals to establish vocabulary.
          The second explores the seven modes, each a different emotion.
          The third builds harmonies, voices weaving together.
          The fourth movement... incomplete. It requires a melody.

          Not just any melody. THE melody. The one that ties everything together.

          The notes are here - he knew them - but the THREAD connecting them
          is missing. That final phrase that would complete the journey.

          You must learn how melodies work. How they tell stories. How they
          find their way home.
        `,
        teaches: 'melody',
        unlocks: 'lesson_melody',
      },
      photographs: {
        name: 'The Photographs',
        examined: false,
        description: `
          You study the photographs more carefully.

          Ashworth with his string quartet.
          Ashworth at a grand piano, mid-performance.
          Ashworth... alone, in this very room, looking at something out of frame.

          In every photo where he's alone, he's looking toward the same spot.
          Following his gaze, you realize he's looking at the ceiling.

          At the tower, above.

          The last photograph is different. Taken from outside the manor,
          at night. The tower window is lit. A figure stands there, arms raised
          as if conducting. The sky behind is full of stars that seem to form
          patterns. Musical patterns.

          Whatever Ashworth was conducting in that tower, it wasn't music.
          It was the silence itself. He was trying to give it voice.
        `,
      },
    },

    exits: {
      west: { to: 'upstairs_hall', description: 'Return to the upper hall.' },
    },

    onComplete: {
      message: 'You understand melody now. Not just as notes, but as narrative. The tower door mechanism glows faintly.',
      unlocks: ['lesson_melody', 'tower'],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 6: THE TOWER - REVELATION
  // ═══════════════════════════════════════════════════════════════════════════
  tower: {
    id: 'tower',
    name: 'The Tower',
    chapter: 'revelation',
    atmosphere: 'discovery',

    description: `
      The tower room is circular, its walls lined with windows that reveal
      a sky somehow more alive than any you've seen since entering the manor.
      Stars move. Clouds shift. The frozen twilight ends here.

      In the center of the room, Edmund Ashworth's final instrument:
      not a piano, not strings, but a mechanism unlike anything you've seen.
      A spherical array of crystals, each tuned to a different frequency.
      A conductor's podium facing the apparatus.

      And on the floor, undisturbed for ten years, the chalk outline of
      where a man once stood, arms raised to the sky.

      There is no body. There was never a body.

      But there is a presence. The silence here is not absence but ATTENTION.
      Something vast and patient and utterly inhuman has been waiting for someone
      who speaks its language.

      Someone who understands music.

      The crystal mechanism hums with potential. A final tablet of instructions
      rests on the conductor's podium:

      "The Silence is not our enemy. It is our invitation.
       Play the song. Complete what I could not.
       And learn why music matters."
    `,

    interactables: {
      equation_tablet: {
        name: 'The Golden Tablet',
        examined: false,
        description: `
          Beside the crystal mechanism, a small golden tablet bears an equation:

          M = B × L^n × φ^(-d)

          Below it, Ashworth's notes explain:

          "The Universal Growth Function - the mathematics of memorability.

          M = Meaning (how memorable your melody becomes)
          B = Brick (the initial impact of your composition)
          L = Love (the emotional coefficient - how much heart it has)
          n = Iterations (how many times it's heard)
          d = Distance (cultural gap between creator and listener)
          φ = The Golden Ratio (1.618...)

          THE LIFE INEQUALITY: L^n > φ^d

          When Growth (L^n) exceeds Decay (φ^d), the melody becomes
          AUTOPOIETIC - self-sustaining, unforgettable, eternal.

          When they're equal, the melody is HOMEOSTATIC - stable, pleasant.

          When Decay wins, the melody is ENTROPIC - it fades and is forgotten.

          This is why some melodies stick in your head forever while others
          vanish the moment they end. It's not magic. It's mathematics.

          Your melody must GROW faster than it FADES."
        `,
        teaches: 'generative',
        unlocks: 'lesson_generative',
      },
      crystal_mechanism: {
        name: 'The Crystal Mechanism',
        examined: false,
        description: `
          As you approach, you understand. This is an instrument for playing
          not just notes, but the underlying patterns that connect them.

          Intervals. Modes. Chords. Melody.

          Everything you've learned in this manor comes together here.
          Each crystal responds to a different musical concept, and together
          they can create...

          Not just a song. A conversation. With the silence itself.

          The mechanism awaits your composition. Your Silence Breaker.
          The golden tablet nearby will analyze your melody's memorability.
        `,
        interactive: true,
        type: 'song_builder',
      },
      chalk_outline: {
        name: 'The Chalk Outline',
        examined: false,
        description: `
          You kneel by the outline. It's the shape of a man mid-gesture,
          arms raised as if reaching for something just beyond grasp.

          Or perhaps... as if being lifted. Ascending.

          There's no sign of violence. No sign of struggle. The outline
          suggests someone who simply... stepped into something larger than
          themselves and never stepped back.

          Beside the outline, written in the same chalk: "Not death. Transformation."

          Edmund Ashworth didn't disappear. He became something else.
          But the transformation was incomplete because the song was incomplete.

          Until now.
        `,
      },
      final_instructions: {
        name: 'The Final Instructions',
        examined: false,
        description: `
          You read Ashworth's final words:

          "To my successor:

          You have learned the language of music:
          - Intervals: the vocabulary of emotion
          - Modes: the seven colors of feeling
          - Chords: voices in conversation
          - Melody: the thread that tells the story

          Now use them. Compose the final movement of The Silence Breaker.

          The Silence is not emptiness. It is potential - the moment before
          the music begins. All of creation is a song waiting to be sung.

          I could not complete it alone. I needed someone to learn what I knew,
          then add what I could not. Your unique perspective. Your understanding.

          Play the sequence. Break the silence. Set the music - and me - free.

          Thank you for coming.

          Edmund Ashworth"
        `,
      },
    },

    exits: {
      down: { to: 'upstairs_hall', description: 'Descend from the tower.' },
    },

    onComplete: {
      message: 'The song is complete. The crystals ring with frequencies beyond hearing. And somewhere, Edmund Ashworth smiles.',
      reveals: 'ending',
    },
  },
}

// =============================================================================
// LESSON CONTENT
// =============================================================================

export const LESSONS = {
  notes: {
    id: 'notes',
    title: 'The Foundation: Notes',
    room: 'entrance',
    content: `
      Before music, there is sound. Before chords and melodies, there is the single note.

      In Western music, we use twelve notes, repeating in higher and lower octaves:
      C, C#, D, D#, E, F, F#, G, G#, A, A#, B

      Each note has a frequency - a specific vibration of the air. "A" above middle C
      vibrates at 440 times per second (440 Hz). Every time you double the frequency,
      you go up one octave (same note, higher pitch).

      The piano keyboard makes this visible: white keys are the "natural" notes (A-G),
      black keys are the "sharps" and "flats" between them.

      Try playing some notes. Listen to how each has its own character.
      This is where all music begins.
    `,
    interactive: 'piano',
  },

  intervals: {
    id: 'intervals',
    title: 'The Vocabulary: Intervals',
    room: 'music_room',
    content: `
      An INTERVAL is the distance between two notes. It's measured in "semitones"
      (half-steps) - the smallest distance on a piano keyboard.

      Each interval has its own emotional quality:

      • Minor 2nd (1 semitone): Tension, dissonance - think "Jaws"
      • Major 2nd (2 semitones): Movement, stepping forward
      • Minor 3rd (3 semitones): Sadness, longing - the "minor" feeling
      • Major 3rd (4 semitones): Joy, brightness - the "major" feeling
      • Perfect 4th (5 semitones): Anticipation, openness - "Here Comes the Bride"
      • Tritone (6 semitones): Unrest, the devil's interval
      • Perfect 5th (7 semitones): Power, stability - power chords
      • Minor 6th (8 semitones): Yearning, bittersweet
      • Major 6th (9 semitones): Warmth, nostalgia
      • Minor 7th (10 semitones): Blues, sophistication
      • Major 7th (11 semitones): Dreamy, ethereal
      • Octave (12 semitones): Completion, unity - "Somewhere Over the Rainbow"

      Understanding intervals is like learning the alphabet before writing.
      Every melody, every chord is built from these emotional building blocks.
    `,
    interactive: 'interval_explorer',
  },

  modes: {
    id: 'modes',
    title: 'The Seven Colors: Modes',
    room: 'library',
    content: `
      A SCALE is a collection of notes that "go together" - they create a
      consistent mood. A MODE is a way of arranging those notes.

      The seven modes all use the same seven notes, but start in different places,
      creating completely different emotional palettes:

      IONIAN (Major Scale):
      The sound of uncomplicated happiness. Disney, pop songs, victory themes.
      Pattern: whole-whole-half-whole-whole-whole-half

      DORIAN:
      Minor but with a hopeful twist. Cool, sophisticated, mysterious.
      Think "Scarborough Fair" or "Eleanor Rigby".

      PHRYGIAN:
      Exotic, ancient, Spanish-flavored. The lowered 2nd creates instant mystery.
      Flamenco music lives here.

      LYDIAN:
      Floating, dreamy, magical. The raised 4th creates an otherworldly feel.
      Film scores use this for wonder and magic.

      MIXOLYDIAN:
      Bluesy, rock and roll, earthy. Major but with attitude.
      "Sweet Home Alabama" territory.

      AEOLIAN (Natural Minor):
      Pure sadness, unadorned. The standard "sad" scale.
      When you want honest emotion without complexity.

      LOCRIAN:
      Unstable, disturbing, rarely used. Nothing feels resolved.
      Reserved for nightmares and unease.

      Each mode is a different emotional lens. Learn to hear them.
    `,
    interactive: 'mode_explorer',
  },

  chords: {
    id: 'chords',
    title: 'Voices Together: Chords',
    room: 'conservatory',
    content: `
      A CHORD is three or more notes played simultaneously. While intervals are
      the vocabulary, chords are the sentences.

      The basic chords (TRIADS) are built by stacking two intervals:

      MAJOR TRIAD: Root + Major 3rd + Minor 3rd
      = Happy, bright, stable. The "good guy" chord.

      MINOR TRIAD: Root + Minor 3rd + Major 3rd
      = Sad, serious, introspective. The "emotional depth" chord.

      DIMINISHED TRIAD: Root + Minor 3rd + Minor 3rd
      = Tense, scary, unstable. The "villain" chord.

      AUGMENTED TRIAD: Root + Major 3rd + Major 3rd
      = Dreamlike, strange. The "something's not quite right" chord.

      Adding a fourth note creates SEVENTH CHORDS:

      MAJOR 7th: Happy with sophistication
      MINOR 7th: Sad with coolness
      DOMINANT 7th: Tension demanding resolution

      SUSPENDED chords replace the 3rd:
      Sus4: Anticipation (neither major nor minor)
      Sus2: Open, ambiguous, fresh

      Chords are how we create harmony - multiple voices speaking together,
      creating meanings none could achieve alone.
    `,
    interactive: 'chord_builder',
  },

  melody: {
    id: 'melody',
    title: 'The Thread: Melody',
    room: 'study',
    content: `
      MELODY is what you hum, what you remember, what makes a song a song.
      It's a sequence of notes that tells a story.

      The principles of memorable melody:

      CONTOUR: The shape of the melody matters.
      Good melodies often rise to a climax, then fall to resolution.
      Think of them as having a "shape" you can draw.

      STEPWISE MOTION: Most of a melody moves by small intervals (2nds).
      Like walking - it feels natural.

      LEAPS: Occasional big jumps create drama and catch attention.
      But leap too much and it becomes hard to follow.

      REPETITION: The brain loves patterns.
      Repeat phrases (with small variations) to make them stick.

      SEQUENCE: The same phrase at different pitch levels
      creates momentum and development.

      CLIMAX: Build toward a peak of intensity.
      Then release. The climax should feel earned.

      RESOLUTION: Melodies need to "come home."
      Tension and release. Question and answer.

      A great melody is a journey with a beginning, middle, and end.
      It takes the listener somewhere - and brings them safely back.
    `,
    interactive: 'melody_builder',
  },

  generative: {
    id: 'generative',
    title: 'The Mathematics of Memory',
    room: 'tower',
    content: `
      Edmund Ashworth discovered something profound: memorable music follows
      a mathematical pattern. He called it the GENERATIVE EQUATION:

      M = B × L^n × φ^(-d)

      WHERE:
      • M = MEANING - How memorable and impactful the melody becomes
      • B = BRICK - The initial "seed" of impact (your composition's foundation)
      • L = LOVE - The emotional coefficient (1.0 to 2.0 range)
      • n = ITERATIONS - How many times it's heard/repeated
      • φ = PHI - The Golden Ratio (1.618...)
      • d = DISTANCE - Cultural/contextual gap to overcome

      THE LIFE INEQUALITY: L^n > φ^d

      This is the key to memorability. Your melody GROWS through Love
      and repetition (L^n), but must overcome natural DECAY (φ^d).

      • UNFORGETTABLE: When growth exceeds decay, the melody persists forever
      • STABLE: When they're balanced, the melody holds steady
      • FORGETTABLE: When decay wins, the melody fades into nothing

      HOW TO COMPOSE MEMORABLY:

      HIGH LOVE (L) comes from:
      • Major 3rds and 6ths (intervals of emotional warmth)
      • Perfect 5ths and 4ths (stability and consonance)
      • Resolved tension (movement that feels satisfying)

      LOW LOVE comes from:
      • Too much dissonance without resolution
      • Intervals that feel cold or unresolved
      • Lack of emotional contour

      The silence you've felt in this manor? It represents maximum decay
      with zero growth. Music - emotional, living music - is the antidote.

      Your melody must GROW FASTER THAN IT FADES.
    `,
    interactive: 'equation_visualizer',
  },
}

// =============================================================================
// GAME STATE
// =============================================================================

export const INITIAL_STATE = {
  currentRoom: 'entrance',
  chapter: 'arrival',
  completedLessons: [],
  examinedItems: {},
  unlockedRooms: ['entrance', 'music_room'],
  songFragments: [],
  silenceLevel: 100, // 0 = silence broken, 100 = full silence
  gameStarted: false,
  gameComplete: false,
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  STORY,
  ROOMS,
  LESSONS,
  INITIAL_STATE,
}
