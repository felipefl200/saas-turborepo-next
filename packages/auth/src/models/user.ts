import { z } from 'zod'
import { roleSchema } from '../types'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: roleSchema,
})

export type User = z.infer<typeof userSchema>
