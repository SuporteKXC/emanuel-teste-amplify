import styled from 'styled-components';
import { StylesConfig, GroupBase } from 'react-select';
import { Colors, ColorScheme, Fonts } from 'styles/constants';
import { SelectOption } from 'contracts/Common';

// Select style
interface SelectStyle
  extends StylesConfig<SelectOption, false, GroupBase<SelectOption>> {}

export const DefaultSelectStyle: SelectStyle = {
  container: (provided) => ({
    ...provided,
    height: '32px',
    background: 'transparent',
    color: 'inherit',
  }),
  control: (provided) => ({
    ...provided,
    'height': 'inherit',
    'min-height': '32px',
    'background': 'transparent',
    'borderColor': 'transparent',
    'borderRadius': '6px',
    'outline': 'none',
    'boxShadow': 'none',
    ':hover': {
      borderColor: Colors.Gray70,
    },
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: 'inherit',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    'color': `${ColorScheme.Primary}`,
    ':hover': {
      color: `${ColorScheme.Primary}`,
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0 16px',
    fontSize: 'inherit',
    background: 'transparent',
  }),
  input: (provided) => ({
    ...provided,
    color: Colors.White,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: Colors.Blue,
  }),
  menuList: (provided) => ({
    ...provided,
    'padding': 0,
    'background': Colors.Gray70,
    'borderColor': Colors.Gray70,
    'borderRadius': '0px 0px 6px 6px',
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
      border: `2px solid ${Colors.Gray70}`,
      backgroundColor: Colors.Gray50,
    },
    '::-webkit-scrollbar-track': {
      backgroundColor: Colors.Gray70,
    },
  }),
  option: (provided, state) => ({
    ...provided,
    'background': state.isFocused ? `${Colors.Gray60}33` : Colors.Gray70,
    'color': state.isFocused ? Colors.Blue : 'inherit',
    'fontSize': 'inherit',
    ':hover': {
      background: `${Colors.Gray60}33`,
    },
  }),
};

export const Container = styled.div`
  font-family: ${Fonts.GilroySemiBold};
  font-size: 16px;
  display: flex;
  flex-direction: column;
  color: ${Colors.White};
`;
