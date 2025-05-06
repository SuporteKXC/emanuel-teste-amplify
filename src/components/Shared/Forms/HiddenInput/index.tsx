import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import * as S from './styles';

type Props = JSX.IntrinsicElements['input'] & {
  name: string;
  id?: string;
};

export const HiddenInput: React.FC<Props> = ({ name, id, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField } = useField(name);

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
    </S.MainContainer>
  );
};
