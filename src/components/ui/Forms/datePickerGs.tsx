import * as React from 'react';
import { FormControl, FormItem, FormMessage } from '../form';
import { Label } from '../label';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Button } from '../button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../calendar';

interface DatePickerGsProps {
  label?: string;
  fieldValue: Date | null;
  fieldOnChange: (...event: any[]) => void;
  minDate?: Date;
  maxDate?: Date;
}

const DatePickerGs = React.forwardRef<HTMLBaseElement, DatePickerGsProps>(
  ({ label, minDate, maxDate, fieldValue, fieldOnChange }, ref) => {
    return (
      <FormItem>
        <div className="grid w-full items-center gap-1.5">
          {label && (
            <Label className="font-GilroySemibold text-sm text-slate-800">
              {label}
            </Label>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'pl-3 text-left border-solid font-normal focus-visible:ring-primary-500',
                    !fieldValue && 'text-muted-foreground'
                  )}
                >
                  {fieldValue ? (
                    format(fieldValue, 'dd/MM/yyyy')
                  ) : (
                    <span>Selecione ...</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={fieldValue ?? undefined}
                onSelect={fieldOnChange}
                disabled={(date) =>
                  date > (maxDate || new Date()) ||
                  date < (minDate || new Date('1900-01-01'))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </div>
      </FormItem>
    );
  }
);

DatePickerGs.displayName = 'DatePickerGs';
export default DatePickerGs;
