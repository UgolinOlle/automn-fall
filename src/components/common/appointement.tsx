'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

export const Appointment: React.FC<{ className?: string }> = ({
  className,
}) => {
  // --- Variables
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [buttonWidth, setButtonWidth] = useState(0)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  }

  // --- Effects
  useEffect(() => {
    const updateButtonWidth = () => {
      if (buttonRef.current) {
        setButtonWidth(buttonRef.current.offsetWidth)
      }
    }

    updateButtonWidth()
    window.addEventListener('resize', updateButtonWidth)

    return () => {
      window.removeEventListener('resize', updateButtonWidth)
    }
  }, [])

  // --- Functions
  const toggleMenu = () => setIsOpen(!isOpen)

  const handleSignUp = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsOpen(false)
      toast.success('Inscription réussie !')
    }, 2000)
  }

  // --- Render
  return (
    <div className={cn(`inline-block text-left`, className)}>
      <Button
        ref={buttonRef}
        className="text-md rounded-xl py-5 font-bold"
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Se souvenir de l'automne
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute mt-2"
            style={{ width: `${buttonWidth}px` }}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div
              className="rounded-xl bg-primary/50 py-2"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <Button
                className="mx-2 flex w-[calc(100%-16px)] justify-start rounded-xl bg-transparent py-5 text-sm font-bold shadow-none duration-300 hover:bg-primary"
                role="menuitem"
                onClick={() => console.log('Enregistré sur iCloud')}
              >
                Enregistrer sur iCloud
              </Button>
              <Button
                className="mx-2 flex w-[calc(100%-16px)] justify-start rounded-xl bg-transparent py-5 text-sm font-bold shadow-none duration-300 hover:bg-primary"
                role="menuitem"
                onClick={handleSignUp}
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-3 h-5 w-5 animate-spin" />}
                {isLoading ? 'Inscription en cours...' : 'News Letter'}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
