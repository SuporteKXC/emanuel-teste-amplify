import React, { useCallback, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useValidation } from "hooks";
import { Input, Select } from "components/shared/Forms";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";

import {
  UpdateTransitTimeActions as MainActions,
  ShowTransitTimeActions,
} from "store/ducks";

import * as Yup from "yup";
import * as S from "./styles";

export const UpdateTransitTime: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
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

  const { loading: loadingUpdate } = useSelector(
    (state: RootState) => state.updateTransitTime
  );

  const { data: dataTransitTime, loading } = useSelector(
    (state: RootState) => state.showTransitTime
  );

  const showTransitTime = useCallback(() => {
    dispatch(ShowTransitTimeActions.request(id));
  }, [dispatch, id]);

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
        dispatch(
          MainActions.request(dataTransitTime?.id, validData, onSuccess)
        );
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

  useEffect(() => {
    if (id) {
      showTransitTime();
    }
  }, [id]);

  return (
    <>
      <S.Header>{t("comex.settings.transitTime.create")}</S.Header>
      <S.Container>
        <Form ref={formRef} onSubmit={onSubmit} placeholder="">
          {loading ? (
            <S.ActivityIndicator />
          ) : (
            <S.GridContainer>
              <Input
                name="cnpj"
                label={t("comex.settings.transitTime.cnpj")}
                defaultValue={dataTransitTime?.cnpj}
              />
              <Select
                name="modal"
                options={ModalOption}
                label={t("comex.settings.transitTime.modal")}
                placeholder={t("comex.filterandButton.selectPlaceholder")}
                defaultValue={ModalOption.find(
                  (el) => el.value === dataTransitTime?.modal
                )}
              />
              <Select
                name="critical"
                options={CriticalOption}
                label={t("comex.settings.transitTime.critical")}
                placeholder={t("comex.filterandButton.selectPlaceholder")}
                defaultValue={CriticalOption.find(
                  (el) => el.value === dataTransitTime?.critical
                )}
              />

              <Input
                name="port_entry_date"
                label={t("comex.settings.transitTime.portEntryDate")}
                defaultValue={dataTransitTime?.port_entry_date}
              />

              <Input
                name="post_import_license_release_date"
                label={t(
                  "comex.settings.transitTime.postImportLicenseReleaseDate"
                )}
                defaultValue={dataTransitTime?.post_import_license_release_date}
              />

              <Input
                name="protocol_mapa_in26_date"
                label={t("comex.settings.transitTime.protocolMapaIn26Date")}
                defaultValue={dataTransitTime?.protocol_mapa_in26_date}
              />

              <Input
                name="data_do_registro_da_di"
                label={t("comex.settings.transitTime.registroDateDi")}
                defaultValue={dataTransitTime?.data_do_registro_da_di}
              />

              <Input
                name="customs_clearance_date"
                label={t("comex.settings.transitTime.customsClearanceDate")}
                defaultValue={dataTransitTime?.customs_clearance_date}
              />

              <Input
                name="nf_date"
                label={t("comex.settings.transitTime.nfDate")}
                defaultValue={dataTransitTime?.nf_date}
              />
              <Input
                name="transport_doc_delivery_date"
                label={t("comex.settings.transitTime.transportDocDeliveryDate")}
                defaultValue={dataTransitTime?.transport_doc_delivery_date}
              />
              <Input
                name="loading_at_the_terminal"
                label={t("comex.settings.transitTime.loadingTerminal")}
                defaultValue={dataTransitTime?.loading_at_the_terminal}
              />
              <Input
                name="entrega_na_planta"
                label={t("comex.settings.transitTime.entregaPlanta")}
                defaultValue={dataTransitTime?.entrega_na_planta}
              />
              <Input
                name="gr_efetivo"
                label={t("comex.settings.transitTime.grEfetivo")}
                defaultValue={dataTransitTime?.gr_efetivo}
              />
            </S.GridContainer>
          )}

          <S.ButtonsContainer>
            <S.FormActions>
              <S.Button mood="secondary" type="submit">
                {loading || loadingUpdate ? (
                  <S.ActivityIndicator />
                ) : (
                  t("comex.filterandButton.update")
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
