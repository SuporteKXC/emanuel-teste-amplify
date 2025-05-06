import styled from 'styled-components';
import { StylesConfig, GroupBase } from 'react-select';
import { Colors, ColorScheme, Fonts } from 'styles/constants';
import { FieldContainer } from 'styles/components';
import { SelectOption } from 'contracts';
export { FieldError, FieldLabel } from 'styles/components';

// Select style
interface SelectStyle
  extends StylesConfig<SelectOption, false, GroupBase<SelectOption>> {}

export const DefaultSelectStyle: SelectStyle = {
  container: (provided, state) => ({
    ...provided,
    height: "auto",
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: +10,
  }),
  control: (provided, state) => ({
    ...provided,
    height: "inherit",
    borderColor: "#CACACC",
    borderRadius: "6px",
    background: state.isDisabled ? ColorScheme.DisabledField : Colors.White,
    outline: "none",
    fontSize: "12px",
    fontFamily: Fonts.OpenSans,
    fontWeight: "600",
    boxShadow: "none",
    ":hover": {
      borderColor: Colors.Gray50,
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0 0.5rem",
    fontSize: "12px",
    margin: "0px",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: Colors.Gray70,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: Colors.Gray70,
    textTransform: 'capitalize',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
    background: "inherit",
    borderColor: Colors.Gray50,
    borderRadius: "6px",
    "::-webkit-scrollbar": {
      "-webkit-appearance": "none",
    },
    "::-webkit-scrollbar:vertical": {
      width: "8px",
    },
    "::-webkit-scrollbar:horizontal": {
      display: "none"
      // height: "8px",
    },
    "::-webkit-scrollbar-thumb": {
      borderRadius: "6px",
      border: `2px solid ${Colors.White}`,
      backgroundColor: Colors.Gray50,
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: Colors.White,
    },
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused ? Colors.Gray70 : "inherit",
    color: (() => {
      if (state.isDisabled) {
        return Colors.Gray50;
      }
      if (state.isFocused) {
        return Colors.White;
      }
      return state.data?.color ? state.data?.color : "inherit";
    })(),
    fontSize: "12px",
    fontFamily: Fonts.OpenSans,
    fontWeight: "600",
    ":hover": {
      background: state.isDisabled ? Colors.Gray10 : Colors.Gray70,
    },
  }),
};

export const Container = styled(FieldContainer)``;
