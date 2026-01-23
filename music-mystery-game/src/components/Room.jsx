import { useState } from 'react'
import './Room.css'

function Room({ room, gameState, onExamine, onNavigate }) {
  const [selectedItem, setSelectedItem] = useState(null)
  const [examineText, setExamineText] = useState(null)

  if (!room) return null

  const handleExamine = (itemId) => {
    const item = room.interactables?.[itemId]
    if (!item) return

    setSelectedItem(itemId)
    setExamineText(item.description)
    onExamine(itemId)
  }

  const handleCloseExamine = () => {
    setSelectedItem(null)
    setExamineText(null)
  }

  // Get available exits
  const exits = room.exits || {}
  const availableExits = Object.entries(exits).filter(([dir, exit]) => {
    // Check if unlocked or requirements met
    if (!exit.locked) return true
    if (exit.requires && gameState.completedLessons.includes(exit.requires)) return true
    return false
  })

  const lockedExits = Object.entries(exits).filter(([dir, exit]) => {
    if (!exit.locked) return false
    if (exit.requires && gameState.completedLessons.includes(exit.requires)) return false
    return true
  })

  return (
    <div className={`room atmosphere-${room.atmosphere}`}>
      {/* Room header */}
      <header className="room-header">
        <h2 className="room-name">{room.name}</h2>
        <span className="chapter-indicator">
          {room.chapter && room.chapter.replace('_', ' ')}
        </span>
      </header>

      {/* Room description */}
      <div className="room-description">
        {room.description.trim().split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph.trim()}</p>
        ))}
      </div>

      {/* Interactable items */}
      {room.interactables && Object.keys(room.interactables).length > 0 && (
        <div className="interactables">
          <h3>You notice:</h3>
          <div className="interactable-list">
            {Object.entries(room.interactables).map(([itemId, item]) => (
              <button
                key={itemId}
                className={`interactable-btn ${gameState.examinedItems[itemId] ? 'examined' : ''}`}
                onClick={() => handleExamine(itemId)}
              >
                {item.name}
                {gameState.examinedItems[itemId] && <span className="examined-mark">*</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Examine panel */}
      {examineText && (
        <div className="examine-panel">
          <button className="close-btn" onClick={handleCloseExamine}>x</button>
          <h4>{room.interactables[selectedItem]?.name}</h4>
          <div className="examine-text">
            {examineText.trim().split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph.trim()}</p>
            ))}
          </div>
          {room.interactables[selectedItem]?.interactive && (
            <p className="interactive-hint">
              <em>This item is interactive. Click again to use it.</em>
            </p>
          )}
          {room.interactables[selectedItem]?.reveals && (
            <p className="reveal-text">
              <strong>You realize:</strong> {room.interactables[selectedItem].reveals}
            </p>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="navigation">
        <h3>Exits:</h3>
        <div className="exits">
          {availableExits.map(([direction, exit]) => (
            <button
              key={direction}
              className="exit-btn"
              onClick={() => onNavigate(direction)}
            >
              <span className="direction">{direction}</span>
              <span className="exit-desc">{exit.description}</span>
            </button>
          ))}
          {lockedExits.map(([direction, exit]) => (
            <button
              key={direction}
              className="exit-btn locked"
              onClick={() => onNavigate(direction)}
            >
              <span className="direction">{direction}</span>
              <span className="exit-desc locked-desc">
                {exit.description} <em>(locked)</em>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lesson hint */}
      {room.lesson && !gameState.completedLessons.includes(room.lesson) && (
        <div className="lesson-hint">
          <p>There is something to learn in this room. Examine your surroundings carefully.</p>
        </div>
      )}

      {/* Decorative elements based on atmosphere */}
      <div className="atmosphere-overlay"></div>
    </div>
  )
}

export default Room
