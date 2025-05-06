import styled from "styled-components";
import { Colors, ColorScheme, Fonts } from "styles/constants";
export { TogglerOpenIcon, TogglerCloseIcon } from "styles/components/icons";

export const FormRow = styled.div.attrs({ className: "form-row" })`
  display: flex;
  flex-direction: row;
  gap: 0 16px;

  > button {
    margin-top: 24px;
  }

  > div {
    flex: 1;
  }

  .form-row {
    display: flex;
    flex-direction: rows;
    width: 100%;
  }
`;

export const FieldContainer = styled.div.attrs({
  className: "field-container",
})`
  font-family: ${Fonts.GilroyRegular};
  font-size: 14px;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  margin-bottom: 16px;
  input:disabled {
    background: ${ColorScheme.DisabledField};
  }
`;

export const FieldLabel = styled.label.attrs({ className: "field-label" })`
  display: block;
  font-size: 14px;
  font-family: ${Fonts.GilroySemiBold};
  color: ${ColorScheme.Text};
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const FieldError = styled.span.attrs({ className: "field-error" })`
  display: inline-block;
  color: ${Colors.Magenta};
  font-size: 0.86rem;
  padding: 8px 0;
`;

export const FormActions = styled.div.attrs({ className: "form-actions" })`
  display: flex;
  flex-direction: row;
  margin-top: 32px;
  gap: 0 16px;
  margin-left: 20px;
`;

export const BaseFiltersContainer = styled.div`
  user-select: none;
  form {
    display: grid;
    width: 100%;
    padding-bottom: 24px;
    margin-bottom: 24px;
    border-bottom: 1px solid ${Colors.Gray30};
    gap: 16px;
    .field-container {
      margin-bottom: 0px;
    }
  }
`;
