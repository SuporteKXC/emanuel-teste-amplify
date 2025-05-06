import { RefObject } from "react";
import { Loader } from "@styled-icons/boxicons-regular";
import styled from "styled-components";
import { Colors, Fonts } from "styles/constants";
export {
  ChevronDownIcon,
  EndFenceIcon,
  AlertTriangleSolidIcon as Alert,
} from "styles/components";

interface ListProps {
  isOpen?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  font-family: ${Fonts.OpenSans};
  font-size: 12px;
  color: ${Colors.Black};
`;

export const Content = styled.div`
  display: flex;
  width: inherit;
  flex-direction: inherit;
  align-items: flex-start;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-family: ${Fonts.GilroyBold};
  font-size: 16px;
  color: ${Colors.Black};
  text-transform: uppercase;
`;

export const Item = styled.button`
  display: flex;
  width: inherit;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  font-family: inherit;
  font-size: inherit;
  background: ${Colors.White};
  padding: 16px;
  transition: transform 0.1s;
  z-index: 3;

  :hover {
    transform: scale(1.005);
  }

  :active {
    transform: scale(1);
  }

  :disabled {
    opacity: 0.5;
  }
`;

export const ComplaintInfo = styled.div`
  display: inherit;
  flex-direction: row;
  gap: 24px;

  p {
    font-weight: 600;
  }
`;

export const Info = styled.div`
  display: inherit;
  flex-direction: inherit;
  white-space: nowrap;
  gap: 3px;
`;

export const Open = styled.div<{ isOpen?: boolean }>`
  display: inherit;
  align-items: center;
  justify-content: center;
  transform: ${({ isOpen }) => (isOpen ? `rotate(0deg)` : `rotate(-90deg)`)};
`;

export const Row = styled.div`
  display: inherit;
  padding: 16px 0;
  border-bottom: 1px dashed ${Colors.Gray50};
`;

export const List = styled.div<ListProps>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: inherit;
  overflow: hidden;
  margin-top: -6px;
  padding: 6px 24px;
  width: inherit;
  background: ${Colors.Gray30};
  transition: height 0.5s;

  ${Row}:nth-last-child(-n + 2) {
    border-bottom: none;
    padding: 24px 0;
  }
`;

export const Detail = styled.div`
  display: inherit;
  max-width: 60%;
  word-break: break-word;
`;

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  width: 157px;
  align-items: center;
  font-family: ${Fonts.GilroyBold};
  font-size: 12px;
  padding: 8px 16px;
  justify-content: center;
  border-radius: 6px;
  height: 33px;
  gap: 9px;
  background: ${Colors.Blue30};
  color: ${Colors.White};
  transition: transform 0.2s;

  :hover {
    transform: scale(1.03);
  }
  :active {
    transform: scale(1);
  }
  &:disabled {
    opacity: 0.5;
  }
`;

interface IndicatorProps {
  color?: string;
  size?: number;
}

export const ActivityIndicator = styled(Loader).attrs((props: IndicatorProps) => ({
  size: props.size || 24,
  color: props.color || 'currentColor',
}))`
  animation: Rotate 2s infinite linear;
`;
