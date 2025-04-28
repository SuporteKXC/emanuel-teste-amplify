import styled from 'styled-components';
import { Colors } from 'styles';

export const Container = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  background-color: ${Colors.Orange};
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 40px;
`;
