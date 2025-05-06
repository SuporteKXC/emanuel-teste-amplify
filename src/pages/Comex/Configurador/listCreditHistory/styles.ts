import styled, { css } from 'styled-components'
import { Colors, ColorScheme, Fonts } from 'styles/constants'
export {
  ActivityIndicator,
  Button
} from 'styles/components';
export {
  MoneyCheckIcon,
  EditIcon,
  TrashIcon,
  TogglerOpenIcon,
  TogglerCloseIcon,
} from 'styles/components/icons';

const gridTemplates = css`
  grid-template-columns: 1fr 1fr 1fr 0.5fr 30px;
  column-gap: 16px;
`;

export const PageHeader = styled.header`
    display:flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-bottom: 15px;
    font-size: 24px;
    font-family: ${Fonts.GilroySemiBold};
    
`
export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin-left: auto;
    width: max-content;
`
interface IButtons {
    tag?: string;
  }
  
export const Buttons = styled.button<IButtons>`
    padding: 8px;
    background-color: ${props=> props.tag !== 'delete' ? ColorScheme.Secondary : ColorScheme.Danger };
    font-family: ${Fonts.GilroyRegular};
    width:90%;
    color: ${Colors.White};
    border-radius: 5px;
    margin-left:10px;
`

export const GridHeader = styled.div`
    display: grid;
    ${gridTemplates}
    font-family: ${Fonts.GilroySemiBold};
    font-size: 12px;
    height: max-content;
    text-transform: uppercase;
    align-items: center;
    padding: 4px 16px;
    margin-bottom: 10px;
`
export const GridContainer = styled.div`
    height: max-content;
    align-items: center;
`
export const ItemWrapper = styled.div`
    display: grid;
    ${gridTemplates}
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
`

export const Item = styled.p`
    
`

export const Ghost = styled.div`
  width:100%;
  background:transparent
`

export const ClickWrapper = styled.div`
padding: 14px;
    background-color: #FFFFFF;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    display: flex; 
    align-items: center;
    gap: 8px;
  &:hover {
    box-shadow: 1px 10px 10px rgb(0 0 0 / 10%);
  }
`;
