import styled, { css } from "styled-components";
import { Colors, Fonts } from "styles/constants";
import { ActivityIndicator, FilterIcon } from "styles/components";
import { EditIcon as Edit } from "styles/components/icons";

const gridTemplate = css`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 2.3fr 2.3fr 1.5fr 1.5fr 1.8fr auto;
  gap: 10px;
`;

export const Loading = styled(ActivityIndicator)`
  width: 20px;
  height: 20px;
`;

export const EditIcon = styled(Edit)`
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

export const Filter = styled(FilterIcon)`
  color: transparent;
  stroke: ${Colors.Gray70};
  stroke-width: 1pt;
  transition: color 100ms;
  &:hover {
    color: ${Colors.Gray70};
  }
`;

export const ItemHeader = styled.div`
  ${gridTemplate}
  span:last-child {
    width: 24px;
  }
  span {
    text-transform: uppercase;
  }
  font-size: 12px;
  font-family: ${Fonts.GilroyBold};
  color: ${Colors.Gray70};
  padding-bottom: 16px;
  border-bottom: 1px solid ${Colors.Gray20};
`;

export const Item = styled.div`
  ${gridTemplate}
  padding: 8px 0;
  background-color: ${Colors.White};
  border-radius: 6px;
  align-items: center;
  font-size: 13px;
  font-family: ${Fonts.OpenSans};

  button {
    display: flex;
    align-items: inherit; 
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 18px;
  background: ${Colors.White};
  border-radius: 6px;
  gap: 10px;
  color: ${Colors.Gray70};

  ${Item}:last-child {
    padding-bottom: 0;
  }
`;
