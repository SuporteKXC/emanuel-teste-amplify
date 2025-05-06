import styled, { css } from 'styled-components';
import { BasePanel, Loader, XIcon } from 'styles/components';
import { Colors, Fonts } from 'styles/constants';
export { FormPageHeader } from 'components/Shared';

export { PackageSolidIcon } from 'styles/components';

const gridTemplate = css`
  grid-template-columns: 0.05fr 1.2fr repeat(3, 1fr);
  gap: 15px;
  width: 100%;
`;

export const CloseIcon = styled(XIcon)`
  color: ${Colors.White};
`;

export const Header = styled.div`
  display: grid;
  ${gridTemplate}
  margin-bottom: 10px;
  font-family: ${Fonts.GilroyBold};
  font-size: 12px;
  p {
    text-transform: uppercase;
  }
`;

export const Row = styled.div`
  display: grid;
  ${gridTemplate}
  font-family: ${Fonts.OpenSans};
  font-size: 13px;
  padding: 8px 0;
  align-items: center;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
  }
  
  span.isEmpty {
    height: 55%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: ${Colors.Gray50};
  }

  span {
    height: 55%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: ${Colors.Green};
    cursor: pointer;
  }
`;

export const ModalBackground = styled.div<{ isOpen: boolean }>`
  position: fixed;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  inset: 0px;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow: auto;
  backdrop-filter: blur(2px);
  animation: showModalBack 1s;

  @keyframes showModalBack {
    from {
      backdrop-filter: blur(0px);
    }
    to {
      backdrop-filter: blur(2px);
    }
  }
`;

export const CloseButton = styled.button`
  display: flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${Colors.Gray70};
`;

export const ModalContainer = styled(BasePanel)<{ isTopPanel?: boolean }>`
  flex-direction: column;
  padding: 32px;
  width: 100%;
  max-width: 740px;
  max-height: 90vh;
  animation: showModal 330ms;

  @keyframes showModal {
    from {
      opacity: 0;
      transform: scale(97%);
    }
    to {
      opacity: 1;
      transform: scale(100%);
    }
  }

  ${({isTopPanel})=> !isTopPanel && css`
    ${Row} {
      grid-template-columns: 1.2fr repeat(3, 1fr) !important;
      span {
        display: none !important;
      }
    }
    ${Header} {
      grid-template-columns: 1.2fr repeat(3, 1fr) !important;
      span {
        display: none !important;
      }
    }
  `}
`;
