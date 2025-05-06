import styled, { css } from 'styled-components';
import { Colors, ColorScheme, Fonts } from 'styles/constants';
export {
  AlertTriangleIcon,
  TogglerOpenIcon,
  TogglerCloseIcon,
} from 'styles/components/icons';
export { ActivityIndicator, Button } from 'styles/components';
import { Button } from 'styles/components';

const gridTemplate = css`
  grid-template-columns: 1fr 1.5fr 1.5fr 2fr 1fr 0.5fr 2fr 1.5fr;
  column-gap: 16px;
`;

export const ReadButton = styled(Button)`
  font-size: 12px;
  padding: 8px 16px;
  height: auto;
`;

export const PageHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 15px;
  font-size: 24px;
  font-family: ${Fonts.GilroySemiBold};
`;

export const ClickWrapper = styled.div`
  padding: 15px;
  background-color: ${Colors.White};
  border-radius: 5px;
  margin-left: auto;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 10px 10px rgb(0 0 0 / 10%);
  }
`;

export const PageMain = styled.main`
  padding: 15px;
`;

export const AlertStates = styled.div`
  display: flex;
  font-size: 14px;
  font-family: ${Fonts.GilroyBold};
  padding: 15px;

  strong {
    &:nth-child(2) {
      color: ${ColorScheme.Alert};
    }
    &:last-child {
      color: ${ColorScheme.Secondary};
    }
  }

  & > * {
    margin-right: 20px;
  }
`;

export const GridHeader = styled.div`
  display: grid;
  height: max-content;
  align-items: center;
  padding: 0px 5px 0px 5px;
  margin-bottom: 10px;
  ${gridTemplate};

  font-family: ${Fonts.GilroySemiBold};
  font-size: 12px;
  text-transform: uppercase;
  color: ${Colors.Gray70};
`;

export const GridContainer = styled.div`
  height: max-content;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  margin-bottom: 5px;
  font-size: 13px;
`;

export const ItemWrapper = styled.div`
  display: grid;
  ${gridTemplate};
  align-items: center;
  border-radius: 6px;
  padding: 16px;
  background-color: ${Colors.White};
  height: auto;
  transition: 300ms ease;
  cursor: pointer;

  &:hover {
    box-shadow: 1px 5px 10px rgb(0 0 0 / 5%);
  }
`;

export const Item = styled.p`
  font-family: ${Fonts.OpenSans};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${ColorScheme.Text};
`;

export const Ghost = styled.div`
  width: 100%;
  background: transparent;
`;
