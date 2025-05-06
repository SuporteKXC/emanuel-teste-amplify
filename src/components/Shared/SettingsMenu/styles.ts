import styled from 'styled-components';
import { Colors, Fonts } from 'styles/constants';
export { SettingsIcon } from 'styles/components';

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0 24px;
  width: 100%;
  max-width: 540px;
  background: ${Colors.Gray70};
  color: ${Colors.White};
  border: 1px solid ${Colors.Gray50};
  border-radius: 6px;
  margin-bottom: 24px;
  padding: 10px 32px;
  form {
    width: 100%;
  }
`;

export const Label = styled.label`
  display: flex;
  flex-direction: row;
  gap: 0 8px;
  font-family: ${Fonts.GilroySemiBold};
  font-size: 16px;
`;
