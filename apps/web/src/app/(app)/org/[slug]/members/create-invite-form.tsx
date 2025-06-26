'use client'
import { Icons } from '@/components/icons'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFormState } from '@/hook/use-form-state'
import { UserPlus } from 'lucide-react'
import { createInviteAction } from './actions'

export default function CreateInviteForm() {
  const [{ success, errors, message }, handleSubmit, isPending] =
    useFormState(createInviteAction)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!success && message && (
        <Alert variant="destructive">
          <Icons.triangleAlert className="size-4" />
          <div>
            <AlertTitle>Erro ao criar um convite</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </div>
        </Alert>
      )}
      <div className="flex w-full items-center gap-2">
        <div className="flex-1 space-y-1">
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="email@example.com"
          />
          {errors?.email && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>
        <Select name="role" defaultValue="MEMBER">
          <SelectTrigger>
            <SelectValue placeholder="Selecione um papel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ADMIN">Administrador</SelectItem>
            <SelectItem value="MEMBER">Membro</SelectItem>
            <SelectItem value="BILLING">Cobrança</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <Icons.spinner className="animate-spin" />
          ) : (
            <>
              <UserPlus className="mr-2 size-4" />
              Criar convite
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
