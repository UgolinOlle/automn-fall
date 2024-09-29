'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Cloud {
  id: number
  x: number
  y: number
  width: number
  height: number
}

/**
 * @function CloudCanvas
 * @description Component using canvas to draw and drag clouds with a floating effect
 * @exports CloudCanvas
 */
export const CloudCanvas: React.FC = () => {
  // --- Variables
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [clouds, setClouds] = useState<Cloud[]>([
    { id: 1, x: 100, y: 100, width: 300, height: 150 },
  ])
  const [draggingCloud, setDraggingCloud] = useState<Cloud | null>(null)
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(
    null
  )

  // --- Functions
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (!ctx || !canvas) return

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      clouds.forEach((cloud) => {
        const img = new Image()
        img.src = '/assets/cloud.webp'
        img.onload = () => {
          ctx.drawImage(img, cloud.x, cloud.y, cloud.width, cloud.height)
        }
      })
    }

    draw()
  }, [clouds])

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent
    const cloud = clouds.find(
      (c) =>
        offsetX > c.x &&
        offsetX < c.x + c.width &&
        offsetY > c.y &&
        offsetY < c.y + c.height
    )
    if (cloud) {
      setDraggingCloud(cloud)

      // Save the offset where the user clicked relative to the cloud's top-left corner
      setDragOffset({ x: offsetX - cloud.x, y: offsetY - cloud.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingCloud || !dragOffset) return

    const { offsetX, offsetY } = e.nativeEvent

    // Move the cloud while maintaining the offset from the initial click
    setClouds((prevClouds) =>
      prevClouds.map((cloud) =>
        cloud.id === draggingCloud.id
          ? {
              ...cloud,
              x: offsetX - dragOffset.x,
              y: offsetY - dragOffset.y,
            }
          : cloud
      )
    )
  }

  const handleMouseUp = () => {
    setDraggingCloud(null)
    setDragOffset(null) // Reset the drag offset
  }

  // --- Render
  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute left-0 top-0"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      // Apply wave-like oscillation while dragging
      whileDrag={{
        rotate: [0, 5, -5, 0], // Oscillation effect
        transition: {
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut',
        },
      }}
    />
  )
}
