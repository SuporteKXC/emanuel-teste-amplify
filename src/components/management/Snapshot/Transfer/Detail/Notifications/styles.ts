import styled from "styled-components";
import { Colors, Fonts } from "styles/constants";
import { EditAltIcon } from "styles/components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
`;

export const Content = styled(Container)`
  gap: 0;
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${Fonts.OpenSans};
  font-size: 12px;
  padding: 24px 0;
  color: ${Colors.Black};
  width: inherit;
  border-bottom: 1px dashed #96969a;
`;

export const Next = styled(Item)`
  font-weight: 600;
  color: ${Colors.Blue30};
  padding: 16px 0;
  margin: 0 24px;
  width: inherit;

  span {
    display: inherit;
    align-items: inherit;
    flex-direction: row;
    gap: 3px;
    white-space: nowrap;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  background: ${Colors.White};
  padding: 0 22px;

  ${Item}:last-child {
    border-bottom: none;
  }
`;

export const Title = styled.div`
  display: flex;
  font-family: ${Fonts.GilroyBold};
  font-size: 16px;
  color: ${Colors.Black};
  text-transform: uppercase;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

export const ContentInfo = styled.div`
  display: flex;
  gap: 5px;
  white-space: nowrap;
  p {
    font-weight: 600;
  }
`;

export const EditIcon = styled(EditAltIcon)`
  width: 16px;
  height: 16px;
  color: ${Colors.White};
`;

export const EditButton = styled.button`
  display: flex;
  flex-direction: row;
  width: 90px;
  align-items: center;
  font-family: ${Fonts.GilroyBold};
  font-size: 12px;
  padding: 8px 12px;
  justify-content: center;
  border-radius: 6px;
  height: 31px;
  gap: 8px;
  background: ${Colors.Blue30};
  color: ${Colors.White};
  transition: transform 0.2s;

  :hover {
    transform: scale(1.05);
  }
  :active {
    transform: scale(1);
  }
`;

