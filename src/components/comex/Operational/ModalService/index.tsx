import { Modal, ModalCloseButton } from "components";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { IServiceType } from "contracts";

interface IServiceTypeData extends IServiceType {}

interface IModal {
  isOpen: boolean;
  loading: boolean;
  closeModal: () => void;
  action: () => void;
  serviceType:  IServiceTypeData | undefined;
}
export const ModalService = ({
  isOpen,
  closeModal,
  action,
  loading,
  serviceType,
}: IModal) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClickOutside={() => closeModal()}>
      <S.ModalContainer>
        <ModalCloseButton onClick={() => closeModal()} />

        {loading ? (
          <S.Center>
            <S.ActivityIndicator />
          </S.Center>
        ) : (
          <>
            <S.ModalRow>
              <p>
                {`${t("comex.operational.orderItem.modalService.confirmationPhrase")}${
                  serviceType?.service_value
                }`}
              </p>
            </S.ModalRow>

            <S.ModalRow>
              <S.Button onClick={() => action()}>
                {t("comex.operational.orderItem.modalService.confirmButton")}
              </S.Button>

              <S.Button mood="light" onClick={() => closeModal()}>
                {t("comex.operational.orderItem.modalService.cancelButton")}
              </S.Button>
            </S.ModalRow>
          </>
        )}
      </S.ModalContainer>
    </Modal>
  );
};
