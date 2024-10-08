import { Leaf } from 'lucide-react'
import Link from 'next/link'
import { Container } from '~/components/common/container'
import { Heading } from '~/components/ui/heading'

export default function NotFound() {
  // --- Render
  return (
    <Container className="gap-10">
      <Heading className="bg-leaf-pattern bg-clip-text text-7xl text-transparent">
        404
      </Heading>
      <Link href="/" passHref className="flex items-center gap-2">
        <Leaf size={24} className="cursor-pointer text-primary" />
        <span className="text-primary">Go back home</span>
      </Link>
    </Container>
  )
}
