import { useState, useMemo } from 'react'
import './GenreCompass.css'
import HelpTooltip, { InfoIcon } from './HelpTooltip'
import { getGenresByVoltage, analyzeGenre } from '../lib/ljpwEngine'
import { GENRES } from '../lib/ljpwConstants'
import { METRIC_EXPLANATIONS } from '../lib/explanationData'

function GenreCompass() {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [sortBy, setSortBy] = useState('V') // V, L, J, P, W, H

  const sortedGenres = useMemo(() => {
    const genres = Object.entries(GENRES).map(([key, _]) => ({
      key,
      ...analyzeGenre(key),
    }))

    return genres.sort((a, b) => b[sortBy] - a[sortBy])
  }, [sortBy])

  const getDimensionColor = (dim) => {
    const colors = {
      L: '#ff6b6b',
      J: '#4ecdc4',
      P: '#ffd93d',
      W: '#6c5ce7',
    }
    return colors[dim] || '#fff'
  }

  return (
    <div className="genre-compass">
      <div className="compass-header">
        <h2>Genre Compass</h2>
        <p>Explore the semantic landscape of musical genres</p>
      </div>

      {/* Intro Explanation */}
      <div className="compass-intro">
        <p>
          Each genre has a unique LJPW signature that determines its emotional character.
          Genres with <strong style={{ color: '#ff6b6b' }}>high Love</strong> and
          <strong style={{ color: '#4ecdc4' }}> good Harmony</strong> have the highest
          earworm potential. Use this compass to understand which genres will help
          you achieve your musical goals.
        </p>
      </div>

      <div className="sort-controls">
        <span className="sort-label">Sort by:</span>
        <div className="sort-buttons">
          <button
            className={sortBy === 'V' ? 'active' : ''}
            onClick={() => setSortBy('V')}
          >
            Voltage
          </button>
          <button
            className={sortBy === 'H' ? 'active' : ''}
            onClick={() => setSortBy('H')}
          >
            Harmony
          </button>
          <button
            className={sortBy === 'L' ? 'active' : ''}
            onClick={() => setSortBy('L')}
            style={{ borderColor: '#ff6b6b' }}
          >
            Love
          </button>
          <button
            className={sortBy === 'J' ? 'active' : ''}
            onClick={() => setSortBy('J')}
            style={{ borderColor: '#4ecdc4' }}
          >
            Justice
          </button>
          <button
            className={sortBy === 'P' ? 'active' : ''}
            onClick={() => setSortBy('P')}
            style={{ borderColor: '#ffd93d' }}
          >
            Power
          </button>
          <button
            className={sortBy === 'W' ? 'active' : ''}
            onClick={() => setSortBy('W')}
            style={{ borderColor: '#6c5ce7' }}
          >
            Wisdom
          </button>
        </div>
      </div>

      <div className="genres-grid">
        {sortedGenres.map((genre, index) => (
          <div
            key={genre.key}
            className={`genre-card ${selectedGenre === genre.key ? 'selected' : ''}`}
            onClick={() => setSelectedGenre(genre.key === selectedGenre ? null : genre.key)}
          >
            <div className="genre-rank">#{index + 1}</div>
            <div className="genre-name">{genre.name}</div>
            <div className="genre-dominant" style={{ color: getDimensionColor(genre.dominant.key) }}>
              {genre.dominant.name}
            </div>

            <div className="genre-bars">
              <MiniBar label="L" value={genre.L} color="#ff6b6b" />
              <MiniBar label="J" value={genre.J} color="#4ecdc4" />
              <MiniBar label="P" value={genre.P} color="#ffd93d" />
              <MiniBar label="W" value={genre.W} color="#6c5ce7" />
            </div>

            <div className="genre-metrics">
              <div className="metric">
                <span className="metric-label">H</span>
                <span className="metric-value">{genre.H.toFixed(2)}</span>
              </div>
              <div className="metric voltage">
                <span className="metric-label">V</span>
                <span className="metric-value">{genre.V.toFixed(2)}</span>
              </div>
            </div>

            <div
              className="phase-indicator"
              style={{ background: genre.phase.color }}
            >
              {genre.phase.phase}
            </div>

            {selectedGenre === genre.key && (
              <div className="genre-details">
                <p className="genre-desc">{genre.description}</p>
                <p className="genre-phase-desc">{genre.phase.description}</p>
                <div className="genre-tips">
                  <strong>🎯 For Your Music:</strong>
                  <GenreTips genre={genre} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="compass-legend">
        <h3>Semantic Voltage Formula</h3>
        <div className="formula">V = φ × H × L</div>
        <p>
          Semantic Voltage measures the transformative potential of music.
          Higher voltage means greater capacity to impact consciousness.
        </p>
        <div className="voltage-scale">
          <div className="scale-item high">
            <span className="scale-value">&gt;1.0</span>
            <span className="scale-label">Transformative</span>
          </div>
          <div className="scale-item medium">
            <span className="scale-value">0.7-1.0</span>
            <span className="scale-label">Impactful</span>
          </div>
          <div className="scale-item low">
            <span className="scale-value">&lt;0.7</span>
            <span className="scale-label">Subtle</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function MiniBar({ label, value, color }) {
  return (
    <div className="mini-bar">
      <span className="mini-label" style={{ color }}>{label}</span>
      <div className="mini-track">
        <div
          className="mini-fill"
          style={{ width: `${value * 100}%`, background: color }}
        />
      </div>
    </div>
  )
}

function GenreTips({ genre }) {
  const tips = []

  // Love-based tips
  if (genre.L >= 0.85) {
    tips.push('Excellent for emotional, memorable melodies')
  } else if (genre.L >= 0.7) {
    tips.push('Good baseline Love for earworm creation')
  } else {
    tips.push('May need melodic hooks to compensate for lower Love')
  }

  // Dominant-based tips
  switch (genre.dominant.name) {
    case 'Love':
      tips.push('Focus on singable melodies and emotional hooks')
      break
    case 'Power':
      tips.push('Emphasize rhythm and energy in your production')
      break
    case 'Wisdom':
      tips.push('Layer in sophisticated harmonies and textures')
      break
    case 'Justice':
      tips.push('Maintain clear structure and balanced arrangements')
      break
  }

  // Phase-based tips
  if (genre.phase.phase === 'AUTOPOIETIC') {
    tips.push('✓ This genre naturally supports memorable music')
  } else {
    tips.push('Boost Love or use Ionian mode to reach earworm potential')
  }

  return (
    <ul className="genre-tips-list">
      {tips.map((tip, i) => (
        <li key={i}>{tip}</li>
      ))}
    </ul>
  )
}

export default GenreCompass
