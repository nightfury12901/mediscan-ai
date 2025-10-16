'use client'

import { useEffect, useRef } from 'react'
import Prism from '@/components/ui/Prism'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

export function PrismBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize constellation nodes
    const nodeCount = 40
    nodesRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }))

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Get theme color
      const isDark = document.documentElement.classList.contains('dark')
      const nodeColor = isDark ? 'rgba(100, 200, 255, 0.6)' : 'rgba(80, 150, 200, 0.5)'
      const lineColor = isDark ? 'rgba(100, 200, 255, 0.15)' : 'rgba(80, 150, 200, 0.2)'

      // Update and draw nodes
      nodesRef.current.forEach((node, i) => {
        // Move node
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Draw node with glow
        ctx.shadowBlur = 10
        ctx.shadowColor = nodeColor
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = nodeColor
        ctx.fill()
        ctx.shadowBlur = 0

        // Draw connections
        nodesRef.current.slice(i + 1).forEach(otherNode => {
          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.strokeStyle = lineColor
            ctx.lineWidth = (1 - distance / 120) * 1.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="absolute inset-0">
      {/* Prism Gradient Effect */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30">
        <Prism
          animationType="3drotate"
          timeScale={0.3}
          height={4.5}
          baseWidth={6.5}
          scale={4.2}
          hueShift={0.5}
          colorFrequency={0.8}
          noise={0.3}
          glow={1.5}
          bloom={1.2}
          transparent={true}
        />
      </div>

      {/* Network Constellation Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  )
}
