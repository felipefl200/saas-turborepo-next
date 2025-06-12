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
import { Skeleton } from './ui/skeleton'

export default function ProjectSwitcher() {
  const { slug: orgSlug, project: projectSlug } = useParams<{
    slug: string
    project: string
  }>()
  console.log('slug', orgSlug)

  const { data, isLoading } = useQuery({
    queryKey: [orgSlug, 'projects'],
    queryFn: () => getProjects(orgSlug),
    enabled: !!orgSlug,
  })

  const currentProject =
    data && projectSlug
      ? data.projects.find((p) => p.slug === projectSlug)
      : null

  console.log(data)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-primary flex w-[200px] items-center gap-2 rounded p-1 text-sm outline-none focus-visible:ring-2">
        {isLoading ? (
          <>
            <Skeleton className="size-4 rounded-full" />

            <Skeleton className="h-4 w-full flex-1" />
          </>
        ) : currentProject ? (
          <>
            <Avatar>
              {currentProject.avatarUrl && (
                <AvatarImage src={currentProject.avatarUrl} />
              )}
              <AvatarFallback>
                {nameInitials(currentProject.name)}
              </AvatarFallback>
            </Avatar>
            <span className="truncate text-left">{currentProject.name}</span>
          </>
        ) : (
          <span className="text-muted-foreground">Selecione o projeto</span>
        )}
        <ChevronsUpDown className="text-muted-foreground ml-auto size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={12} className="w-[200px]">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Projeto</DropdownMenuLabel>
          {data &&
            data.projects.map((project) => {
              return (
                <DropdownMenuItem key={project.id}>
                  <a
                    href={`/org/${orgSlug}/project/${project.slug}`}
                    className="flex items-center gap-2"
                  >
                    <Avatar>
                      {project.avatarUrl && (
                        <AvatarImage src={project.avatarUrl} />
                      )}
                      <AvatarFallback>
                        {nameInitials(project.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="line-clamp-1">{project.name}</span>
                  </a>
                </DropdownMenuItem>
              )
            })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={`/org/${orgSlug}/create-project`}
            className="flex items-center gap-2"
          >
            <PlusCircle className="mr-2 size-6" />
            Novo projeto
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
