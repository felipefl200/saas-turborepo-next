import { ability, getCurrentOrgCookie } from '@/auth/auth'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getMembers } from '@/http/get-members'
import { getMembership } from '@/http/get-membership'
import { getOrganization } from '@/http/get-organization'
import { nameInitials } from '@/lib/utils'
import { organizationSchema } from '@saas/auth'
import { ArrowLeftRight, Crown, UserMinus } from 'lucide-react'
import Image from 'next/image'

export default async function MembersList() {
  const currentOrg = await getCurrentOrgCookie()
  const permissions = await ability()

  const [{ membership }, { members }, { organization }] = await Promise.all([
    getMembership(currentOrg!),
    getMembers(currentOrg!),
    getOrganization(currentOrg!),
  ])

  const authOrganization = organizationSchema.parse(organization)

  return (
    <div className="mx-auto max-w-4xl space-y-2">
      <h2 className="text-lg font-semibold">Membros</h2>
      <div className="rounded border">
        <Table>
          <TableBody>
            {members.map((member) => {
              return (
                <TableRow key={member.id}>
                  <TableCell className="py-2.5" style={{ width: '48' }}>
                    <Avatar>
                      {member.avatarUrl && (
                        <Image
                          src={member.avatarUrl}
                          alt={`Avatar of ${member.name}`}
                          width={32}
                          height={32}
                          className="aspect-square size-full"
                        />
                      )}
                      <AvatarFallback>
                        {nameInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex flex-col">
                      <span className="inline-flex items-center gap-2 font-medium">
                        {member.name} -{' '}
                        {member.userId === membership.userId ? '(Eu)' : null}
                        {organization.ownerId === member.userId ? (
                          <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                            <Crown className="size-3" />
                            <span className="text-xs">Dono</span>
                          </span>
                        ) : null}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {member.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex items-center justify-end gap-2">
                      {permissions?.can(
                        'transfer_ownership',
                        authOrganization
                      ) && (
                        <Button size="sm" variant="ghost">
                          <ArrowLeftRight className="mr-2 size-4" />
                          Transferir propriedade
                        </Button>
                      )}
                      {permissions?.can('delete', 'User') && (
                        <form action="">
                          <Button
                            disabled={
                              member.id === membership.id ||
                              member.userId === organization.ownerId
                            }
                            size="sm"
                            variant="destructive"
                          >
                            <UserMinus className="mr-2 size-4" />
                            Remover
                          </Button>
                        </form>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
