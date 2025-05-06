import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  height: 100%;
`;

export const GrContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;

  iframe {
    width: 100%;
  }
`;
