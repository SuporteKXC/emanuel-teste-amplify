import styled from 'styled-components';

import { fonts, Colors } from 'styles';

export { Loading } from 'styles/styled-components';

export const Container = styled.div`
  position: relative;
  width: auto;
  width: 260px;
`;

export const AvatarContainer = styled.div`
  width: 260px;
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Avatar = styled.img`
  border-radius: 50%;
  width: 260px;
  height: 260px;

  display: inline-block;
  overflow: hidden;
  line-height: 1;
  vertical-align: middle;
  background-color: var(--color-avatar-bg);
  flex-shrink: 0;
  box-shadow: 0 0 0 1px var(--color-avatar-border);
`;

export const FileInput = styled.input.attrs({ type: 'file' })`
  display: none;
`;

export const IconContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  vertical-align: middle;
  font-size: 1rem;
  padding: 4px;
  background-color: ${Colors.White};
  border-radius: 6px;
  position: absolute;
  top: 60%;
  left: 35%;
  z-index: 2;
  box-shadow: 0 0 0 1px ${Colors.Gray20};
  font-family: ${fonts.GilroyRegular};
  cursor: pointer;
`;
