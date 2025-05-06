import styled from 'styled-components';
import { Fonts } from 'styles/constants';

export const Table = styled.table`
  border-spacing: 0;
  margin-bottom: 20px;
  th {
    padding: 10px 10px 5px;
    font-size: 12px;
    font-family: ${Fonts.GilroySemiBold};
    text-align: left;
    span {
      display: flex;
      margin-bottom: 10px;
    }
  }
  td {
    padding: 2px;
    border: 1px solid #e0e0e0;
  }
`;

interface IPercent {
  height: string;
  percent: string;
}
export const BarPercentTable = styled.div<IPercent>`
  width: 100%;
  height: ${(props) => props.height}px;
  border-radius: 6px;
  background: ${(props) => (props.color === 'y' ? '#02B99D' : '#FE6464')};
  position: relative;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    width: ${(props) => props.percent}%;
    max-width: 100%;
    bottom: 0;
    height: ${(props) => props.height}px;
    border-radius: 6px;
    background: ${(props) => (props.color === 'y' ? '#FE6464' : '#02B99D')};
  }
`;

interface IItem {
  color: string;
}

export const ItemTable = styled.div<IItem>`
  width: 100%;
  height: 100%;
  padding: 4px;
  font-size: 12px;
  color: #fff;
  border-radius: 4px;
  box-sizing: border-box;
  text-align: center;
  background: ${(props) => props.color};
`;
