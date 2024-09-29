'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { INavbarItem } from '~/lib/interfaces/common'

/**
 * @function Navbar
 * @description Component to navigate between seasons with a glassmorphism effect that fits the layout.
 * @exports Navbar
 */
export const Navbar: React.FC = () => {
  // --- Variables
  const seasons: INavbarItem[] = [
    { title: 'Été', url: '/ete' },
    { title: 'Automne', url: '/' },
    { title: 'Hiver', url: '/hiver' },
    { title: 'Printemps', url: '/printemps' },
  ]
  const router = useRouter()

  // --- Render
  return (
    <nav className="fixed left-0 right-0 top-0 mx-auto mt-4 flex w-full max-w-2xl items-center justify-center rounded-full bg-white/30 backdrop-blur-xl transition duration-300 ease-in-out hover:bg-neutral-100/50">
      <ul className="flex w-full items-center justify-between px-8 py-3">
        {seasons.map((season, index) => (
          <li
            key={index}
            onClick={() => router.push(season.url)}
            className="flex transform cursor-pointer items-center justify-center rounded-xl px-4 py-2 text-xl font-bold text-white transition hover:scale-105"
          >
            {season.title}
          </li>
        ))}
      </ul>
    </nav>
  )
}
