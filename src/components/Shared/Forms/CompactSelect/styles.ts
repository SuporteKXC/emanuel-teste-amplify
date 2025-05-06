import styled from 'styled-components';
import { StylesConfig, GroupBase } from 'react-select';
import { Colors, ColorScheme, Fonts } from 'styles/constants';
import { FieldContainer } from 'styles/components';
import { SelectOption } from 'contracts/Common';
export { FieldError, FieldLabel } from 'styles/components';

// Select style
interface SelectStyle
  extends StylesConfig<SelectOption, false, GroupBase<SelectOption>> {}

export const DefaultSelectStyle: SelectStyle = {
  container: (provided) => ({
    ...provided,
    height: '32px',
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
  control: (provided, state) => ({
    ...provided,
    'height': 'inherit',
    'min-height': '32px',
    'background': state.isDisabled ? ColorScheme.DisabledField : Colors.White,
    'borderColor': Colors.Gray60,
    'borderRadius': '6px',
    'outline': 'none',
    'boxShadow': 'none',
    ':hover': {
      borderColor: Colors.Gray60,
    },
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: 'inherit',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0 16px',
    fontSize: 'inherit',
    background: 'transparent',
  }),
  menuList: (provided) => ({
    ...provided,
    'padding': 0,
    'background': 'inherit',
    'borderColor': Colors.Gray40,
    'borderRadius': '6px',
    '::-webkit-scrollbar': {
      '-webkit-appearance': 'none',
    },
    '::-webkit-scrollbar:vertical': {
      width: '8px',
    },
    '::-webkit-scrollbar:horizontal': {
      height: '8px',
    },
    '::-webkit-scrollbar-thumb': {
      borderRadius: '6px',
      border: `2px solid ${Colors.White}`,
      backgroundColor: Colors.Gray50,
    },
    '::-webkit-scrollbar-track': {
      backgroundColor: Colors.White,
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#2E2E36',
    fontFamily: Fonts.GilroyBold,
  }),
  option: (provided, state) => ({
    ...provided,
    'background': state.isFocused ? Colors.Gray70 : 'inherit',
    'color': state.isFocused ? Colors.White : 'inherit',
    'fontSize': 'inherit',
    ':hover': {
      background: Colors.Gray70,
    },
  }),
};

export const Container = styled(FieldContainer)``;
