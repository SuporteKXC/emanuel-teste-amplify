import styled from 'styled-components';
import { fonts, Colors } from 'styles';
import { Loading } from 'styles/styled-components';

interface ButtonProps {
  active: boolean;
}

export const Container = styled.div`
  width: 100%;
  padding: 32px 0;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 16px;
`;

export const Button = styled.button<ButtonProps>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border-radius: 4px;
  transition: 300ms ease;
  border: 1px transparent solid;
  border-radius: 4px;
  margin-right: 4px;
  font-family: ${fonts.GilroySemiBold};
  color: ${({ active }) => (active ? '#fff' : Colors.Gray100)};
  background-color: ${({ active }) => (active ? Colors.Gray30 : Colors.Gray10)};

  &:hover {
    background-color: ${Colors.Gray30};
    color: #fff;
  }

  &:last-child {
    margin-right: 0;
  }
  &.aux-page {
    width: auto;
    padding: 0 8px;
  }
`;

export const PageLoading = styled(Loading).attrs({ size: 20 })`
  margin-left: 8px;
`;

export const Description = styled.p`
  font-size: 14px;
  font-family: ${fonts.GilroySemiBold};
  color: ${Colors.Gray30};
`;
