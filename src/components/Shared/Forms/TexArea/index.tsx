import React, { useRef, useEffect, ComponentProps } from "react";
import { useField } from "@unform/core";

import * as S from "./styles";

interface TextAreaProps extends ComponentProps<any> {
  name: string;
  type?: string;
  className?: string;
  label?: string;
  labelStyle?: Record<string, any>;
  inputStyle?: Record<string, any>;
  containerStyle?: Record<string, any>;
  required?: boolean;
  height?: string | number;
  maxHeight?: string | number;
  isLoading?: boolean;
}

type Props = TextAreaProps;

export const TextArea: React.FC<Props> = ({
  name,
  label,
  className = "field-container",
  labelStyle = {},
  inputStyle = {},
  containerStyle = {},
  required = false,
  height = "12rem",
  maxHeight = "15rem",
  isLoading = false,
  ...rest
}) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

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
    });
  }, [fieldName, registerField]);

  return (
    <S.FieldContainer style={containerStyle} className={className}>
      {label && <Label />}
      <S.TextArea
        ref={inputRef}
        id={fieldName}
        name={fieldName}
        defaultValue={defaultValue}
        style={inputStyle}
        height={height}
        maxHeight={maxHeight}
        {...rest}
      />
      {isLoading && "<S.IsLoading />"}
      {error && <Error />}
    </S.FieldContainer>
  );
};
