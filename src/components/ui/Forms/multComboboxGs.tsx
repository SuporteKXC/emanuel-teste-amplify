import * as React from "react";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface ComboboxContentProps {
  name: string;
  value: string;
}

interface MultiComboboxGsProps {
  label?: string;
  className?: string;
  content: ComboboxContentProps[];
  fieldValue: any[];
  fieldName: string;
  form: UseFormReturn<any, any, undefined>;
  loading?: boolean;
}

const MultiComboboxGs = React.forwardRef<HTMLBaseElement, MultiComboboxGsProps>(
  ({ label, content, fieldValue, fieldName, form, loading }, ref) => {
    const { t } = useTranslation();

    const mapSelected = () => {
      const values = form.getValues();
      if (!values[fieldName]?.length) {
        return <p>Selecione...</p>;
      }
      return values[fieldName].map((item: ComboboxContentProps) => (
        <p onClick={()=> removeItem(item)} className="bg-gray-200 shadow-lg px-1 break-keep w-fit">{item.name} <span className="font-black" >X</span></p>
      ));
    };
    const removeItem = (item: ComboboxContentProps) => {
      const values: ComboboxContentProps[] = form.getValues()[fieldName];
      if(!values) return
      const index = values.findIndex(e => e.value == item.value)
      if(index === -1) return
      values.splice(index,1)
      form.setValue(fieldName,values)
    };

    const handleSelect = (item: ComboboxContentProps)=>{
      const values: ComboboxContentProps[] = form.getValues()[fieldName];
      console.log(values, item)
      if(values.findIndex( e => e.value == item.value) !== -1){
        removeItem(item)
      }else{
        form.setValue(fieldName, [...fieldValue, item]);
      }
    }

    return (
      <FormItem>
        <div className="grid w-full h-max items-center gap-1.5">
          {label && (
            <Label className="font-GilroySemibold text-sm text-slate-800">
              {label}
            </Label>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  disabled={loading}
                  className={cn(
                    "text-left font-sans justify-between border-solid focus-visible:ring-primary-500 h-fit",
                    !fieldValue && "text-muted-foreground"
                  )}
                >
                  <div className="flex flex-wrap gap-4">{mapSelected()}</div>
                  {(!loading && (
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  )) || (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="popover relative p-0">
              <Command>
                <CommandInput
                  placeholder={t("trackingDelivery.filterForm.search")}
                />
                <CommandEmpty>
                  {t("trackingDelivery.filterForm.searchEmpty")}
                </CommandEmpty>
                <CommandGroup className="max-h-60 overflow-auto">
                  {content.map((item) => (
                    <CommandItem
                      value={item.name}
                      key={item.value}
                      onSelect={() => {
                        handleSelect(item)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          fieldValue.findIndex( e => e.value == item.value)!== -1
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {item.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </div>
      </FormItem>
    );
  }
);

MultiComboboxGs.displayName = "MultiComboboxGs";

export { MultiComboboxGs };
