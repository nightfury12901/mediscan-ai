'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeartParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scene = new THREE.Scene()
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 35

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const createHeartShape = (t: number) => {
      const x = 16 * Math.pow(Math.sin(t), 3)
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
      return { x: x * 1.2, y: y * 1.2 }
    }

    // Fill the heart with particles
    const particlesCount = 3000
    const positions = new Float32Array(particlesCount * 3)
    const originalPositions = new Float32Array(particlesCount * 3)
    const colors = new Float32Array(particlesCount * 3)
    const scales = new Float32Array(particlesCount)

    // Generate particles to fill the heart shape
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3
      
      // Generate random point and check if inside heart
      let x, y, isInside
      let attempts = 0
      
      do {
        const t = Math.random() * Math.PI * 2
        const r = Math.random()
        
        const heartPoint = createHeartShape(t)
        x = heartPoint.x * r
        y = heartPoint.y * r - 3
        
        // Check if point is inside heart shape
        const checkT = Math.atan2(x, y + 3)
        const heartCheck = createHeartShape(checkT)
        const distFromEdge = Math.sqrt(x * x + (y + 3) * (y + 3))
        const heartDist = Math.sqrt(heartCheck.x * heartCheck.x + heartCheck.y * heartCheck.y)
        
        isInside = distFromEdge <= heartDist
        attempts++
      } while (!isInside && attempts < 50)

      positions[i3] = x + (Math.random() - 0.5) * 0.3
      positions[i3 + 1] = y + (Math.random() - 0.5) * 0.3
      positions[i3 + 2] = (Math.random() - 0.5) * 2

      originalPositions[i3] = positions[i3]
      originalPositions[i3 + 1] = positions[i3 + 1]
      originalPositions[i3 + 2] = positions[i3 + 2]

      // Cyan/blue colors - LOW BRIGHTNESS for subtle effect
      const colorMix = Math.random()
      colors[i3] = 0.15 + colorMix * 0.05      // Red channel (low)
      colors[i3 + 1] = 0.4 + colorMix * 0.1    // Green channel (medium)
      colors[i3 + 2] = 0.6 + colorMix * 0.1    // Blue channel (higher)

      scales[i] = Math.random() * 0.8 + 0.4
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector3(9999, 9999, 9999) }
      },
      vertexShader: `
        attribute float scale;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uTime;
        uniform vec3 uMouse;

        void main() {
          vColor = color;
          vec3 pos = position;
          
          // Check if cursor is directly on this particle
          float dist = distance(pos, uMouse);
          float scatterStrength = smoothstep(4.0, 0.0, dist);
          
          // Only scatter if cursor is very close (direct contact)
          if (scatterStrength > 0.01) {
            vec3 scatterDir = normalize(pos - uMouse);
            pos += scatterDir * scatterStrength * 15.0;
          }
          
          // Beating animation - rhythmic pulsing
          float heartbeat = sin(uTime * 2.5) * 0.06 + sin(uTime * 5.0) * 0.02;
          pos *= (1.0 + heartbeat);
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          gl_PointSize = scale * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;

        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
          float glow = 1.0 - smoothstep(0.0, 0.5, dist);
          
          // LOW brightness for subtle background effect
          gl_FragColor = vec4(vColor, alpha * 0.35 + glow * 0.15);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    const mouse = new THREE.Vector3(9999, 9999, 9999)
    const targetMouse = new THREE.Vector3(9999, 9999, 9999)

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      
      targetMouse.x = x * 25
      targetMouse.y = y * 25
      targetMouse.z = 0
    }

    window.addEventListener('mousemove', handleMouseMove)

    const clock = new THREE.Clock()
    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      mouse.lerp(targetMouse, 0.1)
      material.uniforms.uTime.value = elapsedTime
      material.uniforms.uMouse.value.copy(mouse)

      const positions = geometry.attributes.position.array as Float32Array
      
      // Smooth return to original positions
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3
        positions[i3] += (originalPositions[i3] - positions[i3]) * 0.05
        positions[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * 0.05
        positions[i3 + 2] += (originalPositions[i3 + 2] - positions[i3 + 2]) * 0.05
      }

      geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      container.removeChild(renderer.domElement)
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}