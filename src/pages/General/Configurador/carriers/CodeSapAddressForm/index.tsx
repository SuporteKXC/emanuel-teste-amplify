import { STATES } from "@/constants/Selects";
import { useTranslation } from "react-i18next";

import * as S from "../createCarrier/styles";

const CodeSapAddressForm = () => {
  const { t } = useTranslation();

  return (
    <>
      <S.Title>
        <S.SubTitle>Código SAP e Endereço</S.SubTitle>
        <S.Description>
          Adicione abaixo o endereço e o códigos SAP referente a essa
          transportadora.
        </S.Description>
      </S.Title>
      <S.FormRow>
        <S.Input
          name="codeSap.addressZipcode"
          label={t("general.config.carriers.cep")}
        />
        <S.Input
          name="codeSap.addressStreet"
          label={t("general.config.carriers.logradouro")}
        />
        <S.Input
          name="codeSap.addressNumber"
          label={t("general.config.carriers.numero")}
        />
        <S.Input
          name="codeSap.addressNeighborhood"
          label={t("general.config.carriers.bairro")}
        />
      </S.FormRow>
      <S.FormRow>
        <S.Select
          name="codeSap.addressState"
          label={t("general.config.carriers.uf")}
          options={STATES}
        />
        <S.Input
          name="codeSap.addressCity"
          label={t("general.config.carriers.cidade")}
        />
      </S.FormRow>
    </>
  );
};

export default CodeSapAddressForm;
