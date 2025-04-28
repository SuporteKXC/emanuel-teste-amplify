import styled from 'styled-components';
import { Trash } from '@styled-icons/boxicons-regular';
import { fonts, Colors } from 'styles';
export { Loading } from 'styles/styled-components';

export const Container = styled.section`
  width: 100%;
  margin: 0 auto 32px auto;
`;

export const Header = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 60px 140px 160px 160px auto 32px;
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
  grid-template-columns: 60px 140px 160px 160px auto 32px;
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

export const IconTrash = styled(Trash).attrs({ size: 20 })`
  color: ${Colors.Red};
`;

export const ButtonTrash = styled.button.attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  justify-content: center;
`;
