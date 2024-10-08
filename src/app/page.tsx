import { Appointment } from '~/components/common/appointement'
import { Heading } from '~/components/ui/heading'

/**
 * @function Home
 * @description The main page of Automn Fall.
 * @exports Home
 */
export default function Home() {
  // --- Render
  return (
    <div className="m-auto flex h-full min-h-screen max-w-2xl flex-col items-center px-4 py-48">
      <Heading className="z-[10000] w-auto bg-leaf-pattern bg-clip-text text-7xl text-transparent">
        Automn Fall
      </Heading>
      <span className="italic text-primary">Made by Ugolin OLLE with ❤️</span>
      <Appointment className="z-[10000] mt-12" />
    </div>
  )
}
