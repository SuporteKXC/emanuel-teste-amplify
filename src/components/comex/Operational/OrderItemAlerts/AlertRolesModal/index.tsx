import { Modal, ModalCloseButton } from "components";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { OrderItemAlertData } from 'contracts';

interface IModal {
  isOpen: boolean;
  closeModal: Function;
  alert?: OrderItemAlertData;
}

export const AlertRolesModal: React.FC<IModal> = ({ isOpen, closeModal, alert }) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClickOutside={() => closeModal()}>
      <S.ModalContainer>
        <ModalCloseButton onClick={() => closeModal()} />
        <S.ModalTitle>{`${t("comex.operational.orderItem.alerts.rolesModal.title")}`}</S.ModalTitle>
        <S.ModalRow>
          {alert?.alert_type?.role_alert_type.map(
            roleAlertType => <p key={roleAlertType.id}>{roleAlertType.role.name}</p>
          )}
        </S.ModalRow>
      </S.ModalContainer>
    </Modal>
  );
};