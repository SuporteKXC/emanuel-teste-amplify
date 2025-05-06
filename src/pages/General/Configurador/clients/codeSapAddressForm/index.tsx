import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../createClient/styles";
import { STATES } from "@/constants/Selects";
import { TCodeSap } from "@/contracts";
import { AddCodeSapValidator } from "@/validators/Clients/AddCodeSap";
import { useValidation } from "@/hooks";

type CodeSapAddressFormProps = {
  onSubmit: (data: any) => void;
  editCodeSap: (code: string) => void;
  removeCodeSap: (code: string) => void;
  data: TCodeSap[];
};

const CodeSapAddressForm = ({
  onSubmit,
  editCodeSap,
  removeCodeSap,
  data,
}: CodeSapAddressFormProps) => {
  const { t } = useTranslation();
  const formSapRef = useRef<FormHandles | null>(null);
  const { handleFormErrors } = useValidation();

  const onSubmitFormSap = async (data: any) => {
    try {
      const { schema } = new AddCodeSapValidator();
      formSapRef.current?.setErrors({});
      await schema.validate(data, { abortEarly: false });
      onSubmit(data);
      formSapRef.current?.reset();
    } catch (error) {
      handleFormErrors(error, formSapRef);
    }
  };

  return (
    <Form ref={formSapRef} onSubmit={onSubmitFormSap} placeholder="">
      <S.Title>
        <S.SubTitle>Código SAP e Endereços</S.SubTitle>
        <S.Description>
          Adicione abaixo os endereços e os códigos SAP referente a esse
          cliente.
        </S.Description>
      </S.Title>
      <S.FormRow>
        <S.Input
          name="addressZipcode"
          label={t("general.config.clients.cep")}
        />
        <S.Input
          name="addressStreet"
          label={t("general.config.clients.logradouro")}
        />
        <S.Input
          name="addressNumber"
          label={t("general.config.clients.numero")}
        />
        <S.Input
          name="addressNeighborhood"
          label={t("general.config.clients.bairro")}
        />
      </S.FormRow>
      <S.FormRow>
        <S.Select
          name="addressState"
          label={t("general.config.clients.uf")}
          options={STATES}
        />
        <S.Input
          name="addressCity"
          label={t("general.config.clients.cidade")}
        />
      </S.FormRow>
      <S.FormRow>
        <S.Input name="codeSap" label={t("general.config.clients.codSap")} />
        <S.Button
          type="button"
          onClick={() => formSapRef.current?.submitForm()}
        >
          {t("general.config.clients.adicionar")}
        </S.Button>
      </S.FormRow>

      <S.FormRow>
        <S.SapContainer>
          {data.map((sap) => (
            <S.SapItem key={sap.codeSap}>
              <S.SapTitle>
                <span>Código:</span> {sap.codeSap}
              </S.SapTitle>
              <S.SapAction>
                <S.EditBtn onClick={() => editCodeSap(sap.codeSap)} />
                <S.DeleteBtn onClick={() => removeCodeSap(sap.codeSap)} />
              </S.SapAction>
            </S.SapItem>
          ))}
        </S.SapContainer>
      </S.FormRow>
    </Form>
  );
};

export default CodeSapAddressForm;
