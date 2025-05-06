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
    row-gap: ${direction === "row" ? "12px" : ""};
  `};
  display: flex;
  background-color: ${Colors.White};
  padding: 12px;
  border-radius: 4px;
  flex-wrap: wrap;
  min-height: 50px;
  columns: 1;
  column-gap: 24px;
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
  align-items: center;
  font-size: 14px;
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
  margin-right: 10px;
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
  margin-bottom: 8px;
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
  font-size: 14px;
  color: ${ColorScheme.Danger};
  margin-top: 8px;
  margin-bottom: 12px;
`;

interface IFieldContainerProps {
  hide?: boolean;
}

export const FieldContainer = styled.div<IFieldContainerProps>`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-bottom: 16px;
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
