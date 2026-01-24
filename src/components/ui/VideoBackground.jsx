import { useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'
import './VideoBackground.css'

const VideoBackground = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let time = 0

    // Read CSS variables for canvas colors
    const getCanvasColors = () => {
      const styles = getComputedStyle(document.documentElement)
      return {
        bg: styles.getPropertyValue('--color-canvas-bg').trim(),
        grid: styles.getPropertyValue('--color-canvas-grid').trim(),
        gridStrong: styles.getPropertyValue('--color-canvas-grid-strong').trim(),
        dot: styles.getPropertyValue('--color-canvas-dot').trim(),
        stroke: styles.getPropertyValue('--color-canvas-stroke').trim(),
        vignette: styles.getPropertyValue('--color-canvas-vignette').trim()
      }
    }

    // Track "pencil" points that draw on the grid
    const pencilPoints = []
    const maxPoints = 8

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const draw = () => {
      const colors = getCanvasColors()
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      // Graph paper background
      ctx.fillStyle = colors.bg
      ctx.fillRect(0, 0, width, height)

      const smallGrid = 20
      const largeGrid = 100

      // Small grid lines (light)
      ctx.strokeStyle = colors.grid
      ctx.lineWidth = 0.5

      for (let x = 0; x <= width; x += smallGrid) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      for (let y = 0; y <= height; y += smallGrid) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Large grid lines (darker)
      ctx.strokeStyle = colors.gridStrong
      ctx.lineWidth = 1

      for (let x = 0; x <= width; x += largeGrid) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      for (let y = 0; y <= height; y += largeGrid) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Dots at large grid intersections
      ctx.fillStyle = colors.dot
      for (let x = 0; x <= width; x += largeGrid) {
        for (let y = 0; y <= height; y += largeGrid) {
          ctx.beginPath()
          ctx.arc(x, y, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Parse stroke color for dynamic opacity
      // Extract RGB from the stroke color for pencil animation
      const strokeMatch = colors.stroke.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
      const strokeRGB = strokeMatch
        ? { r: strokeMatch[1], g: strokeMatch[2], b: strokeMatch[3] }
        : { r: 194, g: 65, b: 12 } // fallback

      // Animated "sketching" effect - lines being drawn
      // Spawn new pencil points occasionally
      if (Math.random() < 0.02 && pencilPoints.length < maxPoints) {
        const startX = Math.floor(Math.random() * (width / largeGrid)) * largeGrid
        const startY = Math.floor(Math.random() * (height / largeGrid)) * largeGrid
        const isHorizontal = Math.random() > 0.5
        pencilPoints.push({
          x: startX,
          y: startY,
          targetX: isHorizontal ? startX + largeGrid * (Math.random() > 0.5 ? 1 : -1) : startX,
          targetY: isHorizontal ? startY : startY + largeGrid * (Math.random() > 0.5 ? 1 : -1),
          progress: 0,
          speed: 0.02 + Math.random() * 0.02,
          opacity: 0.4
        })
      }

      // Draw and update pencil strokes
      pencilPoints.forEach((point, index) => {
        const currentX = point.x + (point.targetX - point.x) * point.progress
        const currentY = point.y + (point.targetY - point.y) * point.progress

        // Draw the stroke so far
        ctx.strokeStyle = `rgba(${strokeRGB.r}, ${strokeRGB.g}, ${strokeRGB.b}, ${point.opacity})`
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(point.x, point.y)
        ctx.lineTo(currentX, currentY)
        ctx.stroke()

        // Pencil tip dot
        if (point.progress < 1) {
          ctx.fillStyle = `rgba(${strokeRGB.r}, ${strokeRGB.g}, ${strokeRGB.b}, ${point.opacity + 0.2})`
          ctx.beginPath()
          ctx.arc(currentX, currentY, 3, 0, Math.PI * 2)
          ctx.fill()
        }

        // Update progress
        point.progress += point.speed

        // Fade out when complete
        if (point.progress >= 1) {
          point.opacity -= 0.008
        }

        // Remove faded strokes
        if (point.opacity <= 0) {
          pencilPoints.splice(index, 1)
        }
      })

      // Subtle vignette overlay
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) * 0.7
      )
      gradient.addColorStop(0, 'transparent')
      gradient.addColorStop(1, colors.vignette)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      time += 0.016
      animationRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [theme])

  return (
    <div className="video-background">
      <canvas ref={canvasRef} className="video-background__canvas" />
    </div>
  )
}

export default VideoBackground
