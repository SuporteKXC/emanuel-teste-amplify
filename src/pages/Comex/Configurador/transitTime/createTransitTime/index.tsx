import React, { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useValidation } from "hooks";
import { Input, Select } from "components/shared/Forms";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";

import { NewTransitTimeActions as MainActions } from "store/ducks";

import * as Yup from "yup";
import * as S from "./styles";
export const CreateTransitTime: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const navigate = useNavigate();
  const ModalOption = [
    {
      label: t("comex.filterandButton.maritime"),
      value: "MARITIMA",
    },
    {
      label: t("comex.filterandButton.air"),
      value: "AEREA",
    },
    {
      label: t("comex.filterandButton.road"),
      value: "RODOVIARIA",
    },
  ];
  const CriticalOption = [
    {
      label: t("comex.filterandButton.yes"),
      value: 1,
    },
    {
      label: t("comex.filterandButton.no"),
      value: 0,
    },
  ];

  const { loading } = useSelector((state: RootState) => state.newTrasitTime);

  const onSubmit = useCallback(
    async (data: any): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          cnpj: Yup.string(),
          modal: Yup.string().required(t("message.fieldMandatory")),
          critical: Yup.string().required(t("message.fieldMandatory")),
          port_entry_date: Yup.string()
            .required(t("message.fieldMandatory"))
            .test("is-number", `${t("message.fieldNumber")}`, function (value) {
              return /^\d+$/.test(String(value));
            }),
          post_import_license_release_date: Yup.string()
            .required(t("message.fieldMandatory"))
            .test("is-number", `${t("message.fieldNumber")}`, function (value) {
              return /^\d+$/.test(String(value));
            }),
          protocol_mapa_in26_date: Yup.string()
            .required(t("message.fieldMandatory"))
            .test("is-number", `${t("message.fieldNumber")}`, function (value) {
              return /^\d+$/.test(String(value));
            }),
          data_do_registro_da_di: Yup.string()
            .required(t("message.fieldMandatory"))
            .test("is-number", `${t("message.fieldNumber")}`, function (value) {
              return /^\d+$/.test(String(value));
            }),
          customs_clearance_date: Yup.string()
            .required(t("message.fieldMandatory"))
            .test("is-number", `${t("message.fieldNumber")}`, function (value) {
              return /^\d+$/.test(String(value));
            }),
          nf_date: Yup.string()
            .required(t("message.fieldMandatory"))
            .test("is-number", `${t("message.fieldNumber")}`, function (value) {
              return /^\d+$/.test(String(value));
            }),
          transport_doc_delivery_date: Yup.string()
            .required(t("message.fieldMandatory"))
            .test("is-number", `${t("message.fieldNumber")}`, function (value) {
              return /^\d+$/.test(String(value));
            }),
          loading_at_the_terminal: Yup.string()
            .required(t("message.fieldMandatory"))
            .test("is-number", `${t("message.fieldNumber")}`, function (value) {
              return /^\d+$/.test(String(value));
            }),
          entrega_na_planta: Yup.string()
            .required(t("message.fieldMandatory"))
            .test("is-number", `${t("message.fieldNumber")}`, function (value) {
              return /^\d+$/.test(String(value));
            }),
          gr_efetivo: Yup.string()
            .required(t("message.fieldMandatory"))
            .test("is-number", `${t("message.fieldNumber")}`, function (value) {
              return /^\d+$/.test(String(value));
            }),
        });

        const validData = await schema.validate(data, {
          abortEarly: false,
        });

        data.critical = Boolean(data.critical);
        dispatch(MainActions.request(validData, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors]
  );

  const onSuccess = () => {
    formRef.current?.setFieldValue("cnpj", "");
    formRef.current?.setFieldValue("modal", "");
    formRef.current?.setFieldValue("critical", "");
    formRef.current?.setFieldValue("port_entry_date", "");
    formRef.current?.setFieldValue("post_import_license_release_date", "");
    formRef.current?.setFieldValue("protocol_mapa_in26_date", "");
    formRef.current?.setFieldValue("data_do_registro_da_di", "");
    formRef.current?.setFieldValue("nf_date", "");
    formRef.current?.setFieldValue("transport_doc_delivery_date", "");
    formRef.current?.setFieldValue("loading_at_the_terminal", "");
    formRef.current?.setFieldValue("entrega_na_planta", "");
    formRef.current?.setFieldValue("gr_efetivo", "");

    navigate(`/configuracoes/transit-time`);
  };

  return (
    <>
      <S.Header>{t("comex.settings.transitTime.create")}</S.Header>
      <S.Container>
        <Form ref={formRef} onSubmit={onSubmit} placeholder="">
          <S.GridContainer>
            <Input name="cnpj" label={t("comex.settings.transitTime.cnpj")} />
            <Select
              name="modal"
              options={ModalOption}
              label={t("comex.settings.transitTime.modal")}
              placeholder={t("comex.filterandButton.selectPlaceholder")}
            />
            <Select
              name="critical"
              options={CriticalOption}
              label={t("comex.settings.transitTime.critical")}
              placeholder={t("comex.filterandButton.selectPlaceholder")}
            />

            <Input
              name="port_entry_date"
              label={t("comex.settings.transitTime.portEntryDate")}
            />

            <Input
              name="post_import_license_release_date"
              label={t(
                "comex.settings.transitTime.postImportLicenseReleaseDate"
              )}
            />

            <Input
              name="protocol_mapa_in26_date"
              label={t("comex.settings.transitTime.protocolMapaIn26Date")}
            />

            <Input
              name="data_do_registro_da_di"
              label={t("comex.settings.transitTime.registroDateDi")}
            />

            <Input
              name="customs_clearance_date"
              label={t("comex.settings.transitTime.customsClearanceDate")}
            />

            <Input
              name="nf_date"
              label={t("comex.settings.transitTime.nfDate")}
            />
            <Input
              name="transport_doc_delivery_date"
              label={t("comex.settings.transitTime.transportDocDeliveryDate")}
            />
            <Input
              name="loading_at_the_terminal"
              label={t("comex.settings.transitTime.loadingTerminal")}
            />
            <Input
              name="entrega_na_planta"
              label={t("comex.settings.transitTime.entregaPlanta")}
            />
            <Input
              name="gr_efetivo"
              label={t("comex.settings.transitTime.grEfetivo")}
            />
          </S.GridContainer>
          <S.ButtonsContainer>
            <S.FormActions>
              <S.Button mood="secondary" type="submit">
                {loading ? (
                  <S.ActivityIndicator />
                ) : (
                  t("comex.filterandButton.register")
                )}
              </S.Button>
              <S.Button onClick={() => navigate(-1)} type="reset">
                {t("comex.filterandButton.cancel")}
              </S.Button>
            </S.FormActions>
          </S.ButtonsContainer>
        </Form>
      </S.Container>
    </>
  );
};
