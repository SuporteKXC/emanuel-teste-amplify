import React, { useEffect, useRef, InputHTMLAttributes } from "react";
import { useField } from "@unform/core";

import * as S from "./styles";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string | undefined;
  options: {
    id: string;
    value: string;
    label: string;
  }[];
}

export const CheckboxInput: React.FC<Props> = ({
  name,
  label,
  options,
  className = "field-container",
  ...rest
}) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { fieldName, defaultValue = [], registerField, error } = useField(name);

  const Label = () => <S.FieldLabel htmlFor={fieldName}>{label}</S.FieldLabel>;

  const Error = () => <S.FieldError>{error}</S.FieldError>;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.filter((ref) => ref.checked).map((ref) => ref.value);
      },
      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach((ref) => {
          ref.checked = false;
        });
      },
      setValue: (refs: HTMLInputElement[], values: string[]) => {
        refs.forEach((ref) => {
          if (values && values.includes(ref.id)) {
            ref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <S.FieldContainer className={className}>
      {label && <Label />}

      <S.OptionsContainer>
        {options.map((option, index) => (
          <S.Option htmlFor={option.id} key={option.id}>
            <S.Input
              type="checkbox"
              ref={(ref) =>
                (inputRefs.current[index] = ref as HTMLInputElement)
              }
              defaultChecked={defaultValue.find((dv: any) => dv === option.id)}
              value={option.value}
              id={option.id}
            />
            <S.Icons>
              <S.CheckedIcon />
              <S.UncheckedIcon />
            </S.Icons>
            {option.label}
          </S.Option>
        ))}
      </S.OptionsContainer>
      {error && <Error />}
    </S.FieldContainer>
  );
};
