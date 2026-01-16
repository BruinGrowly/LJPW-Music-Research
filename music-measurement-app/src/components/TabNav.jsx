import { useRef, useCallback } from 'react'
import './TabNav.css'

function TabNav({ tabs, activeTab, onTabChange }) {
  const tabListRef = useRef(null)

  // Handle keyboard navigation between tabs
  const handleKeyDown = useCallback((event, currentIndex) => {
    const tabCount = tabs.length
    let newIndex = currentIndex

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        newIndex = currentIndex === 0 ? tabCount - 1 : currentIndex - 1
        break
      case 'ArrowRight':
        event.preventDefault()
        newIndex = currentIndex === tabCount - 1 ? 0 : currentIndex + 1
        break
      case 'Home':
        event.preventDefault()
        newIndex = 0
        break
      case 'End':
        event.preventDefault()
        newIndex = tabCount - 1
        break
      default:
        return
    }

    // Focus and activate the new tab
    const newTab = tabs[newIndex]
    onTabChange(newTab.id)

    // Focus the new tab button
    const tabButtons = tabListRef.current?.querySelectorAll('[role="tab"]')
    tabButtons?.[newIndex]?.focus()
  }, [tabs, onTabChange])

  return (
    <nav className="tab-nav" aria-label="Main navigation">
      <div
        className="tab-container"
        role="tablist"
        aria-label="Analysis sections"
        ref={tabListRef}
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              className={`tab-button ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              <span className="tab-icon" aria-hidden="true">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
              {/* Screen reader text for icon-only mobile view */}
              <span className="sr-only">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default TabNav
