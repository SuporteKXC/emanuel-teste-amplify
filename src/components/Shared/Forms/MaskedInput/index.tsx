import React, { useRef, useEffect, useCallback, useState } from 'react';
import ReactInputMask, { Props as InputProps } from 'react-input-mask';
import { useField } from '@unform/core';
import * as S from './styles';

interface Props extends InputProps {
  name: string;
  id?: string;
  label?: string;
  placeholder?: string;
}

export const MaskedInput: React.FC<Props> = ({
  name,
  id,
  label,
  placeholder = ' ',
  mask,
  ...rest
}) => {
  const inputRef = useRef(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_lastUpdate, setLastUpdate] = useState<number>(
    new Date().getUTCMilliseconds()
  );
  const { fieldName, registerField, defaultValue, error } = useField(name);

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
      ref: inputRef.current,
      setValue(ref: any, value: string) {
        ref.value = value;
        setLastUpdate(new Date().getUTCMilliseconds());
      },
      clearValue(ref: any) {
        ref.value = '';
        setLastUpdate(new Date().getUTCMilliseconds());
      },
      getValue(ref: any) {
        return (ref.value as string).replace(/[^A-Za-z0-9]/g, '');
      },
    });
  }, [fieldName, registerField]);

  return (
    <S.Container>
      <LabelComponent />
      <ReactInputMask
        ref={inputRef}
        name={fieldName}
        defaultValue={defaultValue}
        mask={mask}
        placeholder={placeholder}
        {...rest}
      />
      <ErrorComponent />
    </S.Container>
  );
};
