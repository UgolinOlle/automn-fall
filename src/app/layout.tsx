import type { Metadata } from 'next'
import { Toaster } from 'sonner'

import './globals.css'
import { Author } from '~/components/common/author'
import { Navbar } from '~/components/common/navbar'
import {
  AnimatedCloud,
  AnimatedCloud2,
} from '~/components/common/animated-cloud'
import { Cursor } from '~/components/common/cursor'

export const metadata: Metadata = {
  title: 'Automn Fall · Ugolin Olle',
  description: 'Simple landing page automn fall inspired by Framer Fall Event.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`relative m-auto h-full max-w-2xl bg-hero-pattern bg-cover px-4 antialiased`}
      >
        <Toaster
          position="bottom-center"
          toastOptions={{
            className: 'bg-leaf-pattern font-bold text-white',
            style: {
              backgroundSize: 'cover',
              borderRadius: '8px',
            },
          }}
        />
        <Cursor />
        <AnimatedCloud />
        <AnimatedCloud2 />
        <Navbar />
        {children}
        <Author />
      </body>
    </html>
  )
}
