import styled, { css } from "styled-components";
import illustrationBg1 from "assets/images/tracking/illustration-bg-1-webcol.png";
import illustrationBg2 from "assets/images/tracking/illustration-bg-2-webcol.png";
import illustrationBg3 from "assets/images/tracking/illustration-bg-3-webcol.png";
import illustrationBuildings from "assets/images/tracking/illustration-buildings-webcol.png";
import illustrationPacks from "assets/images/tracking/illustration-packs-webcol.png";
import illustrationPin from "assets/images/tracking/illustration-pin.png";
import illustrationTree1 from "assets/images/tracking/illustration-tree-1-webcol.png";
import illustrationTree2 from "assets/images/tracking/illustration-tree-2-webcol.png";
import illustrationTruck from "assets/images/tracking/illustration-truck.png";

import { Colors } from 'styles/constants';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 230px;
  position: relative;
  margin-bottom: 80px;
  z-index: 0;
`;

export const Line = styled.div`
  width: 100%;
  height: 3px;
  background-color: ${Colors.Gray60};
  position: relative;
  z-index: 10;
`;

export const IllustrationBg1 = styled.img.attrs({ src: illustrationBg1 })`
  position: absolute;
  left: 0;
  z-index: 0;
`;

export const IllustrationBg2 = styled.img.attrs({ src: illustrationBg2 })`
  position: absolute;
  z-index: -1;
`;

export const IllustrationBg3 = styled.img.attrs({ src: illustrationBg3 })`
  position: absolute;
  right: 0;
  z-index: 0;
`;

export const IllustrationBuildings = styled.img.attrs({
  src: illustrationBuildings,
})`
  position: absolute;
  left: 34%;
  z-index: 1;
`;

export const IllustrationPacks = styled.img.attrs({ src: illustrationPacks })`
  position: absolute;
  left: 10px;
  z-index: 3;
`;

export const IllustrationPin = styled.img.attrs({ src: illustrationPin })`
  position: absolute;
  right: 0;
  bottom: 3px;
  z-index: 4;
`;

export const IllustrationTree1 = styled.img.attrs({ src: illustrationTree1 })`
  position: absolute;
  left: 17%;
  z-index: 3;
`;

export const IllustrationTree2 = styled.img.attrs({ src: illustrationTree2 })`
  position: absolute;
  right: 20%;
  z-index: 2;
`;

export const Truck = styled.div<{ position: number }>`
  transition: 2s ease;
  animation-delay: 1s;
  position: absolute;
  z-index: 4;
  width: 123px;
  bottom: -3px;
  left: ${({ position }) =>
    position > 1 && 0 < ((window.innerWidth / 100) * position) - 123
      ? `calc(${position}% - 123px)`
      : "0"};
`;

export const IllustrationTruck = styled.img.attrs({ src: illustrationTruck })`
  position: absolute;
  bottom: 0;
`;

export const DistanceContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: -28px;
  background-color: #ccc;
`;

export const DistanceToFinishedLine = styled.div<{ position: number }>`
  width: ${({ position }) =>
    position > 0 ? `calc(${position}% + 62px)` : "100%"};
  max-width: 100%;
  height: 2px;
  position: absolute;
  right: 0;
  z-index: 1;
  background-color: ${Colors.Orange};

  ${({ position }) =>
    position <= 1 &&
    css`
      display: none;
    `}
`;

export const DistanceLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${Colors.Gray50};
`;

export const Ball = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${Colors.Gray50};
`;

export const BallStart = styled(Ball)`
  position: absolute;
  left: 0;
  z-index: 2;
`;

export const BallEnd = styled(Ball)`
  position: absolute;
  right: 0;
  z-index: 2;
`;

export const BallTruck = styled(Ball)<{ position: number }>`
  position: absolute;
  z-index: 2;
  left: ${({ position }) =>
    position > 1 && 0 < ((window.innerWidth / 100) * position) - 62
      ? `calc(${position}% - 62px)`
      : "62px"};

  ${({ position }) =>
    position < 1 &&
    css`
      display: none;
    `}

  ${({ position }) =>
    position > 97 &&
    css`
      display: none;
    `}
`;

export const Label = styled.h6`
  font-size: 14px;
  color: ${Colors.Gray50};
`;

export const LabelStart = styled(Label)`
  position: absolute;
  left: 0;
  bottom: -24px;
`;

export const LabelEnd = styled(Label)`
  position: absolute;
  right: 0;
  bottom: -24px;
`;

export const LabelTruck = styled(Label)<{ position: number }>`
  position: absolute;
  left: ${({ position }) =>
    position > 1 ? `calc(${position}% - 82px)` : "82px"};
  bottom: -24px;
  text-align: right;

  ${({ position }) =>
    position < 1 &&
    css`
      display: none;
    `}

  ${({ position }) =>
    position > 97 &&
    css`
      display: none;
    `}
`;

export const LabelPositionToFinished = styled(Label)<{ distance: number }>`
  position: absolute;
  top: -20px;
  right: 45%;
  text-align: center;
  color: ${Colors.Orange};
`;
