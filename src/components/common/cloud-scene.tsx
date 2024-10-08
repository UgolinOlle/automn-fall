'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { OrbitControls } from '@react-three/drei'

/**
 * @function FloatingCloud
 * @description A floating cloud that moves from right to left and can be dragged around.
 */
const FloatingCloud: React.FC = () => {
  const cloudRef = useRef<any>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const [cloudPosition, setCloudPosition] = useState<{ x: number; y: number }>({
    x: 8,
    y: 3,
  })
  const [targetOpacity, setTargetOpacity] = useState(0.2)
  const [currentOpacity, setCurrentOpacity] = useState(0.2)
  const [windowWidth, setWindowWidth] = useState<number>(
    window.innerWidth / 100
  )
  const cloudTexture = useLoader(TextureLoader, '/assets/cloud.webp')

  // --- Functions
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth / 100)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useFrame((state) => {
    if (cloudRef.current) {
      const opacityDiff = targetOpacity - currentOpacity
      if (Math.abs(opacityDiff) > 0.01) {
        setCurrentOpacity((prev) => prev + opacityDiff * 0.05)
        cloudRef.current.material.opacity = currentOpacity
      }

      const geometry = cloudRef.current.geometry
      const position = geometry.attributes.position
      const time = state.clock.getElapsedTime()

      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i)
        const y = position.getY(i)
        const waveX = Math.sin(time + x * 2) * 0.02
        const waveY = Math.sin(time + y * 2) * 0.02

        if (isDragging) {
          const dragWaveX = Math.sin(time * 5 + x * 10) * 0.1
          const dragWaveY = Math.cos(time * 5 + y * 10) * 0.1
          position.setZ(i, waveX + waveY + dragWaveX + dragWaveY)
        } else {
          position.setZ(i, waveX + waveY)
        }
      }

      position.needsUpdate = true

      // Stop the cloud movement when dragging
      if (!isDragging) {
        setCloudPosition((prevPosition) => {
          const newX = prevPosition.x - 0.02
          if (newX < -windowWidth * 5) {
            return { ...prevPosition, x: windowWidth * 5 }
          }
          return { ...prevPosition, x: newX }
        })

        cloudRef.current.position.x = cloudPosition.x
      }
    }
  })

  const onPointerDown = (e: any) => {
    setIsDragging(true)
    const { x, y } = e.point
    setDragOffset({ x: x - cloudPosition.x, y: y - cloudPosition.y })
  }

  const onPointerMove = (e: any) => {
    if (isDragging && cloudRef.current) {
      const newX = e.point.x - dragOffset.x
      const newY = e.point.y - dragOffset.y

      setCloudPosition({ x: newX, y: newY })

      cloudRef.current.position.x = newX
      cloudRef.current.position.y = newY
    }
  }

  const onPointerUp = () => {
    setIsDragging(false)
  }

  const onPointerOver = () => {
    setTargetOpacity(0.5)
  }

  const onPointerOut = () => {
    setTargetOpacity(0.1)
  }

  // --- Render
  return (
    <mesh
      ref={cloudRef}
      position={[cloudPosition.x, cloudPosition.y, 0]}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <planeGeometry args={[5, 3, 32, 32]} />{' '}
      <meshBasicMaterial
        map={cloudTexture}
        transparent
        opacity={currentOpacity}
      />
    </mesh>
  )
}

/**
 * @function CloudScene
 * @description A scene with a floating cloud.
 * @exports CloudScene
 */
export const CloudScene: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    >
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} castShadow />
        <OrbitControls enableRotate={false} enableZoom={false} />
        <FloatingCloud />
      </Canvas>
    </div>
  )
}

export default CloudScene
