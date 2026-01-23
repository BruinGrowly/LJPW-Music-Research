import { useState, useEffect, useCallback } from 'react'
import './Game.css'
import Room from './Room'
import Lesson from './Lesson'
import Piano from './Piano'
import SongBuilder from './SongBuilder'
import SilenceMeter from './SilenceMeter'
import { ROOMS, LESSONS, INITIAL_STATE, STORY } from '../lib/gameData'
import { playSilenceBreak } from '../lib/midiSynth'

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

  // Auto-save
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState))
  }, [gameState])

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
      // Decrease silence level
      const silenceDecrease = 20 // Each lesson reduces silence by 20%

      setGameState(prev => ({
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        silenceLevel: Math.max(0, prev.silenceLevel - silenceDecrease),
      }))

      // Play the silence-breaking sound
      if (audioInitialized) {
        playSilenceBreak()
      }

      // Show completion message
      const room = Object.values(ROOMS).find(r => r.lesson === lessonId)
      if (room?.onComplete) {
        setMessage({
          text: room.onComplete.message,
          type: 'success',
        })
        setTimeout(() => setMessage(null), 5000)
      }
    }
  }, [gameState.completedLessons, audioInitialized])

  // Handle song completion
  const handleSongComplete = useCallback(() => {
    setShowSongBuilder(false)
    setGameState(prev => ({
      ...prev,
      silenceLevel: 0,
      gameComplete: true,
    }))

    setMessage({
      text: 'The Silence Breaker is complete. The manor awakens. Edmund Ashworth, wherever he is now, thanks you.',
      type: 'victory',
    })
  }, [])

  // Reset game
  const handleReset = useCallback(() => {
    if (confirm('Are you sure you want to start over? All progress will be lost.')) {
      localStorage.removeItem(STORAGE_KEY)
      setGameState({ ...INITIAL_STATE, gameStarted: true })
    }
  }, [])

  return (
    <div className="game">
      {/* Chapter title overlay */}
      {showChapterTitle && currentChapter && (
        <div className="chapter-overlay">
          <h2 className="chapter-title">{currentChapter.title}</h2>
          <p className="chapter-description">{currentChapter.description}</p>
        </div>
      )}

      {/* Silence meter */}
      <SilenceMeter
        level={gameState.silenceLevel}
        lessonsComplete={gameState.completedLessons.length}
        totalLessons={Object.keys(LESSONS).length}
      />

      {/* Main game area */}
      <div className="game-main">
        <Room
          room={currentRoom}
          gameState={gameState}
          onExamine={handleExamine}
          onNavigate={handleNavigate}
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
          {gameState.completedLessons.length}/{Object.keys(LESSONS).length} concepts learned
        </span>
      </div>
    </div>
  )
}

export default Game
