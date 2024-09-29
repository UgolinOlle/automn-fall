import type { Metadata } from 'next'
import { Toaster } from 'sonner'

import './globals.css'
import { Author } from '~/components/common/author'
import { Navbar } from '~/components/common/navbar'
import { Cursor } from '~/components/common/cursor'
import { CloudScene } from '~/components/common/cloud-scene'

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
      <body className={`relative bg-hero-pattern bg-cover antialiased`}>
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
        <CloudScene />
        <Navbar />
        {children}
        <Author />
      </body>
    </html>
  )
}
