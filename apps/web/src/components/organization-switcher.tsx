import { getCurrentOrgCookie } from '@/auth/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getOrganizations } from '@/http/get-organizations'
import { nameInitials } from '@/lib/utils'
import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default async function OrganizationSwitcher() {
  const currentOrgCookie = await getCurrentOrgCookie()
  const { organizations } = await getOrganizations()

  const currentOrganization = organizations.find(
    (org) => org.slug === currentOrgCookie
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-primary flex w-[200px] items-center gap-2 rounded p-1 text-sm outline-none focus-visible:ring-2">
        {currentOrganization ? (
          <>
            <Avatar>
              {currentOrganization.avatarUrl && (
                <AvatarImage src={currentOrganization.avatarUrl} />
              )}
              <AvatarFallback>
                {nameInitials(currentOrganization.name)}
              </AvatarFallback>
            </Avatar>
            <span className="truncate text-left">
              {currentOrganization.name}
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">Selecione a organização</span>
        )}
        <ChevronsUpDown className="text-muted-foreground ml-auto size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={12} className="w-[200px]">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organização</DropdownMenuLabel>
          {organizations.map((organizations) => {
            return (
              <DropdownMenuItem key={organizations.id}>
                <a
                  href={`/org/${organizations.slug}`}
                  className="flex items-center gap-2"
                >
                  <Avatar>
                    {organizations.avatarUrl && (
                      <AvatarImage src={organizations.avatarUrl} />
                    )}
                    <AvatarFallback>
                      {nameInitials(organizations.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="line-clamp-1">{organizations.name}</span>
                </a>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/create-organization" className="flex items-center gap-2">
            <PlusCircle className="mr-2 size-6" />
            Nova organização
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
