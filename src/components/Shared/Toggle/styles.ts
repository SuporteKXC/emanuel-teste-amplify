import styled, { css } from "styled-components";
import { Colors, Fonts, ColorScheme } from "styles/constants";

export const Checkbox = styled.input.attrs({
  type: 'checkbox',
})`
  position: absolute;
  left: -30000px;
`;

export const Label = styled.div`
  display: block;
  font-family: ${Fonts.GilroySemiBold};
  font-size: 14px;
  color: ${ColorScheme.Text};
  & {
    @media (max-width: 950px) {
      font-size: 0.74rem;
    }
  }
`;

export const ToggleContainer = styled.div.attrs({
  className: "toogle-container",
})`
  width: 34px;
  display: flex;
  align-items: center;
  margin-left: 5px
`;

interface ITogglerProps {
  mood: ToggleMood
}

const applyToggleColor = (mood: ToggleMood) => {
  switch (mood) {
    case 'canceled':
      return Colors.Gray50
    case 'secondary':
      return Colors.Magenta
  }
}

export const ToggleTrack = styled.div.attrs({ className: "track" })<ITogglerProps>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ mood }) => applyToggleColor(mood)}66;
  position: relative;
`;

export const ToggleHandler = styled.div.attrs({ className: "handler" })<ITogglerProps>`
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${({ mood }) => applyToggleColor(mood)};
  margin-left: 0px;
  transition: margin-left 120ms linear;
`;

export const MainContainer = styled.div`
  flex-direction: column;
`;

export type ToggleMood = 'canceled' | 'secondary';

interface IFieldContainerProps {
  mood: ToggleMood
}

const applyToggleMood = (mood: ToggleMood) => {
  switch (mood) {
    case 'canceled':
      return css`
        div.handler {
          background-color: ${Colors.Magenta};
          margin-left: 20px;
        }
        div.track {
          background-color: ${Colors.Magenta}66;
        }
      `
    case 'secondary':
      return css`
        div.handler {
          background-color: ${Colors.Green};
          margin-left: 20px;
        }
        div.track {
          background-color: ${Colors.Green}66;
        }
      `
  }
}

export const FieldContainer = styled.label<IFieldContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #c9c9c9;
  border-radius: 4px;
  height: 46px;
  margin-bottom: 8px;
  padding: 0px 8px;

  cursor: pointer;
  > input:checked + div.toogle-container {
    ${({mood}) => applyToggleMood(mood)};
  }
  
  background-color: ${Colors.White};
`;

export const Title = styled.div`
  display: block;
  font-family: ${Fonts.GilroySemiBold};
  font-size: 14px;
  color: #57575E;
  margin-bottom: 8px;
`;

export const TitleEmpty = styled.div`
  padding: 5px;
  margin: 8px;
`;