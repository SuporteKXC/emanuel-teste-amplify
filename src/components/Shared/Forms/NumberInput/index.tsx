import React, { useCallback, useEffect, useState } from 'react';
import { useField } from '@unform/core';
import NumberFormatInput from 'react-number-format';
import * as S from './styles';

type Props = JSX.IntrinsicElements['input'] & {
  name: string;
  id?: string;
  label?: string;
  prefix?: string;
  suffix?: string;
  isDisabled?: boolean;
  range?: boolean;
  min?: number;
  max?: number;
  step?: number | string;
  defaultValue?: number;
};

export const NumberInput: React.FC<Props> = ({
  name,
  id,
  label,
  prefix,
  suffix,
  range,
  step,
  placeholder,
  ...rest
}) => {
  const inputRef = React.createRef<HTMLInputElement>();
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const { isDisabled, readOnly, defaultValue: sliderDefault } = rest;

  /**
   * For some reason, the input looses its value when we submit the form.
   * This is a workaround to keep the value in the input.
   */
  const [value, setValue] = useState<string | number>(defaultValue);

  const LabelComponent = useCallback((): JSX.Element => {
    if (!label) return <></>;
    return <S.FieldLabel htmlFor={id || fieldName}>{label}</S.FieldLabel>;
  }, [fieldName, id, label]);

  const ErrorComponent = useCallback((): JSX.Element => {
    if (!error) return <></>;
    return <S.FieldError>{error}</S.FieldError>;
  }, [error]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.replace(/\D/g, ''));
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      setValue(ref: HTMLInputElement, value: string) {
        setValue(`${value}`);
      },
      clearValue(ref: HTMLInputElement) {
        // we must clear the string value manually to the input
        setValue('');
        ref.value = '';
      },
      getValue(ref: HTMLInputElement) {
        // we must revert the brazilian format to an standard numberic format
        let realValue = ref.value.replace(/[^0-9,]/g, '');
        realValue = realValue.replace(/,/g, '.');
        setValue(realValue);
        return realValue;
      },
    });
  }, [fieldName, inputRef, prefix, registerField, suffix]);

  return (
    <S.Container>
      <LabelComponent />
      <NumberFormatInput
        getInputRef={inputRef}
        value={value}
        thousandSeparator="."
        decimalSeparator=","
        isNumericString={true}
        allowNegative={false}
        id={id || fieldName}
        name={fieldName}
        disabled={isDisabled}
        readOnly={readOnly}
        prefix={prefix}
        suffix={suffix}
        onChange={onChange}
        placeholder={placeholder && placeholder}
      />
      {range && (
        <S.RangeInput
          type="range"
          min={String(rest?.min)}
          max={String(rest?.max)}
          value={value ? value : sliderDefault}
          step={step}
          disabled={isDisabled}
          onChange={onChange}
        />
      )}
      <ErrorComponent />
    </S.Container>
  );
};
