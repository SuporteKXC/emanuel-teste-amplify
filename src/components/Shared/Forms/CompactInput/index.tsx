import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useField } from '@unform/core';
import * as S from './styles';

type Props = JSX.IntrinsicElements['input'] & {
  name: string;
  id?: string;
  label?: string;
  placeholder?: string;
  isLoading?: boolean;
};

export const CompactInput: React.FC<Props> = ({
  name,
  id,
  label,
  placeholder = ' ',
  isLoading = false,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [passwdVisible, setPasswdVisible] = useState<boolean>(false);

  const togglePasswordVisibility = useCallback((): void => {
    setPasswdVisible((value) => !value);
    if (inputRef.current) {
      inputRef.current.type === 'password'
        ? (inputRef.current.type = 'text')
        : (inputRef.current.type = 'password');
    }
  }, []);

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
      <S.RelativeWrapper>
        <input
          name={fieldName}
          id={id || fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...rest}
        />
        {isLoading && (
          <S.ActivityIndicatorContainer>
            <S.ActivityIndicator />
          </S.ActivityIndicatorContainer>
        )}
        {rest?.type === 'password' && (
          <S.PasswdToggler
            title={passwdVisible ? 'Ocultar senha' : 'Mostrar senha'}
            onClick={togglePasswordVisibility}
          >
            {passwdVisible ? <S.EyeOffIcon /> : <S.EyeIcon />}
          </S.PasswdToggler>
        )}
      </S.RelativeWrapper>
      <ErrorComponent />
    </S.Container>
  );
};
