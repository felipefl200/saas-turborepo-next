'use client'

import { shutdownOrganizationAction } from '@/app/(app)/org/actions'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { XCircle } from 'lucide-react'
import { useRef, useState } from 'react'

export function ShutdownOrganizationButton({
  organization,
}: {
  organization: string
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const [confirmation, setConfirmation] = useState('')
  const isConfirmed = confirmation === organization

  function handleConfirm() {
    if (isConfirmed) {
      formRef.current?.requestSubmit()
    }
  }

  return (
    <>
      {/* Form hidden, fora do AlertDialog */}
      <form
        ref={formRef}
        action={shutdownOrganizationAction}
        className="hidden"
      >
        <input type="hidden" name="organization" value={organization} />
      </form>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-56">
            <XCircle className="mr-2 size-4" />
            Shutdown organization
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso irá permanentemente deletar
              a organização <strong>“{organization}”</strong> e remover todos os
              dados dos nossos servidores.
              <br />
              <br />
              Para confirmar, digite o nome da organização abaixo:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-2">
            <Input
              autoFocus
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              placeholder={organization}
              className="font-mono"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={!isConfirmed}>
              Sim, encerrar organização
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
