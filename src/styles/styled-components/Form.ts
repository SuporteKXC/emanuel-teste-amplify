import styled, { css } from 'styled-components';
import { Colors } from '../colors';
import { fonts } from '../fonts';

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

export const BoxContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.16);
  padding: 32px;
  margin-bottom: 24px;
`;

export const InputCSS = css`
  font-family: ${fonts.GilroyRegular};
  font-size: 16px;
  color: ${Colors.Gray100};
  background-color: #fff;
  padding: 14px;
  border: 1px solid #c9c9c9;
  border-radius: 4px;
  max-height: 50px;
  width: 100%;
`;

export const FieldLabel = styled.label`
  display: block;
  font-family: ${fonts.GilroySemiBold};
  font-size: 14px;
  color: ${Colors.Gray100};
  margin-bottom: 8px;
`;

export const FieldError = styled.span`
  display: block;
  font-family: ${fonts.GilroySemiBold};
  font-size: 14px;
  color: ${Colors.Red};
  margin-top: 8px;
  margin-bottom: 12px;
`;

export const FormRow = styled.div.attrs({ className: 'form-row' })`
  display: flex;
  flex-direction: row;

  .form-row {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  button {
    &:not(:last-child) {
      margin-right: 16px;
    }
  }
`;

export const FormFooter = styled.div`
  margin-top: 32px;
`;
