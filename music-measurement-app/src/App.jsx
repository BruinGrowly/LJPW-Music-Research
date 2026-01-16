import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import TabNav from './components/TabNav'
import AudioAnalyzer from './components/AudioAnalyzer'
import ElementAnalyzer from './components/ElementAnalyzer'
import SongProfileBuilder from './components/SongProfileBuilder'
import GenreCompass from './components/GenreCompass'
import LoveFrequency from './components/LoveFrequency'
import LearnGuide from './components/LearnGuide'
import GenerativeAnalyzer from './components/GenerativeAnalyzer'
import ErrorBoundary, { SectionErrorBoundary } from './components/ErrorBoundary'
import './components/ErrorBoundary.css'

// Session storage key for persisting active tab
const TAB_STORAGE_KEY = 'ljpw-active-tab'

function App() {
  // Initialize from session storage if available
  const [activeTab, setActiveTab] = useState(() => {
    const saved = sessionStorage.getItem(TAB_STORAGE_KEY)
    return saved || 'audio'
  })

  // Persist active tab to session storage
  useEffect(() => {
    sessionStorage.setItem(TAB_STORAGE_KEY, activeTab)
  }, [activeTab])

  const tabs = [
    { id: 'audio', label: 'Analyze Audio', icon: '🎧' },
    { id: 'analyzer', label: 'Element Analyzer', icon: '🎵' },
    { id: 'profile', label: 'Song Profile', icon: '🎼' },
    { id: 'generative', label: 'Song Impact', icon: '🧬' },
    { id: 'compass', label: 'Genre Compass', icon: '🧭' },
    { id: 'frequency', label: '613 THz', icon: '💜' },
    { id: 'learn', label: 'Learn', icon: '📚' },
  ]

  // Get current tab label for accessibility
  const currentTabLabel = tabs.find(t => t.id === activeTab)?.label || 'Content'

  return (
    <ErrorBoundary showDetails={process.env.NODE_ENV === 'development'}>
      <div className="app">
        {/* Skip link for keyboard navigation */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Header />

        <TabNav
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <main
          id="main-content"
          className="main-content"
          role="main"
          aria-label={`${currentTabLabel} section`}
        >
          <SectionErrorBoundary sectionName={currentTabLabel}>
            {activeTab === 'audio' && <AudioAnalyzer />}
            {activeTab === 'analyzer' && <ElementAnalyzer />}
            {activeTab === 'profile' && <SongProfileBuilder />}
            {activeTab === 'generative' && <GenerativeAnalyzer />}
            {activeTab === 'compass' && <GenreCompass />}
            {activeTab === 'frequency' && <LoveFrequency />}
            {activeTab === 'learn' && <LearnGuide />}
          </SectionErrorBoundary>
        </main>

        <footer className="footer" role="contentinfo">
          <p>LJPW Music Measurement App - V8.4 Framework</p>
          <p className="footer-subtitle">Measuring the meaning behind music</p>
        </footer>
      </div>
    </ErrorBoundary>
  )
}

export default App
