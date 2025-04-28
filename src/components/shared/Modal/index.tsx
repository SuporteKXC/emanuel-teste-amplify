import React, {
  useEffect,
  useRef,
  useCallback,
  PropsWithChildren,
} from "react";
import { keyframes } from "styled-components";

import * as S from "./styles";

interface ModalProps extends PropsWithChildren<any> {
  padding?: string;
  isOpen: boolean;
  onClickOutside?: Function;
}

type Props = ModalProps;

export const ModalCloseButton = ({ onClick }: any) => {
  return (
    <S.CloseButton onClick={onClick}>
      <S.CloseIcon />
    </S.CloseButton>
  );
};

export const Modal: React.FC<Props> = ({
  isOpen = false,
  onClickOutside,
  children,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const body: HTMLElement = document.getElementsByTagName("body")[0];

  const contentWrapperAnimation = keyframes`
     0% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1);
    }
  `;

  const handleClickOutside = useCallback(
    (e) => {
      if (
        isOpen &&
        onClickOutside &&
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        onClickOutside();
      }
    },
    [containerRef, onClickOutside, isOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      body.classList.remove("modal-open");
    };
  }, [body, handleClickOutside]);

  useEffect(() => {
    if (isOpen) {
      body.classList.add("modal-open");
    } else {
      body.classList.remove("modal-open");
    }
  }, [body, isOpen]);

  return (
    <S.ModalOverlay ref={containerRef} isOpen={isOpen} {...rest}>
      <S.ContentWrapper animation={contentWrapperAnimation}>
        {children}
      </S.ContentWrapper>
    </S.ModalOverlay>
  );
};
