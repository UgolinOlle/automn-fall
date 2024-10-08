'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { usePathname } from 'next/navigation'

export const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const pathname = usePathname()
  const controls = useAnimation()

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const mouseOver = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).tagName === 'A' ||
        (e.target as HTMLElement).tagName === 'BUTTON'
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const mouseClick = () => {
      controls
        .start({
          scale: 0.8,
          transition: { duration: 0.1 },
        })
        .then(() => {
          controls.start({
            scale: 1,
            transition: { duration: 0.2 },
          })
        })
    }

    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mouseover', mouseOver)
    window.addEventListener('click', mouseClick)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('mouseover', mouseOver)
      window.removeEventListener('click', mouseClick)
    }
  }, [controls])

  const cursorColor =
    pathname === '/' ? 'hsl(22.93, 92.59%, 52.35%)' : 'rgb(51, 51, 51)'

  return (
    <>
      <style jsx global>{`
        body,
        * {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10001]"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 1000,
          damping: 28,
          mass: 0.1,
        }}
      >
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 397 433"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          animate={controls}
          style={{
            transform: `translate(-4px, -4px) scale(${isHovering ? 1.2 : 1})`,
            transformOrigin: 'top left',
          }}
        >
          <g filter="url(#filter0_d_2_20)">
            <path
              d="M40.3124 32.127C38.5563 23.7337 47.5414 17.2056 54.9813 21.4695L351.448 191.378C358.992 195.701 357.739 206.943 349.429 209.499L205.537 253.762C203.309 254.448 201.392 255.894 200.123 257.85L128.108 368.785C123.278 376.224 111.862 374.091 110.045 365.409L40.3124 32.127Z"
              fill={cursorColor}
            />
            <path
              d="M119.772 363.374L50.0397 30.0918L346.507 200L202.615 244.264C198.159 245.634 194.326 248.528 191.788 252.439L200.123 257.85L191.788 252.439L119.772 363.374Z"
              stroke="white"
              strokeWidth="19.8759"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_2_20"
              x="0.338074"
              y="0.251175"
              width="395.86"
              height="432.694"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="19.8759" />
              <feGaussianBlur stdDeviation="19.8759" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.28 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_2_20"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_2_20"
                result="shape"
              />
            </filter>
          </defs>
        </motion.svg>
      </motion.div>
    </>
  )
}
