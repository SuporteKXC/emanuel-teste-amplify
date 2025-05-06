import * as React from 'react';
import { Label } from '../label';
import { FormControl, FormItem, FormMessage } from '../form';
import { Switch } from '../switch';
import { useTranslation } from "react-i18next";

type SwitchGsProps = {
  label: string;
  onCheckedChange?(checked: boolean): void;
  checked?: boolean;
};

export const SwitchGs = React.forwardRef<HTMLBaseElement, SwitchGsProps>(
  ({ label, onCheckedChange, checked }) => {

    const { t } = useTranslation();
    const base = "general.messages";

    return (
      <FormItem>
        <FormControl>
          <div className="grid w-full items-center gap-1.5">
            {label && (
              <Label className="font-GilroySemibold text-sm text-slate-800">
                {label}
              </Label>
            )}
            <div className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm gap-2 justify-between">
              <span className="text-slate-800">{checked ? t(`${base}.yes`) : t(`${base}.no`)}</span>
              <Switch
                checked={checked}
                onCheckedChange={onCheckedChange}
                className="scale-90 !m-0"
              />
            </div>
            <FormMessage />
          </div>
        </FormControl>
      </FormItem>
    );
  }
);
