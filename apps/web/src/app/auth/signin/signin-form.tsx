'use client'

import { Icons } from '@/components/icons'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@radix-ui/react-separator'
import Link from 'next/link'
import { useActionState } from 'react'
import { signInWithEmailAndPassword } from './actions'

export function SignInForm() {
  const [{ success, message, errors }, formAction, isPending] = useActionState(
    signInWithEmailAndPassword,
    {
      success: false,
      message: null,
      errors: null,
    }
  )
  return (
    <form action={formAction} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <Icons.triangleAlert className="size-4" />
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-1">
        <Label>Email</Label>
        <Input type="text" id="email" name="email" />
        {errors?.email && (
          <p className="text-sm text-red-500 dark:text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label>Senha</Label>
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
      <Button type="submit" className="w-full">
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
      <Separator className="my-4" />

      <Button
        type="submit"
        variant="outline"
        className="w-full"
        disabled={isPending}
      >
        <Icons.gitHub className="dark:invert-0" />
        Entrar com o Github
      </Button>
    </form>
  )
}
