import { SelectOption } from "contracts";
import { GroupBase, StylesConfig } from "react-select";
import styled from "styled-components";
import { Colors, Fonts } from "styles/constants";
import { ColorScheme } from "styles/constants";

interface SelectStyle
  extends StylesConfig<SelectOption, true, GroupBase<SelectOption>> {}

interface CustomStyles {
  primary: Partial<SelectStyle>;
  secondary: Partial<SelectStyle>;
  tertiary: Partial<SelectStyle>;
  [key:string]: Partial<SelectStyle>;
}

export const customStyles: CustomStyles = {
  primary: {
    option: (provided: any) => {
      return {
        ...provided,
        paddingTop: 8,
        paddingBotton: 8,
        paddingLeft: 16,
        paddingRight: 16,
        cursor: "pointer",
      };
    },
    control: () => ({
      border: "1px solid #c9c9c9",
      display: "flex",
      fontFamily: Fonts.GilroyRegular,
      marginLeft: 0,
      minWidth: "100px",
      maxWidth: "100%",
      padding: "6px 10px",
      backgroundColor: "white",
      borderRadius: "4px",
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
        height: "8px",
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
  },
  secondary: {
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
        height: "8px",
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
  },
  tertiary: {
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
      height: "48px",
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
      color: Colors.Gray50,
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
        height: "8px",
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
      display: 'flex',
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
      height: '48px',
      alignItems: 'center',
      ":hover": {
        background: state.isDisabled ? Colors.Gray10 : Colors.Gray70,
      },
    }),
  },
};

export const FieldLabel = styled.label`
  display: block;
  font-family: ${Fonts.GilroySemiBold};
  font-size: 14px;
  color: ${ColorScheme.Text};
  margin-bottom: 8px;
`;

export const FieldError = styled.span`
  display: block;
  font-family: ${Fonts.GilroySemiBold};
  font-size: 14px;
  color: ${ColorScheme.Danger};
  margin-top: 8px;
  margin-bottom: 12px;
`;
export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
  position: relative;

  .select__control--is-disabled {
    background-color: rgb(242, 242, 242);
  }

  &:not(:last-child) {
    margin-right: 16px;
  }
`;
