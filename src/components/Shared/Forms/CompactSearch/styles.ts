import styled from 'styled-components';
import { Colors, ColorScheme, Fonts } from 'styles/constants';
import { FieldContainer } from 'styles/components';
export { SearchIcon } from 'styles/components';

export const Container = styled(FieldContainer)`
  input {
    width: 100%;
    font-size: inherit;
    border-radius: 6px;
    background: ${Colors.White};
    border: 1px solid ${Colors.Gray60};
    color: ${ColorScheme.Text};
    height: 32px;
    padding: 0 16px 0 36px;
    ::placeholder {
      color: ${ColorScheme.Text};
      font-family: ${Fonts.GilroyBold};
    }
  }
`;

export const RelativeWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  position: relative;
  width: 100%;
  svg {
    position: absolute;
    left: 8px;
  }
`;
