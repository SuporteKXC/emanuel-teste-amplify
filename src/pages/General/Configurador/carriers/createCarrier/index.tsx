import React from "react";
import * as S from "./styles";
import { CarriersTopPanel } from "layouts";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { useAddressLookup } from "hooks/addressLookup";
import { STATES, DOCUMENT_TYPES } from "constants/Selects";
import { CreateCarrierValidator } from "validators/Carriers";
import { useValidation } from "hooks";
import { useCountries } from "hooks/useCountries";
import { useDispatch, useSelector } from "react-redux";
import { CreateCarrierActions } from "store/ducks";
import { RootState } from "store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CodeSapAddressForm from "../CodeSapAddressForm";

const mask: any = {
  cpf: "999.999.999-99",
  cnpj: "99.999.999/9999-99",
  other: "",
};

export const CreateCarrier = () => {
  const formRef = React.useRef<FormHandles>(null);
  const formSapRef = React.useRef<FormHandles>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [docMask, setDocMask] = React.useState<string>(mask.cnpj);

  const { loading: creating, validationErrors: createError } = useSelector(
    (state: RootState) => state.createCarrier
  );
  const { t } = useTranslation();
  const { handleFormErrors, handleApiErrors } = useValidation();
  const { listCountries, countriesOptions, defaultCountry } = useCountries();
  const { onZipcodeChange, fetchingAddress } = useAddressLookup(formRef);

  const onSubmit = React.useCallback(async (data: any) => {
    const { schema } = new CreateCarrierValidator(data);
    formRef.current?.setErrors({});

    await schema
      .validate(data, {
        abortEarly: false,
      })
      .then((validData) => {
        dispatch(
          CreateCarrierActions.request(validData, () =>
            navigate("/config/carriers")
          )
        );
        formRef.current?.reset();
      })
      .catch((error) => {
        console.log(error);
        handleFormErrors(error, formRef);
      });
  }, []);

  const onTypeChange = React.useCallback(
    (o: any) => setDocMask(mask[o.value]),
    []
  );

  React.useEffect(() => {
    listCountries();
  }, []);

  React.useEffect(() => {
    createError && handleApiErrors(createError, formRef);
  }, [createError]);

  return (
    <>
      <CarriersTopPanel />
      <S.Container>
        <Form ref={formRef} onSubmit={onSubmit} placeholder="">
          <S.FormRow>
            <S.MaskedInput
              name="documentNumber"
              label="Documento"
              mask={docMask}
            />
            <S.Input
              name="codeSap.codeSap"
              label={t("general.config.carriers.codSap")}
            />
            <S.Input
              name="tradeName"
              label={t("general.config.carriers.nomeFantasia")}
            />
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
            <S.Button type="submit" disabled={creating}>
              {t("general.config.carriers.salvar")}
            </S.Button>
          </S.ButtonsWrapper>
        </Form>
      </S.Container>
    </>
  );
};