import React, { useRef, useCallback, useEffect, useState } from 'react';
import ReactSelect, {
  Props as SelectProps,
  GroupBase,
  SelectInstance,
} from 'react-select';
import { useField } from '@unform/core';
import { SelectOption } from 'contracts/Common';

import * as S from './styles';

interface Props
  extends SelectProps<SelectOption, false, GroupBase<SelectOption>> {
  name: string;
  id?: string;
  label?: string;
  onChange?: (option: SelectOption | null) => void;
}

export const CompactSelect: React.FC<Props> = ({
  name,
  id,
  label,
  options,
  placeholder = ' ',
  onChange,
  ...rest
}) => {
  const selectRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [hasSelection, setHasSelection] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_lastUpdate, setLastUpdate] = useState<number>(
    new Date().getUTCMilliseconds()
  );

  const handleChange = useCallback(
    (option: SelectOption | null): void => {
      onChange && onChange(option);
      setHasSelection(option !== null);
    },
    [onChange]
  );

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
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref?.state?.selectValue) {
            return [];
          }
          return ref?.state?.selectValue.map(
            (option: SelectOption) => option.value
          );
        }

        return ref?.state?.selectValue[0]?.value || '';
      },
      setValue: (
        ref: SelectInstance<SelectOption, false, GroupBase<SelectOption>>,
        option: SelectOption
      ) => {
        ref?.setValue(option, 'select-option', option);
        setLastUpdate(new Date().getUTCMilliseconds());
      },
      clearValue(ref: any) {
        ref?.setValue(null, 'select-option', null);
        setLastUpdate(new Date().getUTCMilliseconds());
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <S.Container>
      <LabelComponent />
      <ReactSelect
        className={hasSelection ? 'has-selection' : ''}
        ref={selectRef}
        id={id || fieldName}
        name={fieldName}
        options={options}
        styles={S.DefaultSelectStyle}
        placeholder={placeholder}
        onChange={handleChange}
        defaultValue={defaultValue}
        {...rest}
      />
      <ErrorComponent />
    </S.Container>
  );
};
