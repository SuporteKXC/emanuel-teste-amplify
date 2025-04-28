import styled from "styled-components";
import { fonts } from "styles";

export const ModalContent = styled.div.attrs({
  className: "modal-content",
})`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  justify-self: stretch;
  max-height: calc(100vh - 4rem);
  border-radius: 4px;
  box-shadow: #00000022 0 4px 16px 8px;
  overflow: hidden;
  width: 100%;
  @media screen and (min-width: 800px) {
    width: 640px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 60px;
  padding: 16px 32px;
  h1 {
    font-size: 24px;
    color: #000;
    font-family: ${fonts.GilroyBold};
    margin-bottom: 8px;
  }
`;

export const ModalBody = styled.div.attrs({
  className: "modal-body",
})`
  padding: 32px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #41414144;
    border-radius: 3px;
  }
`;
