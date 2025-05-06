import styled from "styled-components";
import { Colors, Fonts } from "styles/constants";

interface StepProps {
  status?: "alert" | "active" | "none";
}

const isActive = ({ status }: StepProps) => {
  switch (status) {
    case "active":
      return Colors.Blue30;
    case "alert":
      return Colors.Pink;
    default:
      return Colors.Gray45;
  }
};

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 117px;
  align-items: center;
  color: ${Colors.Gray70};
  text-transform: uppercase;
`;

export const Circle = styled.div<StepProps>`
  width: 22px;
  height: 22px;
  position: relative;
  aspect-ratio: 1;
  border: ${isActive} 7px solid;
  border-radius: 50%;
  background: ${Colors.White};
  z-index: 3;
`;

export const Line = styled.span<StepProps>`
  width: 100%;
  height: 3px;
  background: ${isActive};
`;

export const Item = styled.div<StepProps>`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  flex: 1;

  ::before {
    position: absolute;
    content: "";
    border-bottom: 3px solid ${isActive};
    width: 100%;
    top: 54%;
    right: 50%;
    z-index: 2;
  }

  ::after {
    position: absolute;
    content: "";
    border-bottom: 3px solid ${isActive};
    width: 0%;
    top: 54%;
    left: 50%;
    z-index: 2;
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: row;

  ${Item}:first-child {
    ::before {
      width: 25%;
    }
  }
  ${Item}:last-child {
    ::after {
      width: 25%;
    }
  }
`;

export const Title = styled.div`
  display: flex;
  width: 90px;
  text-align: center;
  font-family: ${Fonts.GilroyBold};
  font-size: 11px;
  height: 26px;
`;

export const Value = styled.div`
  display: flex;
  width: 64px;
  text-align: center;
  justify-content: center;
  font-family: ${Fonts.OpenSans};
  font-size: 12px;
`;
