import { Input } from 'components/shared';
import { InputJust } from 'components/shared/Forms/InputJust';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BaseButtonStyle } from 'styles/components';
import { Colors, ColorScheme, Fonts } from 'styles/constants';
export {
  ActivityIndicator,
  Button,
  FormActions,
  FormRow,
} from 'styles/components';

export {
  TrashIcon,
} from 'styles/components/icons';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
  padding:10px;
  width: 100%;
  margin:10px;
`;

export const CheckContainer = styled.div`
  grid-area: 4 / 1 / 5 / 3;
  `

export const Ghost = styled.div`
  width:100%;
  background:transparent;
`

export const DivContainerSecond = styled.div`
  margin: 10px;
  padding: 10px;
`

export const FieldLabel = styled.label`
  display: block;
  font-family: ${Fonts.GilroySemiBold};
  font-size: 14px;
  color: ${ColorScheme.Text};
  margin-bottom: 8px;
  & {
    @media (max-width: 950px) {
      font-size: 0.74rem;
    }
  }
`;

export const ContainerEmail = styled.div`
  background-color: #ffffff;
  padding: 20px 20px 0 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 24px;
`

export const InputWrapper = styled.div`
height: 80px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export const ContainerSecondaryEmail = styled.div`
  background-color: #ffffff;
  min-height: 20px;
  margin-top: 5px;
  border-radius: 5px;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr 1fr 0.5fr;
  align-items: center;
  //justify-content: space-around;
  gap: 10px;
  padding: 12px 16px;
  

`

export const HeaderEmail = styled.p`
  font-size: 12px;
  font-family: ${Fonts.GilroySemiBold};
  color: ${ColorScheme.Text};
  justify-self: flex-start;
  
`

export const TextEmail = styled.p`
   font-size: 11px;
  font-weight: 600;
  font-family: ${Fonts.GilroySemiBold};
  color: ${ColorScheme.Text};
  justify-self: flex-start;
  text-transform: uppercase;
`

export const ContainerInput = styled.div`
  height: 120px;
  display: flex;
  align-items: flex-start;

  .datePicker {
    margin-top: 25px;
  }

  .react-datepicker-wrapper {
    height: 50px;
  }

  .field-container {
   // height: 75px;
    margin-bottom: 0 !important;
    display: flex;
   justify-content: center;

    label {
      //margin-bottom: 0 !important;
    }
  }

  button[type="submit"] {
    height: 50px !important;
    margin-top: 25px;
  }

`

export const InputText = styled(InputJust)`
  width: 70%;
  
`

interface IIconButton {
  tag?: string;
}

export const IconButton = styled.div<IIconButton>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  justify-self: center;
  cursor: pointer;

  svg {
    path {
      fill: ${({ tag }) =>
        tag === 'delete' ? ColorScheme.Danger : ColorScheme.Text};
    }
  }
`;
interface IGridProps {
  buttonsQty?: number;
}

export const GridHeader = styled.div<IGridProps>`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr 1fr 0.5fr;
  font-family: ${Fonts.GilroySemiBold};
  font-size: 12px;
  text-transform: uppercase;
  height: max-content;
  align-items: center;
  padding: 4px 16px;
  margin-bottom: 10px;
  margin-top: 25px;
`;

export const CheckBoxGroupContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`
export const CheckBoxGroupContainerN = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

export const CheckBoxGroupContainerT = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
export const Title = styled.h1`
  font-size: 25px;
  height: 60px;
`;

export const InputFilter = styled.input`
padding: 8px;
border-radius: 8px;
border: 2px solid ${Colors.Gray30};
margin: 10px;
`