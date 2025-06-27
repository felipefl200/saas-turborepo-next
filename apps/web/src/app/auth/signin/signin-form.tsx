'use client'

import { Icons } from '@/components/icons'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hook/use-form-state'
import { Separator } from '@radix-ui/react-separator'
import Link from 'next/link'

import { useRouter, useSearchParams } from 'next/navigation'
import { signInWithGithub } from '../actions'
import { signInWithEmailAndPassword } from './actions'

export function SignInForm() {
  const router = useRouter()

  const searchParams = useSearchParams()
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    signInWithEmailAndPassword,
    () => {
      router.push('/')
    } // Redirect to home on success
  )
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {success === false && message && (
          <Alert variant="destructive">
            <Icons.triangleAlert className="size-4" />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            defaultValue={searchParams.get('email') || ''}
          />
          {errors?.email && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Senha</Label>
          <Input type="password" id="password" name="password" />
          {errors?.password && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {errors.password}
            </p>
          )}
          <Link
            href="/auth/forgot-password"
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            Esqueceu sua senha?
          </Link>
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Icons.spinner className="animate-spin" /> : 'Entrar'}
        </Button>

        <Button
          type="submit"
          variant="link"
          className="w-full"
          asChild
          disabled={isPending}
        >
          <Link href="/auth/signup">
            {isPending ? (
              <Icons.spinner className="animate-spin" />
            ) : (
              'Criar conta'
            )}
          </Link>
        </Button>
      </form>
      <Separator className="my-4" />
      <form action="">
        <Button
          type="submit"
          variant="outline"
          className="w-full"
          disabled={isPending}
          formAction={signInWithGithub}
        >
          <Icons.gitHub className="size-4 dark:invert-0" />
          Entrar com o Github
        </Button>
      </form>
    </div>
  )
}
