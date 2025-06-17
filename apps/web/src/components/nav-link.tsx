'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps extends React.ComponentProps<typeof Link> {}

export function NavLink({ children, ...props }: NavLinkProps) {
  const pathname = usePathname()

  const isCurrent = props.href.toString() === pathname

  return (
    <Link data-current={isCurrent} {...props}>
      {children}
    </Link>
  )
}
