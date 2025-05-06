import styled from "styled-components";
import { Colors, Fonts } from "styles/constants";

export const Checkbox = styled.input.attrs({
  type: "checkbox",
})`
  position: absolute;
  opacity: 0;
`;

export const Label = styled.div`
  font-size: 14px;
  font-family: ${Fonts.GilroySemiBold};
  color: #000;
  margin-right: 8px;
`;

export const ToggleContainer = styled.div.attrs({
  className: "toogle-container",
})`
  width: 34px;
  display: flex;
  align-items: center;
`;

export const ToggleTrack = styled.div.attrs({ className: "track" })`
  display: flex;
  align-items: center;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background-color: ${Colors.Gray65}66;
  position: relative;
`;

export const ToggleHandler = styled.div.attrs({ className: "handler" })`
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${Colors.Gray65};
  margin-left: 0px;
  transition: margin-left 120ms linear;
`;

export const MainContainer = styled.div`
  flex-direction: column;
`;

export const FieldContainer = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;

  align-items: center;
  border: 1px solid ${Colors.Gray50};
  border-radius: 4px;
  height: 50px;
  padding: 0px 16px;

  cursor: pointer;
  > input:checked + div.toogle-container {
    div.handler {
      background-color: ${Colors.Blue};
      margin-left: 20px;
    }
    div.track {
      background-color: ${Colors.Blue}66;
    }
  }

  input {
    z-index: -1;
  }
`;


export const Title = styled.div`
  font-family: ${Fonts.GilroySemiBold};
  font-size: inherit;
  color: #000;
  margin-bottom: -15px;
  position: relative
`;

export const TitleEmpty= styled.div`
  padding: 1px
`;