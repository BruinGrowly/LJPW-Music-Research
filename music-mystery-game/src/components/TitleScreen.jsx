import { useState, useEffect } from 'react'
import './TitleScreen.css'

function TitleScreen({ onStart }) {
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showPremise, setShowPremise] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    // Staggered fade-in for dramatic effect
    const timer1 = setTimeout(() => setShowSubtitle(true), 1000)
    const timer2 = setTimeout(() => setShowPremise(true), 2000)
    const timer3 = setTimeout(() => setShowButton(true), 4000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return (
    <div className="title-screen">
      <div className="title-content">
        <h1 className="title">Echoes of Ashworth</h1>

        <h2 className={`subtitle ${showSubtitle ? 'visible' : ''}`}>
          A Musical Mystery
        </h2>

        <div className={`premise ${showPremise ? 'visible' : ''}`}>
          <p>
            Ten years ago, the renowned composer Edmund Ashworth vanished from his
            family manor on the night he was to debut his masterpiece.
          </p>
          <p>
            Since that night, the manor has been consumed by an unnatural stillness.
            No birds sing. No clocks tick. Even the wind holds its breath.
          </p>
          <p className="cryptic">
            "The silence can only be broken by understanding."
          </p>
        </div>

        <div className={`learn-info ${showPremise ? 'visible' : ''}`}>
          <h3>In this journey, you will learn:</h3>
          <ul>
            <li>Musical intervals and their emotional meanings</li>
            <li>The seven modes (Dorian, Lydian, and more)</li>
            <li>How chords are built and why they feel the way they do</li>
            <li>The art of creating memorable melodies</li>
          </ul>
          <p className="no-experience">No musical experience required.</p>
        </div>

        <button
          className={`start-button ${showButton ? 'visible' : ''}`}
          onClick={onStart}
        >
          <span className="button-text">Enter the Manor</span>
          <span className="button-subtext">Click to enable sound</span>
        </button>

        <div className={`credits ${showButton ? 'visible' : ''}`}>
          <p>Built with the LJPW Framework</p>
          <p>Music theory education through mystery</p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="fog fog-1"></div>
      <div className="fog fog-2"></div>
      <div className="vignette"></div>
    </div>
  )
}

export default TitleScreen
