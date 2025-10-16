'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function InteractiveParticles() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetMouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scene = new THREE.Scene()
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 50

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Create particles
    const particlesCount = 1500
    const positions = new Float32Array(particlesCount * 3)
    const colors = new Float32Array(particlesCount * 3)
    const scales = new Float32Array(particlesCount)
    const velocities = new Float32Array(particlesCount * 3)

    // Initialize particles
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3

      // Position
      positions[i3] = (Math.random() - 0.5) * 100
      positions[i3 + 1] = (Math.random() - 0.5) * 100
      positions[i3 + 2] = (Math.random() - 0.5) * 50

      // Color gradient (cyan to purple)
      const colorMix = Math.random()
      colors[i3] = 0.13 + colorMix * 0.4      // R (cyan to purple)
      colors[i3 + 1] = 0.7 - colorMix * 0.35  // G
      colors[i3 + 2] = 0.93 - colorMix * 0.2  // B

      // Scale
      scales[i] = Math.random() * 2 + 0.5

      // Velocity
      velocities[i3] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))

    // Custom shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: `
        attribute float scale;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uTime;
        uniform vec2 uMouse;

        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Distance from mouse
          vec2 mousePos = uMouse * 50.0;
          float dist = distance(position.xy, mousePos);
          float repulsion = smoothstep(20.0, 0.0, dist) * 5.0;
          
          mvPosition.xy += normalize(position.xy - mousePos) * repulsion;
          
          gl_PointSize = scale * (300.0 / -mvPosition.z) * (1.0 + sin(uTime + position.x) * 0.2);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;

        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          
          gl_FragColor = vec4(vColor, strength * 0.6);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      targetMouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      targetMouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation
    const clock = new THREE.Clock()
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse following
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05

      // Update shader uniforms
      material.uniforms.uTime.value = elapsedTime
      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y)

      // Animate particles
      const positions = geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3

        // Apply velocity
        positions[i3] += velocities[i3]
        positions[i3 + 1] += velocities[i3 + 1]
        positions[i3 + 2] += velocities[i3 + 2]

        // Boundary check and wrap
        if (Math.abs(positions[i3]) > 50) velocities[i3] *= -1
        if (Math.abs(positions[i3 + 1]) > 50) velocities[i3 + 1] *= -1
        if (Math.abs(positions[i3 + 2]) > 25) velocities[i3 + 2] *= -1
      }

      geometry.attributes.position.needsUpdate = true

      // Rotate particles slowly
      particles.rotation.y = elapsedTime * 0.05
      particles.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
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
