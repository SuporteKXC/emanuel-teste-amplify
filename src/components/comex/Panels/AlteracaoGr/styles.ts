import styled, { css } from 'styled-components';
import { Colors, ColorScheme, Fonts } from 'styles/constants';
import { MonitorOutline } from '@styled-icons/evaicons-outline/MonitorOutline';
export {
  BoxIcon,
  CogIcon,
  TogglerOpenIcon,
  TogglerCloseIcon,
  DaysIcon,
} from 'styles/components/icons';

export { Button, ActivityIndicator } from 'styles/components';

const gridTemplate = css`
  grid-template-columns: 240px repeat(5, 1.5fr) 1fr;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 15px 0;
  font-size: 24px;
  font-family: ${Fonts.GilroySemiBold};

  div.wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const IconMonitor = styled(MonitorOutline)`
  height: 30px;
  width: 30px;
`;

export const ClickWrapper = styled.div`
  padding: 10px 26px;
  height: 46px;
  width: 86px;
  background-color: ${Colors.White};
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 10px 10px rgb(0 0 0 / 10%);
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-left: auto;
  width: max-content;
`;
export const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const GridHeader = styled.div`
  position: sticky;
  top: 0;
  display: grid;
  padding: 15px 30px;
  align-items: center;
  font-size: 12px;
  font-family: ${Fonts.GilroySemiBold};
  text-transform: uppercase;
  background-color: ${Colors.Gray20};
  ${gridTemplate};
`;

export const ListContainer = styled.div`
  background: ${Colors.White};
  border-radius: 6px;
  padding: 24px;
  margin-bottom: 16px;
  border-left: 10px solid #1abc9c;
  display: grid;
  grid-template-columns: 200px 7.5fr;
  column-gap: 16px;
  align-items: center;

  p.empresa {
    font-family: ${Fonts.GilroyBold};
    font-size: 11px;
    text-transform: uppercase;
    color: ${Colors.Orange};
    margin-bottom: 4px;
  }
  .codigo {
    font-family: ${Fonts.GilroyBold};
    font-size: 13px;
    text-transform: uppercase;
    color: ${Colors.Gray60};
    margin-bottom: 4px;
  }
  .name {
    font-family: ${Fonts.GilroySemiBold};
    font-size: 13px;
    text-transform: uppercase;
    word-break: break-all;
    color: ${ColorScheme.Text};
  }
`;

export const ListInfo = styled.div`
  display: grid;
  grid-template-columns: 7fr 1fr;
  align-items: center;
  padding-left: 5px;
  border-left: 1px solid #8b8d97;
  padding-left: 16px;
`;

export const ListLinks = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const ListItens = styled.a`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  font-size: 13px;
  text-decoration: none;
  color: ${ColorScheme.Text};
  font-family: ${Fonts.GilroySemiBold};
  transition: 300ms ease;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  p.blue {
    color: ${Colors.Blue};
  }
  p.red {
    color: ${Colors.Magenta};
  }
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  span.wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;
export const Total = styled.div`
  display: flex;
  justify-self: center;
  flex-direction: column;
  font-size: 14px;
  text-decoration: none;
  color: ${ColorScheme.Text};
  font-family: ${Fonts.GilroySemiBold};
`;
