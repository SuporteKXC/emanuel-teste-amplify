import { css } from 'styled-components';

export enum Fonts {
  GilroyBold = 'Gilroy-Bold',
  GilroySemiBold = 'Gilroy-SemiBold',
  GilroyRegular = 'Gilroy-Regular',
  OpenSans = 'Open Sans',
}

export enum Colors {
  White = '#FFFFFF',
  Blue = '#1AB1F3',
  Blue10 = '#DCF3FD',
  Magenta = '#DE1745',
  Orange = '#EE7C2C',
  Green = '#00C152',
  Peach = '#FDEBDE',
  Gray10 = '#F5F5F5',
  Gray20 = '#F0F0F0',
  Gray30 = '#E9E9E9',
  Gray40 = '#D1D1D1',
  Gray50 = '#96969A',
  Gray55 = '#6E6E6E',
  Gray60 = '#57575E',
  Gray65 = '#474756',
  Gray70 = '#2E2E36',
  Pink10 = '#FF8989',
  Red50 = '#EB5E5E',
  Red70 = '#A70000',
  Yellow = '#FFE577',
  Yellow30 = '#D3D300',
  Yellow50 = '#FFBB30',
  Yellow70 = '#A76C00',
}

export enum ColorScheme {
  Text = Colors.Gray70,
  LightText = Colors.Gray50,
  Primary = Colors.Blue,
  Secondary = Colors.Green,
  Danger = Colors.Magenta,
  DisabledField = Colors.Gray20,
}

export enum StockOrderStatusColor {
  Pendente = '#3498DB',
  Separacao = '#f1c40f',
  Contagem = '#8e44ad',
  Finalizado = '#2ecc71',
  Cancelado = '#e74c3c',
}

export const getScrollbarStyle = (
  bgColor = Colors.Gray30,
  fgColor = Colors.Gray60
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

export const leftPanelScrollbarStyle = () => {
  return css`
    ::-webkit-scrollbar {
      -webkit-appearance: none;
    }
    ::-webkit-scrollbar:vertical {
      width: 5px;
    }
    ::-webkit-scrollbar:horizontal {
      height: 5px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 6px;
      border: none;
      background-color: ${Colors.Gray65};
    }
    ::-webkit-scrollbar-track {
      background-color: none;
      border-radius: 6px;
    }
  `;
};
