import { useTheme } from '../../context/ThemeContext'
import './ThemeToggle.css'

// Subtle sunrise sound - bright, gentle ascending
const playDaySound = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()

    const playTone = (freq, startTime, duration, volume = 0.1) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = freq
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0, audioContext.currentTime + startTime)
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + startTime + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + startTime + duration)

      oscillator.start(audioContext.currentTime + startTime)
      oscillator.stop(audioContext.currentTime + startTime + duration)
    }

    // Gentle ascending chime
    playTone(523, 0, 0.15, 0.08)      // C5
    playTone(659, 0.05, 0.15, 0.08)   // E5
    playTone(784, 0.1, 0.2, 0.1)      // G5
  } catch (e) {
    // Audio not supported
  }
}

// Subtle nightfall sound - soft, calming descending
const playNightSound = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()

    const playTone = (freq, startTime, duration, volume = 0.1) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = freq
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0, audioContext.currentTime + startTime)
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + startTime + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + startTime + duration)

      oscillator.start(audioContext.currentTime + startTime)
      oscillator.stop(audioContext.currentTime + startTime + duration)
    }

    // Soft descending tones
    playTone(392, 0, 0.2, 0.08)       // G4
    playTone(330, 0.08, 0.2, 0.07)    // E4
    playTone(262, 0.16, 0.25, 0.06)   // C4
  } catch (e) {
    // Audio not supported
  }
}

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  const handleToggle = () => {
    // Play sound based on what we're switching TO
    if (isDark) {
      playDaySound()   // Switching to light
    } else {
      playNightSound() // Switching to dark
    }
    toggleTheme()
  }

  return (
    <button
      className="theme-toggle"
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className={`theme-toggle__icon ${isDark ? 'theme-toggle__icon--visible' : ''}`}>
        {/* Sun icon - shown in dark mode */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </span>
      <span className={`theme-toggle__icon ${!isDark ? 'theme-toggle__icon--visible' : ''}`}>
        {/* Moon icon - shown in light mode */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  )
}

export default ThemeToggle
