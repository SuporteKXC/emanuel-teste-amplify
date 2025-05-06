import React from "react";
import * as S from "./styles";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { useAddressLookup } from "hooks/addressLookup";
import { STATES, DOCUMENT_TYPES } from "constants/Selects";
import { UpdateCarrierValidator } from "validators/Carriers";
import { usePermission, useValidation } from "hooks";
import { useCountries } from "hooks/useCountries";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchCarrierActions,
  UpdateCarrierActions,
  DeleteCarrierActions,
} from "store/ducks";
import { RootState } from "store";
import { useNavigate, useParams } from "react-router-dom";
import { SelectOption } from "contracts";
import { ConfirmationDialog, ConfirmationDialogRef } from "components/shared";
import { useTranslation } from "react-i18next";
import CodeSapAddressForm from "../CodeSapAddressForm";

const mask: any = {
  cpf: "999.999.999-99",
  cnpj: "99.999.999/9999-99",
  other: "",
};

export const UpdateCarrier = () => {
  const formRef = React.useRef<FormHandles>(null);
  const modalRef = React.useRef<ConfirmationDialogRef>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [docMask, setDocMask] = React.useState<string>(mask.cnpj);

  const { id } = useParams();
  const { t } = useTranslation();
  const { handleFormErrors, handleApiErrors } = useValidation();
  const { listCountries, countriesOptions, defaultCountry } = useCountries();
  const { hasPermissionTo } = usePermission();
  const { onZipcodeChange, fetchingAddress } = useAddressLookup(formRef);

  const enableDelete = hasPermissionTo("DELETECARRIER");

  const { loading: updating, validationErrors: updateError } = useSelector(
    (state: RootState) => state.updateCarrier
  );
  const { data: carrier, loading: loadingCarrier } = useSelector(
    (state: RootState) => state.fetchCarrier
  );
  const selectFields: any = {
    addressState: STATES as SelectOption[],
    addressCountry: countriesOptions as SelectOption[],
    documentType: DOCUMENT_TYPES as SelectOption[],
  };

  const populateSubForm = (value: any) => {
    Object.entries(value).forEach(([subKey, subValue]) => {
      let field = `codeSap.${subKey}`;

      if (subKey === "addressState") {
        const selectValue = selectFields[subKey].find(
          (o: any) => o.value === subValue
        );

        selectValue && formRef.current?.setFieldValue(field, selectValue);
      } else {
        formRef.current?.setFieldValue(field, subValue);
      }
    });
  };

  const setFields = React.useCallback(() => {
    if (carrier && countriesOptions.length) {
      for (const [key, value] of Object.entries(carrier)) {
        if (value) {
          if (!Object.keys(selectFields).includes(key)) {
            if (typeof value === "object") {
              populateSubForm(value);
            }

            formRef.current?.setFieldValue(key, value);
          } else {
            const selectValue = selectFields[key].find(
              (o: any) => o.value === value
            );
            selectValue && formRef.current?.setFieldValue(key, selectValue);
          }
        }
      }
    }
  }, [carrier, countriesOptions]);

  const fetchCarrier = React.useCallback(
    () => !carrier && dispatch(FetchCarrierActions.request(id)),
    [carrier, id]
  );

  const onSubmit = async (data: any) => {
   
    try {


      const carrierData = {
        ...data,
        codeSap: {
          ...data?.codeSap,
          id: carrier?.carrierCodeSaps?.id ?? null,
          carrierId: id,
        }
      };

      const { schema } = new UpdateCarrierValidator(carrierData);
      formRef.current?.setErrors({});

      await schema.validate(carrierData, {
        abortEarly: false,
      });

      dispatch(
        UpdateCarrierActions.request(id, carrierData, () =>
          navigate("/config/carriers")
        )
      );
    } catch (error) {
      console.log(error)
      handleFormErrors(error, formRef);
    }
  };

  const onDelete = React.useCallback(async () => {
    const confirmed = await modalRef.current?.openDialog({
      title: t("general.config.carriers.desejaRemover"),
    });

    if (confirmed) {
      confirmed && dispatch(DeleteCarrierActions.request(id));
      navigate("/config/carriers");
    }
  }, [id]);

  const onTypeChange = React.useCallback(
    (o: any) => o && setDocMask(mask[o.value]),
    []
  );

  React.useEffect(() => {
    listCountries();
  }, [listCountries]);

  React.useEffect(() => {
    setFields();
  }, [setFields]);

  React.useEffect(() => {
    fetchCarrier();

    return () => {
      dispatch(FetchCarrierActions.reset());
      formRef.current?.reset();
    };
  }, []);

  React.useEffect(() => {
    updateError && handleApiErrors(updateError, formRef);
  }, [updateError]);

  return (
    <>
      <S.Container>
        <S.Title>
          {t("general.config.carriers.editarTransportadora")}{" "}
          {loadingCarrier && <S.Loading />}
        </S.Title>
        <Form ref={formRef} onSubmit={onSubmit} placeholder="">
          <S.FormRow>
            <S.MaskedInput
              name="documentNumber"
              label={t("general.config.carriers.documento")}
              mask={docMask}
            />
            <S.Input
              name="codeSap.codeSap"
              label={t("general.config.carriers.codSap")}
            />
            <S.Input name="tradeName" label="Nome Fantasia" />
            <S.Select
              name="documentType"
              label={t("general.config.carriers.tipoDocumento")}
              options={DOCUMENT_TYPES}
              onChange={onTypeChange}
              defaultValue={DOCUMENT_TYPES[0]}
            />
            <S.Select
              name="addressCountry"
              label={t("general.config.carriers.pais")}
              options={countriesOptions}
              defaultValue={defaultCountry}
            />
          </S.FormRow>
          <S.FormRow>
            <S.Input
              name="addressZipcode"
              label={t("general.config.carriers.cep")}
              onChange={onZipcodeChange}
              isLoading={fetchingAddress}
            />
            <S.Select
              name="addressState"
              label={t("general.config.carriers.uf")}
              options={STATES}
            />
            <S.Input
              name="addressCity"
              label={t("general.config.carriers.cidade")}
            />
            <S.Input
              name="addressNeighborhood"
              label={t("general.config.carriers.bairro")}
            />
          </S.FormRow>
          <S.FormRow>
            <S.Input
              name="addressStreet"
              label={t("general.config.carriers.logradouro")}
            />
            <S.Input
              name="addressNumber"
              label={t("general.config.carriers.numero")}
            />
            <S.Input
              name="addressComplement"
              label={t("general.config.carriers.complemento")}
            />
          </S.FormRow>
          <S.FormRow>
            <S.Input
              name="addressLatitude"
              label={t("general.config.carriers.latitude")}
            />
            <S.Input
              name="addressLongitude"
              label={t("general.config.carriers.longitude")}
            />
            <S.Input
              name="addressIbgeCode"
              label={t("general.config.carriers.codigoIBGE")}
            />
          </S.FormRow>
          <S.ButtonsWrapper>
            <S.Button type="reset" onClick={() => navigate("/config/carriers")}>
              {t("general.config.carriers.cancelar")}
            </S.Button>
            <S.Button type="submit" disabled={updating}>
              {t("general.config.carriers.salvar")}
            </S.Button>
            {enableDelete && (
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