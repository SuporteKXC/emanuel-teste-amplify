import React, { useRef, useCallback, useEffect } from 'react';
import { useField } from '@unform/core';
import { CheckboxOption } from 'contracts/Common';
import * as S from './styles';

interface Props {
  name: string;
  id?: string;
  label?: string;
  options: CheckboxOption[];
  onChange?: (values: string[]) => void;
}

export const Checkbox: React.FC<Props> = ({
  name,
  id,
  label,
  options,
  onChange,
}) => {
  const inputRefs = useRef<HTMLInputElement[] | null[]>(
    Array.from({ length: options.length }, () => null)
  );

  const { fieldName, defaultValue = [], registerField, error } = useField(name);

  const LabelComponent = useCallback((): JSX.Element => {
    if (!label) return <></>;
    return <S.FieldLabel htmlFor={id || fieldName}>{label}</S.FieldLabel>;
  }, [fieldName, id, label]);

  const ErrorComponent = useCallback((): JSX.Element => {
    if (!error) return <></>;
    return <S.FieldError>{error}</S.FieldError>;
  }, [error]);

  const handleChange = useCallback(
    (_: React.ChangeEvent<HTMLInputElement>) => {
      if (!onChange) return;
      const refs = inputRefs.current as HTMLInputElement[];
      const checkedValues = refs
        .filter((ref) => ref?.checked)
        .map((ref) => ref?.value);

      return onChange(checkedValues);
    },
    [onChange]
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.filter((ref) => ref?.checked).map((ref) => ref?.value);
      },
      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach((ref) => {
          ref.checked = false;
        });
      },
      setValue: (refs: HTMLInputElement[], value: string[]) => {
        refs.forEach((ref) => {
          ref.checked = value.includes(ref.value);
        });
      },
    });
  }, [fieldName, registerField]);

  return (
    <S.Container>
      <LabelComponent />
      <S.Options>
        {options.map((option, index) => (
          <S.Option htmlFor={option.id} key={option.id}>
            <S.Input
              type="checkbox"
              value={option.value}
              id={option.id}
              ref={(ref) => (inputRefs.current[index] = ref)}
              defaultChecked={defaultValue.find(
                (dv: string) => dv === option.id
              )}
              onChange={handleChange}
            />
            <S.Icons>
              <S.CheckedIcon
                style={{ color: option?.color || 'currentColor' }}
              />
              <S.UncheckedIcon />
            </S.Icons>
            {option.label}
          </S.Option>
        ))}
      </S.Options>
      <ErrorComponent />
    </S.Container>
  );
};
