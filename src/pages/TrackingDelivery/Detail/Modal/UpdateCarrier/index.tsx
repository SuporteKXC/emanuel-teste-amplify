import React, { useRef, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector /* RootStateOrAny */ } from "react-redux";
import * as Yup from "yup";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";

import { useValidation } from "hooks";

import { CarriersListActions } from "store/ducks/trackingDelivery/carriers";
import {
  UpdateDocumentCarrierActions,
  UpdateDocumentCarrierState,
} from "store/ducks/trackingDelivery/carriers";

import { Select } from "components/shared/Forms";
import { Modal } from "components/shared";

import * as S from "./styles";

// import { Client } from "contracts/general/Client";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
// import { CountryState } from "store/ducks/country-active";
interface Props {
  invoiceId: number;
  isOpen: boolean;
  close: () => void;
  onActionSuccess: () => void;
  // client: Client | null | undefined;
}
import { useTranslation } from "react-i18next";

export const UpdateCarrier: React.FC<Props> = ({
  isOpen,
  close,
  invoiceId,
  onActionSuccess,
  // client,
}) => {
  const { t } = useTranslation();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const [showQuestion, setShowQuestion] = useState(false);

  const { data: dataCarriers, loading: loadingCarriers } = useSelector(
    (state: RootState) => state.carriersList
  );

  const { loading: loadingUpdateInvoice } = useSelector<RootState>(
    (state) => state.updateDocumentCarrier
  ) as UpdateDocumentCarrierState;

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
          carrierId: Yup.string().required("Obrigatório"),
          // notify_carrier: showQuestion
          //   ? Yup.string().required('Obrigatório')
          //   : Yup.string(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        data.documentId = invoiceId;

        dispatch(
          UpdateDocumentCarrierActions.request(data, () => onSuccess(reset))
        );
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [
      dispatch,
      // getTranslation,
      handleFormErrors,
      invoiceId,
      onSuccess,
      showQuestion,
    ]
  );

  // const { country: countryActive } = useSelector<RootStateOrAny, CountryState>(
  //   (state) => state.country
  // );

  const getListCarriers = useCallback(() => {
    dispatch(CarriersListActions.request());
  }, [dispatch]);

  useEffect(() => {
    getListCarriers();
  }, [getListCarriers]);

  // useEffect(() => {
  //   if (client && client.scheduling_required) {
  //     setShowQuestion(() => true);
  //   }
  // }, [client]);

  return (
    <Modal isOpen={isOpen}>
      <S.Container>
        <S.Header>
          <S.Title>
            <S.Icon />
            {t("trackingDelivery.header.updateCarrier")}
          </S.Title>
        </S.Header>
        <Form ref={formRef} onSubmit={handleSubmit} placeholder={undefined}>
          <S.FormRow>
            <Select
              name="carrierId"
              label={t("trackingDelivery.fields.carrier")}
              options={dataCarriers.map((carrier) => ({
                value: carrier.id,
                label: carrier.tradeName,
              }))}
              isLoading={loadingCarriers}
              isDisabled={loadingCarriers}
              placeholder={t("trackingDelivery.filterForm.select")}
            />
          </S.FormRow>
          {showQuestion && (
            <S.FormRow>
              <Select
                name="notify_carrier"
                label="Notificar transportadora?"
                options={[
                  { value: "true", label: "Sim" },
                  { value: "false", label: "Não" },
                ]}
                placeholder="Selecione"
              />
              <S.FormRow />
            </S.FormRow>
          )}

          <S.ButtonsWrapper>
            <Button onClick={close} type="button">
              {t("trackingDelivery.general.cancel")}
            </Button>
            <Button 
              type="submit"
              disabled={loadingUpdateInvoice}
            >
              {t("trackingDelivery.general.save")}
            </Button>
          </S.ButtonsWrapper>
        </Form>
      </S.Container>
    </Modal>
  );
};
