import type { Metadata } from 'next'

import './globals.css'
import { Author } from '~/components/common/author'

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
        {children}
        <Author />
      </body>
    </html>
  )
}
