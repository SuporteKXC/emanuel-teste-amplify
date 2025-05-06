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
import { DocumentJustification } from '@/contracts/trackingDelivery';
import { StatusTag } from './StatusTag';
import { JustificationActions } from './Actions';
import { usePermission } from '@/hooks/usePermission';

interface IProps {
  justifications: DocumentJustification[];
  onActionSuccess: () => void;
}

export const ListJustifications: React.FC<IProps> = ({ justifications, onActionSuccess }) => {
  const { hasPermissionTo } = usePermission();

  if(!hasPermissionTo('JUSTIFICATION_TYPE.GET') || justifications.length === 0) return null;

  return (
    <div className="mb-4">
      <Card.Root>
        <Card.Header>
          <h1 className='text-black'>Justificativas</h1>
        </Card.Header>
        <Card.Content>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[180px]'>Tipo de Justificativa</TableHead>
                <TableHead>Comentário</TableHead>
                <TableHead className='w-[150px]'>Criado em</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='w-[150px]'>Analisado em</TableHead>
                <TableHead className='w-[20px]'></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {justifications.map((justification) => (
                <TableRow key={justification.id}>
                  <TableCell>{justification.justificationType.description}</TableCell>
                  <TableCell>{justification.description}</TableCell>
                  <TableCell>{Formatter.dateHour(justification.createdAt)}</TableCell>
                  <TableCell>
                    <StatusTag justification={justification} />
                  </TableCell>
                  <TableCell>
                    {justification.approvedAt && Formatter.dateHour(justification.approvedAt)}
                    {justification.rejectedAt && Formatter.dateHour(justification.rejectedAt)}
                    {!justification.approvedAt && !justification.rejectedAt && '---'}
                  </TableCell>
                  <TableCell>
                    {!justification.approvedAt && !justification.rejectedAt && (
                      <JustificationActions justificationId={justification.id} onActionSuccess={onActionSuccess} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card.Content>
      </Card.Root>
    </div>
  )
}