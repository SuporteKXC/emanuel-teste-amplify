import { DotsIcon } from "styles/components";
import { Colors, Fonts } from "styles/constants";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const DropButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
`;

export const Dropicon = styled(DotsIcon)`
  color: ${Colors.Gray70};
`;

export const Menu = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  right: 2px;
  top: 40px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  min-width: max-content;
  background-color: ${Colors.Gray70};
  border-radius: 4px;
  transform-origin: top right;
  animation: initMenu 0.3s;
  
  @keyframes initMenu {
    from { transform: scale(0.4);}
    to { transform: scale(1);}
  }
`;

export const Triangle = styled.div`
  width: 12px;
  height: 12px;
  position: absolute;
  background-color: ${Colors.Gray70};
  top: -3px;
  right: 4px;
  transform: rotate(45deg);
`

export const Option = styled.button`
  display: flex;
  align-items: center;
  min-width: 126px;
  font-family: ${Fonts.GilroySemiBold};
  transition: background 0.2s;
  padding: 16px;
  height: 43px;
  border-radius: 4px;
  text-align: start;
  font-size: 12px;
  z-index: 1;
  color: ${Colors.White};
  :hover {
    background: ${Colors.Gray60};
  }
`;
