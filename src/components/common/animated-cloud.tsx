'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

/**
 * @function AnimatedCloud
 * @description Component that animates a cloud image across the page.
 * @exports AnimatedCloud
 */
export const AnimatedCloud: React.FC = () => {
  return (
    <motion.div
      className="absolute top-10"
      initial={{ x: '-100%' }}
      animate={{ x: '160%' }}
      transition={{
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'linear',
        duration: 50,
      }}
    >
      <Image
        src="/assets/cloud.webp"
        alt="Cloud"
        width={300}
        height={150}
        className="opacity-25 transition duration-300 ease-in-out hover:opacity-50"
      />
    </motion.div>
  )
}

/**
 * @function AnimatedCloud2
 * @description Component that animates a cloud image across the page.
 * @exports AnimatedCloud2
 */
export const AnimatedCloud2: React.FC = () => {
  return (
    <motion.div
      className="absolute top-0"
      initial={{ x: '-150%' }}
      animate={{ x: '170%' }}
      transition={{
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'linear',
        duration: 45,
      }}
    >
      <Image
        src="/assets/cloud.webp"
        alt="Cloud"
        width={300}
        height={150}
        className="opacity-25 transition duration-300 ease-in-out hover:opacity-50"
      />
    </motion.div>
  )
}
