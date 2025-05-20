import { PermissionByRole, Role } from './types'

export const permissions: Record<Role, PermissionByRole> = {
  ADMIN(user, { can, cannot }) {
    can('manage', 'all')

    cannot(['transfer_ownership', 'update', 'delete'], 'Organization')
    can(['transfer_ownership', 'update', 'delete'], 'Organization', {
      ownerId: { $eq: user.id },
    })
  },

  MEMBER(user, { can }) {
    can(['read'], 'User')
    can(['create', 'read'], 'Project')
    can(['update', 'delete'], 'Project', {
      ownerId: { $eq: user.id },
    })
  },

  BILLING(_, { can }) {
    can('manage', 'Billing')
  },
}
