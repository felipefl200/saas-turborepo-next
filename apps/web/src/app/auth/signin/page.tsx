import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <form className="space-y-4">
      <div className="space-y-1">
        <Label>Email</Label>
        <Input type="email" id="email" name="email" />
      </div>

      <div className="space-y-1">
        <Label>Senha</Label>
        <Input type="password" id="password" name="password" />
        <Link
          href="/auth/forgot-password"
          className="text-muted-foreground hover:text-foreground text-sm"
        >
          Esqueceu sua senha?
        </Link>
      </div>
      <Button type="submit" className="w-full">
        Entre com o seu email
      </Button>

      <Button variant="link" className="w-full" asChild>
        <Link href="/auth/signup">Criar nova conta</Link>
      </Button>
      <Separator className="my-4" />

      <Button type="submit" variant="outline" className="w-full">
        <Icons.gitHub className="dark:invert-0" />
        Entrar com o Github
      </Button>
    </form>
  )
}
