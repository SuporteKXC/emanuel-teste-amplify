import React, { useEffect, useRef, useCallback } from 'react';
import { useField } from '@unform/core';

import * as S from './styles';

type Props = JSX.IntrinsicElements['input'] & {
  name: string;
  id?: string;
};

export const HiddenInput: React.FC<Props> = ({ name, id, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const Error = useCallback((): JSX.Element => {
    if (!error) return <></>;
    return <S.FieldError>{error}</S.FieldError>;
  }, [error]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <S.MainContainer>
      <input
        ref={inputRef}
        name={fieldName}
        id={id || fieldName}
        defaultValue={defaultValue}
        readOnly
        {...rest}
      />
      <Error />
    </S.MainContainer>
  );
};
