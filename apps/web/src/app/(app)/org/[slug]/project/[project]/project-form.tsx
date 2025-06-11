'use client'
import { Icons } from '@/components/icons'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from '@/hook/use-form-state'
import { createProjectAction } from './actions'

export default function ProjectForm() {
  const [{ success, errors, message }, handleSubmit, isPending] =
    useFormState(createProjectAction)
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!success && message && (
        <Alert variant="destructive">
          <Icons.triangleAlert className="size-4" />
          <div>
            <AlertTitle>Erro ao criar um projeto</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </div>
        </Alert>
      )}
      {success && message && (
        <Alert variant="success">
          <Icons.checkCircle className="size-4" /> {/* Ícone primeiro */}
          <div>
            <AlertTitle>Dados salvos</AlertTitle>
            <AlertDescription>Projeto criado com sucesso</AlertDescription>
          </div>
        </Alert>
      )}
      <div className="space-y-1">
        <Label htmlFor="name">Nome do projeto</Label>
        <Input type="text" id="name" name="name" />
        {errors?.name && (
          <p className="text-sm text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="description">Descrição do projeto</Label>
        <Textarea
          id="description"
          name="description"
          rows={10}
          placeholder="Descrição do projeto"
        />

        {errors?.description && (
          <p className="text-sm text-red-500 dark:text-red-400">
            {errors.description[0]}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? <Icons.spinner className="animate-spin" /> : 'Salvar'}
      </Button>
    </form>
  )
}
