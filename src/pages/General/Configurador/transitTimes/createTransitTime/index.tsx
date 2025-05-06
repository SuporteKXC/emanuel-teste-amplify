import React, { useState } from "react";
import * as S from "./styles";
import { TransitTimesTopPanel } from "layouts";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { STATES } from "constants/Selects";
import { CreateTransitTimeValidator } from "validators/TransitTimes";
import { useValidation } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateTrackingTransitTimeActions as CreateAction,
  ListCitiesActions,
  PaginateCarriersActions,
} from "store/ducks";
import { RootState } from "store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Carrier, City, SelectOption } from "contracts";
import { Formatter } from "utils/Formatter";
import { MultiValue } from "react-select";

const clearFields = ["ufOrigin", "ufDestiny"];

const typesOptions = [
  { value: "KM", label: "KM" },
  { value: "CIDADE", label: "CIDADE" },
];

const countOptions = [
  { value: "UTEIS", label: "ÚTEIS" },
  { value: "CORRIDOS", label: "CORRIDOS" },
];

export const CreateTransitTime = () => {
  const formRef = React.useRef<FormHandles>(null);
  const minDate = Formatter.date(new Date().toISOString(), {
    format: "yyyy-MM-dd",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [citiesOrigin, setCitiesOrigin] = React.useState<SelectOption[]>([]);
  const [citiesDestiny, setCitiesDestiny] = React.useState<SelectOption[]>([]);
  const [carrierOptions, setCarrierOptions] = React.useState<SelectOption[]>(
    []
  );
  const [inputTypeVal, setInputTypeVal] = useState<'KM' | 'CIDADE' | null>(null)

  const { loading: creating, validationErrors: createError } = useSelector(
    (state: RootState) => state.createTrackingTransitTime
  );
  const { t } = useTranslation();
  const { handleFormErrors, handleApiErrors } = useValidation();

  const getCarriers = () => {
    dispatch(
      PaginateCarriersActions.request({ asList: true }, (data: any) => {
        setCarrierOptions(
          data.map(({ id, tradeName, documentNumber }: Partial<Carrier>) => ({
            label: tradeName,
            value: id,
            carrierCnpj: documentNumber,
          }))
        );
      })
    );
  };

  const getCitiesOrigin = React.useCallback((o: any) => {
    dispatch(
      ListCitiesActions.request(
        { asList: true, state: o.value },
        (cities: City[]) =>
          setCitiesOrigin(
            cities.map((city: City) => ({
              value: city.ibge,
              label: city.name,
            }))
          )
      )
    );
  }, []);

  const getCitiesDestiny = React.useCallback((o: any) => {
    dispatch(
      ListCitiesActions.request(
        { asList: true, state: o.value },
        (cities: City[]) =>
          setCitiesDestiny(
            cities.map((city: City) => ({
              value: city.ibge,
              label: city.name,
            }))
          )
      )
    );
  }, []);

  const handleType = (newValue: MultiValue<SelectOption>) => {

    formRef.current?.setFieldValue('ufDestiny', '')
    formRef.current?.setFieldValue('ibgeDestiny', '')
    formRef.current?.setFieldValue('kmInitial', '')
    formRef.current?.setFieldValue('kmFinal','')

    if("value" in newValue) {
      setInputTypeVal(newValue.value as 'KM' | 'CIDADE')
    }

  }

  const onSubmit = React.useCallback(
    async (data: any) => {
      const { schema } = new CreateTransitTimeValidator();
      formRef.current?.setErrors({});

      try {
        const validData = await schema.validate(data, {
          abortEarly: false,
        });

        clearFields.forEach((f) => delete validData[f]);

        const carrierId = formRef.current?.getFieldValue("carrierId");
        const { carrierCnpj } = carrierOptions.find(
          ({ value }) => value == carrierId
        ) as any;

        dispatch(
          CreateAction.request({ ...validData, carrierCnpj }, () =>
            navigate("/config/tracking-transit-times")
          )
        );
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [carrierOptions]
  );

  React.useEffect(() => {
    createError && handleApiErrors(createError, formRef);
  }, [createError]);

  React.useEffect(() => {
    !carrierOptions.length && getCarriers();
  }, []);

  return (
    <>
      <TransitTimesTopPanel />
      <S.Container>
        <Form ref={formRef} onSubmit={onSubmit} placeholder="">
          <S.FormRow>
            <S.Select
              label={t("general.config.transitTimes.transportadora")}
              name="carrierId"
              options={carrierOptions}
            />
            <S.Select label="Tipo" name="type" options={typesOptions} onChange={handleType} />
            <S.Select
              label={t("general.config.transitTimes.ufOrigem")}
              name="ufOrigin"
              options={STATES}
              onChange={getCitiesOrigin}
            />
            <S.Select
              label={t("general.config.transitTimes.cidadeOrigem")}
              name="ibgeOrigin"
              options={citiesOrigin}
            />
          </S.FormRow>
          <S.FormRow>
            <S.Select
              label={t("general.config.transitTimes.ufDestino")}
              name="ufDestiny"
              options={STATES}
              onChange={getCitiesDestiny}
              isDisabled={inputTypeVal !== 'CIDADE'}
            />
            <S.Select
              label={t("general.config.transitTimes.cidadeDestino")}
              name="ibgeDestiny"
              options={citiesDestiny}
              isDisabled={inputTypeVal !== 'CIDADE'}
            />
            <S.Input
              label={"KM inicial"}
              name="kmInitial"
              type="number"
              min="0"
              disabled={inputTypeVal !== 'KM'}
            />
            <S.Input
              label={"KM final"}
              name="kmFinal"
              type="number"
              min="0"
              disabled={inputTypeVal !== 'KM'}
            />
          </S.FormRow>
          <S.FormRow>
          <S.Input
              label={t("general.config.transitTimes.peso")}
              name="weight"
              type="number"
              min="0"
            />
            <S.Input
              label={t("general.config.transitTimes.inicio")}
              name="start"
              type="number"
              min="0"
            />
            <S.MaskedInput
              label={t("general.config.transitTimes.horaDeCorte")}
              name="cutHour"
              mask="99:99"
            />
            <S.Input
              label={t("general.config.transitTimes.validade")}
              name="validUntil"
              type="date"
            />
          </S.FormRow>
          <S.FormRow>
          <S.Select
              label={t("general.config.transitTimes.contagemFracionado")}
              name="countFractional"
              options={countOptions}
            />
            <S.Input
              label={t("general.config.transitTimes.prazoFracionado")}
              name="deadlineFractional"
              type="number"
              min="0"
            />
            <S.Select
              label={t("general.config.transitTimes.contagemLotacao")}
              name="countDedicated"
              options={countOptions}
            />
            <S.Input
              label={t("general.config.transitTimes.prazoLotacao")}
              name="deadlineDedicated"
              type="number"
              min="0"
            />
          </S.FormRow>
          <S.ButtonsWrapper>
            <S.Button
              type="reset"
              onClick={() => navigate("/config/tracking-transit-times")}
            >
              {t("general.config.transitTimes.cancelar")}
            </S.Button>
            <S.Button type="submit" disabled={creating}>
              {t("general.config.transitTimes.salvar")}
            </S.Button>
          </S.ButtonsWrapper>
        </Form>
      </S.Container>
    </>
  );
};
