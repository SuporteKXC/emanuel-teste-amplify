import styled, { css } from 'styled-components'
import { Colors, ColorScheme, Fonts } from 'styles/constants'
export {
  Button,
  ActivityIndicator
} from 'styles/components'

export {
  ListCircleIcon,
  TogglerOpenIcon,
  TogglerCloseIcon,
} from 'styles/components/icons';

const gridTemplates = css`
  grid-template-columns: 1fr 3.5fr 0.5fr;
  column-gap: 16px;
`;

export const PageHeader = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    font-size: 24px;
    font-family: ${Fonts.GilroySemiBold};
    gap: 16px;
    
    div.wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
    }
`

export const PageMain = styled.main`
    padding: 15px;
`

export const GridHeader = styled.div`
    display: grid;
    ${gridTemplates};
    font-family: ${Fonts.GilroySemiBold};
    font-size: 12px;
    text-transform: uppercase;
    height: max-content;
    align-items: center;
    padding: 4px 16px;
    margin-bottom: 10px;
    
    div:last-child {
      justify-self: center;
    }
`

export const GridContainer = styled.div`
    height: max-content;
    display: flex;
    flex-direction: column;
`

export const ItemWrapper = styled.div`
    display: grid;
    ${gridTemplates};
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
    transition: .2s;
    cursor: pointer;
    
    &:hover{
        box-shadow: 1px 10px 10px rgb(0 0 0 / 10%);
    }
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