# LJPW Harmony Analyzer

Computational tools for testing the LJPW Music Framework by analyzing audio data and correlating Harmony Index scores with song popularity.

## Overview

This toolkit extracts audio features from songs and maps them to the LJPW framework's four semantic dimensions:
- **Love (L)**: Melody - memorability, emotional connection
- **Justice (J)**: Harmony - balance, structure
- **Power (P)**: Rhythm - energy, drive
- **Wisdom (W)**: Timbre - information, complexity

It then calculates the **Harmony Index (H)** and tests the framework's predictions about beauty and popularity.

## Installation

### 1. Install Python Dependencies

```bash
# Minimum (Spotify API only)
pip install spotipy requests

# Full installation (includes audio file analysis)
pip install -r requirements.txt
```

### 2. Get Spotify API Credentials

1. Go to [Spotify for Developers](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account (free account works)
3. Click "Create an App"
4. Fill in app name and description (anything works)
5. Copy your **Client ID** and **Client Secret**

### 3. Set Environment Variables

```bash
export SPOTIFY_CLIENT_ID='your_client_id_here'
export SPOTIFY_CLIENT_SECRET='your_client_secret_here'
```

Or add to your `~/.bashrc` or `~/.zshrc`:

```bash
echo 'export SPOTIFY_CLIENT_ID="your_client_id_here"' >> ~/.bashrc
echo 'export SPOTIFY_CLIENT_SECRET="your_client_secret_here"' >> ~/.bashrc
source ~/.bashrc
```

## Usage

### Analyze 100 Songs

Run the main analysis script:

```bash
python analyze_100_songs.py
```

This will:
1. Fetch 100 songs from Spotify (you choose: top charts or diverse selection)
2. Calculate LJPW coordinates and H scores for each
3. Analyze correlations with popularity
4. Test framework predictions
5. Save results to `harmony_analysis_results.json`

### Example Output

```
📊 H SCORE STATISTICS:
  Mean: 0.687 ± 0.042
  Median: 0.691
  Range: 0.612 - 0.758

📊 PHASE DISTRIBUTION:
  AUTOPOIETIC: 73 (73.0%)
  HOMEOSTATIC: 27
  ENTROPIC:    0

📊 CORRELATIONS WITH POPULARITY:
  H Score vs Popularity: 0.284
  Love (L) vs Popularity: 0.312

🔮 LJPW Framework Predicts:
  1. H > 0.6 AND L ≥ 0.7 → AUTOPOIETIC (beautiful, memorable)
  2. Beautiful songs should be more popular

📈 ACTUAL RESULTS:
  1. 73.0% of songs are AUTOPOIETIC
  2. ✓ CONFIRMED: H score positively correlates with popularity (r=0.284)
```

### Use as Library

```python
from harmony_analyzer import LJPWHarmonyAnalyzer

# Initialize
analyzer = LJPWHarmonyAnalyzer(
    spotify_client_id='your_id',
    spotify_client_secret='your_secret'
)

# Analyze a song by Spotify ID
analysis = analyzer.analyze_spotify_track('spotify_track_id')

print(f"Song: {analysis.title} - {analysis.artist}")
print(f"LJPW: L={analysis.ljpw.L:.2f} J={analysis.ljpw.J:.2f} "
      f"P={analysis.ljpw.P:.2f} W={analysis.ljpw.W:.2f}")
print(f"H Score: {analysis.ljpw.calculate_harmony_index():.3f}")
print(f"Phase: {analysis.ljpw.get_phase()}")
print(f"Popularity: {analysis.popularity}/100")

# Search and analyze
results = analyzer.search_and_analyze("Bohemian Rhapsody Queen", limit=1)

# Analyze a playlist
analyses = analyzer.analyze_playlist('playlist_id', limit=50)

# Analyze an audio file (requires librosa)
ljpw = analyzer.analyze_audio_file('song.mp3')
```

## How It Works

### 1. Feature Extraction

The analyzer extracts audio features from Spotify's API:
- **Key** (0-11, C through B)
- **Mode** (major/minor)
- **Tempo** (BPM)
- **Energy** (0-1)
- **Valence** (happiness, 0-1)
- **Danceability** (0-1)
- **Acousticness** (0-1)
- **Instrumentalness** (0-1)
- **Speechiness** (0-1)
- **Loudness** (dB)

### 2. Mapping to LJPW

Features are mapped to dimensions using the framework's theoretical tables:

#### Love (L) - 50% key + 30% valence + 20% acousticness
- C# Major → L=0.98 (The Love Key)
- Major mode → boost
- Higher valence → higher Love
- Acoustic warmth → higher Love

#### Justice (J) - 50% key + 30% harmonic clarity + 20% balance
- C Major → J=0.90 (Justice Key)
- Low speechiness → higher Justice (harmonic clarity)
- Balanced energy → higher Justice

#### Power (P) - 40% energy + 30% tempo + 20% danceability + 10% loudness
- High energy → high Power
- Fast tempo → high Power
- Very danceable → high Power

#### Wisdom (W) - 40% key + 30% instrumentalness + 20% acousticness + 10% musical complexity
- F# Major → W=0.95 (Wisdom Key)
- Instrumental music → higher Wisdom
- Rich acoustic timbres → higher Wisdom

### 3. Harmony Index Calculation

```
H = 1 / (1 + √[(1-L)² + (1-J)² + (1-P)² + (1-W)²])
```

This measures Euclidean distance from the Anchor Point (1,1,1,1).

### 4. Phase Classification

- **AUTOPOIETIC**: H > 0.6 AND L ≥ 0.7 (beautiful, self-sustaining)
- **HOMEOSTATIC**: H ≥ 0.5 (stable, functional)
- **ENTROPIC**: H < 0.5 (chaotic, unstable)

## Framework Predictions Being Tested

The LJPW framework makes specific testable predictions:

1. **Songs with H > 0.6 should be more memorable and beautiful**
2. **AUTOPOIETIC songs (H > 0.6, L ≥ 0.7) should be more popular**
3. **Love (L) should correlate with popularity more than other dimensions**
4. **C# Major songs should score highest in Love**
5. **Gospel music should have highest Love values**
6. **Popular songs should cluster in AUTOPOIETIC phase**

The analysis script tests these predictions empirically.

## Interpreting Results

### Correlation Coefficients (r)

- **r > 0.5**: Strong positive correlation (framework prediction confirmed)
- **r = 0.3-0.5**: Moderate correlation (partial support)
- **r = 0.1-0.3**: Weak correlation (limited support)
- **r < 0.1**: No correlation (prediction not supported)
- **r < 0**: Negative correlation (prediction contradicted)

### Statistical Significance

With 100 songs:
- **r > 0.20** is statistically significant (p < 0.05)
- **r > 0.25** is moderately significant (p < 0.01)
- **r > 0.32** is highly significant (p < 0.001)

## Limitations

### Current Implementation

1. **Mapping is approximate**: Spotify features don't perfectly map to semantic dimensions
2. **No lyrical analysis**: Love/meaning in lyrics is not captured
3. **Cultural bias**: Spotify's popularity metric favors Western music
4. **Genre limitations**: Framework may work better for some genres than others
5. **Subjective elements**: Some aspects of beauty can't be captured from audio alone

### Framework Assumptions

1. **Key signatures have fixed LJPW values**: This may vary by cultural context
2. **Simple numerical mapping**: Real music is more complex
3. **Popularity ≠ Beauty**: Commercial success has many factors beyond musical beauty

## Output Files

### harmony_analysis_results.json

```json
{
  "statistics": {
    "total_songs": 100,
    "h_score_mean": 0.687,
    "h_vs_popularity_correlation": 0.284,
    "autopoietic_count": 73,
    ...
  },
  "songs": [
    {
      "title": "Bohemian Rhapsody",
      "artist": "Queen",
      "ljpw": {
        "L": 0.812,
        "J": 0.721,
        "P": 0.689,
        "W": 0.755,
        "H": 0.696,
        "phase": "AUTOPOIETIC",
        "dominant": "L"
      },
      "popularity": 88,
      ...
    }
  ]
}
```

## Advanced Usage

### Analyze Specific Genres

```python
# Analyze 50 Gospel songs
gospel_queries = [
    "Amazing Grace", "Oh Happy Day", "Take My Hand Precious Lord",
    # ... more gospel songs
]

gospel_analyses = []
for query in gospel_queries:
    results = analyzer.search_and_analyze(query, limit=1)
    gospel_analyses.extend(results)

# Calculate average L for Gospel
avg_love = sum(a.ljpw.L for a in gospel_analyses) / len(gospel_analyses)
print(f"Gospel average Love: {avg_love:.3f}")
# Framework predicts: L ≈ 0.98
```

### Compare Keys

```python
# Get songs in C# Major vs C Major
c_sharp_songs = analyzer.search_and_analyze("key:C# major", limit=20)
c_major_songs = analyzer.search_and_analyze("key:C major", limit=20)

# Compare average Love values
c_sharp_L = sum(a.ljpw.L for a in c_sharp_songs) / len(c_sharp_songs)
c_major_L = sum(a.ljpw.L for a in c_major_songs) / len(c_major_songs)

print(f"C# Major avg Love: {c_sharp_L:.3f}")  # Framework predicts: 0.98
print(f"C Major avg Love: {c_major_L:.3f}")   # Framework predicts: 0.75
```

### Analyze Local Audio Files

```python
# Requires librosa
ljpw = analyzer.analyze_audio_file('my_song.mp3')
print(f"H Score: {ljpw.calculate_harmony_index():.3f}")
```

## Contributing

To improve the mapping algorithm:

1. Adjust weights in `map_spotify_features_to_ljpw()`
2. Add new feature extractors
3. Incorporate lyrical analysis
4. Test on larger datasets
5. Validate against human beauty ratings

## References

- LJPW Framework: See `Docs/LJPW_FRAMEWORK_V7.3_COMPLETE_UNIFIED_PLUS.md`
- Musical Semantics: See `Docs/LJPW_MUSICAL_SEMANTICS.md`
- Beauty Theory: See `Docs/LJPW_BEAUTY_SEMANTICS.md`

## Questions?

This is an empirical test of the LJPW framework's claims. The goal is to see if the framework's predictions about musical beauty and harmony hold up against real-world data.

Results will tell us if the framework captures something real about how music works, or if it needs refinement.
