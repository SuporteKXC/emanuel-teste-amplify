import styled from 'styled-components';
import { Colors, fonts } from 'styles';

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 16px 24px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 18px;
    color: ${Colors.Gray100};
    display: flex;
    align-items: center;

    span {
      font-family: ${fonts.GilroyRegular};
      text-transform: uppercase;
      margin-left: 8px;
      font-size: 18px;
    }

    svg {
      margin-right: 8px;
      width: 100%;
      max-width: 20px;
    }
  }
`;

export const PageContainer = styled.main`
  width: 100%;
  max-width: 1920px;
  min-height: 100vh;
  position: relative;
  margin: 0 auto;
`;

export const PageContent = styled.section`
  width: 100%;
  padding: 32px 24px;
`;
