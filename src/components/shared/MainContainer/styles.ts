import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  width: 100%;
  max-width: 1920px;
  height: 100vh;
  margin: 0 auto;
  position: relative;

  .scrollHidden {
    scrollbar-width: none;
  }

  .scrollHidden::-webkit-scrollbar {
    display: none;
  }
`;

export const Content = styled.section`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
`;
