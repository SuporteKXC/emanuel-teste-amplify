import styled from 'styled-components';
import { Colors } from 'styles';

export const Container = styled.footer`
  width: 100%;
  max-width: 1920px;
  padding: 16px 32px;
  background-color: ${Colors.Gray100};
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
`;

export const Text = styled.article`
  font-size: 12px;
  text-align: center;
  color: ${Colors.Gray20};
`;
