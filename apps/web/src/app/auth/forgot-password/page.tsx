import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  return (
    <form className="space-y-4">
      <div className="space-y-1">
        <Label>Email</Label>
        <Input type="email" id="email" name="email" />
      </div>

      <Button type="submit" className="w-full">
        Recuperar minha conta
      </Button>

      <Button variant="link" className="w-full" asChild>
        <Link href="/auth/signup">Fazer login ?</Link>
      </Button>
    </form>
  )
}
