import React, { useRef, useCallback, useEffect } from 'react';
import { useField } from '@unform/core';
import * as S from './styles';

type Props = JSX.IntrinsicElements['input'] & {
  name: string;
  id?: string;
  label?: string;
};

export const DurationInput: React.FC<Props> = ({
  name,
  id,
  label,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const LabelComponent = useCallback((): JSX.Element => {
    if (!label) return <></>;
    return <S.FieldLabel htmlFor={id || fieldName}>{label}</S.FieldLabel>;
  }, [fieldName, id, label]);

  const ErrorComponent = useCallback((): JSX.Element => {
    if (!error) return <></>;
    return <S.FieldError>{error}</S.FieldError>;
  }, [error]);

  // mask input as time
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;
      const maskedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d{2})/, '$1:$2');
      e.target.value = maskedValue;
      rest?.onChange && rest?.onChange?.(e);
    },
    [rest]
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
    });
  }, [fieldName, registerField]);

  return (
    <S.Container>
      <LabelComponent />
      <input
        name={fieldName}
        id={id || fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        onChange={onChange}
        maxLength={5}
        {...rest}
      />
      <ErrorComponent />
    </S.Container>
  );
};
