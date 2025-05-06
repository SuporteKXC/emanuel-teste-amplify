import styled, { css } from "styled-components";
import { Fonts } from "styles/constants";
import { ColorScheme } from "styles/constants";

export const Input = styled.input<{ isLoading?: boolean, fontSize?: string, fontWeight?: number }>`
  font-family: ${Fonts.OpenSans};
  font-size: 14px;
  color: ${ColorScheme.Text};
  background-color: #fff;
  padding: 16px;
  border: 1px solid #c9c9c9;
  border-radius: 4px;
  max-height: 50px;
  width: 100%;

  &[type="number"] {
    &::-webkit-inner-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }
    &::-webkit-outer-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }    
  }


  display: flex;
  flex: 1;
  font-weight: ${({fontWeight}) => ( fontWeight ? fontWeight : 600)};
  padding: 16px 8px;
  border: 1px solid #c9c9c9;
  border-radius: 6px;
  max-height: 38px;
  font-size: ${({fontSize}) => ( fontSize ? fontSize : "12px")};
  color: #2E2E36;

  ::placeholder {
    color: #2E2E36;
  }

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
