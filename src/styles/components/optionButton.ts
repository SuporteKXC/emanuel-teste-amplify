import styled from "styled-components";
import { Colors, Fonts } from "styles/constants";

export const OptionButton = styled.button.attrs({
  type: "button",
})`
  color: inherit;
  font-size: 14px;
  font-family: ${Fonts.GilroySemiBold};
`;
