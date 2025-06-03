'use client'
import { Icons } from '@/components/icons'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hook/use-form-state'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signInWithGithub } from '../actions'
import { signUpAction } from './actions'

export default function SignUpForm() {
  const router = useRouter()
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    signUpAction,
    () => router.push('/auth/signin')
  )
  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {!success && message && (
          <Alert variant="destructive">
            <AlertTitle>Erro ao criar conta</AlertTitle>
            <Icons.triangleAlert className="size-4" />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-1">
          <Label>Nome</Label>
          <Input type="text" id="name" name="name" />
          {errors?.name && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {errors.name[0]}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label>Email</Label>
          <Input type="email" id="email" name="email" />
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
        </div>
        <div className="space-y-1">
          <Label>Confirme sua senha</Label>
          <Input type="password" id="confirmPassword" name="confirmPassword" />
          {errors?.confirmPassword && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {errors.confirmPassword[0]}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Icons.spinner className="animate-spin" />
          ) : (
            'Criar conta'
          )}
        </Button>
        <Button disabled={isPending} variant="link" className="w-full" asChild>
          <Link href="/auth/signin">Já tem uma conta? Login</Link>
        </Button>
      </form>
      <Separator className="my-4" />
      <form action={signInWithGithub}>
        <Button
          disabled={isPending}
          type="submit"
          variant="outline"
          className="w-full"
        >
          <Icons.gitHub className="size-4 dark:invert-0" />
          Entrar com o Github
        </Button>
      </form>
    </div>
  )
}
