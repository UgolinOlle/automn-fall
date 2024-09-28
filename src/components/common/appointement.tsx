'use client'

import { motion } from 'framer-motion'

/**
 * @function Appointement
 * @description Appointement button component animated with framer-motion
 * @exports Appointement
 */
export const Appointement: React.FC = () => {
  // --- Render
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="appointement"
    ></motion.div>
  )
}
