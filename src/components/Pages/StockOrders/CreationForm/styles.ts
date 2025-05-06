import styled from 'styled-components';
import { BasePanel } from 'styles/components';
import { MessageAddIcon } from 'styles/components';
import { XIcon } from 'styles/components';
import { Colors, Fonts } from 'styles/constants';
export {
  FormRow,
  Button,
  LinkButton,
  ActivityIndicator,
  FormActions,
  LeftArrowAlt,
  StockOrderIcon,
} from 'styles/components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Subtitle = styled.h4`
  margin: 24px 0;
`;

export const Panel = styled(BasePanel)`
  flex: 0 1 100%;
  flex-direction: column;
  background: ${Colors.White};
  padding: 24px;
`;

export const Separator = styled.div`
  width: 100%;
  border-bottom: 0.5px solid ${Colors.Gray30};
  padding-bottom: 16px;

`;

export const AddIcon = styled(MessageAddIcon)`
  color: ${Colors.Blue};
  width: 16px;
  height: 16px;
  transition: all 0.3s;
`;

export const CloseIcon = styled(XIcon)`
  width: 16px;
  height: 16px;
  color: ${Colors.White};
  background: ${Colors.Gray60};
  border-radius: 22px;
`;

export const AddButton = styled.button<{ isAdd?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  margin: 0;
  font-family: ${Fonts.GilroySemiBold};
  margin-bottom: 8px;

  :hover {
    ${AddIcon} {
      transform: scale(1.1);
    }
  }

  ${AddIcon} {
    display: ${({ isAdd })=> isAdd ? 'none' : 'block'}
  }

  ${CloseIcon} {
    display: ${({ isAdd })=> !isAdd ? 'none' : 'block'}
  }
`;

export const TextArea = styled.textarea`
  width: 50%;
  height: 100px;
`