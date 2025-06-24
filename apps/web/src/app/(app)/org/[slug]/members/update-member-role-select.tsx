'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Role } from '@saas/auth'
import { ComponentProps } from 'react'
import { updateMemberAction } from './actions'

interface UpdateMemberRoleSelectProps extends ComponentProps<typeof Select> {
  memberId: string
}

export default function UpdateMemberRoleSelect({
  memberId,
  ...props
}: UpdateMemberRoleSelectProps) {
  async function handleRoleChange(role: Role) {
    await updateMemberAction(memberId, role)
  }
  return (
    <Select onValueChange={handleRoleChange} {...props}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecione um papel" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ADMIN">Administrador</SelectItem>
        <SelectItem value="MEMBER">Membro</SelectItem>
        <SelectItem value="BILLING">Cobrança</SelectItem>
      </SelectContent>
    </Select>
  )
}
