import { DocumentItem } from '@/contracts/trackingDelivery';
import { Card } from '@/components/ui/CardGs';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Formatter } from '@/utils/Formatter';

interface IProps {
  items: DocumentItem[];
}

export const ListItems: React.FC<IProps> = ({ items }) => {

  const itemsTotalValue = items.reduce((acc, item) => acc + Number(item.totalValue), 0);
  const itemsTotalQuantity = items.reduce((acc, item) => acc + Number(item.quantity), 0);

  return (
    <Card.Root>
      <Card.Header>
        <div className='flex justify-start gap-12 text-slate-800'>
          <div className='flex flex-col'>
            <span className='text-sm font-GilroySemibold'>Valor total</span>
            <span className='text-2xl font-GilroyBold'>{Formatter.currency(itemsTotalValue)}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-GilroySemibold'>Quantidade total</span>
            <span className='text-2xl font-GilroyBold'>{Formatter.decimal(itemsTotalQuantity)}</span>
          </div>
        </div>
      </Card.Header>
      <Card.Content>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[120px]'>Código</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Qtd.</TableHead>
              <TableHead>UN</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead className='w-[150px]'>Valor Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.productCode}</TableCell>
                <TableCell>{item.productDescription}</TableCell>
                <TableCell>{Formatter.decimal(Number(item.quantity))}</TableCell>
                <TableCell>{item.unitType}</TableCell>
                <TableCell>{Formatter.currency(Number(item.unitValue))}</TableCell>
                <TableCell>{Formatter.currency(Number(item.totalValue))}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card.Content>
    </Card.Root>
  )
}