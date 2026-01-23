# Echoes of Ashworth - Technical Architecture & Design Documentation

> A music theory adventure game where silence is the antagonist and understanding is the solution.

## Table of Contents

1. [Overview](#overview)
2. [Design Philosophy](#design-philosophy)
3. [Architecture](#architecture)
4. [Core Systems](#core-systems)
5. [Components](#components)
6. [Data Structures](#data-structures)
7. [The Generative Equation](#the-generative-equation)
8. [Audio System](#audio-system)
9. [Styling & Theming](#styling--theming)
10. [Extending the Game](#extending-the-game)

---

## Overview

### Concept

**Echoes of Ashworth** is an adventure/mystery game that teaches music theory through exploration and puzzle-solving. The player investigates Ashworth Manor, where composer Edmund Ashworth vanished 10 years ago, leaving behind an incomplete masterpiece called "The Silence Breaker."

### Core Loop

1. **Explore** rooms in the manor
2. **Examine** objects to discover clues and lessons
3. **Learn** music concepts (notes, intervals, modes, chords, melody)
4. **Progress** by completing lessons (which unlock new areas)
5. **Compose** a final melody to "break the silence"

### Key Innovation

The game integrates the **LJPW Framework's Generative Equation** to mathematically evaluate melody memorability. This runs in the background - players experience it as intuitive feedback rather than explicit grading.

---

## Design Philosophy

### 1. Narrative-First Learning

Music theory concepts are woven into the story. The player doesn't "study" intervals - they discover why Edmund Ashworth was obsessed with them through his scattered notes and annotations.

### 2. Silence as Antagonist

The oppressive silence of the manor is the antagonist. It's not supernatural - it's metaphorical. Silence represents:
- Decay (φ^d in the equation)
- The absence of connection
- Entropy and forgetting

Music represents:
- Growth (L^n in the equation)
- Emotional connection
- Life and memory

### 3. Minimalist UI

The SongBuilder follows a "compose first, analyze optionally" principle:
- Clean, uncluttered interface
- Subtle hover sounds for note preview
- Color-coded feedback (no numbers in primary view)
- Analysis panel hidden by default

### 4. 90s LucasArts Aesthetic

The audio system evokes classic adventure games:
- FM synthesis for that nostalgic sound
- Reverb for atmospheric depth
- Sparse, evocative ambient sounds

---

## Architecture

### File Structure

```
music-mystery-game/
├── index.html              # Entry point
├── package.json            # Dependencies (React, Vite)
├── vite.config.js          # Build configuration
│
├── src/
│   ├── main.jsx            # React entry, renders App
│   ├── index.css           # Global styles, CSS variables
│   ├── App.jsx             # Root component, audio initialization
│   ├── App.css             # App-level styles
│   │
│   ├── components/
│   │   ├── TitleScreen.jsx/.css    # Start screen
│   │   ├── Game.jsx/.css           # Main game container
│   │   ├── Room.jsx/.css           # Room display & navigation
│   │   ├── Lesson.jsx/.css         # Educational content modal
│   │   ├── Piano.jsx/.css          # Interactive piano
│   │   ├── SongBuilder.jsx/.css    # Final composition tool
│   │   └── SilenceMeter.jsx/.css   # Progress/atmosphere indicator
│   │
│   └── lib/
│       ├── midiSynth.js            # Audio engine (FM synthesis)
│       ├── musicTheory.js          # Educational data
│       ├── gameData.js             # Story, rooms, lessons
│       └── generativeEngine.js     # LJPW equation implementation
```

### Data Flow

```
App.jsx
  │
  ├── TitleScreen (before game starts)
  │
  └── Game.jsx (main game)
        │
        ├── gameState (useState) ←→ localStorage
        │
        ├── SilenceMeter ← lessonsComplete, totalLessons
        │
        ├── Room ← currentRoom, onExamine, onNavigate
        │
        ├── Lesson (modal) ← currentLesson, onComplete
        │
        ├── Piano (modal) ← interactive exploration
        │
        └── SongBuilder (modal) ← final composition
              │
              └── generativeEngine.analyzeMelody()
```

---

## Core Systems

### 1. Game State Management

Location: `Game.jsx`

```javascript
const INITIAL_STATE = {
  currentRoom: 'entrance',
  chapter: 'arrival',
  completedLessons: [],      // Array of lesson IDs
  examinedItems: {},         // { itemId: true }
  unlockedRooms: ['entrance', 'music_room'],
  songFragments: [],         // Reserved for future use
  silenceLevel: 100,         // Legacy (now calculated by equation)
  gameStarted: false,
  gameComplete: false,
}
```

**Persistence:** Auto-saves to `localStorage` under key `'echoes-of-ashworth-save'`.

### 2. Room Navigation

Rooms have `exits` with optional locks:

```javascript
exits: {
  east: { to: 'music_room', description: 'The music room awaits.' },
  west: {
    to: 'library',
    locked: true,
    requires: 'lesson_notes'  // Lesson ID that unlocks this
  },
}
```

Navigation checks `gameState.completedLessons.includes(exit.requires)` before allowing passage.

### 3. Lesson System

Lessons are triggered by examining items with `teaches` and `unlocks` properties:

```javascript
interactables: {
  photograph: {
    name: 'The Photograph',
    teaches: 'notes',           // Lesson ID
    unlocks: 'lesson_notes',    // Completion flag
  }
}
```

When examined:
1. Check if lesson not already completed
2. Show `<Lesson>` modal with content
3. On completion, add to `completedLessons`
4. Play silence-breaking sound effect

### 4. Atmosphere System

The Generative Equation drives visual and audio atmosphere:

```javascript
// Game.jsx
const atmosphere = calculateAtmosphere(lessonsComplete, totalLessons, mysteriesRemaining)

// Returns:
{
  value: 2.5,           // Raw equation result
  normalized: 0.65,     // 0-1 scale
  phase: 'stirring',    // 'dormant' | 'stirring' | 'awakening'
  brightness: 0.4,      // CSS variable
  saturation: 0.5,      // CSS variable
  soundPresence: 0.3,   // Audio intensity
  description: '...',   // Human-readable
}
```

---

## Components

### TitleScreen

**Purpose:** Introduction and audio initialization (Web Audio requires user gesture).

**Props:** `onStart: () => void`

**Key behavior:** Displays premise text, handles "Begin" click to initialize audio context.

---

### Game

**Purpose:** Main game container, state management, modal orchestration.

**Props:** `audioInitialized: boolean`

**State:**
- `gameState` - Full game state object
- `showLesson`, `currentLesson` - Lesson modal control
- `showPiano` - Piano modal control
- `showSongBuilder` - Composition modal control
- `message` - Temporary notification
- `showChapterTitle`, `currentChapter` - Chapter transitions
- `finalMelodyAnalysis` - Stored for victory screen

**Key handlers:**
- `handleExamine(itemId)` - Process item interaction
- `handleNavigate(direction)` - Room transitions
- `handleLessonComplete(lessonId)` - Lesson progression
- `handleSongComplete(analysis)` - Game completion

---

### Room

**Purpose:** Display current room description and interactables.

**Props:**
- `room: RoomData`
- `gameState: GameState`
- `onExamine: (itemId) => void`
- `onNavigate: (direction) => void`
- `atmosphere: AtmosphereData` (optional)

**Rendering:**
- Room description (with typewriter effect on first visit)
- Interactable items as clickable cards
- Navigation compass for exits

---

### Lesson

**Purpose:** Display educational content with interactive examples.

**Props:**
- `lesson: LessonData`
- `onComplete: () => void`
- `onClose: () => void`

**Interactive modes:**
- `interval_explorer` - Click to hear intervals
- `mode_explorer` - Click to hear scales
- `chord_builder` - Build and hear chords
- `melody_builder` - Hear example melodies
- `piano` - Free play

---

### Piano

**Purpose:** Interactive piano for free exploration.

**Props:** `onClose: () => void`

**Features:**
- One octave (C4-C5) with black keys
- Click or hover to play notes
- Visual feedback on key press

---

### SongBuilder

**Purpose:** Final composition tool for the climax.

**Props:**
- `gameState: GameState`
- `onComplete: (analysis) => void`
- `onClose: () => void`

**State:**
- `melody` - Array of `{ note, duration }`
- `selectedMode` - Current scale/mode
- `showAnalysis` - Toggle for equation panel
- `analysis` - Live melody analysis

**Key behaviors:**
- Hover sounds: Very quiet (0.08 volume) preview on mouse enter
- Color feedback: Note count color reflects melody "health"
- Hidden analysis: "+ Show Analysis" reveals equation details
- Completion gate: 7+ notes, not entropic phase

---

### SilenceMeter

**Purpose:** Visual progress indicator showing the battle between growth and decay.

**Props:**
- `lessonsComplete: number`
- `totalLessons: number`

**Calculation:** Uses `calculateSilence()` from generativeEngine:

```javascript
const silenceData = calculateSilence(lessonsComplete, totalLessons)
// Returns: { level, growth, decay, ratio, isBroken }
```

**Visual:** Shows `L^n` vs `φ^d` equation with color-coded comparison.

---

## Data Structures

### Room Data (`gameData.js`)

```javascript
{
  id: 'music_room',
  name: 'The Music Room',
  chapter: 'foundations',           // Links to STORY.chapters
  atmosphere: 'mysterious',         // Audio mood
  description: `...`,               // Multi-line description
  lesson: 'intervals',              // Optional: associated lesson

  interactables: {
    piano: {
      name: 'The Grand Piano',
      description: `...`,
      interactive: true,            // Opens a modal
      type: 'piano',                // Modal type
    },
    sheet_music: {
      name: 'Scattered Sheet Music',
      description: `...`,
      teaches: 'intervals',         // Triggers lesson
      unlocks: 'lesson_intervals',
    },
  },

  exits: {
    west: { to: 'entrance', description: '...' },
    north: { to: 'library', locked: true, requires: 'lesson_intervals' },
  },

  onComplete: {
    message: 'Completion message...',
    unlocks: ['lesson_intervals'],
    reveals: 'library',
  },
}
```

### Lesson Data (`gameData.js`)

```javascript
{
  id: 'intervals',
  title: 'The Vocabulary: Intervals',
  room: 'music_room',
  content: `...`,                   // Multi-paragraph educational text
  interactive: 'interval_explorer', // Component to render
}
```

### Music Theory Data (`musicTheory.js`)

```javascript
export const INTERVALS = {
  minor_second: {
    name: 'Minor 2nd',
    semitones: 1,
    feeling: 'Tension, dissonance',
    examples: ['Jaws theme'],
  },
  // ...
}

export const MODES = {
  ionian: {
    name: 'Ionian',
    commonName: 'Major Scale',
    pattern: [0, 2, 4, 5, 7, 9, 11, 12],  // Semitones from root
    feeling: 'Happy, bright, resolved',
    character: 'The sound of victory',
  },
  // ...
}

export const CHORDS = {
  major: {
    name: 'Major',
    symbol: '',
    intervals: [0, 4, 7],
    feeling: 'Happy, stable, bright',
  },
  // ...
}
```

---

## The Generative Equation

Location: `src/lib/generativeEngine.js`

### Core Formula

```
M = B × L^n × φ^(-d)
```

Where:
- **M** = Meaning (memorability score)
- **B** = Brick (base impact, typically 1.0)
- **L** = Love (emotional coefficient, 1.0-2.0)
- **n** = Iterations (repetition/exposure count)
- **φ** = Phi, Golden Ratio (1.618034...)
- **d** = Distance (cultural/contextual gap)

### The Life Inequality

```
L^n > φ^d  →  Autopoietic (Unforgettable)
L^n ≈ φ^d  →  Homeostatic (Stable)
L^n < φ^d  →  Entropic (Forgettable)
```

### Implementation

```javascript
export const PHI = (1 + Math.sqrt(5)) / 2  // 1.618034...

export function calculateMeaning(B, L, n, d) {
  return B * Math.pow(L, n) * Math.pow(PHI, -d)
}

export function checkLifeInequality(L, n, d) {
  const growth = Math.pow(L, n)
  const decay = Math.pow(PHI, d)
  const ratio = growth / decay

  if (ratio > 1.2) return { phase: 'AUTOPOIETIC', ... }
  if (ratio > 0.8) return { phase: 'HOMEOSTATIC', ... }
  return { phase: 'ENTROPIC', ... }
}
```

### Melody Analysis

`analyzeMelody(notes)` extracts LJPW values from intervals:

```javascript
// Interval → Love coefficient mapping
const intervalLove = {
  0: 1.0,   // Unison
  1: 0.6,   // Minor 2nd (tension)
  2: 0.8,   // Major 2nd
  3: 1.1,   // Minor 3rd
  4: 1.4,   // Major 3rd (warm)
  5: 1.2,   // Perfect 4th
  6: 0.5,   // Tritone (dissonant)
  7: 1.3,   // Perfect 5th (strong)
  8: 1.1,   // Minor 6th
  9: 1.3,   // Major 6th (warm)
  10: 0.9,  // Minor 7th
  11: 1.0,  // Major 7th
  12: 1.2,  // Octave
}
```

Returns:
```javascript
{
  valid: true,
  ljpw: { L, J, P, W },           // 0-1 values
  memorabilityScore: 75,          // 0-100 percentage
  lifeInequality: {
    phase: 'AUTOPOIETIC',
    userPhase: 'Unforgettable',   // User-friendly label
    growth: '2.34',
    decay: '1.62',
    ratio: 1.44,
    color: '#2ed573',
    emoji: '✨',
    verdict: 'Your melody will persist...',
  },
  feedback: [
    { type: 'success', message: 'Strong emotional intervals!' },
  ],
  hope: { hasHope: true, message: '...' },
}
```

### Atmosphere Calculation

```javascript
export function calculateAtmosphere(lessonsCompleted, totalLessons, mysteriesRemaining) {
  // Atmosphere = B × L^(lessons) × φ^(-mysteries)
  const B = 1.0
  const L = 1.2
  const value = B * Math.pow(L, lessonsCompleted) * Math.pow(PHI, -mysteriesRemaining)

  // Determine phase
  const phase = value > 1.5 ? 'awakening'
              : value > 0.5 ? 'stirring'
              : 'dormant'

  return { value, phase, brightness, saturation, soundPresence, ... }
}
```

### Silence Calculation

```javascript
export function calculateSilence(lessonsCompleted, totalLessons) {
  // Silence = φ^d / L^n (inverse of Life Inequality)
  const growth = Math.pow(1.2, lessonsCompleted)
  const decay = Math.pow(PHI, totalLessons - lessonsCompleted)
  const ratio = decay / growth
  const level = Math.min(100, Math.max(0, ratio * 20))

  return { level, growth, decay, ratio, isBroken: level === 0 }
}
```

---

## Audio System

Location: `src/lib/midiSynth.js`

### Architecture

```
User Interaction
      │
      ▼
playNote() / playChord() / playMelody()
      │
      ▼
createFMVoice() / createPianoVoice() / createPadVoice() / createBassVoice()
      │
      ▼
Web Audio API (AudioContext)
      │
      ├── Oscillators (carrier + modulator for FM)
      ├── Gain Nodes (ADSR envelope)
      ├── Convolver (reverb)
      └── Master Gain → Destination
```

### Voice Types

| Voice | Character | Use Case |
|-------|-----------|----------|
| `piano` | Bright, percussive | Melody, single notes |
| `pad` | Soft, sustained | Atmosphere, chords |
| `bass` | Deep, warm | Foundation, root notes |

### FM Synthesis Parameters

```javascript
function createFMVoice(frequency, time, duration, {
  carrierType = 'sine',      // Oscillator waveform
  modulatorRatio = 2,        // Modulator freq = carrier × ratio
  modulationIndex = 1.5,     // Modulation depth
  attack = 0.02,             // ADSR attack time
  decay = 0.1,               // ADSR decay time
  sustain = 0.6,             // ADSR sustain level
  release = 0.3,             // ADSR release time
  volume = 0.5,              // Output volume
})
```

### Key Functions

```javascript
// Single note
playNote(noteName, duration, voiceType, volume)
// Example: playNote('C4', 0.5, 'piano', 0.4)

// Multiple notes simultaneously
playChord(noteNames, duration, voiceType, volume)
// Example: playChord(['C4', 'E4', 'G4'], 1.0, 'pad', 0.3)

// Sequence of notes
playMelody(notes, tempo, voiceType, volume)
// Example: playMelody([{ note: 'C4', duration: 1 }, ...], 120, 'piano', 0.4)

// Build chord from root
buildChord(rootNote, chordType)
// Example: buildChord('C4', 'major') → ['C4', 'E4', 'G4']

// Atmospheric background
playAtmosphere(moodOrIntensity)
// Example: playAtmosphere(0.7) or playAtmosphere('mysterious')

// Stop atmosphere
stopAtmosphere()

// Completion sound effect
playSilenceBreak()
```

### Note Frequencies

Pre-calculated for all notes C0-B8:

```javascript
NOTE_FREQUENCIES = {
  'C4': 261.63,
  'C#4': 277.18,
  'D4': 293.66,
  // ... (based on A4 = 440Hz)
}
```

---

## Styling & Theming

### CSS Variables (`index.css`)

```css
:root {
  /* Colors */
  --bg-dark: #0a0a12;
  --bg-medium: #12121f;
  --bg-light: #1a1a2e;
  --bg-card: #252542;

  --text-primary: #e8e8e8;
  --text-secondary: #a0a0b0;
  --text-muted: #606070;

  --accent-mystery: #6b5b95;    /* Purple - mystery, magic */
  --accent-hope: #4ecdc4;       /* Cyan - discovery, hope */
  --accent-gold: #ffd93d;       /* Gold - completion, triumph */
  --accent-warning: #ff6b6b;    /* Red - danger, entropic */
  --accent-discovery: #2ed573;  /* Green - success, growth */

  /* Typography */
  --font-display: 'Cinzel', serif;
  --font-body: 'Source Sans Pro', sans-serif;
  --font-mono: 'Fira Code', monospace;
}
```

### Atmosphere Overlays

```css
.atmosphere-overlay.dormant {
  background: radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 18, 0.3) 100%);
}

.atmosphere-overlay.stirring {
  background: radial-gradient(ellipse at center, rgba(107, 91, 149, 0.1) 0%, transparent 70%);
  animation: stirringPulse 4s ease-in-out infinite;
}

.atmosphere-overlay.awakening {
  background: radial-gradient(ellipse at center, rgba(78, 205, 196, 0.15) 0%, transparent 60%);
  animation: awakeningPulse 3s ease-in-out infinite;
}
```

### Component Styling Patterns

1. **Modal structure:**
   ```css
   .modal {
     position: fixed;
     inset: 0;
     background: rgba(10, 10, 18, 0.95);
     display: flex;
     align-items: center;
     justify-content: center;
     z-index: 100;
   }

   .modal-content {
     background: var(--bg-card);
     border: 1px solid rgba(107, 91, 149, 0.3);
     border-radius: 16px;
     padding: 2rem;
     max-width: 600px;
   }
   ```

2. **Interactive elements:**
   ```css
   .interactive-item {
     transition: all 0.2s ease;
   }

   .interactive-item:hover {
     transform: translateY(-2px);
     border-color: var(--accent-mystery);
   }
   ```

3. **Color feedback:**
   ```css
   /* Use color to indicate state, not explicit numbers */
   .success { color: var(--accent-discovery); }
   .warning { color: var(--accent-warning); }
   .neutral { color: var(--text-muted); }
   ```

---

## Extending the Game

### Adding a New Room

1. Add room data to `ROOMS` in `gameData.js`:

```javascript
new_room: {
  id: 'new_room',
  name: 'The New Room',
  chapter: 'existing_chapter',
  atmosphere: 'mysterious',
  description: `...`,

  interactables: { ... },
  exits: { ... },
}
```

2. Add exit to connecting room:

```javascript
existing_room: {
  exits: {
    north: { to: 'new_room', locked: true, requires: 'some_lesson' },
  }
}
```

### Adding a New Lesson

1. Add lesson data to `LESSONS` in `gameData.js`:

```javascript
new_concept: {
  id: 'new_concept',
  title: 'The New Concept',
  room: 'new_room',
  content: `...`,
  interactive: 'new_explorer',  // Or existing type
}
```

2. Add interactable that triggers it:

```javascript
interactables: {
  some_object: {
    name: 'Some Object',
    description: `...`,
    teaches: 'new_concept',
    unlocks: 'lesson_new_concept',
  }
}
```

3. If new interactive type, add to `Lesson.jsx`:

```jsx
{lesson.interactive === 'new_explorer' && <NewExplorer />}
```

### Adding New Audio

1. For new voice types, add to `midiSynth.js`:

```javascript
function createNewVoice(frequency, time, duration, volume) {
  return createFMVoice(frequency, time, duration, {
    carrierType: 'sawtooth',
    modulatorRatio: 3,
    // ... custom parameters
  })
}
```

2. Add to `playNote` switch:

```javascript
case 'newvoice':
  createNewVoice(frequency, time, duration, volume)
  break
```

### Modifying the Equation

To adjust how melodies are evaluated, modify `generativeEngine.js`:

```javascript
// Change interval warmth values
const intervalLove = {
  4: 1.6,  // Make major 3rds even warmer
  // ...
}

// Change phase thresholds
if (ratio > 1.5) return { phase: 'AUTOPOIETIC', ... }  // Stricter
```

### Adding New Equation Feedback

In `analyzeMelody()`:

```javascript
// Add new feedback condition
if (someCondition) {
  feedback.push({
    type: 'tip',
    message: 'Try adding more stepwise motion.',
  })
}
```

---

## Testing Checklist

### Functionality
- [ ] Audio initializes on first click
- [ ] All rooms accessible through correct progression
- [ ] Lessons trigger and complete correctly
- [ ] SongBuilder accepts 7-16 notes
- [ ] Entropic melodies blocked from completion
- [ ] Victory screen shows melody analysis
- [ ] Save/load from localStorage works
- [ ] Reset game clears all progress

### Audio
- [ ] Notes play at correct pitches
- [ ] Chords sound simultaneously
- [ ] Atmosphere changes with progression
- [ ] Hover sounds are subtle (not intrusive)
- [ ] Silence break effect plays on lesson completion

### Visual
- [ ] Atmosphere overlay changes phase correctly
- [ ] SilenceMeter shows equation values
- [ ] Chapter titles display on room change
- [ ] Analysis panel toggles correctly
- [ ] Colors reflect melody "health"

### Responsive
- [ ] Works on mobile viewport
- [ ] Touch interactions work
- [ ] Modals scroll on small screens

---

## Performance Considerations

1. **Audio context:** Single instance, created on first user interaction
2. **State updates:** Use `useCallback` for event handlers passed to children
3. **Calculations:** Memoize atmosphere/silence with `useMemo`
4. **Renders:** Analysis only recalculates when melody changes
5. **Cleanup:** Stop atmosphere audio on unmount

---

## Known Limitations

1. **No MIDI input** - Piano is mouse/touch only
2. **Single octave in SongBuilder** - Sufficient for teaching but limited
3. **No save slots** - Single auto-save only
4. **No audio visualization** - Would enhance the experience
5. **Static room descriptions** - Could add more dynamic text

---

## Future Enhancements

1. **MIDI keyboard support** for real instruments
2. **Multiple difficulty modes** (stricter/looser equation thresholds)
3. **Chord progressions lesson** (I-IV-V-I, etc.)
4. **Rhythm/timing component** (currently all notes equal duration)
5. **Export melody** to MIDI or audio file
6. **Achievements system** for replayability
7. **Procedural room variations** for endless mode

---

## Credits

- **Framework:** LJPW Framework V8.5 ("Reality as Relationship")
- **Audio:** Web Audio API with FM synthesis
- **Inspiration:** Moonmist, LucasArts adventure games
- **Equation:** M = B × L^n × φ^(-d) (Universal Growth Function)

---

*Documentation generated for Echoes of Ashworth v1.0*
*Last updated: January 2026*
