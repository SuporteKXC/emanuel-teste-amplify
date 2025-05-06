import styled from "styled-components";
import { Colors, ColorScheme, Fonts } from "styles/constants";
import { MonitorOutline } from "@styled-icons/evaicons-outline/MonitorOutline";
export {
  BoxIcon,
  CogIcon,
  TogglerOpenIcon,
  TogglerCloseIcon,
  DaysIcon,
} from "styles/components/icons";

export { Button, ActivityIndicator } from "styles/components";

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
  grid-template-columns: 1fr 1.58fr;
  padding: 15px 30px;
  align-items: center;
  font-size: 12px;
  font-family: ${Fonts.GilroySemiBold};
  text-transform: uppercase;
  background-color: ${Colors.Gray20};
`;

export const ListContainer = styled.div`
  background: ${Colors.White};
  border-radius: 6px;
  /* background: red; */
  padding: 24px;
  margin-bottom: 16px;
  border-left: 10px solid #1abc9c;
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: minmax(7rem, 1fr);
  align-items: center;
  column-gap: 16px;
  align-items: center;

  div.container {
    padding-right: 10px;
  }

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
  grid-template-columns: 1fr 5fr;
  align-items: center;
  padding-left: 10px;
  border-left: 1px solid #8b8d97;
  border-right: 1px solid #8b8d97;
  padding-left: 16px;
`;

export const ListLinks = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  gap: 10px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const ListItens = styled.a`
  width: 100%;
  font-size: 14px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-direction: column;
  color: ${ColorScheme.Text};
  font-family: ${Fonts.GilroySemiBold};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  
`;

interface IGrActualDate {
  isDelivered: boolean;
}

export const GrActualDate = styled.span<IGrActualDate>`
  color: ${(props) => props.isDelivered ? Colors.Blue : Colors.Green};
`

export const ListWrapper = styled.div`
  width: 40vw;
  display: grid;
  border-right: 1px solid #8b8d97;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 14px;
  flex-wrap: wrap;
  gap: 40px;
  text-decoration: none;
  color: ${ColorScheme.Text};
  font-family: ${Fonts.GilroySemiBold};
  span.wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const ListTotals = styled.div`
  display: grid;
  grid-gap: 2rem;
  text-align: center;
  justify-content: center;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  color: ${ColorScheme.Text};
  font-size: 14px;
  font-family: ${Fonts.GilroySemiBold};
  @media (max-width: 1250px) {
    grid-template-columns: 1fr;
    grid-gap: 4rem;
  }
`;

export const Total = styled.div`
  div.wrapper {
    display: flex;
    margin-top: 0.5rem;
    align-items: center;
    text-align: center;
    gap: 8px;
  }
`;

export const TotalReceived = styled.div`
  div.wrapper {
    display: flex;
    margin-top: 0.5rem;
    align-items: center;
    text-align: center;
    gap: 8px;
  }
`;

export const TotalToReceive = styled.div`
  div.wrapper {
    display: flex;
    margin-top: 0.5rem;
    align-items: center;
    text-align: center;
    gap: 8px;
  }
`;
