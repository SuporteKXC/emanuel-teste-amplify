import styled from "styled-components";
import { Close } from "styles/components";

export const ImageItem = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;

  img {
    object-fit: contain;
  }
`;

export const ImageRemove = styled(Close)`
  width: 18px;
  height: 18px;
  color: #fff;
  cursor: pointer;
  position: absolute;

  background: #000;
  border-radius: 100%;
  &:hover {
    color: #ff0001;
  }
`;

export const SkeletonImg = styled.div`
  width: 100px;
  height: 100px;
`;
