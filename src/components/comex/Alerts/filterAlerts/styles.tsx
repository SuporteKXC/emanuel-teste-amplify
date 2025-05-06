import styled from 'styled-components'
import { Colors, ColorScheme, Fonts } from 'styles/constants'
export {
  AlertTriangleIcon,
  TogglerOpenIcon,
  TogglerCloseIcon
} from 'styles/components/icons'
export {
  ActivityIndicator,
  Button,
} from 'styles/components'


export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 10px;
  width: 100%;
  margin:10px;
`;

export const GridContainerMultiSelect = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 3fr;
  column-gap: 10px;
  width: 100%;
  margin:10px;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin-left: auto;
    width:max-content;
`
export const Filter = styled.div`
    display:flex;
    padding:15px;
    flex-direction: row;
    align-items:center;
    flex-wrap: wrap;
    border-radius: 5px;
    background-color:${Colors.White};
    animation: ContentSlideIn 500ms ease forwards;
    box-shadow: 1px 10px 10px rgb(0 0 0 / 10%);
    border-left:10px solid ${Colors.DarkBlue};
    margin-top: 30px;
    margin-bottom: 20px;
`
export const FilterInput = styled.input`
  font-family: ${Fonts.OpenSans};
  font-size: 14px;
  color: ${ColorScheme.Text};
  background-color: #fff;
  padding: 16px;
  border: 1px solid #c9c9c9;
  border-radius: 4px;
  max-height: 50px;
  width: 100%;
`
export const FilterSelect = styled.select`
    border:1px solid ${Colors.Gray50};
    padding:15px;
    border-radius:5px;
    min-width:200px;
    max-height:50px;
    font-family:${Fonts.GilroyRegular};
    margin-right: 25px;
`

export const FilterOption = styled.option`
  min-height: 20px;
`

export const CheckboxContainer = styled.div`
  display: flex;

`
