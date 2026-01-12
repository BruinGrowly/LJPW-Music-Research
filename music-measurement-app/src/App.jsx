import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import TabNav from './components/TabNav'
import AudioAnalyzer from './components/AudioAnalyzer'
import ElementAnalyzer from './components/ElementAnalyzer'
import SongProfileBuilder from './components/SongProfileBuilder'
import GenreCompass from './components/GenreCompass'
import LoveFrequency from './components/LoveFrequency'
import LearnGuide from './components/LearnGuide'

function App() {
  const [activeTab, setActiveTab] = useState('audio')

  const tabs = [
    { id: 'audio', label: 'Analyze Audio', icon: '🎧' },
    { id: 'analyzer', label: 'Element Analyzer', icon: '🎵' },
    { id: 'profile', label: 'Song Profile', icon: '🎼' },
    { id: 'compass', label: 'Genre Compass', icon: '🧭' },
    { id: 'frequency', label: '613 THz', icon: '💜' },
    { id: 'learn', label: 'Learn', icon: '📚' },
  ]

  return (
    <div className="app">
      <Header />
      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="main-content">
        {activeTab === 'audio' && <AudioAnalyzer />}
        {activeTab === 'analyzer' && <ElementAnalyzer />}
        {activeTab === 'profile' && <SongProfileBuilder />}
        {activeTab === 'compass' && <GenreCompass />}
        {activeTab === 'frequency' && <LoveFrequency />}
        {activeTab === 'learn' && <LearnGuide />}
      </main>
      <footer className="footer">
        <p>LJPW Music Measurement App - V8.4 Framework</p>
        <p className="footer-subtitle">Measuring the meaning behind music</p>
      </footer>
    </div>
  )
}

export default App
