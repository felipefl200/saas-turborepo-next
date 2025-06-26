import { FormEvent, useEffect, useState, useTransition } from 'react'

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string | string[]> | null
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: () => void | void,
  initialState?: FormState,
  resetDelayMessages: number = 3000 // Tempo em milissegundos para resetar mensagens
) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    }
  )

  // Timer para resetar mensagens após delay
  useEffect(() => {
    if (formState.message || formState.errors) {
      const timer = setTimeout(() => {
        setFormState((prev) => ({
          ...prev,
          message: null,
          errors: null,
        }))
      }, resetDelayMessages)

      return () => clearTimeout(timer)
    }
  }, [formState.message, formState.errors, resetDelayMessages])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)
      if (state.success) {
        form.reset()
        if (onSuccess) onSuccess()
      }
      setFormState(state)
    })
  }

  return [formState, handleSubmit, isPending] as const
}
