'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Send, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

export const Appointment: React.FC<{ className?: string }> = ({
  className,
}) => {
  // --- Variables
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [buttonWidth, setButtonWidth] = useState(0)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  }

  const planeVariants = {
    initial: { x: 0, y: 0, opacity: 0 },
    animate: {
      x: 70,
      y: -70,
      opacity: [0, 1, 0],
      transition: {
        duration: 1.5,
        times: [0, 0.2, 1],
        ease: 'easeInOut',
      },
    },
  }

  const successVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  }

  const loadingVariants = {
    hidden: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0, transition: { duration: 0.3 } },
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // --- Functions
  const toggleMenu = () => setIsOpen(!isOpen)

  const handleSignUp = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        setIsOpen(false)
        toast.success('Inscription réussie !')
      }, 1500) // Durée de l'animation de l'avion
    }, 2000)
  }

  // --- Render
  return (
    <div className={cn(`inline-block text-left`, className)}>
      <Button
        ref={buttonRef}
        className="text-md rounded-xl font-bold shadow-inner shadow-secondary"
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Se souvenir de l'automne
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            className="absolute mt-2"
            style={{ width: `${buttonWidth}px` }}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div
              className="rounded-xl bg-primary py-2 shadow-inner shadow-secondary"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <motion.div>
                <Button
                  className="w-[calc(100%-16px)]rounded-lg mx-2 bg-transparent text-sm font-bold shadow-none"
                  role="menuitem"
                  onClick={() => console.log('Enregistré sur iCloud')}
                >
                  Enregistrer sur iCloud
                </Button>
              </motion.div>
              <motion.div>
                <Button
                  className="mx-2 flex w-[calc(100%-16px)] justify-start rounded-lg bg-transparent text-sm font-bold shadow-none hover:bg-primary"
                  role="menuitem"
                  onClick={handleSignUp}
                  disabled={isLoading || isSuccess}
                >
                  {isSuccess && (
                    <motion.div
                      className="absolute inset-0 z-10 flex items-center justify-center"
                      initial="initial"
                      animate="animate"
                      variants={planeVariants}
                    >
                      <Send className="text-secondary" size={18} />
                    </motion.div>
                  )}
                  <AnimatePresence mode="wait">
                    {isLoading && (
                      <motion.div
                        key="loading"
                        className="flex items-center"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={loadingVariants}
                      >
                        <Loader2
                          className="mr-3 animate-spin text-secondary"
                          size={18}
                        />
                        Inscription en cours...
                      </motion.div>
                    )}
                    {isSuccess && (
                      <motion.div
                        key="success"
                        className="flex items-center text-neutral-100"
                        initial="hidden"
                        animate="visible"
                        variants={successVariants}
                      >
                        <CheckCircle
                          className="mr-3 text-secondary"
                          size={18}
                        />
                        Inscription réussie !
                      </motion.div>
                    )}
                    {!isLoading && !isSuccess && (
                      <motion.div key="default">List d'attente</motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
