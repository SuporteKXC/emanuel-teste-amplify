import {
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface IProps {
  action: string;
  onClick: () => void;
  confirm: boolean;
  setConfirm: (value: boolean) => void;
  clearConfirm: () => void;
  disabled: boolean;
}

export const MenuItem: React.FC<IProps> = ({ action, onClick, confirm, clearConfirm, setConfirm, disabled }) => {

  const confirmColor = action === 'Aprovar' ? 'bg-green-500' : 'bg-red-500';
  const confirmHover = action === 'Aprovar' ? 'hover:bg-green-600' : 'hover:bg-red-600';

  const handleConfirm = () => {
    clearConfirm();
    setConfirm(!confirm);
  }

  return (
    <>
      {confirm ? (
        <DropdownMenuItem
          onClick={onClick}
          className={`text-white font-semibold hover:text-white ${confirmColor} ${confirmHover}`}
        >
          Confirmar
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem
          onClick={handleConfirm}
          onSelect={event => event.preventDefault()}
          disabled={disabled}
        >
          {action}
        </DropdownMenuItem>
      )}
    </>
  )
}