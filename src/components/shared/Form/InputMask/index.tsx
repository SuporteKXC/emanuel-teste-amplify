import React, { useRef, useEffect } from "react";
import { Props as InputProps } from "react-input-mask";

import { useField } from "@unform/core";

import * as S from "./styles";

interface Props extends InputProps {
  name: string;
  type?: string;
  className?: string;
  label?: string;
  labelStyle?: Record<string, any>;
  inputStyle?: Record<string, any>;
  containerStyle?: Record<string, any>;
  required?: boolean;
  isLoading?: boolean;
}

export function InputMask({
  name,
  label,
  type = "text",
  className = "field-container",
  labelStyle = {},
  inputStyle = {},
  containerStyle = {},
  required = false,
  isLoading = false,
  ...rest
}: Props) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const Label = () => (
    <S.FieldLabel htmlFor={fieldName} style={labelStyle}>
      {label}
      {required && <span>*</span>}
    </S.FieldLabel>
  );

  const Error = () => <S.FieldError>{error}</S.FieldError>;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue("");
      },
    });
  }, [fieldName, registerField]);

  return (
    <S.FieldContainer style={containerStyle} className={className}>
      {label && <Label />}
      <S.InputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
      {isLoading && <S.IsLoading />}
      {error && <Error />}
    </S.FieldContainer>
  );
}
