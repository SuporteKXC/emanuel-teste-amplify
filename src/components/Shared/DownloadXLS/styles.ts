import { BaseButtonStyle } from './../../../styles/components/buttons';
import { Colors, Fonts } from './../../../styles/constants';
import styled from 'styled-components';
export { DownloadIcon } from 'styles/components';

export const DownloadXLS = styled.button<{ loading: boolean }>`
  ${BaseButtonStyle}
  gap: 1px;
  border-radius: 100px;
  font-family: ${Fonts.GilroySemiBold};
  background: ${Colors.Blue};
  color: ${Colors.White};
  width: 30px;
  height: 30px;
  font-size: 14px;
  cursor: pointer;
  transition: width 2s;
  align-items: center;
  position: relative;
  transition: width 500ms;

  &:hover {
    width: 130px;
    span {
      display: flex;
      position: relative;
      white-space: nowrap;
      padding-right: 20px;
    }
  }
  ${({ loading }) =>
    loading
      ? `
    width: 130px;
    span {
      display: flex;
      position: relative;
      white-space: nowrap;
      padding-right: 20px;
    }`
      : `
    span {
      display: none;
    }`}
`;

export const XLSLoading = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${Colors.Blue};
  border: 4px solid ${Colors.Blue10};
  border-radius: 50%;
  border-top: 4px solid ${Colors.Blue};
  animation: spin 600ms linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ContentAction = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  padding: 3px;
  background-color: ${Colors.Blue};
  border-radius: 50%;
`;
