import styled from 'styled-components';
import { Colors, ColorScheme } from 'styles/constants';
import { FieldContainer } from 'styles/components';
export {
  FieldError,
  FieldLabel,
  EyeOffIcon,
  EyeIcon,
  ActivityIndicator,
} from 'styles/components';

export const Container = styled(FieldContainer)`
  input {
    width: 100%;
    font-size: inherit;
    border-radius: 6px;
    background: ${Colors.White};
    border: 1px solid ${Colors.Gray50};
    color: ${ColorScheme.Text};
    height: 48px;
    padding: 0 16px;
  }
`;

export const RelativeWrapper = styled.div`
  display: flex;
  flex: 0;
  align-items: center;
  position: relative;
  width: 100%;
`;

export const ActivityIndicatorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0px;
  width: 44px;
`;

export const PasswdToggler = styled.button.attrs({ type: 'button' })`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: currentColor;
  opacity: 0.6;
  position: absolute;
  right: 0;
  width: 44px;
  svg {
    width: 24px;
  }
`;
