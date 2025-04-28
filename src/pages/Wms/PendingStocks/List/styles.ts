import styled from 'styled-components';
import { ChevronRightCircle } from '@styled-icons/boxicons-solid';
import { fonts, Colors } from 'styles';

export const Container = styled.section`
  width: 100%;
  margin: 0 auto;
  margin-top: 16px;
  padding: 8px;
  border-radius: 12px;
  background-color: white;
`;

export const Separator= styled.div`
width: 100%;
    height: 1px;
    background: rgba(128, 128, 128, 0.5);
    border-radius: 50%;
    margin: 16px 0px;

`

export const Header = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 30px 1fr 60px 1fr 0.5fr 0.5fr 0.5fr 0.5fr 25px 0.5fr 0.5fr 1fr 1fr;
  column-gap: 16px;
  column-gap: 16px;
  margin-bottom: 16px;
  padding: 0 16px;
`;

export const Label = styled.span`
  font-family: ${fonts.GilroyBold};
  font-size: 12px;
  text-transform: uppercase;
  color: ${Colors.Gray40};
`;

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
`;

export const ItemContent = styled.a`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 30px 1fr 60px 1fr 0.5fr 0.5fr 0.5fr 0.5fr 25px 0.5fr 0.5fr 1fr 1fr;
  column-gap: 16px;
  background-color: ${Colors.White};
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: 200ms ease;

  :hover {
    transform: scale(1.01);
  }
`;

export const ItemValue = styled.span`
  font-family: ${fonts.GilroySemiBold};
  font-size: 12px;
  text-transform: uppercase;
  color: ${Colors.Gray50};
`;

export const IconDetail = styled(ChevronRightCircle).attrs({ size: 20 })`
  color: ${Colors.Gray40};
`;

export const ButtonDetail = styled.button.attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  justify-content: center;
`;
