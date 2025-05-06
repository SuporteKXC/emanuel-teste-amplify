import styled from 'styled-components';
import { Colors } from 'styles/constants';
import { BasePanel, FilterIcon } from 'styles/components';
export { FormRow, FormActions, Button } from 'styles/components';
export { FormPageHeader } from 'components/Shared';


export const Container = styled.div`
  .filter {
    display: grid;
    grid-template-columns: repeat(3, minmax(240px, 360px)) auto;
    gap: 16px;
    border-bottom: 1px solid ${Colors.Gray30};
    width: 100%;
    padding-bottom: 24px;
    margin-bottom: 24px;
    .field-container {
      margin-bottom: 0px;
    }
  }
`;

export const IconFilter = styled(FilterIcon)`
  color: transparent;
  width: 27px;
  height: 27px;
  stroke: ${Colors.Gray60};
  stroke-width: 1pt;
`;

export const ButtonFilter = styled.button.attrs({ type: "button" })`
  display: flex;
  justify-self: end;
  align-items: center;
  justify-content: center;
  width: min-content;
  &:hover {
    svg {
      color: ${Colors.Gray60};
      stroke-width: 0;
    }
  }
`;

export const ModalBackground = styled.div<{isOpen: boolean}>`
  position: fixed;
  display: ${({isOpen})=> isOpen ? 'flex' : 'none'};
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
    from { backdrop-filter: blur(0px) }
    to { backdrop-filter: blur(2px) }
  }

`;

export const ModalContainer = styled(BasePanel)`
  flex-direction: column;
  padding: 32px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  animation: showModal 330ms;

  @keyframes showModal {
    from { opacity: 0; transform: scale(97%); }
    to { opacity: 1; transform: scale(100%);}
  }

`;