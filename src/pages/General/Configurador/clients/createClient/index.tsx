import React, { useRef, useState } from "react";
import * as S from "./styles";
import { ClientsTopPanel } from "layouts";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { useAddressLookup } from "hooks/addressLookup";
import { STATES, DOCUMENT_TYPES } from "constants/Selects";
import { CreateClientValidator } from "validators/Clients";
import { useValidation } from "hooks";
import { useCountries } from "hooks/useCountries";
import { useDispatch, useSelector } from "react-redux";
import { CreateClientActions } from "store/ducks";
import { RootState } from "store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { dayOptions } from "constants/Common";
import { AddCodeSapValidator } from "@/validators/Clients/AddCodeSap";

import { ClientDocumentType, TCodeSap } from "@/contracts";
import ModalSapClient, { ModalSapClientHandles } from "../ModalSapClient";
import CodeSapAddressForm from "../codeSapAddressForm";
import { notify } from "@/services";
import { ToggleInput } from "@/components";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ClientFormData {
  docType: boolean;
  tradeName: string;
  documentType: ClientDocumentType;
  addressCountry: string;
  email: string;
  addressZipcode: string;
  addressState: string;
  addressCity: string;
  addressNeighborhood: string;
  addressStreet: string;
  addressNumber: string;
  addressComplement: string;
  addressLatitude: string;
  addressLongitude: string;
  addressIbgeCode: string;
  days: string[];
  documentNumber: string;
}
const mask: any = {
  cpf: "999.999.999-99",
  cnpj: "99.999.999/9999-99",
  other: "",
};

