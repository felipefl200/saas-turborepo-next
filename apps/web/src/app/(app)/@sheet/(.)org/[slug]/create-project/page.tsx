import ProjectForm from '@/app/(app)/org/[slug]/create-project/project-form'
import {
  SheetContentI,
  SheetDescriptionI,
  SheetHeaderI,
  SheetI,
  SheetTitleI,
} from '@/components/intercepted-sheet-content'

export default function CreateProjectPage() {
  return (
    <SheetI defaultOpen>
      <SheetContentI className="w-[400px] sm:w-[540px]">
        <SheetHeaderI>
          <SheetTitleI>Criar novo projeto</SheetTitleI>
          <SheetDescriptionI>
            Preencha os detalhes do seu novo projeto. Você pode adicionar mais
            informações depois.
          </SheetDescriptionI>
          <div className="py-4">
            <ProjectForm />
          </div>
        </SheetHeaderI>
      </SheetContentI>
    </SheetI>
  )
}
