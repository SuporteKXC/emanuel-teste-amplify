import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDispatch, useSelector } from 'react-redux';
import {
  ApproveInvoiceJustificationActions,
  RejectInvoiceJustificationActions,
  DeleteInvoiceJustificationActions,
} from "store/ducks/trackingDelivery/invoice-justifications";
import { RootState } from '@/store';
import { MenuItem } from './MenuItem';
import { usePermission } from '@/hooks/usePermission';

interface IProps {
  justificationId: number;
  onActionSuccess: () => void;
}

export const JustificationActions: React.FC<IProps> = ({ justificationId, onActionSuccess }) => {
  const dispatch = useDispatch();
  const [confirmApprove, setConfirmApprove] = useState(false);
  const [confirmReject, setConfirmReject] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const { hasPermissionTo } = usePermission();

  const clearConfirm = useCallback(() => {
    setConfirmApprove(false);
    setConfirmReject(false);
    setConfirmRemove(false);
  }, []);

  const { loading } = useSelector(
    (state: RootState) => ({
      loading: state.approveInvoiceJustification.loading || state.rejectInvoiceJustification.loading || state.deleteInvoiceJustification.loading,
    })
  );

  const handleAction = useCallback(
    (action: any, justificationId: number) => {
      dispatch(action.request(justificationId, () => onActionSuccess()));
    },
    [dispatch, onActionSuccess]
  );
 
  return (
    <DropdownMenu 
      onOpenChange={clearConfirm}
    >
      <DropdownMenuTrigger
        asChild
        className="ml-auto"
      >
        {loading ? (
          <MoreHorizontal size={18} className='animate-pulse' />
        ) : (
          <Button 
            variant="ghost" 
            className="h-8 w-8 p-0"
          >
            <MoreHorizontal size={18} />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <MenuItem 
          action="Aprovar"
          onClick={() => handleAction(ApproveInvoiceJustificationActions, justificationId)}
          confirm={confirmApprove}
          setConfirm={setConfirmApprove}
          clearConfirm={clearConfirm}
          disabled={!hasPermissionTo('DOCUMENT-JUSTIFICATION.SET-APPROVED')}
        />
        <DropdownMenuSeparator />
        <MenuItem
          action="Rejeitar"
          onClick={() => handleAction(RejectInvoiceJustificationActions, justificationId)}
          confirm={confirmReject}
          setConfirm={setConfirmReject}
          clearConfirm={clearConfirm}
          disabled={!hasPermissionTo('DOCUMENT-JUSTIFICATION.SET-REJECTED')}
        />
        <DropdownMenuSeparator />
        <MenuItem
          action="Excluir"
          onClick={() => handleAction(DeleteInvoiceJustificationActions, justificationId)}
          confirm={confirmRemove}
          setConfirm={setConfirmRemove}
          clearConfirm={clearConfirm}
          disabled={!hasPermissionTo('DOCUMENT-JUSTIFICATION.DELETE')}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}