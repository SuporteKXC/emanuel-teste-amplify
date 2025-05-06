import React, { useState } from "react";
import * as S from "./styles";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { STATES } from "constants/Selects";
import { UpdateTransitTimeValidator } from "validators/TransitTimes";
import { usePermission, useValidation } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateTrackingTransitTimeActions as UpdateAction,
  FetchTrackingTransitTimeActions as FetchAction,
  DeleteTrackingTransitTimeActions as DeleteAction,
  ListCitiesActions,
  PaginateCarriersActions,
} from "store/ducks";
import { RootState } from "store";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Carrier, City, SelectOption, TrackingTransitTime } from "contracts";
import { Formatter } from "utils/Formatter";
import { ConfirmationDialog, ConfirmationDialogRef } from "components";
import {  MultiValue } from "react-select";

const clearFields = ["ufOrigin", "ufDestiny"];

export const typesOptions = [
  { value: "KM", label: "KM" },
  { value: "CIDADE", label: "CIDADE" },
];

const countOptions = [
  { value: "UTEIS", label: "ÚTEIS" },
  { value: "CORRIDOS", label: "CORRIDOS" },
];

export const UpdateTransitTime = () => {
  const minDate = Formatter.date(new Date().toISOString(), {
    format: "yyyy-MM-dd",
  });
  const formRef = React.useRef<FormHandles>(null);
  const modalRef = React.useRef<ConfirmationDialogRef>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputTypeVal, setInputTypeVal] = useState<'KM' | 'CIDADE' | null>(null)

  const [citiesOrigin, setCitiesOrigin] = React.useState<SelectOption[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [citiesDestiny, setCitiesDestiny] = React.useState<SelectOption[]>([]);
  const [carrierOptions, setCarrierOptions] = React.useState<SelectOption[]>(
    []
  );

  const { loading: updating, validationErrors: updateError } = useSelector(
    (state: RootState) => state.updateTrackingTransitTime
  );
  const { t } = useTranslation();
  const { id } = useParams();
  const { hasPermissionTo } = usePermission();
  const { handleFormErrors, handleApiErrors } = useValidation();

  const setFields = async (transitTime: TrackingTransitTime) => {
    const stateOrigin = transitTime.cityOrigin?.state;
    const stateDestiny = transitTime.cityDestiny?.state;
    const validUntil = transitTime.validUntil;

    if(stateOrigin) {
      formRef.current?.setFieldValue(
        "ufOrigin",
        STATES.find(({ value }) => value === stateOrigin)
      );
    }

    if(stateDestiny){
      formRef.current?.setFieldValue(
        "ufDestiny",
        STATES.find(({ value }) => value === stateDestiny)
      );
  
    }

    const origins = await getCitiesOrigin({ value: stateOrigin });
    const destinys = await getCitiesDestiny({ value: stateDestiny });
    const carriers = await getCarriers();

    const selectFields: any = {
      type: typesOptions as SelectOption[],
      carrierId: carriers as SelectOption[],
      ibgeOrigin: origins as SelectOption[],
      ibgeDestiny: destinys as SelectOption[],
      countFractional: countOptions as SelectOption[],
      countDedicated: countOptions as SelectOption[],
    };

    for (const [key, value] of Object.entries(transitTime)) {
      if (value) {
        if (!Object.keys(selectFields).includes(key)) {
          formRef.current?.setFieldValue(key, value);
        } else {
          const selectValue = selectFields[key].find(
            (o: SelectOption) => o.value === value
          );
          selectValue && formRef.current?.setFieldValue(key, selectValue);
        }
      }
    }

    validUntil &&
      formRef.current?.setFieldValue(
        "validUntil",
        Formatter.date(validUntil, { format: "yyyy-MM-dd" })
      );

    setInputTypeVal(transitTime.type as 'KM' | 'CIDADE')
    setLoading(false);
  };

  const getCarriers = async () =>
    await new Promise((res) => {
      dispatch(
        PaginateCarriersActions.request({ asList: true }, (data: any) => {
          const options = data.map(
            ({ id, tradeName, documentNumber }: Partial<Carrier>) => ({
              label: tradeName,
              value: id,
              carrierCnpj: documentNumber,
            })
          );
          setCarrierOptions(options);
          return res(options);
        })
      );
    });

  const getCitiesOrigin = React.useCallback(
    async (o: any): Promise<SelectOption[]> =>
      await new Promise((res) => {
        dispatch(
          ListCitiesActions.request(
            { asList: true, state: o.value },
            (cities: City[]) => {
              const origins = cities.map((city: City) => ({
                value: city.ibge,
                label: city.name,
              }));
              setCitiesOrigin(origins);
              return res(origins);
            }
          )
        );
      }),
    []
  );

  const getCitiesDestiny = React.useCallback(
    async (o: any): Promise<SelectOption[]> =>
      await new Promise((res) => {
        dispatch(
          ListCitiesActions.request(
            { asList: true, state: o.value },
            (cities: City[]) => {
              const destinys = cities.map((city: City) => ({
                value: city.ibge,
                label: city.name,
              }));
              setCitiesDestiny(destinys);
              return res(destinys);
            }
          )
        );
      }),
    []
  );

  const handleType = (newValue: MultiValue<SelectOption>) => {
    if("value" in newValue) {
      setInputTypeVal(newValue.value as 'KM' | 'CIDADE')
    }
  }


  const onSubmit = React.useCallback(
    async (data: any) => {
      const { schema } = new UpdateTransitTimeValidator();
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
          UpdateAction.request(id, { ...validData, carrierCnpj }, () =>
            navigate("/config/transit-times")
          )
        );
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [id, carrierOptions]
  );

  const onDelete = React.useCallback(async () => {
    const confirmed = await modalRef.current?.openDialog({
      title: t("general.config.carriers.desejaRemover"),
    });

    if (confirmed) {
      confirmed && dispatch(DeleteAction.request(id));
      navigate("/config/transit-times");
    }
  }, [id]);

  const getTransitTime = React.useCallback(() => {
    dispatch(FetchAction.request(id, setFields));
  }, [id]);

  React.useEffect(() => {
    getTransitTime();
  }, [getTransitTime]);

  React.useEffect(() => {
    updateError && handleApiErrors(updateError, formRef);
  }, [updateError]);

  return (
    <>
      <S.Container>
        <S.Title>
          {t("general.config.transitTimes.editarTransitTime")}{" "}
          {loading && <S.Loading />}
        </S.Title>
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
              min={minDate}
            />
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
          </S.FormRow>
          <S.FormRow>
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
            <S.Button type="submit" disabled={updating}>
              {t("general.config.transitTimes.salvar")}
            </S.Button>
            {hasPermissionTo("DELETETTRANSITTIME") && (
              <S.Button type="button" disabled={updating} onClick={onDelete}>
                {t("general.config.carriers.excluir")}
              </S.Button>
            )}
          </S.ButtonsWrapper>
        </Form>
      </S.Container>
      <ConfirmationDialog ref={modalRef} />
    </>
  );
};
