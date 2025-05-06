import { useRef, useEffect, ComponentProps } from "react";
import { v4 as UuidV4 } from "uuid";
import { useField } from "@unform/core";

import * as S from "./styles";

interface InputProps extends ComponentProps<any> {
  label?: string;
  name: string;
  mood?: S.ToggleMood;
}

type Props = InputProps;

export const ToggleInput: React.FC<Props> = ({ label, name, mood = "secondary", ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField } = useField(name);
  const uniqueId: string = `${UuidV4()}${fieldName}`;
  
  useEffect(() => {
    registerField<boolean>({
      name: fieldName,
      ref: inputRef.current,
      getValue: (ref: HTMLInputElement) => ref.checked,
      setValue: (ref: HTMLInputElement, value: boolean) => ref.checked = value,
      clearValue: (ref: HTMLInputElement) => ref.checked = false
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    if (defaultValue && inputRef.current) {
      inputRef.current.checked = true;
    }
  }, [defaultValue]);
  
  useEffect(() => {
    if (
      (rest.value && inputRef.current) ||
      (rest.defaultValue && inputRef.current)
    ) {
      inputRef.current.checked = true;
    }
  }, [rest]);
  
  return (
    <S.MainContainer>
      {rest.title ? (
        <S.Title>{rest.title}</S.Title>
      ) : (
        <S.TitleEmpty>{rest.title}</S.TitleEmpty>
      )}
      <S.FieldContainer htmlFor={uniqueId} mood={mood}>
        <S.Label>{label}</S.Label>
        <S.Checkbox
          ref={inputRef}
          name={fieldName}
          id={uniqueId}
          defaultValue={defaultValue}
          {...rest}
        />
        <S.ToggleContainer>
          <S.ToggleTrack mood={mood}>
            <S.ToggleHandler mood={mood} />
          </S.ToggleTrack>
        </S.ToggleContainer>
      </S.FieldContainer>
    </S.MainContainer>
  );
};