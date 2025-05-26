import { AbilityBuilder } from '@casl/ability'
import { User } from './models/user'
import { permissions } from './permissions'
import { createAppAbility } from './types'

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`No permissions defined for role: ${user.role}`)
  }

  permissions[user.role](user, builder)

  const ability = builder.build({
    detectSubjectType: (subject) => {
      if (typeof subject === 'string') {
        return subject
      }
      return subject.__typename
    },
  })

  ability.can = ability.can.bind(ability)
  ability.cannot = ability.cannot.bind(ability)

  return ability
}

export * from './models/organization'
export * from './models/project'
export * from './models/user'
export * from './permissions'
export * from './types'
