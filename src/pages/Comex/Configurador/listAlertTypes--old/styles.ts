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

import Select from "react-select";

const gridTemplates = (buttonsQty: number) => css`
  grid-template-columns: 0.5fr repeat(2, 1fr) ${buttonsQty ? css`repeat(${buttonsQty}, 24px)`: ""};
  column-gap: 16px;
`;

export const customStyles = {
  primary: {
    option: (provided: any) => {
      return {
        ...provided,
        paddingTop: 8,
        paddingBotton: 8,
        paddingLeft: 16,
        paddingRight: 16,
        cursor: "pointer",
      };
    },
    control: () => ({
      border: "1px solid #DEDEDE",
      display: "flex",
      fontFamily: Fonts.GilroyRegular,
      backgroundColor: "white",
      padding: "6px 10px",
      borderRadius: "5px",
    }),
    menuList: (provided: any) => ({
      ...provided,
      padding: 0,
      background: "inherit",
      borderColor: Colors.Gray50,
      borderRadius: "6px",
      "::-webkit-scrollbar": {
        "-webkit-appearance": "none",
      },
      "::-webkit-scrollbar:vertical": {
        width: "8px",
      },
      "::-webkit-scrollbar:horizontal": {
        height: "8px",
      },
      "::-webkit-scrollbar-thumb": {
        borderRadius: "6px",
        border: `2px solid ${Colors.White}`,
        backgroundColor: Colors.Gray50,
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: Colors.White,
      },
    })
  }
}

export const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
`

export const SelectInput = styled(Select)`
  min-width: 21rem;
  max-width: 21rem;

  div {
    font-family: ${Fonts.GilroyRegular};
    font-size: 16px;
  }
`

interface IGridProps {
  buttonsQty: number;
}

export const PageHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  justify-items: center;
  margin-bottom: 15px;
  align-items: center;
  font-size: 24px;  
  
  div.wrapper {
    display: flex;
    align-items: center;
    justify-self: baseline;
    gap: 8px;
    font-family: ${Fonts.GilroySemiBold};
  }
`
export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width:max-content;
`
interface IButtons {
    tag?: string;
  }
  
export const Buttons = styled.button<IButtons>`
    display: flex;
    width: 100%;
    padding: 8px 16px;
    border-radius: 6px;
    background-color: ${ColorScheme.Secondary};
    font-family: ${Fonts.GilroySemiBold};
    color: ${Colors.White};
`

interface IIconButton {
  tag?: string;
}
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
`

export const Ghost = styled.div`
  width:100%;
  background:transparent
`