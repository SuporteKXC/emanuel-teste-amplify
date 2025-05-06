import * as React from 'react';
import { Label } from '../label';
import { FormControl, FormItem, FormMessage } from '../form';
import { SelectProps } from '@radix-ui/react-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface SelectContentProps {
  name: string;
  value: string;
}

interface SelectGsProps extends SelectProps {
  label?: string;
  content: SelectContentProps[];
}

const SelectGs = React.forwardRef<HTMLBaseElement, SelectGsProps>(
  ({ label, onValueChange, value, content }, ref) => {
    return (
      <FormItem>
        <div className="grid w-full items-center gap-1.5">
          {label && (
            <Label className="font-GilroySemibold text-sm text-slate-800">
              {label}
            </Label>
          )}
          <Select onValueChange={onValueChange} value={value}>
            <FormControl>
              <SelectTrigger className='border-solid'>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-96 overflow-auto">
              {content.map((item) => (
                <SelectItem key={item.value} value={item.value.toString()}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </div>
      </FormItem>
    );
  }
);

SelectGs.displayName = 'SelectGs';

export { SelectGs };
