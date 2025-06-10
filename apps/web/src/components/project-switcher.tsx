'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getProjects } from '@/http/get-projects'
import { nameInitials } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default async function ProjectSwitcher() {
  const { slug: orgSlug } = useParams<{
    slug: string
  }>()

  const { data, isLoading } = useQuery({
    queryKey: ['projects', orgSlug],
    queryFn: () => getProjects(orgSlug),
    enabled: !!orgSlug,
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-primary flex w-[200px] items-center gap-2 rounded p-1 text-sm outline-none focus-visible:ring-2">
        {/* {currentOrganization ? (
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
          <span className="text-muted-foreground">Selecione o projeto</span>
        )} */}
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
