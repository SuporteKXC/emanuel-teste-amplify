import styled, { css } from "styled-components";
import { Colors } from "styles/constants";

interface IExport {
  loading: boolean;
}

export const ProgressBar = styled.div<{ width: number }>`
  display: flex;
  position: absolute;
  top: 50%;
  right: 9%;
  width: 90%;
  height: 3px;
  overflow: hidden;
  justify-content: flex-start;
  background: #3dd1b4;
  border-radius: 10px;

  .progress {
    background: ${Colors.Gray30};
    height: 100%;
    width: ${({ width })=> width ? width + '%': '1%' };
    transition: width 1.5s;
    overflow: hidden;
  }
`

export const ExportExcelContainer = styled.button<{ isCompact?: boolean }>`
  margin-left: auto;
  box-sizing: border-box;
  border-radius: 6px;
  background: #f9f9f9;
  padding: 4px 15px;
  transition: all ease 0.2s;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  span {
    position: absolute;
    width: 100%;
    height: ${({isCompact})=> isCompact ? '35px' : '40px'};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all ease 0.2s;
    margin-left: -10px;
  }

  ${({ disabled }) =>
    disabled
      ? css`
          background: #1abc9c;
        `
      : css`
          span {
            transform: translateY(-200%);
          }
        `};

  img {
    height: 25px;
    transition: all ease 0.2s;
  }

  p {
    font-size: 12px;
    line-height: ${({isCompact})=> isCompact ? '35px' : '40px'};
    transition: all ease 0.4s;
    white-space: nowrap;
    ${({ disabled }) =>
      disabled
        ? css`
            transform: translateY(200%);
          `
        : ""};
    color: #999;
  }

  &:hover {
    background: #1abc9c;
    span {
      transform: translateY(0);
    }
    p {
      transform: translateY(200%);
      opacity: 1;
    }
  }

  @media (max-width: 520px) {
    display: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
