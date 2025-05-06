import styled, { css } from "styled-components";
import { Fonts } from "styles/constants";
import { ColorScheme } from "styles/constants";
import { ActivityIndicator } from "styles/components";

export const Input = styled.input<{ isLoading?: boolean }>`
  font-family: ${Fonts.OpenSans};
  font-size: 14px;
  color: ${ColorScheme.Text};
  background-color: #fff;
  padding: 16px;
  border: 1px solid #c9c9c9;
  border-radius: 4px;
  max-height: 50px;
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

    &::after {
      content: "",
      width: 5px;
      height: 5px;
      position: absolute;
      background: red;
      right: 0;
    }
`;

export const FieldLabel = styled.label`
  display: block;
  font-family: ${Fonts.GilroySemiBold};
  font-size: 14px;
  color: ${ColorScheme.Text};
  margin-bottom: 8px;
  position: relative;
  & {
    @media (max-width: 950px) {
      font-size: 0.74rem;
    }
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

export const Loading = styled(ActivityIndicator)`
  width: 20px;
  height: 20px;
  margin-left: 8px;
  opacity: 0.7;
`
