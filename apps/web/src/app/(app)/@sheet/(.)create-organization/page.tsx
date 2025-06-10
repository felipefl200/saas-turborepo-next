'use client'
import {
  SheetContentI,
  SheetDescriptionI,
  SheetHeaderI,
  SheetI,
  SheetTitleI,
} from '@/components/intercepted-sheet-content'
import OrganizationForm from '../../create-organization/organization-form'

export default function CreateOrganizationPage() {
  console.log('CreateOrganizationPage rendered')

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
