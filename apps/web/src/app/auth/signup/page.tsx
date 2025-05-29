import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <form className="space-y-4">
      <div className="space-y-1">
        <Label>Nome</Label>
        <Input type="text" id="name" name="name" />
      </div>
      <div className="space-y-1">
        <Label>Email</Label>
        <Input type="email" id="email" name="email" />
      </div>

      <div className="space-y-1">
        <Label>Senha</Label>
        <Input type="password" id="password" name="password" />
      </div>
      <div className="space-y-1">
        <Label>Confirme sua senha</Label>
        <Input type="password" id="confirm-password" name="confirm-password" />
      </div>
      <Button type="submit" className="w-full">
        Criar conta
      </Button>
      <Button variant="link" className="w-full" asChild>
        <Link href="/auth/signin">Já tem uma conta? Login</Link>
      </Button>
      <Separator className="my-4" />

      <Button type="submit" variant="outline" size="sm" className="w-full">
        <Icons.gitHub className="dark:invert-0" />
        Entrar com o Github
      </Button>
    </form>
  )
}
