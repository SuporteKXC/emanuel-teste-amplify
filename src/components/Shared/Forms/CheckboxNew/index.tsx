import React, { useEffect, useRef, InputHTMLAttributes, useState } from "react";
import { useField } from "@unform/core";
import * as S from "./styles";

interface Options {
  id: string;
  value: string;
  label?: string;
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string | undefined;
  defaultOptions?: Options[] | undefined;
  options: Options[] | undefined;
  direction?: "row" | "column";
  fixWidth?: string;
  isLoading?: boolean;
  hideInList?: boolean;
}

export const CheckboxNew: React.FC<Props> = ({
  name,
  label,
  options,
  defaultOptions,
  direction,
  fixWidth,
  isLoading,
  hideInList,
  className = "field-container",
  ...rest
}) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const {
    fieldName,
    defaultValue = defaultOptions,
    registerField,
    error,
  } = useField(name);

  let checking = false;

  const Label = () => (
    <S.FieldLabel
      onClick={() => {
        inputRefs.current.map((i) => (i.checked = !checking));
        checking = !checking;
      }}
      htmlFor={fieldName}
    >
      {label}
    </S.FieldLabel>
  );

  const Error = () => <S.FieldError>{error}</S.FieldError>;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.filter((ref) => ref?.checked).map((ref) => ref.value);
      },
      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach((ref) => {
          ref.checked = false;
        });
      },
      setValue: (refs: HTMLInputElement[], values: string[]) => {
        refs.forEach((ref) => {
          if (values && ref.id.includes(ref.id)) {
            ref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField, inputRefs]);

  return (
    <S.FieldContainer className={className} hide={hideInList}>
      {label && <Label />}

      <S.OptionsContainer direction={direction}>
        {isLoading ? (
          <S.ActivityIndicator />
        ) : (
          options &&
          Array.isArray(options) &&
          options.map((option, index) => (
            <S.Option
              htmlFor={`${name}-${option.id}`}
              key={option.id}
              fixWidth={fixWidth}
            >
              <S.Input
                {...rest}
                type="checkbox"
                ref={(ref) =>
                  (inputRefs.current[index] = ref as HTMLInputElement)
                }
                defaultChecked={
                  options &&
                  Array.isArray(options) &&
                  defaultValue?.find((dv: any) =>
                    dv?.id === option?.id ? true : false
                  )
                }
                value={option.value}
                id={`${name}-${option.id}`}
              />
              <S.Icons>
                <S.CheckedIcon />
                <S.UncheckedIcon />
              </S.Icons>
              {option?.label}
            </S.Option>
          ))
        )}
      </S.OptionsContainer>
      {error && <Error />}
    </S.FieldContainer>
  );
};