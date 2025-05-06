import styled, {css} from 'styled-components'
import { Colors, ColorScheme } from 'styles/constants'

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: fit-content;
    background-color: ${Colors.White};
    border-radius: 5px;
`

interface IPanelItem {
    active?: boolean;
  }

export const Item = styled.div<IPanelItem>`
    padding: 15px;
    font-size: 14px;
    color: ${ColorScheme.LightText};
    &:hover {
    border-bottom: 2px solid ${ColorScheme.Primary};
    cursor: pointer;
    }
    ${({ active }) =>
    active &&
    css`
        color: ${ColorScheme.Text};
      border-bottom: 2px solid ${ColorScheme.Primary};
      border-radius: 2px;
    `}
`

export const PercentContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: fit-content;
    background-color: ${Colors.Gray30};
    margin-bottom: 32px;
    @media (max-width: 1800px) {
        margin-bottom: 24px;
  };
`
export const PercentItem = styled.div`
    padding: 15px;
    font-size: 12px;
    color: ${ColorScheme.Text};
`

export const Progress = styled.div`
    background-color: ${Colors.Gray40};
    height:8px;
    width:150px;
    border-radius: 15px;
    display: flex;
    align-self: center;
`

interface IProps {
    width: string;
  }
export const Bar = styled.div<IProps>`
    background-color:${Colors.Gray60};
    width:${props => props.width ? props.width : 0};
    height:8px;
    border-radius:15px
`