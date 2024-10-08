'use client'

import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { OrbitControls } from '@react-three/drei'

/**
 * @function FloatingLeaf
 * @description A draggable leaf that has a floating/undulating effect.
 */
const FloatingLeaf: React.FC = () => {
  const leafRef = useRef<any>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const [leafPosition, setLeafPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const [targetOpacity, setTargetOpacity] = useState(0.5)
  const [currentOpacity, setCurrentOpacity] = useState(0.5)
  const leafTexture = useLoader(TextureLoader, '/assets/leaf.svg')

  // --- Functions
  useFrame((state) => {
    if (leafRef.current) {
      // Handle opacity transition
      const opacityDiff = targetOpacity - currentOpacity
      if (Math.abs(opacityDiff) > 0.01) {
        setCurrentOpacity((prev) => prev + opacityDiff * 0.05)
        leafRef.current.material.opacity = currentOpacity
      }

      // Apply a floating/undulating effect to the leaf
      if (!isDragging) {
        // Only undulate when not dragging
        const geometry = leafRef.current.geometry
        const position = geometry.attributes.position
        const time = state.clock.getElapsedTime()

        for (let i = 0; i < position.count; i++) {
          const x = position.getX(i)
          const y = position.getY(i)
          const waveX = Math.sin(time + x * 2) * 0.02
          const waveY = Math.sin(time + y * 2) * 0.02

          position.setZ(i, waveX + waveY)
        }

        position.needsUpdate = true
      }
    }
  })

  const onPointerDown = (e: any) => {
    setIsDragging(true)
    const { x, y } = e.point
    setDragOffset({ x: x - leafPosition.x, y: y - leafPosition.y })
  }

  const onPointerMove = (e: any) => {
    if (isDragging && leafRef.current) {
      const newX = e.point.x - dragOffset.x
      const newY = e.point.y - dragOffset.y

      setLeafPosition({ x: newX, y: newY })

      leafRef.current.position.x = newX
      leafRef.current.position.y = newY
    }
  }

  const onPointerUp = () => {
    setIsDragging(false)
  }

  const onPointerOver = () => {
    setTargetOpacity(1)
  }

  const onPointerOut = () => {
    setTargetOpacity(0.5)
  }

  // --- Render
  return (
    <mesh
      ref={leafRef}
      position={[leafPosition.x, leafPosition.y, 0]}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <planeGeometry args={[5, 3, 32, 32]} />{' '}
      {/* Adjust the size to fit the leaf image */}
      <meshBasicMaterial
        map={leafTexture}
        transparent
        opacity={currentOpacity}
      />
    </mesh>
  )
}

/**
 * @function StickersScene
 * @description The StickersScene component displays multiple draggable leaves.
 * @exports StickersScene
 */
export const StickersScene: React.FC = () => {
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
        <FloatingLeaf />
      </Canvas>
    </div>
  )
}
