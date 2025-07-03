import { auth, isAuthenticated } from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { acceptInvite } from '@/http/accept-invite'
import { getInvite } from '@/http/get-invite'
import { dateFromNow } from '@/lib/dateFromNow'
import { nameInitials } from '@/lib/utils'
import { CheckCircle, LogIn, LogOut } from 'lucide-react'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface InvitePageProps {
  params: {
    id: string
  }
}
export default async function InvitePage({ params }: InvitePageProps) {
  const { id: inviteId } = await params
  const { invite } = await getInvite(inviteId)

  const isUserAuthenticated = await isAuthenticated()
  const userIsAuthenticatedWithSameEmailFromInvite =
    isUserAuthenticated && invite.email === (await auth()).user.email
      ? true
      : false

  async function handleSignInFromInvite() {
    'use server'
    const cookieStore = await cookies()
    cookieStore.set('inviteId', inviteId)
    redirect(`/auth/signin?email=${invite.email}`)
  }

  async function acceptInviteAction() {
    'use server'
    await acceptInvite({ inviteId })
    revalidateTag('organizations')
    redirect('/')
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="size-16">
            {invite.author?.avatarUrl ? (
              <AvatarImage
                src={invite.author.avatarUrl}
                alt={invite.author.name ?? 'Invite Author'}
              />
            ) : (
              <AvatarFallback>
                {nameInitials(invite.author?.name ?? 'Invite Author')}
              </AvatarFallback>
            )}
          </Avatar>
          <p className="text-muted-foreground relative text-center leading-relaxed text-balance">
            <span className="text-foreground font-medium">
              {' '}
              {invite.author?.name ?? 'Alguem'}{' '}
            </span>{' '}
            convidou você para se juntar a{' '}
            <span className="text-foreground font-medium">
              {invite.organization.name}
            </span>
            <span className="text-muted-foreground absolute right-2 -bottom-4 text-xs italic">
              {dateFromNow(invite.createdAt)}
            </span>
          </p>
        </div>
        <Separator />

        {!isUserAuthenticated ? (
          <form action={handleSignInFromInvite}>
            <Button type="submit" className="w-full" variant="secondary">
              <LogIn className="mr-2 size-4" />
              Aceitar convite
            </Button>
          </form>
        ) : null}

        {userIsAuthenticatedWithSameEmailFromInvite ? (
          <form action={acceptInviteAction}>
            <Button type="submit" className="w-full" variant="secondary">
              <CheckCircle className="mr-2 size-4" />
              Conectar-se a {invite.organization.name}
            </Button>
          </form>
        ) : null}

        {isUserAuthenticated && !userIsAuthenticatedWithSameEmailFromInvite ? (
          <div className="space-y-4">
            <p className="text-muted-foreground text-center text-sm leading-relaxed text-balance">
              Esse convite é destinado a{' '}
              <span className="text-foreground font-medium">
                {invite.email},
              </span>
              mas você já está autenticado com{' '}
              <span className="text-foreground font-medium">
                {(await auth()).user.email}.
              </span>
            </p>
            <div className="space-y-2">
              <Button className="w-full" variant="secondary" asChild>
                <a href="/api/auth/signout">
                  <LogOut className="mr-2 size-4" />
                  Sair da conta {(await auth()).user.email}
                </a>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/">Voltar para a página inicial</Link>
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  )
}
