import styled, { css } from "styled-components";
import { CheckmarkSquare2Outline } from "@styled-icons/evaicons-outline/CheckmarkSquare2Outline";
import { SquareOutline } from "@styled-icons/evaicons-outline/SquareOutline";
import { Fonts, ColorScheme, Colors } from "styles/constants";
export { ActivityIndicator } from "styles/components";

interface OptionsContainerProps {
  direction?: "row" | "column";
}

export const OptionsContainer = styled.div<OptionsContainerProps>`
   ${({ direction = "row" }) => css`
    flex-direction: ${direction};
  `};
  display: flex;
  padding: 1px 14px;
  flex-wrap: wrap;
  align-items: start;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  @media screen and (max-width: 414px) {
    columns: 1;
  } ;
`;

interface OptionsProps {
  fixWidth?: string;
}

export const Option = styled.label<OptionsProps>`
  ${({ fixWidth }) =>
    fixWidth &&
    css`
      width: ${fixWidth};
    `}
  display: flex;
  flex-direction: row;
  align-items: start;
  font-size: 14px;
  min-width: 60px;
  font-family: ${Fonts.GilroySemiBold};
  cursor: pointer;
`;

export const Icons = styled.div.attrs({ className: "icons" })``;

export const Input = styled.input`
  appearance: none;
  &:checked + .icons > .checked {
    display: initial;
  }
  &:not(:checked) + .icons > .unchecked {
    display: initial;
  }
`;

export const CheckedIcon = styled(CheckmarkSquare2Outline).attrs({
  size: 24,
  className: "checked",
})`
  color: ${ColorScheme.Primary};
  margin-right: 14px;
  display: none;
`;

export const UncheckedIcon = styled(SquareOutline).attrs({
  size: 24,
  className: "unchecked",
})`
  color: ${Colors.Gray30};
  margin-right: 10px;
  display: none;
`;

export const FieldLabel = styled.label`
  display: block;
  font-family: ${Fonts.GilroySemiBold};
  font-size: 14px;
  color: ${ColorScheme.Text};
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(101%);
  }
  &:active {
    transform: scale(100%);
  }
`;

export const FieldError = styled.span`
  display: block;
  font-family: ${Fonts.GilroySemiBold};
  font-size: 10px;
  color: ${ColorScheme.Alert};
  margin-top: 8px;
  margin-bottom: 12px;
`;


interface IFieldContainerProps {
  hide?: boolean;
}

export const FieldContainer = styled.div<IFieldContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  &:not(:last-child) {
    margin-right: 16px;
  }
  
  ${({hide}) => hide && css`
    opacity: 0;
    width: 0;
    height: 0;
    &:not(:last-child) {
      margin-right: 0px;
    }
  `}
`;