import styled from "styled-components";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Colors } from "styles/constants";
import { Check } from "styles/components";

interface ICheckbox {
  hide?: boolean;
  disabled?: boolean;
}

export const CheckboxContainer = styled(CheckboxPrimitive.Root)<ICheckbox>`
  height: 14px;
  width: 14px;
  border-radius: 2px;

  display: ${({ hide }) => (hide ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  border: 2px solid
    ${({ disabled }) => (disabled ? Colors.Gray50 : Colors.Gray70)};

  &:hover {
    background-color: ${Colors.Gray30};
  }
`;

export const Indicator = styled(CheckboxPrimitive.Indicator)`
  color: ${Colors.Gray60};
  width: 1.25rem;
  height: 1.25rem;
`;

export const CheckedIcon = styled(Check)``;
