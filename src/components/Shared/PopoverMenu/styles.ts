import styled from "styled-components";
import { PopoverTriangleIcon } from "styles/components";
import { Fonts, ColorScheme, Colors } from "styles/constants";

interface IAnimatedContainer {
  marginTop: Number;
  animation: any;
}

export const Container = styled.div`
`;

export const ChildrenContainer = styled.div.attrs({
  className: "children-container",
})`
  width: max-content;
  position: relative;
`;

export const AnimatedContainer = styled.div.attrs({
  className: "animated-container",
})<IAnimatedContainer>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: ${({ marginTop }) => `${marginTop}px`};
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  margin-top: 3px;
`;

export const Triangle = styled(PopoverTriangleIcon)`
  position: absolute;
  top: -10px;
`;

export const PopoverMenuContainer = styled.div.attrs({
  className: "popover-menu-container",
})`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: max-content;
  padding: 24px 20px;
  padding-left: 28px;
  border-radius: 4px;

  max-height: 480px;
  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #41414144;
    border-radius: 3px;
  }
`;

export const MenuOption = styled.div.attrs({
  className: "popover-menu-option",
})`
  font-family: ${Fonts.GilroySemiBold};
  font-size: 14px;
  color: ${ColorScheme.Text};
  padding: 8px 0;
  transition: color ease 300ms;
  cursor: pointer;
  flex: 1;

  &:hover {
    color: ${ColorScheme.Primary};
  }
  &:not(:last-child) {
    border-bottom: 1px ${Colors.Gray30} solid;
  }
`;
