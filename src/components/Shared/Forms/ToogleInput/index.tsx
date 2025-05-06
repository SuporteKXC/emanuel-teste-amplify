import React, { useEffect } from "react";
import { v4 as UuidV4 } from "uuid";
import { useField } from "@unform/core";

import * as S from "./styles";

interface ToggleInputProps extends React.ComponentProps<any> {
  label: string;
  name: string;
}

type Props = ToggleInputProps;

export const ToggleInput: React.FC<Props> = ({ label, name, ...rest }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField } = useField(name);
  const uniqueId: string = `${UuidV4()}${fieldName}`;

  useEffect(() => {
    registerField<boolean>({
      name: fieldName,
      ref: inputRef.current,
      getValue: (ref: HTMLInputElement) => {
        return ref.checked;
      },
      setValue: (ref: HTMLInputElement, value: boolean) => {
        ref.checked = [1, true].includes(value);
      },
      clearValue: (ref: HTMLInputElement) => {
        ref.checked = false;
      },
    });
  }, [fieldName, registerField]);


  useEffect(() => {
    if(defaultValue && inputRef.current) {
      inputRef.current.checked = true;
    }
  }, [defaultValue])

  return (
    <S.MainContainer>
      {
        (rest.title)?
        <S.Title>{rest.title}</S.Title>
        :
        <S.TitleEmpty>{rest.title}</S.TitleEmpty>
      }
      <S.FieldContainer htmlFor={uniqueId}>
        <S.Label>{label}</S.Label>
        <input type="checkbox"/>
        <S.Checkbox
          ref={inputRef}
          name={fieldName}
          id={uniqueId}
          defaultValue={defaultValue}
          {...rest}
        />
        <S.ToggleContainer>
          <S.ToggleTrack>
            <S.ToggleHandler />
          </S.ToggleTrack>
        </S.ToggleContainer>
      </S.FieldContainer>
    </S.MainContainer>
  );
};
