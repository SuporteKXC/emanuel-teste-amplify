import { Loader, X } from "@styled-icons/boxicons-regular";
import styled from "styled-components";
import { XIcon } from "styles/components";
import { Colors, Fonts } from "styles/constants";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    color: ${Colors.Gray70};
    width: 940px;
    max-height: 620px;
    padding: 40px;
    background: ${Colors.White};
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    position: relative;
`

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${Colors.Gray70};
  margin-bottom: 25px;
  height: 19px;
  font-family: ${Fonts.GilroyBold};
  font-size: 16px;


`;

export const TitleWrapper = styled.div`
  display: flex;
  gap: 8px;
`

interface IButton {
  isCloseBtn?: boolean
}

export const Button = styled.button<IButton>`
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
  background: ${({isCloseBtn}) => isCloseBtn ? 'transparent' : Colors.Blue30};
  color: ${({isCloseBtn}) => isCloseBtn ? Colors.Blue30 : Colors.White};
  transition: transform 0.2s;

  border: ${({isCloseBtn}) => isCloseBtn ? `1px solid ${Colors.Blue30}` : 'none'}; 

  :hover {
    transform: scale(1.03);
  }
  :active {
    transform: scale(1);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`


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


export const ModalCloseButton = styled.button`
  display: flex;
  align-items: center;
  width: 20px;
  height: 20px;
  padding: 1px;
  justify-content: center;
  justify-self: flex-end;
  border-radius: 50%;
  background-color: ${Colors.Gray70};
  transition: background 0.2s;

  :hover {
    background: ${Colors.Magenta};
  }
`;

export const CloseIcon = styled(XIcon)`
  color: ${Colors.White};
`;