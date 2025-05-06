import { MODAL_DISMISS_ACTION } from 'constants/Common';
import {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ButtonMood } from 'styles/components/buttons';
import ModalPortal from '../ModalPortal';
import * as S from './styles';

interface DialogConfig {
  title?: string;
  message?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  confirmButtonMood?: ButtonMood;
  cancelButtonMood?: ButtonMood;
}

export interface ConfirmationDialogRef {
  openDialog: (config?: DialogConfig) => Promise<boolean>;
}

interface Props {}

interface IConfirmationDialog
  extends ForwardRefExoticComponent<
    Props & RefAttributes<ConfirmationDialogRef>
  > {}

export const ConfirmationDialog: IConfirmationDialog = forwardRef<
  ConfirmationDialogRef,
  Props
>((_, ref) => {
  const overlayId = useId();
  const modalRoot = useMemo(() => document.getElementById('modal-root'), []);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [config, setConfig] = useState<DialogConfig>({
    confirmButtonMood: 'primary',
    confirmButtonText: 'Ok',
    cancelButtonMood: 'light',
    cancelButtonText: MODAL_DISMISS_ACTION,
  });

  const overlayClass = useMemo((): string => {
    if (!isOpen) return 'modal-overlay';
    return `modal-overlay open`;
  }, [isOpen]);

  const resolver = useRef<(value: any) => void>();

  const openDialog = useCallback((config?: DialogConfig): Promise<any> => {
    setIsOpen(true);
    config && setConfig((state) => ({ ...state, ...config }));
    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  const handleConfirm = useCallback((): void => {
    if (resolver.current) resolver.current(true);
    setIsOpen(false);
  }, []);

  const handleCancel = useCallback((): void => {
    if (resolver.current) resolver.current(false);
    setIsOpen(false);
  }, []);

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

  const onPressEscape = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        return handleCancel();
      }
    },
    [handleCancel]
  );

  const onToggle = useCallback((): void => {
    if (isOpen) {
      addNoScroll();
      return document.addEventListener('keydown', onPressEscape);
    } else {
      removeNoScroll();
      return document.removeEventListener('keydown', onPressEscape);
    }
  }, [addNoScroll, isOpen, onPressEscape, removeNoScroll]);

  useEffect(() => {
    onToggle();
  }, [isOpen, onToggle]);

  useEffect(() => {
    return () => {
      removeNoScroll();
      document.removeEventListener('keydown', onPressEscape);
    };
  }, [onPressEscape, removeNoScroll]);

  useImperativeHandle(
    ref,
    () => ({
      openDialog,
    }),
    [openDialog]
  );

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <S.Overlay id={overlayId} className={overlayClass}>
        <S.Dialog>
          {!!config.title && (
            <S.DialogHeader>
              <S.DialogTitle>{config.title}</S.DialogTitle>
            </S.DialogHeader>
          )}

          <S.DialogBody>
            {!!config.message && (
              <S.DialogMessage>{config.message}</S.DialogMessage>
            )}
          </S.DialogBody>

          <S.DialogActionButtons>
            <S.Button mood={config.cancelButtonMood} onClick={handleCancel}>
              {config.cancelButtonText}
            </S.Button>
            <S.Button mood={config.confirmButtonMood} onClick={handleConfirm}>
              {config.confirmButtonText}
            </S.Button>
          </S.DialogActionButtons>
        </S.Dialog>
      </S.Overlay>
    </ModalPortal>
  );
});
