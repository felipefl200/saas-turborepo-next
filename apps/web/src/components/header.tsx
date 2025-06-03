import logo from '@/assets/logo.svg'
import { Slash } from 'lucide-react'
import Image from 'next/image'
import OrganizationSwitcher from './organization-switcher'
import ProfileButton from './profile-button'

export default function Header() {
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Image src={logo} alt="Logo" className="size-6 dark:opacity-80" />
        <Slash className="text-border hidden size-4 -rotate-[24deg] md:inline-block" />
        <OrganizationSwitcher />
      </div>
      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </div>
  )
}
