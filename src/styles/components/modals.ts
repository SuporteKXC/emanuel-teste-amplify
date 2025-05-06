import styled from 'styled-components';
import {
  Colors,
  ColorScheme,
  Fonts,
  getScrollbarStyle,
} from 'styles/constants';

export const ModalContent = styled.div.attrs({
  className: 'modal-content',
})`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  justify-self: stretch;
  max-height: calc(100vh - 4rem);
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
  @media screen and (min-width: 800px) {
    max-width: 460px;
  }
`;

export const ModalHeader = styled.div.attrs({
  className: 'modal-header',
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0 8px;
  justify-content: space-between;
  border-bottom: 1px solid ${Colors.Gray30}66;
  background: ${Colors.Gray20};
  min-height: 60px;
  font-size: 18px;
  padding: 16px 24px;
  font-family: ${Fonts.GilroySemiBold};
  color: ${ColorScheme.Text};
`;

export const ModalBody = styled.div.attrs({
  className: 'modal-body',
})`
  padding: 24px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  ${getScrollbarStyle()};
  ::-webkit-scrollbar-thumb {
    border-color: ${Colors.White};
  }
  ::-webkit-scrollbar-track {
    background-color: ${Colors.White};
  }
`;
