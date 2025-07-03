'use client'
import { getPendingInvites } from '@/http/get-peding-invites'

import { acceptInvite } from '@/http/accept-invite'
import { rejectInvite } from '@/http/reject-invite'
import { dateFromNow } from '@/lib/dateFromNow'
import { queryClient } from '@/lib/react-query'
import { useQuery } from '@tanstack/react-query'
import { Check, UserPlus2, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Separator } from '../ui/separator'

export default function PendingInvites() {
  const [isOpen, setIsOpen] = useState(false)
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['pending-invites'],
    queryFn: getPendingInvites,
    enabled: isOpen,
  })

  async function handleAcceptInvite(inviteId: string) {
    await acceptInvite({ inviteId })

    queryClient.invalidateQueries({
      queryKey: ['pending-invites'],
    })
  }

  async function handleRejectInvite(inviteId: string) {
    await rejectInvite({ inviteId })

    queryClient.invalidateQueries({
      queryKey: ['pending-invites'],
    })
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <UserPlus2 className="size-4" />
          <span className="sr-only">Gerenciar convites pendentes</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <h3 className="p-4 text-sm font-medium">
          Convites pendentes ({data?.invites.length ?? 0})
        </h3>
        <Separator />
        <div className="flex flex-col gap-2">
          {data?.invites.map((invite) => (
            <div
              key={invite.id}
              className="hover:bg-muted-foreground/10 flex flex-col gap-2 p-3 transition-colors"
            >
              <p className="text-muted-foreground">
                <span className="text-foreground pr-1 font-medium">
                  {invite.author?.name ?? 'Alguem'}
                </span>
                convidou você para se juntar a
                <span className="text-foreground pl-1 font-medium">
                  {invite.organization.name}
                </span>
                <span className="text-muted-foreground pl-1 text-end text-xs italic">
                  {dateFromNow(invite.createdAt)}
                </span>
              </p>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleAcceptInvite(invite.id)}
                  variant="outline"
                  size="xs"
                >
                  <Check className="mr-1.5 size-3" />
                  Aceitar
                </Button>
                <Button
                  onClick={() => handleRejectInvite(invite.id)}
                  variant="ghost"
                  size="xs"
                  className="text-muted-foreground"
                >
                  <X className="mr-1.5 size-3" />
                  Recusar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
