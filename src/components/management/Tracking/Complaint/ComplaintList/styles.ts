import styled, { css } from "styled-components";
import { Fonts } from "styles/constants";
export { ActivityIndicator } from "styles/components";
import { Button, Close } from "styles/components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px 0 32px 0;
`;

export const ActionsContainer = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
`

export const ButtonSubmit = styled(Button)`
  display: flex;
  gap: 2px;
  color: #ffff;
  height: 32px;
  background-color: #0085ff;
  max-width: 8rem;
  padding: 6px 12px 6px 8px;
`;

export const MensagemClear = styled.p`
  white-space: nowrap;
  font-size: 12px;
`;