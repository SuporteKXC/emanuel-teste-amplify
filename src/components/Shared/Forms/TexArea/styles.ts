import styled, { css } from "styled-components";
import { Fonts } from "styles/constants";
import { ColorScheme } from "styles/constants";

interface TextAreaProps {
  isLoading?: boolean;
  maxHeight: string | number;
  height: string | number;
}

export const TextArea = styled.textarea<TextAreaProps>`
  font-family: ${Fonts.OpenSans};
  font-size: 14px;
  color: ${ColorScheme.Text};
  background-color: #fff;
  padding: 16px;
  border: 1px solid #c9c9c9;
  border-radius: 4px;
  height: ${({ height }) =>
    typeof height === "string" ? height : height + "px"};
  max-height: ${({ maxHeight }) =>
    typeof maxHeight === "string" ? maxHeight : maxHeight + "px"};
  resize: none;
  width: 100%;

  &:disabled {
    background-color: #f1f1f1;
  }

  ${({ hidden }) =>
    hidden &&
    css`
      max-width: 0;
      max-height: 0;
    `}

  ${({ isLoading }) =>
    isLoading &&
    css`
      padding-right: 32px;
    `}
`;

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

  &:not(:last-child) {
    margin-right: 16px;
  }
`;
