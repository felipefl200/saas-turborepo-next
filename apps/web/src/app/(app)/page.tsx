import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Home() {
  return (
    <main className="mx-auto w-full max-w-[1200px]">
      <p className="text-muted-foreground text-sm">
        Selecione uma organização no menu
      </p>
      <Link href="/create-organization">
        <Button>Criar organização</Button>
      </Link>
      <br />
      <Link href="/create-organization" className="text-blue-500 underline">
        Link de teste para interceptação
      </Link>
    </main>
  )
}
