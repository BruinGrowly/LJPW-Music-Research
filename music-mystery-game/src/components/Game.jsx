import { useState, useEffect, useCallback, useMemo } from 'react'
import './Game.css'
import Room from './Room'
import Lesson from './Lesson'
import Piano from './Piano'
import SongBuilder from './SongBuilder'
import SilenceMeter from './SilenceMeter'
import { ROOMS, LESSONS, INITIAL_STATE, STORY } from '../lib/gameData'
import { playSilenceBreak, playAtmosphere, stopAtmosphere } from '../lib/midiSynth'
import { calculateAtmosphere, calculateSilence } from '../lib/generativeEngine'

const STORAGE_KEY = 'echoes-of-ashworth-save'

function Game({ audioInitialized }) {
  // Load saved state or use initial
  const [gameState, setGameState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return { ...INITIAL_STATE, gameStarted: true }
      }
    }
    return { ...INITIAL_STATE, gameStarted: true }
  })

  const [showLesson, setShowLesson] = useState(false)
  const [currentLesson, setCurrentLesson] = useState(null)
  const [showPiano, setShowPiano] = useState(false)
  const [showSongBuilder, setShowSongBuilder] = useState(false)
  const [message, setMessage] = useState(null)
  const [showChapterTitle, setShowChapterTitle] = useState(false)
  const [currentChapter, setCurrentChapter] = useState(null)
  const [finalMelodyAnalysis, setFinalMelodyAnalysis] = useState(null)

  // Calculate atmosphere using Generative Equation
  const totalLessons = Object.keys(LESSONS).length
  const lessonsComplete = gameState.completedLessons.length
  const mysteriesRemaining = totalLessons - lessonsComplete

  const atmosphere = useMemo(() =>
    calculateAtmosphere(lessonsComplete, totalLessons, mysteriesRemaining),
    [lessonsComplete, totalLessons, mysteriesRemaining]
  )

  const silence = useMemo(() =>
    calculateSilence(lessonsComplete, totalLessons),
    [lessonsComplete, totalLessons]
  )

  // Auto-save
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState))
  }, [gameState])

  // Update atmosphere audio based on equation
  useEffect(() => {
    if (audioInitialized && !gameState.gameComplete) {
      if (atmosphere.phase === 'awakening') {
        playAtmosphere(atmosphere.soundPresence)
      } else if (atmosphere.phase === 'stirring' && lessonsComplete > 0) {
        playAtmosphere(atmosphere.soundPresence * 0.5)
      } else {
        stopAtmosphere()
      }
    }
    return () => stopAtmosphere()
  }, [audioInitialized, atmosphere.phase, atmosphere.soundPresence, lessonsComplete, gameState.gameComplete])

  // Get current room data
  const currentRoom = ROOMS[gameState.currentRoom]

  // Show chapter title when chapter changes
  useEffect(() => {
    const chapter = STORY.chapters.find(c => c.id === currentRoom?.chapter)
    if (chapter && chapter.id !== currentChapter?.id) {
      setCurrentChapter(chapter)
      setShowChapterTitle(true)
      const timer = setTimeout(() => setShowChapterTitle(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [currentRoom?.chapter, currentChapter?.id])

  // Handle examining items
  const handleExamine = useCallback((itemId) => {
    const item = currentRoom?.interactables?.[itemId]
    if (!item) return

    setGameState(prev => ({
      ...prev,
      examinedItems: {
        ...prev.examinedItems,
        [itemId]: true,
      },
    }))

    // Check if item teaches something
    if (item.teaches && item.unlocks) {
      const lesson = LESSONS[item.teaches]
      if (lesson && !gameState.completedLessons.includes(lesson.id)) {
        setCurrentLesson(lesson)
        setShowLesson(true)
      }
    }

    // Check if item is interactive
    if (item.interactive) {
      if (item.type === 'piano') {
        setShowPiano(true)
      } else if (item.type === 'song_builder') {
        setShowSongBuilder(true)
      }
    }
  }, [currentRoom, gameState.completedLessons])

  // Handle navigation
  const handleNavigate = useCallback((direction) => {
    const exit = currentRoom?.exits?.[direction]
    if (!exit) return

    // Check if locked
    if (exit.locked && exit.requires) {
      if (!gameState.completedLessons.includes(exit.requires)) {
        setMessage({
          text: 'This way is not yet open to you. There is more to learn first.',
          type: 'locked',
        })
        setTimeout(() => setMessage(null), 3000)
        return
      }
    }

    setGameState(prev => ({
      ...prev,
      currentRoom: exit.to,
      unlockedRooms: prev.unlockedRooms.includes(exit.to)
        ? prev.unlockedRooms
        : [...prev.unlockedRooms, exit.to],
    }))
  }, [currentRoom, gameState.completedLessons])

  // Handle lesson completion
  const handleLessonComplete = useCallback((lessonId) => {
    setShowLesson(false)
    setCurrentLesson(null)

    if (!gameState.completedLessons.includes(lessonId)) {
      setGameState(prev => ({
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      }))

      // Play the silence-breaking sound
      if (audioInitialized) {
        playSilenceBreak()
      }

      // Show completion message with equation info
      const room = Object.values(ROOMS).find(r => r.lesson === lessonId)
      if (room?.onComplete) {
        const newLessonsComplete = gameState.completedLessons.length + 1
        const newAtmosphere = calculateAtmosphere(newLessonsComplete, totalLessons, totalLessons - newLessonsComplete)

        setMessage({
          text: `${room.onComplete.message} [Growth increased to L^${newLessonsComplete}]`,
          type: 'success',
        })
        setTimeout(() => setMessage(null), 5000)
      }
    }
  }, [gameState.completedLessons, audioInitialized, totalLessons])

  // Handle song completion - receives analysis from SongBuilder
  const handleSongComplete = useCallback((analysis) => {
    setShowSongBuilder(false)
    setFinalMelodyAnalysis(analysis)
    setGameState(prev => ({
      ...prev,
      gameComplete: true,
    }))

    const phaseMessage = analysis?.lifeInequality?.phase === 'AUTOPOIETIC'
      ? 'Your melody is UNFORGETTABLE - it will echo through time.'
      : 'Your melody holds the silence at bay.'

    setMessage({
      text: `The Silence Breaker is complete. ${phaseMessage}`,
      type: 'victory',
    })
  }, [])

  // Reset game
  const handleReset = useCallback(() => {
    if (confirm('Are you sure you want to start over? All progress will be lost.')) {
      localStorage.removeItem(STORAGE_KEY)
      setGameState({ ...INITIAL_STATE, gameStarted: true })
      setFinalMelodyAnalysis(null)
    }
  }, [])

  // Dynamic atmosphere styles based on equation
  const atmosphereStyle = {
    '--atmosphere-brightness': atmosphere.brightness,
    '--atmosphere-saturation': atmosphere.saturation,
    '--atmosphere-activity': atmosphere.particleActivity,
  }

  return (
    <div className="game" style={atmosphereStyle}>
      {/* Atmosphere overlay based on equation */}
      <div
        className={`atmosphere-overlay ${atmosphere.phase}`}
        style={{
          opacity: atmosphere.normalized * 0.3,
        }}
      />

      {/* Chapter title overlay */}
      {showChapterTitle && currentChapter && (
        <div className="chapter-overlay">
          <h2 className="chapter-title">{currentChapter.title}</h2>
          <p className="chapter-description">{currentChapter.description}</p>
        </div>
      )}

      {/* Silence meter - now calculates internally using the equation */}
      <SilenceMeter
        lessonsComplete={lessonsComplete}
        totalLessons={totalLessons}
      />

      {/* Main game area */}
      <div className="game-main">
        <Room
          room={currentRoom}
          gameState={gameState}
          onExamine={handleExamine}
          onNavigate={handleNavigate}
          atmosphere={atmosphere}
        />
      </div>

      {/* Message overlay */}
      {message && (
        <div className={`message-overlay ${message.type}`}>
          <p>{message.text}</p>
        </div>
      )}

      {/* Lesson modal */}
      {showLesson && currentLesson && (
        <Lesson
          lesson={currentLesson}
          onComplete={() => handleLessonComplete(currentLesson.id)}
          onClose={() => setShowLesson(false)}
        />
      )}

      {/* Piano modal */}
      {showPiano && (
        <Piano
          onClose={() => setShowPiano(false)}
        />
      )}

      {/* Song builder modal */}
      {showSongBuilder && (
        <SongBuilder
          gameState={gameState}
          onComplete={handleSongComplete}
          onClose={() => setShowSongBuilder(false)}
        />
      )}

      {/* Game complete overlay */}
      {gameState.gameComplete && (
        <div className="victory-overlay">
          <div className="victory-content">
            <h2>The Silence is Broken</h2>
            <p>
              As the final notes of The Silence Breaker fade, the manor transforms.
              Birds sing outside the windows. The chandelier's crystals tinkle
              in a breeze that now flows freely through the halls.
            </p>

            {/* Show melody analysis */}
            {finalMelodyAnalysis && (
              <div className="final-analysis">
                <h3>Your Melody's Legacy</h3>
                <div className="analysis-summary">
                  <div className="summary-stat">
                    <span className="stat-value">{finalMelodyAnalysis.memorabilityScore}%</span>
                    <span className="stat-label">Memorability</span>
                  </div>
                  <div className="summary-stat">
                    <span className="stat-value" style={{ color: finalMelodyAnalysis.lifeInequality?.color }}>
                      {finalMelodyAnalysis.lifeInequality?.userPhase}
                    </span>
                    <span className="stat-label">Classification</span>
                  </div>
                </div>
                <p className="analysis-verdict">
                  {finalMelodyAnalysis.lifeInequality?.verdict}
                </p>
              </div>
            )}

            <p>
              You understand now. Edmund Ashworth didn't die. He became part of
              something larger - the silence itself, waiting for someone to give
              it voice.
            </p>
            <p>
              And you did. Through learning the language of music - intervals,
              modes, chords, melody - you completed what he started.
            </p>
            <p className="final-message">
              Music is the antidote to silence. Understanding is the key to
              connection. And you, now, are a musician.
            </p>

            {/* Show the equation */}
            <div className="final-equation">
              <p>The Generative Equation that guided your journey:</p>
              <div className="equation-display">
                M = B × L<sup>n</sup> × φ<sup>-d</sup>
              </div>
              <p className="equation-meaning">
                Meaning grows through Love and iteration, overcoming distance.
              </p>
            </div>

            <button onClick={handleReset}>Play Again</button>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="game-controls">
        <button className="control-btn" onClick={handleReset}>
          New Game
        </button>
        <span className="progress">
          {lessonsComplete}/{totalLessons} concepts learned
        </span>
        <span className="atmosphere-indicator" title={atmosphere.description}>
          {atmosphere.phase === 'awakening' && '🎵'}
          {atmosphere.phase === 'stirring' && '🎶'}
          {atmosphere.phase === 'dormant' && '🔇'}
        </span>
      </div>
    </div>
  )
}

export default Game
