import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return (
    <div
      className={cn(
        'h-full mx-auto w-full px-2 md:px-7',
        className
      )}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper
