import styled from 'styled-components';
import { Fonts, Colors, ColorScheme } from 'styles/constants';
export { ActivityIndicator, Button, Center } from 'styles/components';
export {
  PackageIcon,
  CogIcon,
  TogglerOpenIcon,
  TogglerCloseIcon,
  BarChartIcon,
} from 'styles/components/icons';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-family: ${Fonts.GilroySemiBold};
  margin-bottom: 20px;

  div.wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;
export const SubHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-family: ${Fonts.GilroyBold};
  margin-bottom: 24px;
`;

export const ClickWrapper = styled.div`
  padding: 15px;
  background-color: ${Colors.White};
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 10px 10px rgb(0 0 0 / 10%);
  }
`;

export const GraphWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 48px;
`;
export const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 5px;
  background-color: ${Colors.White};
  font-family: ${Fonts.GilroySemiBold};
  font-size: 16px;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.16);
`;

interface IBar {
  height: string;
  percent: number;
  colort?: string;
}

export const BarPercent = styled.div<IBar>`
  width: 100%;
  height: ${(props) => props.height}px;
  border-radius: 6px;
  background: rgb(245, 245, 245);
  position: relative;
  &:after {
    content: '';
    position: absolute;
    width: ${(props) => props.percent}%;
    max-width: 100%;
    bottom: 0;
    height: ${(props) => props.height}px;
    border-radius: 6px;
    background: ${(props) => (props.color === 'y' ? '#FF636B' : '#0281B9')};
  }
  strong {
    z-index: 1;
    position: absolute;
    top: 3px;
    left: ${(props) => (props.percent > 10 ? props.percent - 10 : 0)}%;
    font-weight: bold;
    color: #fff;
    font-size: 10px;
  }
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
`;
export const FilterInput = styled.input`
  border: 1px solid ${Colors.Gray50};
  padding: 15px;
  border-radius: 5px;
  min-width: 200px;
  max-height: 50px;
  font-family: ${Fonts.GilroyRegular};
`;
export const FilterSelect = styled.select`
  border: 1px solid ${Colors.Gray50};
  padding: 15px;
  border-radius: 5px;
  min-width: 200px;
  max-height: 50px;
  font-family: ${Fonts.GilroyRegular};
`;
