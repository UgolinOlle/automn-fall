import { Appointment } from '~/components/common/appointement'
import { Container } from '~/components/common/container'
import { Heading } from '~/components/ui/heading'

/**
 * @function Home
 * @description The main page of Automn Fall.
 * @exports Home
 */
export default function Home() {
  // --- Render
  return (
    <Container>
      <Heading className="z-[10000] w-auto bg-leaf-pattern bg-clip-text text-7xl text-transparent">
        Automn Fall
      </Heading>
      <span className="italic text-primary">Made by Ugolin OLLE with ❤️</span>
      <Appointment className="z-[10000] mt-12" />
    </Container>
  )
}
