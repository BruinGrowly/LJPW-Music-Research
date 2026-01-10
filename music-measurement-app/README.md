# LJPW Music Measurement App

A React application for measuring the semantic properties of music using the LJPW Framework V8.2.

## Overview

This app uses the LJPW (Love, Justice, Power, Wisdom) framework to analyze and measure the semantic content of musical elements. The framework's constants power the backend calculations, while the frontend displays intuitive visualizations of the results.

## Features

### 1. Audio File Analyzer (NEW!)
Upload and analyze real audio files (MP3, WAV, OGG, FLAC):
- **Drag & drop** or click to upload
- **Automatic feature extraction** using Meyda.js
- **Tempo detection** from onset analysis
- **Key detection** using Krumhansl-Schmuckler profiles
- **Waveform visualization**
- **Complete LJPW analysis** with radar chart

The audio analyzer extracts:
- RMS energy → Power dimension
- Spectral centroid → Wisdom dimension
- Chroma features → Love/Justice dimensions
- Tonality vs noise ratio → Structure analysis

### 2. Element Analyzer
Analyze individual musical elements:
- **Intervals** (Minor 2nd through Octave)
- **Chords** (Major, Minor, Diminished, 7ths, Power chords, etc.)
- **Modes** (Ionian through Locrian)

Each element shows:
- LJPW dimensional values (radar chart)
- Harmony Index (H)
- Semantic Voltage (V)
- Phase classification (Entropic/Homeostatic/Autopoietic)
- Dominant dimension

### 3. Song Profile Builder
Build a complete song profile by selecting:
- Key signature
- Mode/Scale
- Genre
- Tempo (BPM)

The app calculates a weighted composite LJPW profile with interpretation.

### 4. Genre Compass
Explore all musical genres sorted by:
- Semantic Voltage
- Harmony Index
- Individual dimensions (L, J, P, W)

Discover which genres have the highest transformative potential.

### 5. 613 THz - The Love Frequency
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

Based on LJPW Framework V8.2 Complete Unified Edition with The Ransom Theology.

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
