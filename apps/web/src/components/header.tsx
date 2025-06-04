import logo from '@/assets/logo.svg'
import { ability } from '@/auth/auth'
import { Slash } from 'lucide-react'
import Image from 'next/image'
import OrganizationSwitcher from './organization-switcher'
import ProfileButton from './profile-button'

import { ThemeSwitcher } from './theme/theme-switcher'
import { Separator } from './ui/separator'

export default async function Header() {
  const permissions = await ability()
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Image src={logo} alt="Logo" className="size-6 dark:opacity-80" />
        <Slash className="text-border hidden size-4 -rotate-[24deg] md:inline-block" />
        <OrganizationSwitcher />
        {permissions?.can('read', 'Project') && (
          <span className="text-border text-xs">Projects</span>
        )}
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Separator orientation="vertical" className="py-4" />

        <ProfileButton />
      </div>
    </div>
  )
}
