import { getCurrentOrgCookie } from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getProjects } from '@/http/get-projects'
import { dateFromNow } from '@/lib/dateFromNow'
import { nameInitials } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

export default async function ProjectList() {
  const currentOrg = await getCurrentOrgCookie()
  const { projects } = await getProjects(currentOrg!)
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} className="flex h-full flex-col justify-between">
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
            <CardDescription className="line-clamp-2 leading-relaxed">
              {project.description ||
                'Este projeto não possui uma descrição definida.'}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex items-center gap-1.5">
            <Avatar>
              {project.owner.avatarUrl && (
                <AvatarImage
                  src={project.owner.avatarUrl}
                  alt={project.owner.name || 'Avatar'}
                />
              )}

              <AvatarFallback>
                {nameInitials(project.owner.name || 'Usuário')}
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground flex gap-1 truncate text-xs">
              Criado por
              <span className="text-foreground truncate font-semibold">
                {project.owner.name || 'Usuário'}
              </span>
              {dateFromNow(project.createdAt)}
            </span>
            <Button size="xs" variant="outline" className="ml-auto">
              Ver detalhes
              <ArrowRight className="ml-2 size-3" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
