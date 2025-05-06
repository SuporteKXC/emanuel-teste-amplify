import React, { useCallback, useEffect, useId, useMemo, useRef } from 'react';
import ModalPortal from '../ModalPortal';
import * as S from './styles';

interface CloseButtonProps {
  onClick: () => void;
  color?: string;
  title?: string;
}

interface Props
  extends React.PropsWithChildren<{
    isOpen?: boolean;
    onClickOutside?: () => void;
  }> {}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick, color, title }) => (
  <S.CloseButton type="button" onClick={onClick} dye={color} title={title}>
    &#x2715;
  </S.CloseButton>
);

export const Modal: React.FC<Props> = ({
  isOpen = false,
  onClickOutside,
  children,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayId = useId();
  const modalRoot = useMemo(() => document.getElementById('modal-root'), []);

  const overlayClass = useMemo((): string => {
    if (!isOpen) return 'modal-overlay';
    return `modal-overlay open`;
  }, [isOpen]);

  const handleClickOutside = useCallback(
    (event: MouseEvent): void => {
      if (!overlayRef.current) return;
      const node = event.target as Node;
      const nodeParent = node?.parentElement;
      if (!nodeParent) return;

      if (nodeParent === overlayRef.current) {
        onClickOutside?.();
      }
    },
    [onClickOutside]
  );

  const addNoScroll = useCallback(() => {
    document.body.classList.add('no-scroll');
  }, []);

  const removeNoScroll = useCallback(() => {
    if (!modalRoot) return;
    const otherOpenModals = Array.from(modalRoot.children)
      .filter((child) => child.classList.contains('open'))
      .filter((child) => child.id !== overlayId);

    if (otherOpenModals.length === 0) {
      document.body.classList.remove('no-scroll');
    }
  }, [modalRoot, overlayId]);

  const onToggle = useCallback((): void => {
    if (isOpen) {
      addNoScroll();
      return document.addEventListener('mousedown', handleClickOutside);
    } else {
      removeNoScroll();
      return document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [addNoScroll, handleClickOutside, isOpen, removeNoScroll]);

  useEffect(() => {
    onToggle();
  }, [isOpen, onToggle]);

  useEffect(() => {
    return () => {
      removeNoScroll();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside, removeNoScroll]);

  return (
    <ModalPortal>
      <S.Overlay id={overlayId} ref={overlayRef} className={overlayClass}>
        <S.Modal>{children}</S.Modal>
      </S.Overlay>
    </ModalPortal>
  );
};
