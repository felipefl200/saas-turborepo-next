import { ability, getCurrentOrgCookie } from '@/auth/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getInvites } from '@/http/get-invites'
import RevokeInviteButton from './revoke-invite-button'

export default async function Invites() {
  const currentOrg = await getCurrentOrgCookie()
  const permissions = await ability()
  const { invites } = await getInvites(currentOrg!)
  return (
    <div className="mx-auto max-w-7xl space-y-4">
      {permissions?.can('create', 'Invite') && (
        <Card>
          <CardHeader>
            <CardTitle>Convites</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      )}

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Convites</h2>

        <div className="rounded border">
          <Table>
            <TableBody>
              {invites.length === 0 && (
                <TableRow>
                  <TableCell className="text-muted-foreground text-center">
                    Nenhum convite encontrado
                  </TableCell>
                </TableRow>
              )}
              {invites.map((invite) => {
                return (
                  <TableRow key={invite.id}>
                    <TableCell className="py-2.5">
                      <span className="text-muted-foreground">
                        {invite.email}
                      </span>
                    </TableCell>
                    <TableCell className="py-2.5 font-medium">
                      {invite.role}
                    </TableCell>
                    <TableCell className="py-2.5">
                      <div className="flex justify-end">
                        {permissions?.can('delete', 'Invite') && (
                          <RevokeInviteButton inviteId={invite.id} />
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
    </div>
  )
}
