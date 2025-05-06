import styled, { css } from "styled-components";
import { Channel, Colors, ColorScheme, Fonts } from "styles/constants";
export {
  ActivityIndicator,
  ListIcon,
  ShowArrow,
  UpdateIcon,
  Button,
  BlockIcon
} from "styles/components";
import { Star, StarFill, UpdateIcon, TrashIcon, MessageIcon as Message, ExclamationTriangleFillIcon } from "styles/components";

const gridTemplate = css`
  grid-column-gap: 16px;
  grid-template-columns:
  minmax(0, 8px) 
    minmax(0, 2fr) 
    minmax(0, 2fr) 
    minmax(0, 0.8fr) 
    minmax(0, 2fr) 
    minmax(0, 2.8fr) 
    minmax(0, 1.4fr) 
    minmax(0, 0.6fr) 
    minmax(0, 1.8fr) 
    minmax(0, 1.5fr) 
    minmax(0, 2fr) 
    minmax(0, 1.8fr) 
    minmax(0, 1.8fr) 
    repeat(3, minmax(0, 0.5fr)) 
    minmax(0, 4px) 
    repeat(3, minmax(0, 18px)) 
    minmax(0, 24px) 
    repeat(2, minmax(0, 12px));    
`;


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

export const GridHeader = styled.div`
  display: grid;

  margin-bottom: 15px;
  margin-left: 10px;
  ${gridTemplate};
`;

export const Header = styled.p`
  font-family: ${Fonts.GilroySemiBold};
  font-size: 13px;
  color: ${Colors.Gray70};
`;

export const MessageIcon = styled(Message)`
  color: ${Colors.Black};
  aspect-ratio: 1;
`;


// export const GridContainer = styled.div`
//   display: grid;
//   grid-column-gap: 16px;
//   grid-row-gap: 15px;
//   ${gridTemplate};
// `;

interface IGhostProps {
  width?: string;
}

export const Ghost = styled.div<IGhostProps>`
  width: ${(props) => (props.width ? props.width : "100%")};
  background: transparent;
`;

export const Item = styled.p`
  display: grid;
  font-family: ${Fonts.OpenSans};
  font-weight: 600;
  font-size: 12px;
  color: ${ColorScheme.Text};
  padding: 5px 0px;

  span {
    justify-self: center;
  }
`;

export const StatusContainer = styled.div`
  font-family: ${Fonts.GilroyRegular};
  font-size: 14px;
  letter-spacing: -0.01em;
  color: ${ColorScheme.Text};
  padding: 5px 0px;
  display: flex;
  position: relative;
  align-items: center;
`;

export const Status = styled.div`
  width: fit-content;
`;

export const CriticalBar = styled.div`
  border-left: 10px solid #1abc9c;
  display: block;
  border-radius: 6px 0 0 6px;
  height: 100%;
  padding: 15px 0;
`;
interface IWrapperProps {
  isCritical?: boolean;
  channel: "VERDE" | "AMARELO" | "VERMELHO" | null;
}

export const ItemWrapper = styled.div<IWrapperProps>`
  display: grid;
  ${gridTemplate};
  border-radius: 6px;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px 0;
  height: auto;
  transition: 0.2s;
  border-left: ${(props) =>
    props.isCritical === true
      ? `10px solid ${Colors.Magenta}`
      : `10px solid #1abc9c`};
  cursor: pointer;

  background: ${(props) =>
    props.channel
      ? props.channel === "VERMELHO"
        ? Channel.Red
        : props.channel === "AMARELO"
        ? Channel.Yellow
        : "#fff"
      : "#fff"};

  &:hover {
    box-shadow: 1px 10px 10px rgb(0 0 0 / 10%);
  }
`;

export const Total = styled.div`
  display: flex;
  font-size: 14px;
  font-family: ${Fonts.GilroyBold};
  margin-bottom: 24px;
`;

export const SortHeader = styled.div`
  font-family: ${Fonts.GilroySemiBold};
  color: ${ColorScheme.Text};
  font-size: 12px;
  text-transform: uppercase;
`;

interface StarProps {
  $isFavorite: boolean;
}

export const StarFillIcon = styled(StarFill)<StarProps>`
  fill: ${Colors.Gold};
  transition: all 0.2s;
  justify-self: center;
  ${(props) =>
    !props.$isFavorite
      ? css`
          filter: grayscale(0.9);
        `
      : ""}

  &:hover {
    transform: scale(1.2);
    filter: grayscale(0);
  }
`;

interface IUpdated24HourIcon {
  wasUpdated: boolean;
}

export const Updated24HourIcon = styled(UpdateIcon)<IUpdated24HourIcon>`
  color: ${Colors.Green};
  width: 24px;
  justify-self: center;
  ${(props) =>
    props.wasUpdated
      ? ""
      : css`
          display: none;
        `}
`;

interface ITrashIconProps {
  selected: boolean;
  disabled: boolean;
}

export const TrashCancel = styled(TrashIcon)<ITrashIconProps>`
  color: ${Colors.Magenta};
  ${({ selected }) =>
    !selected
      ? css`
          filter: grayscale(0.9);
        `
      : ""}

  &:hover {
    transform: scale(1.2);
    filter: grayscale(0);
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      &:hover {
        transform: scale(1);
        filter: grayscale(0.9);
      }
    `}
`;

export const FloatBar = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: fixed;
  bottom: -100px;
  left: 0;
  background-color: ${Colors.BackgroundBlack};
  padding: 16px 32px;
  z-index: 99;
  transition: 300ms ease;

  ${({ active }) =>
    active &&
    css`
      bottom: 0;
    `}
`;

export const TextSelected = styled.article`
  display: flex;
  align-items: center;
  color: white;
  font-family: ${Fonts.GilroySemiBold};
  font-size: 14px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
`;

export const ProcessCriticalIcon = styled(ExclamationTriangleFillIcon)`
  fill: ${Colors.Gold};
  transition: all 0.2s;
  justify-self: center;
  color: ${Colors.Orange};
`;
