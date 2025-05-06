import { css } from "styled-components";

export enum Fonts {
  GilroyHeavy = "Gilroy-Heavy",
  GilroyBold = "Gilroy-Bold",
  GilroySemiBold = "Gilroy-SemiBold",
  GilroyMedium = "Gilroy-Medium",
  GilroyRegular = "Gilroy-Regular",
  OpenSans = "Open Sans",
}

export enum Colors {
  DarkBlue = "#292D41",
  BackgroundBlack = "#222229",
  Black = "#000",
  White = "#FFFFFF",
  Blue = "#1AB1F3",
  Blue10 = "#DDEFFF",
  Blue30 = "#0085FF",
  Magenta = "#DE1745",
  PaleRed = "#fdb4b4",
  Orange = "#EE7C2C",
  Gold = "#EEB22C",
  PaleGold = "#ffebb0",
  Green = "#0CC769",
  Peach = "#FDEBDE",
  Gray10 = "#F5F5F5",
  Gray20 = "#F0F0F0",
  Gray30 = "#E9E9E9",
  Gray40 = "#D1D1D1",
  Gray45 = "#CACACC",
  Gray50 = "#96969A",
  Gray60 = "#57575E",
  Gray70 = "#2E2E36",
  Pink = "#FF007A",
  Violet = "#7000FF",
  Yellow = "#FFB320",
}

export enum ColorScheme {
  Text = Colors.Gray60,
  LightText = Colors.White,
  Primary = Colors.DarkBlue,
  Secondary = Colors.Green,
  Danger = Colors.Magenta,
  Warning = Colors.Gold,
  DisabledField = Colors.Gray20,
  Alert = Colors.PaleGold,
}

export enum OrderStatusColor {
  Aguardando = "#3498DB",
  Chegada = "#673AB7",
  Iniciado = "#F9A82A",
  Finalizado = "#0F97A7",
  Liberado = "#3BBCA3",
  NoShow = "#FE6043",
  Cancelado = "#EC1751",
}

export enum OrderItemStatus {
  Normal = "#1ABC9C",
  Critical = "#E99898",
}

export enum Channel {
  Yellow = Colors.PaleGold,
  Red = Colors.PaleRed,
}

export const getScrollbarStyle = (
  bgColor = Colors.Gray30,
  fgColor = Colors.Gray50
) => {
  return css`
    ::-webkit-scrollbar {
      -webkit-appearance: none;
    }
    ::-webkit-scrollbar:vertical {
      width: 8px;
    }
    ::-webkit-scrollbar:horizontal {
      height: 8px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 6px;
      border: 2px solid ${bgColor};
      background-color: ${fgColor};
    }
    ::-webkit-scrollbar-track {
      background-color: ${bgColor};
      border-radius: 6px;
    }
  `;
};