export const CreateClient = () => {
  const formRef = React.useRef<FormHandles>(null);
  const formSapRef = React.useRef<FormHandles>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [docMask, setDocMask] = React.useState<string>(mask.cnpj);

  const [codeSap, setCodeSap] = React.useState<TCodeSap[]>([]);
  const [selectedCodeSap, setSelectedCodeSap] = React.useState<TCodeSap | null>(
    null
  );
  const modalSapClientRef = useRef<ModalSapClientHandles>(null);

  const { loading: creating, validationErrors: createError } = useSelector(
    (state: RootState) => state.createClient
  );
  const { t } = useTranslation();
  const { handleFormErrors, handleApiErrors } = useValidation();
  const { listCountries, countriesOptions, defaultCountry } = useCountries();
  const { onZipcodeChange, fetchingAddress } = useAddressLookup(formRef);

  const days = React.useMemo(
    () =>
      dayOptions.map(({ label, ...rest }) => ({
        ...rest,
        label: t(`general.config.clients.${label}`),
      })),
    []
  );

  const onSubmit = async (data: ClientFormData) => {
    const dataWithSapCodes = { ...data, codeSap, email: data.email.split(";") };
    const { schema } = new CreateClientValidator(dataWithSapCodes);
    formRef.current?.setErrors({});

    await schema
      .validate(dataWithSapCodes, {
        abortEarly: false,
      })
      .then((validData) => {
        dispatch(
          CreateClientActions.request(validData, () =>
            navigate("/config/clients")
          )
        );

        formRef.current?.reset();
      })
      .catch((error) => {
        // console.log("error", error.errors);
        handleFormErrors(error, formRef);
      });
  };

  const onTypeChange = React.useCallback(
    (o: any) => setDocMask(mask[o.value]),
    []
  );

  const onSubmitFormSap = async (data: any) => {
    try {
      const hasAdded = codeSap.findIndex((sap) => sap.codeSap === data.codeSap);

      if (hasAdded !== -1) {
        notify("error", "Este código SAP já foi adicionado");
        return;
      }

      const { schema } = new AddCodeSapValidator();
      formSapRef.current?.setErrors({});
      await schema.validate(data, { abortEarly: false });

      setCodeSap([...codeSap, data]);
      formSapRef.current?.reset();
    } catch (error) {
      handleFormErrors(error, formSapRef);
    }
  };

  const removeCodeSap = (code: string) => {
    const saps = [...codeSap];
    const removed = saps.filter((sap) => sap.codeSap !== code);
    setCodeSap(removed);
  };

  const editCodeSap = (code: string) => {
    const saps = [...codeSap];
    const sap = saps.find((sap) => sap.codeSap === code);

    if (sap) {
      setSelectedCodeSap(sap);
      modalSapClientRef.current?.open();
    }
  };

  const updateCodeSap = (val: TCodeSap) => {
    const saps = [...codeSap];

    const index = saps.findIndex((sap) => sap.codeSap === val.codeSap);

    if (index !== -1) {
      saps[index] = val;
      modalSapClientRef.current?.close();
      setCodeSap(saps);
    }
  };

  React.useEffect(() => {
    listCountries();
  }, []);

  React.useEffect(() => {
    createError && handleApiErrors(createError, formRef);
  }, [createError]);

  const [docType, setDocType] = useState<"nacional" | "estrangeiro">(
    "nacional"
  );
  const handleDocType = (event: any) => {
    if (!event.target?.checked) {
      setDocType("nacional");
    } else {
      setDocType("estrangeiro");
    }
  };

  return (
    <>
      <ClientsTopPanel />
      <S.Container>
        <Form ref={formRef} onSubmit={onSubmit} placeholder="">
          <S.FormRow>
          <div className="mr-4 mt-1">
            <ToggleInput name="docType" label={`${docType.charAt(0).toUpperCase()}${docType.slice(1)}`} onChange={handleDocType}/>
          </div>
            {docType === 'estrangeiro' &&
             (  <S.Input
               name="documentNumber"
               label="Id Exterior"
             />)
            }
           { docType === 'nacional' && 
              (<S.MaskedInput
                  name="documentNumber"
                  label="Documento"
                  mask={docMask}
              />)
            }
            <S.Input
              name="tradeName"
              label={t("general.config.clients.nomeFantasia")}
            />
            <S.Select
              name="documentType"
              label={t("general.config.clients.tipoDocumento")}
              options={DOCUMENT_TYPES}
              onChange={onTypeChange}
              defaultValue={DOCUMENT_TYPES[0]}
            />
            <S.Select
              name="addressCountry"
              label={t("general.config.clients.pais")}
              options={countriesOptions}
              defaultValue={defaultCountry}
            />
          </S.FormRow>
          <S.FormRow>
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex w-full flex-row justify-start gap-4">
                    <S.Input labelStyle={{display: 'flex'}} name="email" label="E-mail" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs font-sans text-xs p-4">
                    <p>É possível incluir vários e-mails separados por ";".</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          </S.FormRow>
          <S.FormRow>
            <S.Input
              name="addressZipcode"
              label={t("general.config.clients.cep")}
              onChange={onZipcodeChange}
              isLoading={fetchingAddress}
            />
            <S.Select
              name="addressState"
              label={t("general.config.clients.uf")}
              options={STATES}
            />
            <S.Input
              name="addressCity"
              label={t("general.config.clients.cidade")}
            />
            <S.Input
              name="addressNeighborhood"
              label={t("general.config.clients.bairro")}
            />
          </S.FormRow>
          <S.FormRow>
            <S.Input
              name="addressStreet"
              label={t("general.config.clients.logradouro")}
            />
            <S.Input
              name="addressNumber"
              label={t("general.config.clients.numero")}
            />
            <S.Input
              name="addressComplement"
              label={t("general.config.clients.complemento")}
            />
          </S.FormRow>
          <S.FormRow>
            <S.Input
              name="addressLatitude"
              label={t("general.config.clients.latitude")}
            />
            <S.Input
              name="addressLongitude"
              label={t("general.config.clients.longitude")}
            />
            <S.Input
              name="addressIbgeCode"
              label={t("general.config.clients.codigoIBGE")}
            />
          </S.FormRow>
          <S.FormRow>
            <S.CheckboxWrapper>
              <S.SubTitle>Dias da semana</S.SubTitle>
              <S.CheckboxInput name="days" options={days} />
            </S.CheckboxWrapper>
          </S.FormRow>
        </Form>
        {/** CÓDIGO SAP E ENDERÇOS */}
        <CodeSapAddressForm
          data={codeSap}
          onSubmit={onSubmitFormSap}
          editCodeSap={editCodeSap}
          removeCodeSap={removeCodeSap}
        />
        {/** CÓDIGO SAP E ENDERÇOS END */}
        <S.ButtonsWrapper>
          <S.Button type="reset" onClick={() => navigate("/config/clients")}>
            {t("general.config.clients.cancelar")}
          </S.Button>
          <S.Button
            type="button"
            disabled={creating}
            onClick={() => formRef.current?.submitForm()}
          >
            {t("general.config.clients.salvar")}
          </S.Button>
        </S.ButtonsWrapper>
      </S.Container>
      {/** Modal */}
      <ModalSapClient
        ref={modalSapClientRef}
        data={selectedCodeSap}
        onChangeCodeSap={updateCodeSap}
      />
      {/** Modal End */}
    </>
  );
};
