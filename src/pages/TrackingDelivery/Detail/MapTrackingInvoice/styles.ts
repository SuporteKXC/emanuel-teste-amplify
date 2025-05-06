import styled from 'styled-components';
import { Close } from '@styled-icons/ionicons-solid';
import { Colors, Fonts } from 'styles/constants';

export const Container = styled.section`
  width: 100%;
  height: 480px;
  position: relative;
  background-color: ${Colors.White};
  padding: 12px;
  border-radius: 6px;
`;

export const Box = styled.div`
  width: 280px;
  padding: 24px;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  position: relative;
  left: -50%;
`;

export const Label = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
`;

export const Value = styled.p`
  font-size: 12px;
  line-height: 18px;
  text-transform: uppercase;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const IconClose = styled(Close).attrs({ size: 24 })``;

export const ButtonClose = styled.button.attrs({ type: 'button' })`
  position: absolute;
  top: 12px;
  right: 12px;
`;

export const LegendBox = styled.div`
  width: max-content;
  padding: 16px;
  background-color: #fff;
  border-radius: 4px;
  top: 100px;
  left: 22px;
  position: absolute;
  z-index: 100;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
`;

export const Legend = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-family: ${Fonts.OpenSans};
  font-size: 12px;
  line-height: 14px;
  color: ${Colors.Gray60};
  margin-bottom: 6px;
`;

export const Line = styled.div`
  width: 30px;
  height: 6px;
  border-radius: 3px;
  margin-right: 8px;

  &.blue {
    background-color: #72adf2;
  }

  &.purple {
    background-color: ${Colors.Orange};
  }
`;
