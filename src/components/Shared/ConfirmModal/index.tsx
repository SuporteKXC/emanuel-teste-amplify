import { Modal, ModalCloseButton } from "components";
import * as S from "./styles";
import { useTranslation } from "react-i18next";

interface IModal {
  isOpen: boolean;
  closeModal: () => void;
  action: () => void;
}
export const ConfirmModal = ({ isOpen, closeModal, action }: IModal) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClickOutside={() => closeModal()}>
      <S.ModalContainer>
        <ModalCloseButton onClick={() => closeModal()} />
        <S.ModalRow>
          <p>{`${t("general.confirmModal.msg")}`}</p>
        </S.ModalRow>

        <S.ModalRow>
          <S.Button size="small" mood="danger" onClick={() => action()}>
            {t("general.confirmModal.btnY")}
          </S.Button>

          <S.Button size="small" onClick={() => closeModal()}>
            {t("general.confirmModal.btnN")}
          </S.Button>
        </S.ModalRow>
      </S.ModalContainer>
    </Modal>
  );
};
