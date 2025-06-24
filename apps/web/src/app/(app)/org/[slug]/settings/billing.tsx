import { getCurrentOrgCookie } from '@/auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getBilling } from '@/http/get-billing'
import { formatCurrency } from '@/lib/utils'
import { Separator } from '@radix-ui/react-separator'

export default async function Billing() {
  const currentOrg = await getCurrentOrgCookie()
  const { billing } = await getBilling(currentOrg!)
  return (
    <>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
          <CardDescription>
            Informações de cobrança para a organização{' '}
            <strong>{currentOrg}</strong>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Custo</TableHead>

                <TableHead className="text-right" style={{ width: 120 }}>
                  Quantidade
                </TableHead>
                <TableHead className="text-right" style={{ width: 120 }}>
                  SubTotal
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Por projeto</TableCell>
                <TableCell className="text-right">
                  {billing.projects.amount}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(billing.projects.price)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quant. Assentos</TableCell>
                <TableCell className="text-right">
                  {billing.seats.amount}
                </TableCell>
                <TableCell className="text-right">
                  (por unidade) {formatCurrency(billing.seats.price)}
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell />
                <TableCell className="text-right">Total</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(billing.total)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
