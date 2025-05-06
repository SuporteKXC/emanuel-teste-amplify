import * as React from "react";
import { FormControl, FormItem, FormMessage } from "../form";
import { Label } from "../label";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Button } from "../button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../calendar";
import { DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale";

interface DateRangePickerGsProps {
  label?: string;
  selected: DateRange;
  onSelect: (...event: any[]) => void;
  loading?: boolean;
  disabled?: "future" | "past";
}

const DateRangePickerGs = React.forwardRef<
  HTMLBaseElement,
  DateRangePickerGsProps
>(({ label, loading, selected, onSelect, disabled }, ref) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      {label && (
        <Label className="font-GilroySemibold text-sm text-slate-800">
          {label}
        </Label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "font-sans pl-3 text-left justify-start border-solid font-normal focus-visible:ring-primary-500",
              !selected && "text-muted-foreground"
            )}
            disabled={loading}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected?.from ? (
              selected.to ? (
                <>
                  {format(selected?.from, "dd'/'MM'/'yyyy", { locale: ptBR })} -{" "}
                  {format(selected?.to, "dd'/'MM'/'yyyy", { locale: ptBR })}
                </>
              ) : (
                format(selected?.from, "dd'/'MM'/'yyyy", { locale: ptBR })
              )
            ) : (
              <span>Selecione</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={selected?.from || new Date()}
            selected={selected}
            onSelect={onSelect}
            disabled={(date) => {
              if (disabled === "future")
                return date > new Date() || date < new Date("1900-01-01");
              if (disabled === "past")
                return date < new Date() || date < new Date("1900-01-01");
              return false;
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
});

DateRangePickerGs.displayName = "DateRangePickerGs";
export default DateRangePickerGs;
