import React, { useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector /* RootStateOrAny */ } from "react-redux";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { useValidation } from 'hooks';
import {
  JustificationTypesActions,
  JustificationTypesState,
} from "store/ducks/general/config/justificationTypes";
import {
  CreateInvoiceJustificationActions,
  CreateInvoiceJustificationState,
} from "store/ducks/trackingDelivery/invoice-justifications";
import * as S from "./styles";
import { Modal } from "components/shared";
import { Select, TextArea } from "components/shared/Forms";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { useTranslation } from "react-i18next";

interface Props {
  invoiceId: number;
  isOpen: boolean;
  close: () => void;
  onActionSuccess: () => void;
}

export const NewInvoiceJustification: React.FC<Props> = ({
  isOpen,
  close,
  invoiceId,
  onActionSuccess,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { data: dataJustificationType, loading: loadingJustificationType } =
    useSelector<RootState>(
      (state) => state.listJustificationTypes
    ) as JustificationTypesState;

  const { loading: loadingCreateInvoiceJustification } = useSelector(
    (state: RootState) => state.createInvoiceJustification
  ) as CreateInvoiceJustificationState;

  const onSuccess = useCallback(
    (reset: any) => {
      reset();
      close();
      onActionSuccess();
    },
    [close, onActionSuccess]
  );

  const handleSubmit = useCallback<SubmitHandler>(
    async (data, { reset }) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          justificationTypeId: Yup.string().required("Obrigatório"),
          description: Yup.string().required("Obrigatório"),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        data.documentId = invoiceId;
        dispatch(
          CreateInvoiceJustificationActions.request(data, () =>
            onSuccess(reset)
          )
        );
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, invoiceId, onSuccess]
  );

  const getListJustificationTypes = useCallback(() => {
    dispatch(JustificationTypesActions.request({
     category: 'tracking'
    }));
  }, [dispatch]);

  useEffect(() => getListJustificationTypes(), [getListJustificationTypes]);

  return (
    <Modal isOpen={isOpen}>
      <S.Container>
        <S.Header>
          <S.Title>
            <S.IconMessage />
            {t('trackingDelivery.general.new')} {t('trackingDelivery.header.justification')}
          </S.Title>
        </S.Header>
        <Form ref={formRef} onSubmit={handleSubmit} placeholder={undefined}>
          <S.FormRow>
            <Select
              name="justificationTypeId"
              label={t('trackingDelivery.header.justification')}
              isLoading={loadingJustificationType}
              isDisabled={loadingJustificationType}
              options={dataJustificationType.map((type: any) => ({
                value: type.id,
                label: type.description,
              }))}
              placeholder={t('trackingDelivery.filterForm.select')}
            />
          </S.FormRow>
          <S.FormRow>
            <TextArea name="description" label={t('trackingDelivery.header.comment')} />
          </S.FormRow>
          <S.ButtonsWrapper>
            <Button onClick={close} type="button">
              {t('trackingDelivery.general.cancel')}
            </Button>
            <Button 
              type="submit"
              disabled={loadingCreateInvoiceJustification}
            >
              {t('trackingDelivery.general.save')}
            </Button>
          </S.ButtonsWrapper>
        </Form>
      </S.Container>
    </Modal>
  );
};
