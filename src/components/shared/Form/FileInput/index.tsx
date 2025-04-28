import React, { useRef, useEffect, ComponentProps, useState } from "react";
import { useField } from "@unform/core";

import * as S from "./styles";

interface FileInputProps extends ComponentProps<any> {
  name: string;
  className?: string;
  label?: string;
  buttonLabel?: string;
  labelStyle?: Record<string, any>;
  inputStyle?: Record<string, any>;
  containerStyle?: Record<string, any>;
  required?: boolean;
}

type Props = FileInputProps;

export const FileInput: React.FC<Props> = ({
  name,
  label,
  buttonLabel = "Selecione",
  className = "field-container",
  labelStyle = {},
  inputStyle = {},
  containerStyle = {},
  required = false,
  ...rest
}) => {
  const [filename, setFilename] = useState<string>(
    "Nenhum arquivo selecionado"
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const Label = () => (
    <S.FieldLabel htmlFor={fieldName} style={labelStyle}>
      {label}
      {required && <span>*</span>}
    </S.FieldLabel>
  );

  const Error = () => <S.FieldError>{error}</S.FieldError>;

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.files) {
      const file = event.currentTarget.files[0];
      setFilename(file.name);
      if (rest.onChange) {
        rest.onChange(event);
      }
    }
  }

  function handleInputTrigger() {
    if (inputRef?.current) {
      inputRef.current.click();
    }
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "files[0]",
      setValue: function (ref: HTMLInputElement, value: any) {
        ref.value = value;
        if (!value) {
          setFilename("Nenhum arquivo selecionado");
        }
      },
      clearValue: (ref: HTMLInputElement) => {
        ref.value = "";
      },
    });
  }, [fieldName, registerField, setFilename]);

  return (
    <S.FieldContainer style={containerStyle} className={className}>
      {label && <Label />}

      <S.FakeInput style={inputStyle}>
        <S.FileName>{filename}</S.FileName>
        <S.Button onClick={handleInputTrigger}>{buttonLabel}</S.Button>
      </S.FakeInput>

      <S.FileInput
        className="hidden"
        ref={inputRef}
        name={fieldName}
        id={fieldName}
        defaultValue={defaultValue}
        onChange={handleFileChange}
        {...rest}
      />
      {error && <Error />}
    </S.FieldContainer>
  );
};
