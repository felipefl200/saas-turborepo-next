'use client'
import OrganizationForm from '@/app/(app)/org/organization-form'
import {
  SheetContentI,
  SheetDescriptionI,
  SheetHeaderI,
  SheetI,
  SheetTitleI,
} from '@/components/intercepted-sheet-content'

export default function CreateOrganizationPage() {
  return (
    <SheetI defaultOpen>
      <SheetContentI className="w-[400px] sm:w-[540px]">
        <SheetHeaderI>
          <SheetTitleI>Criar nova organização</SheetTitleI>
          <SheetDescriptionI>
            Preencha os detalhes da sua nova organização. Você pode adicionar
            mais informações depois.
          </SheetDescriptionI>
          <div className="py-4">
            <OrganizationForm />
          </div>
        </SheetHeaderI>
      </SheetContentI>
    </SheetI>
  )
}
