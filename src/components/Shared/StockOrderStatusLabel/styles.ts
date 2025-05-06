import type { StockOrderStatus } from 'contracts/StockOrders';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import {
  Colors,
  ColorScheme,
  Fonts,
  StockOrderStatusColor,
} from 'styles/constants';

interface IStatus {
  status?: StockOrderStatus;
}

const applyStatusColor = (
  status?: StockOrderStatus
): FlattenSimpleInterpolation => {
  switch (status) {
    case 'cancelado':
      return css`
        background: ${StockOrderStatusColor.Cancelado};
      `;
    case 'finalizado':
      return css`
        background: ${StockOrderStatusColor.Finalizado};
      `;
    case 'contagem':
      return css`
        background: ${StockOrderStatusColor.Contagem};
      `;
    case 'separacao':
      return css`
        background: ${StockOrderStatusColor.Separacao};
        color: ${ColorScheme.Text};
      `;
    case 'pendente':
    default:
      return css`
        background: ${StockOrderStatusColor.Pendente};
      `;
  }
};

export const Container = styled.label<IStatus>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  font-family: ${Fonts.GilroyBold};
  font-size: 14px;
  border-radius: 4px;
  color: ${Colors.White};
  background-color: ${StockOrderStatusColor.Pendente};
  text-transform: capitalize;
  text-align: center;
  ${({ status }) => applyStatusColor(status)}
`;
