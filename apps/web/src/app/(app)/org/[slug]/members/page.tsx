import { ability } from '@/auth/auth'
import Invites from './invites'
import MembersList from './member-list'

export default async function MembersPage() {
  const permissions = await ability()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Membros</h1>
      <div className="space-y-4">
        {permissions?.can('read', 'Invite') && <Invites />}
        {permissions?.can('read', 'User') && <MembersList />}
      </div>
    </div>
  )
}
