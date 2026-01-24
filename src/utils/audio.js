// Shared audio context for low-latency sound effects
let audioContext = null
let isWarmedUp = false

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  // Resume if suspended (browser autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }
  return audioContext
}

// Warm up the audio context on first user interaction
// This helps eliminate latency on desktop browsers
export const warmUpAudio = () => {
  if (isWarmedUp) return

  try {
    const ctx = getAudioContext()
    // Play a silent tone to prime the audio pipeline
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    gainNode.gain.value = 0 // Silent
    oscillator.start()
    oscillator.stop(ctx.currentTime + 0.001)
    isWarmedUp = true
  } catch (e) {}
}

// Auto-warmup on any click/touch
if (typeof window !== 'undefined') {
  const warmupHandler = () => {
    warmUpAudio()
    document.removeEventListener('click', warmupHandler)
    document.removeEventListener('touchstart', warmupHandler)
  }
  document.addEventListener('click', warmupHandler, { once: true })
  document.addEventListener('touchstart', warmupHandler, { once: true })
}

const playTone = (ctx, freq, startTime, duration, type = 'sine', volume = 0.1) => {
  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  oscillator.frequency.value = freq
  oscillator.type = type

  const now = ctx.currentTime
  gainNode.gain.setValueAtTime(0, now + startTime)
  gainNode.gain.linearRampToValueAtTime(volume, now + startTime + 0.015)
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + startTime + duration)

  oscillator.start(now + startTime)
  oscillator.stop(now + startTime + duration)
}

// Theme toggle sounds
export const playDaySound = () => {
  try {
    const ctx = getAudioContext()
    playTone(ctx, 523, 0, 0.15, 'sine', 0.08)
    playTone(ctx, 659, 0.05, 0.15, 'sine', 0.08)
    playTone(ctx, 784, 0.1, 0.2, 'sine', 0.1)
  } catch (e) {}
}

export const playNightSound = () => {
  try {
    const ctx = getAudioContext()
    playTone(ctx, 392, 0, 0.2, 'sine', 0.08)
    playTone(ctx, 330, 0.08, 0.2, 'sine', 0.07)
    playTone(ctx, 262, 0.16, 0.25, 'sine', 0.06)
  } catch (e) {}
}

// Experience accordion sounds
export const playAccordionOpen = (pitchMultiplier = 1.0) => {
  try {
    const ctx = getAudioContext()
    playTone(ctx, 200 * pitchMultiplier, 0, 0.08, 'sine', 0.05)
    playTone(ctx, 400 * pitchMultiplier, 0.02, 0.1, 'sine', 0.07)
    playTone(ctx, 600 * pitchMultiplier, 0.05, 0.1, 'sine', 0.05)
  } catch (e) {}
}

export const playAccordionClose = (pitchMultiplier = 1.0) => {
  try {
    const ctx = getAudioContext()
    playTone(ctx, 600 * pitchMultiplier, 0, 0.08, 'sine', 0.05)
    playTone(ctx, 400 * pitchMultiplier, 0.02, 0.1, 'sine', 0.07)
    playTone(ctx, 200 * pitchMultiplier, 0.05, 0.1, 'sine', 0.05)
  } catch (e) {}
}

// Case study navigation sound
export const playCaseStudySound = () => {
  try {
    const ctx = getAudioContext()
    playTone(ctx, 120, 0, 0.08, 'triangle', 0.06)
    playTone(ctx, 150, 0.03, 0.1, 'triangle', 0.07)
    playTone(ctx, 180, 0.08, 0.12, 'sine', 0.05)
    playTone(ctx, 1200, 0.15, 0.02, 'square', 0.03)
  } catch (e) {}
}

// Login modal sounds
export const playLoginOpenSound = () => {
  try {
    const ctx = getAudioContext()
    playTone(ctx, 300, 0, 0.2, 'sine', 0.15)
    playTone(ctx, 500, 0.05, 0.25, 'sine', 0.15)
    playTone(ctx, 700, 0.1, 0.3, 'sine', 0.12)
    playTone(ctx, 1200, 0.25, 0.15, 'sine', 0.1)
    playTone(ctx, 1500, 0.3, 0.1, 'sine', 0.08)
  } catch (e) {}
}

export const playLoginSuccessSound = () => {
  try {
    const ctx = getAudioContext()
    playTone(ctx, 523, 0, 0.4, 'sine', 0.15)
    playTone(ctx, 659, 0.1, 0.4, 'sine', 0.15)
    playTone(ctx, 784, 0.2, 0.5, 'sine', 0.15)
    playTone(ctx, 1047, 0.3, 0.6, 'sine', 0.2)
    playTone(ctx, 1568, 0.5, 0.3, 'sine', 0.1)
    playTone(ctx, 2093, 0.6, 0.25, 'sine', 0.08)
    playTone(ctx, 1200, 0.4, 0.05, 'square', 0.3)
  } catch (e) {}
}

export const playLoginErrorSound = () => {
  try {
    const ctx = getAudioContext()
    playTone(ctx, 150, 0, 0.15, 'sawtooth', 0.3)
    playTone(ctx, 150, 0.2, 0.15, 'sawtooth', 0.3)
    playTone(ctx, 100, 0.4, 0.2, 'sawtooth', 0.25)
  } catch (e) {}
}
