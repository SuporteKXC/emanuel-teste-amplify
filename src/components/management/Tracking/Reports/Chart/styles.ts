import styled from 'styled-components';

export const Container = styled.div`
  height: 500px;
  background-color: white;
  border-radius: 6px;
  padding: 10px 0 40px 30px;
  box-shadow: 0px 1px 1px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  overflow-y: hidden;
  overflow-x: auto;
  position: relative;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  position: sticky;
  top: 0;
  left: 0;

  h1 {
    font-size: 14px;
    margin-top: 10px;
    text-align: left;
  } 
`;

interface ChartContainerProps {
  width: number;
}

export const ChartContainer = styled.div<ChartContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  min-width: 100%;
  width: ${props => props.width}px;
`;

export const ButtonXLS = styled.button`
  background-color: #007CEF;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
    transition: 0.2s;
  }
`

export const Controls = styled.div`
  display: flex;
  gap: 6px;
`;

export const ToggleGroup = styled.div`
  display: flex;
  gap: 0;
`;

interface ButtonProps {
  variant: 'quantity' | 'percentage';
  viewType: 'quantity' | 'percentage';
}

export const ButtonView = styled.button<ButtonProps>`
    background-color: ${props => props.variant === props.viewType ? '#007CEF' : 'white'};
    border-color: #007CEF;
    border-style: solid;
    color: ${props => props.variant === props.viewType ? 'white' : '#007CEF'};
    font-size: 16px;
    font-weight: bold;
    padding: 5px 10px;
    cursor: pointer;
    transition: 0.2s;

    border-width: ${props => props.variant === 'percentage' ? '1px' : '1px 0 1px 1px'};
    border-radius: ${props => props.variant === 'percentage' ? '0 4px 4px 0' : '4px 0 0 4px'};

    &:hover {
      opacity: 0.5;
      transition: 0.2s;
    }
`;