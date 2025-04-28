import React, { useRef, useEffect, useState } from "react";
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from "react-select";
import { useField } from "@unform/core";

import * as S from "./styles";

interface InputProps extends SelectProps<OptionTypeBase, true> {
  name: string;
  label?: string;
  className?: string;
  labelStyle?: Record<string, any>;
  inputStyle?: Record<string, any>;
  containerStyle?: Record<string, any>;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: any;
}

type Props = InputProps;

export const SelectClean: React.FC<Props> = ({
  name,
  label,
  className = "field-container",
  labelStyle = {},
  inputStyle = {},
  containerStyle = {},
  required = false,
  disabled = false,
  placeholder = "Selecione...",
  options,
  value,
  ...rest
}) => {
  const selectRef = useRef(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const body = document.getElementsByTagName("body")[0];

  function handleMenuOpen() {
    body.classList.add("react-select-open");
  }

  function handleMenuClose() {
    body.classList.remove("react-select-open");
  }

  const Label = () => (
    <S.FieldLabel htmlFor={fieldName} style={labelStyle}>
      {label}
      {required && <span>*</span>}
    </S.FieldLabel>
  );

  const Error = () => <S.FieldError>{error}</S.FieldError>;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: undefined,
      setValue: (ref: any, value: any) => {
        ref.state.value = value;
        setLastUpdate(new Date());
      },
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref?.state?.value?.map(
            (option: OptionTypeBase) => option.value
          );
        }
        if (!ref.state.value) {
          return "";
        }
        return ref.state.value.value;
      },
    });
  }, [selectRef, fieldName, registerField, rest.isMulti]);

  useEffect(() => {}, [lastUpdate]);

  return (
    <>
      {label && <Label />}
      <ReactSelect
        name={fieldName}
        styles={S.customStyles}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        onMenuOpen={handleMenuOpen}
        onMenuClose={handleMenuClose}
        placeholder={placeholder}
        options={options}
        isDisabled={disabled}
        {...rest}
      />
      {error && <Error />}
    </>
  );
};
