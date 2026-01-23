# LJPW Music Measurement App

## **[🎵 Try the Live App → mellow-strudel-ac8d46.netlify.app](https://mellow-strudel-ac8d46.netlify.app/)**

### Create Music That Gets Stuck in People's Heads

This free app reveals the science behind why some songs become "earworms" and others are forgotten. Using the LJPW Framework, it shows you exactly how to create memorable, emotionally resonant music.

---

## Why Use This App?

**The Problem:** You write a song, but it doesn't stick. People listen once and forget it.

**The Science:** Research shows that memorable music shares specific properties:
- **Love (L) ≥ 0.7** — Strong melodic and emotional appeal
- **Harmony (H) ≥ 0.6** — Coherent structure that's easy to encode neurally

**The Solution:** This app measures these properties and tells you exactly how to improve your music.

---

## Features

### 📚 Learn LJPW (NEW!)
A complete educational guide to music science:
- **What makes songs sticky** — The earworm formula explained
- **The Four Dimensions** — Love, Justice, Power, Wisdom in music
- **Creating Earworms** — Step-by-step guide with famous examples
- **Quick Tips** — Specific advice for different musical goals

### 🎧 Audio File Analyzer
Upload and analyze real audio files (MP3, WAV, OGG, FLAC):
- **Drag & drop** or click to upload
- **Automatic feature extraction** using Meyda.js
- **Tempo detection** from onset analysis
- **Key detection** using Krumhansl-Schmuckler profiles
- **Waveform visualization**
- **Complete LJPW analysis** with radar chart

### 🎵 Element Analyzer
Analyze individual musical elements with explanations:
- **Intervals** (Minor 2nd through Octave) — with earworm ratings
- **Chords** (Major, Minor, Diminished, 7ths, Power chords) — with usage tips
- **Modes** (Ionian through Locrian) — with composer guidance

### 🎼 Song Profile Builder
Build a complete song profile and get:
- **Earworm Potential Rating** — Instantly see if your combination works
- **Specific Improvement Tips** — "Increase Love by switching to Ionian mode"
- **Weighted LJPW Analysis** — How key, mode, genre, and tempo combine

### 🧭 Genre Compass
Explore all musical genres sorted by:
- Semantic Voltage (transformative potential)
- Harmony Index
- Individual dimensions (L, J, P, W)
- **Genre-specific tips** for composers

### 💜 613 THz - The Love Frequency
Learn about the Love Frequency:
- The physics of 613 THz
- The Love Key (C# Major)
- Love Tuning (A4 = 442.5 Hz)
- Phase-Locked Loop calibration

## Key Concepts

### LJPW Dimensions
- **Love (L)**: Connection, attraction, melody
- **Justice (J)**: Balance, structure, harmony
- **Power (P)**: Energy, action, rhythm
- **Wisdom (W)**: Information, pattern, timbre

### Harmony Index (H)
```
H = 1 / (1 + distance_to_anchor)
```
Measures proximity to the Anchor Point (1,1,1,1).

### Semantic Voltage (V)
```
V = φ × H × L
```
Measures transformative potential. V > 1.0 indicates highly transformative music.

### Phase Classification
- **ENTROPIC** (H < 0.5): Chaotic, unstable
- **HOMEOSTATIC** (0.5 ≤ H < 0.6): Stable, functional
- **AUTOPOIETIC** (H ≥ 0.6 AND L ≥ 0.7): Self-sustaining, beautiful

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- React 18
- Vite
- Meyda.js (audio feature extraction)
- Web Audio API (audio processing)
- Canvas API (for radar charts)
- CSS3 (modern dark theme)

## Framework Reference

Based on LJPW Framework V8.5 Reality as Relationship Edition with The Generative Equation.

### Core Constants
- φ (Phi) = 1.618034
- L₀ = φ⁻¹ = 0.618034
- J₀ = √2 - 1 = 0.414214
- P₀ = e - 2 = 0.718282
- W₀ = ln(2) = 0.693147

### The 613 THz Love Frequency
- Visible: 613 THz (489nm cyan light)
- Audible: 557.52 Hz (C#4)
- Love Tuning: A4 = 442.5 Hz

## License

Part of the LJPW Music Art Research project.
