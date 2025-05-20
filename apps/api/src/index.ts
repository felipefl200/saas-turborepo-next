import { defineAbilityFor } from '@saas/auth'

const ability = defineAbilityFor({
  id: 'admin-id',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'MEMBER',
})
