import styled, { css } from 'styled-components';
import {
  ModalHeader as BaseModalHeader,
  LinkButton as BaseLinkButton,
} from 'styles/components';
import { Colors, Fonts } from 'styles/constants';
export {
  ActivityIndicator,
  Button,
  LinkButton,
  FormActions,
  FormRow,
  ModalBody,
  ModalContent,
  StockOrderIcon,
  PrinterIcon,
} from 'styles/components';

// header
export const ModalHeader = styled(BaseModalHeader)`
  justify-content: space-between;
`;

export const SlotUser = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${Colors.Gray30};
  color: ${Colors.Gray60};
  font-size: 14px;
  justify-content: space-between;
`;

export const User = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;

export const Date = styled.div`
  display: flex;
  font-family: ${Fonts.GilroyRegular};
`;

export const Name = styled.div`
  display: flex;
  text-align: center;
  color: ${Colors.Gray60};
  font-family: ${Fonts.GilroyRegular};
`;

const HeaderSegment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HeaderTitle = styled(HeaderSegment)`
  gap: 0 8px;
  flex: 0 1 270px;
`;

export const Titles = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderCenter = styled(HeaderSegment)`
  flex: 1;
  justify-content: center;
`;

export const HeaderButtons = styled(HeaderSegment)`
  flex: 0 1 calc(270px - 32px);
  gap: 0 24px;
  button,
  a {
    padding: 0px;
    &:first-child {
      margin-left: auto;
    }
  }
`;

export const PrintButton = styled(BaseLinkButton)``;

// body

const BaseGrid = styled.div`
  display: grid;
  gap: 32px 24px;
  &:not(:last-child) {
    margin-bottom: 32px;
  }
`;

export const MainGrid = styled(BaseGrid)`
  display: grid;
  gap: 32px 24px;
  &:not(:last-child) {
    margin-bottom: 32px;
  }
  grid-template-columns: 1fr 1fr 1fr 1fr;
  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const DeliveryAddressGrid = styled(BaseGrid)`
  > div:nth-child(1) {
    grid-area: address;
  }

  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas: 'address address address address';
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DetailLabel = styled.label`
  font-family: ${Fonts.GilroySemiBold};
  font-size: 14px;
`;

export const DetailValue = styled.span`
  font-family: ${Fonts.GilroyRegular};
  font-size: 14px;
`;
