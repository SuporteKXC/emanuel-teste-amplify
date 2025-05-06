import styled, { css } from 'styled-components'
import { Colors, ColorScheme, Fonts } from 'styles/constants'
export {
  ActivityIndicator,
} from 'styles/components';
export {
  ExclamationTriangleFillIcon,
  EditIcon,
  TrashIcon,
} from 'styles/components/icons';

interface IIconButton {
  tag?: string;
}

interface IButtons {
  tag?: string;
}

const gridTemplates = (buttonsQty: number) => css`
  grid-template-columns: repeat(4, 1fr) ${buttonsQty ? css`repeat(${buttonsQty}, 24px)`: ""};
  column-gap: 16px;
`;
 

interface IGridProps {
  buttonsQty: number;
}

export const PageHeader = styled.header`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 15px 0px;
  align-items: center;
  font-size: 24px;
  font-family: ${Fonts.GilroySemiBold};  
  
  div.wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}
`
export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const ButtonItem = styled.div`
  display: flex;
  margin: 0px 15px;
  width: 200px;
  height: 42px;
`

export const Buttons = styled.button<IButtons>`
  display: flex;
  padding: 8px;
  border-radius: 6px;
  font-size: 16px;
  background-color: ${ColorScheme.Secondary};
  font-family: ${Fonts.GilroySemiBold};
  color: ${Colors.White};
 
`

export const IconButton = styled.button<IIconButton>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  svg {
    path {
      fill: ${({ tag }) =>
        tag === 'delete' ? ColorScheme.Danger : ColorScheme.Text};
    }
  }
`;

export const GridHeader = styled.div<IGridProps>`
  display: grid;
  ${({ buttonsQty }) => gridTemplates(buttonsQty)};
  font-family: ${Fonts.GilroySemiBold};
  font-size: 12px;
  text-transform: uppercase;
  height: max-content;
  align-items: center;
  padding: 4px 16px;
  margin-bottom: 10px;
`
export const GridContainer = styled.div`
  height: max-content;
  align-items: center;
`
export const ItemWrapper = styled.div<IGridProps>`
  display: grid;
  ${({ buttonsQty }) => gridTemplates(buttonsQty)};
  height: fit-content;
  align-items: center;
  margin-bottom: 8px;
  padding: 12px 16px;
  border-radius: 5px;
  font-family: ${Fonts.OpenSans};
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${Colors.White};
  
  :hover {
    transform: scale(1.01);
  }
`