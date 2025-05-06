import React, { useRef, useCallback } from "react";
import { useDispatch, useSelector /* RootStateOrAny */ } from "react-redux";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { useValidation } from "hooks";
import {
  UpdateDeliveryDateActions,
  UpdateDeliveryDateState,
} from "store/ducks/trackingDelivery/update-delivery-date";

import * as S from "./styles";
import { Modal } from "components/shared";
import { Input } from "components/shared/Forms";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { Formatter } from "@/utils/Formatter";
import { useTranslation } from "react-i18next";

interface Props {
  invoiceId: number;
  isOpen: boolean;
  close: () => void;
  onActionSuccess: () => void;
}

export const NewDeliveryDate: React.FC<Props> = ({
  isOpen,
  close,
  invoiceId,
  onActionSuccess,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { loading } = useSelector(
    (state: RootState) => state.updateDeliveryDate
  ) as UpdateDeliveryDateState;

  const onSuccess = useCallback(
    (reset: any) => {
      reset();
      close();
      onActionSuccess();
    },
    [close, onActionSuccess]
  );

  const handleSubmit: any = useCallback<SubmitHandler>(
    async (data, { reset }) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          deliveryDate: Yup.string().required("Obrigatório"),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        data.documentId = invoiceId;
        data.deliveryDate = Formatter.dateToApi(data.deliveryDate);

        dispatch(
          UpdateDeliveryDateActions.request(data, () => onSuccess(reset))
        );
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, invoiceId, onSuccess]
  );

  return (
    <Modal isOpen={isOpen}>
      <S.Container>
        <S.Header>
          <S.Title>
            <S.Icon />
            {t('trackingDelivery.header.deliveryDate')}
          </S.Title>
        </S.Header>
        <Form ref={formRef} onSubmit={handleSubmit} placeholder={undefined}>
          <S.FormRow>
            <Input
              name="deliveryDate"
              label={t('trackingDelivery.header.deliveryDate')}
              type="datetime-local"
            />
          </S.FormRow>
          <S.FormRow></S.FormRow>
          <S.ButtonsWrapper>
            <Button onClick={close} type="button">
              {t('trackingDelivery.general.cancel')}
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
            >
              {t('trackingDelivery.general.save')}
            </Button>
          </S.ButtonsWrapper>
        </Form>
      </S.Container>
    </Modal>
  );
};
