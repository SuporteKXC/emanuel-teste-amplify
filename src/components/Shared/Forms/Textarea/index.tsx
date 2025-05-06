import React, { useEffect, useRef, useCallback } from 'react';
import { useField } from '@unform/core';
import * as S from './styles';

type Props = JSX.IntrinsicElements['textarea'] & {
  name: string;
  id?: string;
  label?: string;
};

export const Textarea: React.FC<Props> = ({ id, name, label, ...rest }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const LabelComponent = useCallback((): JSX.Element => {
    if (!label) return <></>;
    return <S.FieldLabel htmlFor={id || fieldName}>{label}</S.FieldLabel>;
  }, [fieldName, id, label]);

  const ErrorComponent = useCallback((): JSX.Element => {
    if (!error) return <></>;
    return <S.FieldError>{error}</S.FieldError>;
  }, [error]);

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
      <textarea
        ref={inputRef}
        name={fieldName}
        id={id || fieldName}
        defaultValue={defaultValue}
        {...rest}
      />
      <ErrorComponent />
    </S.Container>
  );
};
