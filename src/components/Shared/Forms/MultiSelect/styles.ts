import styled, { css } from "styled-components";
import { Fonts } from "styles/constants";
import { ColorScheme } from "styles/constants";


export const customStyles: Record<string, any> = {
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
    border: "1px solid #DEDEDE",
    display: "flex",
    fontFamily: Fonts.GilroyRegular,
    marginLeft: 0,
    minWidth: "100px",
    maxWidth: "100%",
    padding: "6px 10px",
  }),
  menuList: () => ({
    "::-webkit-scrollbar": {
      width: "4px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#000",
      borderRadius: "7px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }),
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
  color: ${ColorScheme.Alert};
  margin-top: 8px;
  margin-bottom: 12px;
`;
export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
  position: relative;

  &:not(:last-child) {
    margin-right: 16px;
  }

  span {
    display: block;
    font-family: ${Fonts.GilroySemiBold};
    font-size: 14px;
    color: ${ColorScheme.Danger};
    margin-top: 8px;
    margin-bottom: 12px;
  }
`;