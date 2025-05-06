import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import * as S from './styles';

type Props = JSX.IntrinsicElements['input'] & {
  name: string;
  id?: string;
  placeholder?: string;
};

export const CompactSearch: React.FC<Props> = ({
  name,
  id,
  placeholder,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
    });
  }, [fieldName, registerField]);

  return (
    <S.Container>
      <S.RelativeWrapper>
        <input
          name={fieldName}
          id={id || fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...rest}
        />
        <S.SearchIcon />
      </S.RelativeWrapper>
    </S.Container>
  );
};
