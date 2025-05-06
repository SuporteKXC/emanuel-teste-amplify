import React, { useCallback, useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { useAddressLookup } from "hooks/addressLookup";
import { STATES, DOCUMENT_TYPES } from "constants/Selects";
import { UpdateClientValidator } from "validators/Clients";
import { usePermission, useValidation } from "hooks";
import { useCountries } from "hooks/useCountries";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchClientActions,
  UpdateClientActions,
  DeleteClientActions,
} from "store/ducks";
import { RootState } from "store";
import { useNavigate, useParams } from "react-router-dom";
import { SelectOption, TCodeSap } from "contracts";
import { ConfirmationDialog, ConfirmationDialogRef, ToggleInput } from "components/shared";
import { useTranslation } from "react-i18next";
import { dayOptions } from "constants/Common";

import { AddCodeSapValidator } from "@/validators/Clients/AddCodeSap";
import CodeSapAddressForm from "../codeSapAddressForm";
import ModalSapClient, { ModalSapClientHandles } from "../ModalSapClient";
import { Formatter } from "@/utils/Formatter";
import { notify } from "@/services";
import { Validator } from "@/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const mask: any = {
  cpf: "999.999.999-99",
  cnpj: "99.999.999/9999-99",
  other: "",
};

export const UpdateClient = () => {
  const formRef = React.useRef<FormHandles>(null);
  const modalRef = React.useRef<ConfirmationDialogRef>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [codeSaps, setCodeSaps] = useState<TCodeSap[]>([]);
  const modalSapClientRef = useRef<ModalSapClientHandles>(null);
  const [selectedCodeSap, setSelectedCodeSap] = React.useState<TCodeSap | null>(
    null
  );

  const [docMask, setDocMask] = React.useState<string>(mask.cnpj);

  const { id } = useParams();
  const { t } = useTranslation();
  const { handleFormErrors, handleApiErrors } = useValidation();
  const { listCountries, countriesOptions, defaultCountry } = useCountries();
  const { hasPermissionTo } = usePermission();
  const { onZipcodeChange, fetchingAddress } = useAddressLookup(formRef);

  const enableDelete = hasPermissionTo("DELETECARRIER");

  const { loading: updating, validationErrors: updateError } = useSelector(
    (state: RootState) => state.updateClient
  );
  const { data: client, loading: loadingClient } = useSelector(
    (state: RootState) => state.fetchClient
  );
  const selectFields: any = {
    addressState: STATES as SelectOption[],
    addressCountry: countriesOptions as SelectOption[],
    documentType: DOCUMENT_TYPES as SelectOption[],
  };

  const days = React.useMemo(
    () =>
      dayOptions.map(({ label, ...rest }) => ({
        ...rest,
        label: t(`general.config.clients.${label}`),
      })),
    [t]
  );

  const setFields = React.useCallback(() => {
    if (client && countriesOptions.length) {
      for (const [key, value] of Object.entries(client)) {
         
        if(key === 'email') {
          formRef.current?.setFieldValue(key, value.join(';'));
        } else if(key === 'documentNumber') {
         const isEstrangeiro = Validator.isValidCNPJ(value as string)
         if(!isEstrangeiro) {
            setDocType('estrangeiro')
            formRef.current?.setFieldValue("docType", !isEstrangeiro);   
         } else {
          formRef.current?.setFieldValue(key, value);   
         }
        } else {
          if (value && key != "days") {
            if (!Object.keys(selectFields).includes(key)) {
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
    }
  }, [client, countriesOptions]);

  const fetchClient = React.useCallback(
    () => !client && dispatch(FetchClientActions.request(id)),
    [client, id]
  );

  const onSubmit = async (data: any) => {
    try {
      const updateData = { ...data, codeSap: codeSaps, email: data.email.split(";") };
      const { schema } = new UpdateClientValidator(updateData);
      formRef.current?.setErrors({});

      await schema.validate(updateData, {
        abortEarly: false,
      });

      dispatch(
        UpdateClientActions.request(id, updateData, () =>
          navigate("/config/clients")
        )
      );
    } catch (error) {
      handleFormErrors(error, formRef);
    }
  };

  const onDelete = React.useCallback(async () => {
    const confirmed = await modalRef.current?.openDialog({
      title: t("general.config.clients.desejaRemover"),
    });

    if (confirmed) {
      confirmed && dispatch(DeleteClientActions.request(id));
      navigate("/config/clients");
    }
  }, [id]);

  const onTypeChange = React.useCallback(
    (o: any) => o && setDocMask(mask[o.value]),
    []
  );

  const removeCodeSap = (code: string) => {
    const saps = [...codeSaps];
    const removed = saps.filter((sap) => sap.codeSap !== code);
    setCodeSaps(removed);
  };

  const editCodeSap = (code: string) => {
    const saps = [...codeSaps];
    const sap = saps.find((sap) => sap.codeSap === code);

    if (sap) {
      setSelectedCodeSap(sap);
      modalSapClientRef.current?.open();
    }
  };

  const updateCodeSap = (val: TCodeSap) => {
    const saps = [...codeSaps];

    const index = saps.findIndex((sap) => sap.codeSap === val.codeSap);

    if (index !== -1) {
      saps[index] = {
        ...val,
        id: saps[index].id,
      };

      modalSapClientRef.current?.close();
      setCodeSaps(saps);
    }
  };

  const onSubmitFormSap = async (data: any) => {
    const hasAdded = codeSaps.findIndex((sap) => sap.codeSap === data.codeSap);

    if (hasAdded !== -1) {
      notify("error", "Este código SAP já foi adicionado");
      return;
    }
    setCodeSaps([...codeSaps, data]);
  };

  React.useEffect(() => {
    listCountries();
  }, [listCountries]);

  React.useEffect(() => {
    setFields();
  }, [setFields]);

  React.useEffect(() => {
    fetchClient();

    return () => {
      dispatch(FetchClientActions.reset());
      formRef.current?.reset();
    };
  }, []);

  React.useEffect(() => {
    updateError && handleApiErrors(updateError, formRef);
  }, [updateError]);

  useEffect(() => {
    if (client?.clientCodeSaps) {
      const camelCaseSaps = Formatter.snakeToCamel(
        client?.clientCodeSaps
      ) as TCodeSap[];

      setCodeSaps(camelCaseSaps);
    }
  }, [client]);

  const [docType, setDocType] = useState<'nacional' | 'estrangeiro'>('nacional')

  const handleDocType = (event: any) => {   

    if(!event.target?.checked) {
      setDocType('nacional')
    } else {
      setDocType('estrangeiro')
    }
  }

  useEffect(() => {
    if(docType === 'estrangeiro' && client) {
      formRef.current?.setFieldValue("documentNumber", client?.documentNumber)
    }
  }, [docType, client])


  return (
    <>
      <S.Container>
        <S.Title>
          {t("general.config.clients.editarCliente")}{" "}
          {loadingClient && <S.Loading />}
        </S.Title>
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
            <S.Input name="tradeName" label="Nome Fantasia" />
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
              <S.CheckboxInput
                name="days"
                options={days}
                defaultOptions={client?.days}
              />
            </S.CheckboxWrapper>
          </S.FormRow>
          {/** CÓDIGO SAP E ENDERÇOS */}
          <CodeSapAddressForm
            data={codeSaps ?? []}
            onSubmit={onSubmitFormSap}
            editCodeSap={editCodeSap}
            removeCodeSap={removeCodeSap}
          />
          {/** CÓDIGO SAP E ENDERÇOS END */}
          <S.ButtonsWrapper>
            <S.Button type="reset" onClick={() => navigate("/config/clients")}>
              {t("general.config.clients.cancelar")}
            </S.Button>
            <S.Button type="submit" disabled={updating}>
              {t("general.config.clients.salvar")}
            </S.Button>
            {enableDelete && (
              <S.Button type="button" disabled={updating} onClick={onDelete}>
                {t("general.config.clients.excluir")}
              </S.Button>
            )}
          </S.ButtonsWrapper>
        </Form>
      </S.Container>
      <ConfirmationDialog ref={modalRef} />
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