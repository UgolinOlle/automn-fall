import { cn } from '~/lib/utils'

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}): JSX.Element => {
  // --- Render
  return (
    <div
      className={cn(
        'm-auto flex h-full min-h-screen max-w-2xl flex-col items-center px-4 py-48',
        className
      )}
    >
      {children}
    </div>
  )
}
