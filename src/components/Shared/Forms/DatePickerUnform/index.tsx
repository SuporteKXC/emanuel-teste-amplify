import { useField } from "@unform/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { ReactDatePickerProps } from "react-datepicker";
import * as S from "./styles";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const DatePickerUnform = (props: any) => {
  const [open, setOpen] = useState<boolean>(false);

  const changeOpen = useCallback(() => {
    setOpen((prev: boolean) => !prev);
  }, [open]);

  const onOutside = useCallback(() => {
    setOpen(false);
  }, []);

  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(props.name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: (ref: any) => {
        return ref.props.selected; // Obtém o valor selecionado do componente DatePicker
      },
      clearValue: (ref: any) => {
        ref.clear(); // Limpa o valor selecionado do componente DatePicker
      },
      setValue: (ref: any, value: Date) => {
        ref.handleChange(value); // Define um valor para o componente DatePicker
      },
    });
  }, [fieldName, registerField]);

  return (
    <S.Container>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="w-full">
            <div className="items-center flex">
              <S.Calendar />
              <ReactDatePicker
                {...props}
                selected={props.selected}
                key={"@calendar-key"}
                className="w-full"
                calendarClassName="calendar"
                dayClassName={(_) => "day"}
                wrapperClassName="wrapper"
                weekDayClassName={(_) => "week"}
                open={open}
                onClickOutside={onOutside}
                ref={inputRef}
                dateFormat="dd/MM/yyyy"
              />
              <S.ButtonChevron type="button" onClick={changeOpen}>
                <S.ChevronIcon />
              </S.ButtonChevron>
            </div>
          </TooltipTrigger>
          {props?.label && <TooltipContent>{props?.label}</TooltipContent>}
        </Tooltip>
      </TooltipProvider>
    </S.Container>
  );
};
