import styled from "styled-components";
import { Colors, ColorScheme, Fonts } from "styles/constants";
export {
  AlertTriangleIcon,
  TogglerOpenIcon,
  TogglerCloseIcon,
} from "styles/components/icons";
export { ActivityIndicator, Button } from "styles/components";


type GridContainerProps = {
  gridReapt?: number
}

export const GridContainer = styled.div<GridContainerProps>`
  display: grid;
  grid-template-columns: repeat(${({gridReapt}) => gridReapt ? gridReapt : 3}, minmax(0, 33%));
  width: 100%;
  column-gap: 10px;
  margin: 10px;
`;

export const GridContainerMultiSelect = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 0.5fr));
  column-gap: 10px;
  width: 100%;
  margin: 10px;
`;

export const GridContainerDate = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  column-gap: 10px;
  width: 100%;
  margin: 10px;
  & {
    @media (max-width: 1320px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
`;

export const GridContainerText = styled.div`
  display: grid;
  grid-template-columns:
    minmax(0, 25%) minmax(0, 10%)
    repeat(2, minmax(0, 25%)) minmax(0, 15%);
  column-gap: 10px;
  width: 100%;
  margin: 10px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-left: auto;
  width: max-content;
`;
export const Filter = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  border-radius: 5px;
  background-color: ${Colors.White};
  animation: ContentSlideIn 500ms ease forwards;
  box-shadow: 1px 10px 10px rgb(0 0 0 / 10%);
  border-left: 10px solid ${Colors.DarkBlue};
  margin-bottom: 20px;
  margin-left: 1%;
`;
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
`;
export const FilterSelect = styled.select`
  border: 1px solid ${Colors.Gray50};
  padding: 15px;
  border-radius: 5px;
  min-width: 200px;
  max-height: 50px;
  font-family: ${Fonts.GilroyRegular};
  margin-right: 25px;
`;

export const FilterOption = styled.option`
  min-height: 20px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
`;
