import { Heading } from '~/components/ui/heading'

/**
 * @function Home
 * @description The main page of Automn Fall.
 * @exports Home
 */
export default function Home() {
  // --- Render
  return (
    <div className="flex min-h-screen flex-col items-center py-24">
      <Heading className="w-auto bg-leaf-pattern bg-clip-text text-7xl text-transparent">
        Automn Fall
      </Heading>
      <span className="italic text-secondary">Made by Ugolin OLLE with ❤️</span>
    </div>
  )
}
