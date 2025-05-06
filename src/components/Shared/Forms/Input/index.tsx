import React, { useRef, useEffect, ComponentProps, ReactElement } from "react";
import { useField } from "@unform/core";

import * as S from "./styles";

interface InputProps
  extends ComponentProps<any>,
    Partial<React.HtmlHTMLAttributes<HTMLInputElement>> {
  name: string;
  type?: string;
  className?: string;
  label?: string;
  labelStyle?: Record<string, any>;
  inputStyle?: Record<string, any>;
  containerStyle?: Record<string, any>;
  required?: boolean;
  isLoading?: boolean;
  placeholder?: string;
}

interface LabelProps {
  children: React.ReactNode;
}

type Props = InputProps;

export const Input: React.FC<Props> = ({
  name,
  label,
  type = "text",
  className = "field-container",
  labelStyle = {},
  inputStyle = {},
  containerStyle = {},
  required = false,
  isLoading = false,
  placeholder,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const Label = ({ children }: LabelProps) => (
    <S.FieldLabel htmlFor={fieldName} style={labelStyle}>
      {label}
      {required && <span>*</span>}
      {children}
    </S.FieldLabel>
  );

  const Error = () => <S.FieldError>{error}</S.FieldError>;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <S.FieldContainer style={containerStyle} className={className}>
      {label && <Label>{isLoading && <S.Loading />}</Label>}
      <S.Input
        ref={inputRef}
        type={type}
        id={fieldName}
        name={fieldName}
        defaultValue={defaultValue}
        style={inputStyle}
        placeholder={placeholder}
        {...rest}
      />
      {error && <Error />}
    </S.FieldContainer>
  );
};
