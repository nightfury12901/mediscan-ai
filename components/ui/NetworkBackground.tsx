'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  pulsePhase: number
}

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const rafRef = useRef<number>(0)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initNodes()
    }

    const initNodes = () => {
      const nodeCount = Math.floor((canvas.width * canvas.height) / 15000)
      nodesRef.current = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 1,
        pulsePhase: Math.random() * Math.PI * 2
      }))
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    let time = 0

    const animate = () => {
      time += 0.016
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark = document.documentElement.classList.contains('dark')
      const mouse = mouseRef.current

      nodesRef.current.forEach((node, i) => {
        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const distToMouse = Math.sqrt(dx * dx + dy * dy)
        
        if (distToMouse < 200) {
          const force = (200 - distToMouse) / 200 * 0.2
          node.vx += (dx / distToMouse) * force * 0.05
          node.vy += (dy / distToMouse) * force * 0.05
        }

        node.x += node.vx
        node.y += node.vy

        node.vx *= 0.98
        node.vy *= 0.98

        if (node.x < 0 || node.x > canvas.width) {
          node.vx *= -1
          node.x = Math.max(0, Math.min(canvas.width, node.x))
        }
        if (node.y < 0 || node.y > canvas.height) {
          node.vy *= -1
          node.y = Math.max(0, Math.min(canvas.height, node.y))
        }

        nodesRef.current.slice(i + 1).forEach(otherNode => {
          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 180

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance)
            
            const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y)
            if (isDark) {
              gradient.addColorStop(0, `rgba(100, 180, 255, ${opacity * 0.5})`)
              gradient.addColorStop(0.5, `rgba(120, 200, 255, ${opacity * 0.6})`)
              gradient.addColorStop(1, `rgba(100, 180, 255, ${opacity * 0.5})`)
            } else {
              gradient.addColorStop(0, `rgba(80, 140, 220, ${opacity * 0.5})`)
              gradient.addColorStop(0.5, `rgba(100, 160, 240, ${opacity * 0.6})`)
              gradient.addColorStop(1, `rgba(80, 140, 220, ${opacity * 0.5})`)
            }

            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = opacity * 1.5
            ctx.stroke()
          }
        })
      })

      nodesRef.current.forEach(node => {
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.3 + 1
        const radius = node.radius * pulse

        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const distToMouse = Math.sqrt(dx * dx + dy * dy)
        const mouseHighlight = distToMouse < 150 ? (150 - distToMouse) / 150 : 0

        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 3)
        if (isDark) {
          glowGradient.addColorStop(0, `rgba(100, 180, 255, ${0.6 + mouseHighlight * 0.4})`)
          glowGradient.addColorStop(0.4, `rgba(100, 180, 255, ${0.4 + mouseHighlight * 0.3})`)
          glowGradient.addColorStop(1, 'rgba(100, 180, 255, 0)')
        } else {
          glowGradient.addColorStop(0, `rgba(80, 140, 220, ${0.6 + mouseHighlight * 0.4})`)
          glowGradient.addColorStop(0.4, `rgba(80, 140, 220, ${0.4 + mouseHighlight * 0.3})`)
          glowGradient.addColorStop(1, 'rgba(80, 140, 220, 0)')
        }

        ctx.beginPath()
        ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2)
        ctx.fillStyle = glowGradient
        ctx.fill()

        const coreGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius)
        if (isDark) {
          coreGradient.addColorStop(0, `rgba(200, 230, 255, ${0.9 + mouseHighlight * 0.1})`)
          coreGradient.addColorStop(0.5, `rgba(120, 200, 255, ${0.8 + mouseHighlight * 0.2})`)
          coreGradient.addColorStop(1, `rgba(100, 180, 255, ${0.6 + mouseHighlight * 0.3})`)
        } else {
          coreGradient.addColorStop(0, `rgba(180, 220, 255, ${0.9 + mouseHighlight * 0.1})`)
          coreGradient.addColorStop(0.5, `rgba(100, 170, 240, ${0.8 + mouseHighlight * 0.2})`)
          coreGradient.addColorStop(1, `rgba(80, 140, 220, ${0.7 + mouseHighlight * 0.3})`)
        }

        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = coreGradient
        ctx.fill()
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
