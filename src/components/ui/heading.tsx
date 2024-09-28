import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

// --- Heading Variants
type Variant = 'h1' | 'h2' | 'h3'

// --- Header Variants
const headingVariants = cva(
  'text-neutral-800 dark:text-neutral-200 text-lg font-semibold',
  {
    variants: {
      variant: {
        h1: 'lg:text-8xl md:text-7xl text-6xl font-title',
        h2: 'lg:text-5xl md:text-4xl text-3xl font-title',
        h3: 'lg:text-3xl md:text-2xl text-xl font-title',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      variant: 'h1',
      align: 'left',
    },
  }
)

// --- Variants mapping for HTML heading elements
const variantToTagMap: Record<Variant, keyof JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
}

/**
 * @interface IHeadingProps
 * @description Les props pour le composant Heading.
 * @extends React.HTMLAttributes<HTMLHeadingElement>
 * @extends VariantProps<typeof headingVariants>
 * @exports IHeadingProps
 */
export interface IHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: keyof JSX.IntrinsicElements
}

/**
 * @name Heading
 * @description Un composant de titre qui peut être utilisé pour afficher différentes tailles de titres.
 * @returns {React.ReactElement} Le composant Heading.
 */
function Heading({
  variant = 'h1',
  align = 'left',
  className,
  as,
  ...props
}: IHeadingProps): React.ReactElement {
  const Tag = as || variantToTagMap[variant] || 'h1'

  return (
    <Tag className={cn(headingVariants({ variant, align }), className)}>
      {props.children}
    </Tag>
  )
}

export { headingVariants, Heading }
