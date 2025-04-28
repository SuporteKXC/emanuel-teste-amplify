import styled from 'styled-components';
import { Warning } from '@styled-icons/fluentui-system-filled';
import { Colors } from 'styles';
export { Button, Loading } from 'styles/styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 680px;
  max-height: 90vh;
  flex-direction: column;
  background-color: ${Colors.White};
  border-radius: 4px;
  padding: 40px;
  margin: 32px 0;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${Colors.Gray10};
    border-radius: 3px;
  }
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px ${Colors.Gray10} solid;
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: ${Colors.Gray100};
  margin-left: 16px;
`;

export const Text = styled.article`
  width: 100%;
  font-size: 16px;
  color: ${Colors.Gray100};
  margin-bottom: 48px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  border-left: none;
  border-right: none;

  button:first-child {
    margin-right: 16px;
  }
`;

export const IconWarning = styled(Warning).attrs({ size: 32 })``;
