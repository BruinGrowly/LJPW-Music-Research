import { useState, useEffect, useCallback } from 'react'
import './App.css'
import Game from './components/Game'
import TitleScreen from './components/TitleScreen'
import { initAudio, playAtmosphere, playSilenceBreak } from './lib/midiSynth'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [audioInitialized, setAudioInitialized] = useState(false)
  const [atmosphereController, setAtmosphereController] = useState(null)

  const handleStartGame = useCallback(() => {
    // Initialize audio on first interaction
    if (!audioInitialized) {
      const success = initAudio()
      setAudioInitialized(success)

      if (success) {
        // Start atmospheric music
        const controller = playAtmosphere('mysterious')
        setAtmosphereController(controller)
      }
    }

    setGameStarted(true)
  }, [audioInitialized])

  // Cleanup atmosphere on unmount
  useEffect(() => {
    return () => {
      if (atmosphereController) {
        atmosphereController.stop()
      }
    }
  }, [atmosphereController])

  return (
    <div className="app">
      {!gameStarted ? (
        <TitleScreen onStart={handleStartGame} />
      ) : (
        <Game
          audioInitialized={audioInitialized}
          atmosphereController={atmosphereController}
        />
      )}
    </div>
  )
}

export default App
