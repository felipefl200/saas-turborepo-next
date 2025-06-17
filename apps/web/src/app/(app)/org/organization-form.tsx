'use client'
import { Icons } from '@/components/icons'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hook/use-form-state'
import { createOrganizationAction, updateOrganizationAction } from './actions'
import { OrganizationFormData } from './organization-schema'

interface OrganizationFormProps {
  isUpdating?: boolean
  initialData?: OrganizationFormData
}

export default function OrganizationForm({
  initialData,
  isUpdating = false,
}: OrganizationFormProps) {
  const formAction = isUpdating
    ? updateOrganizationAction
    : createOrganizationAction
  const [{ success, errors, message }, handleSubmit, isPending] =
    useFormState(formAction)
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!success && message && (
        <Alert variant="destructive">
          <Icons.triangleAlert className="size-4" />
          <div>
            <AlertTitle>
              Erro ao {isUpdating ? 'atualizar' : 'criar'} uma organização
            </AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </div>
        </Alert>
      )}
      {success && message && (
        <Alert variant="success">
          <Icons.checkCircle className="size-4" /> {/* Ícone primeiro */}
          <div>
            <AlertTitle>Dados salvos</AlertTitle>
            <AlertDescription>
              Organização {isUpdating ? 'atualizada' : 'criada'} com sucesso
            </AlertDescription>
          </div>
        </Alert>
      )}
      <div className="space-y-1">
        <Label htmlFor="name">Nome da organização</Label>
        <Input
          type="text"
          id="name"
          name="name"
          defaultValue={initialData?.name}
        />
        {errors?.name && (
          <p className="text-sm text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="domain">Email do domínio</Label>
        <Input
          type="text"
          id="domain"
          name="domain"
          inputMode="url"
          placeholder="dominio.com"
          defaultValue={initialData?.domain || ''}
        />

        {errors?.domain && (
          <p className="text-sm text-red-500 dark:text-red-400">
            {errors.domain}
          </p>
        )}
      </div>

      <div className="items-center gap-2">
        <div className="flex flex-row-reverse gap-2 justify-self-start">
          <Label htmlFor="shouldAttachUsersByDomain">
            Deseja adicionar usuários pelo domínio?
          </Label>
          <Checkbox
            name="shouldAttachUsersByDomain"
            id="shouldAttachUsersByDomain"
            defaultChecked={initialData?.shouldAttachUsersByDomain || false}
          />
        </div>
        {errors?.shouldAttachUsersByDomain && (
          <p className="text-sm text-red-500 dark:text-red-400">
            {errors.shouldAttachUsersByDomain}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Icons.spinner className="animate-spin" />
        ) : isUpdating ? (
          'Atualizar Organização'
        ) : (
          'Criar Organização'
        )}
      </Button>
    </form>
  )
}
