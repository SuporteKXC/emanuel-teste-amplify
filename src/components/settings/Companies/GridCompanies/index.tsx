import React from "react";
import { useHistory } from "react-router-dom";
import * as S from "./styles";
import { Company } from "interfaces/company";
import { cnpj } from "utils";
import { useTranslation } from "hooks";
import { translations } from './translations';

interface IGridcompaniesProps {
  companies: Company[] | Record<string, any>[];
}

interface ICompanyProps {
  company: Company | Record<string, any>;
}

const Item: React.FC<ICompanyProps> = ({ company }) => {
  const history = useHistory();
  return (
    <S.ItemContainer
      onClick={() => history.push(`/settings/company/${company.id}`)}
    >
      <S.ItemContent>
        <S.ItemValue>{company.code || "--"}</S.ItemValue>
        <S.ItemValue>{company.cnpj ? cnpj(company.cnpj) : "--"}</S.ItemValue>
        <S.ItemValue>{company.type || "--"}</S.ItemValue>
        <S.ItemValue>{company.trade_name || "--"}</S.ItemValue>
        <S.ButtonDetail>
          <S.IconDetail />
        </S.ButtonDetail>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export const GridCompanies: React.FC<IGridcompaniesProps> = ({
  companies = [],
}) => {
  const { getTranslation } = useTranslation(translations);

  return (
    <S.Container>
      <S.Header>
        <S.Label>{getTranslation('codigo')}</S.Label>
        <S.Label>{getTranslation('cnpj')}</S.Label>
        <S.Label>{getTranslation('tipo')}</S.Label>
        <S.Label>{getTranslation('nomeFantasia')}</S.Label>
      </S.Header>
      {companies.length > 0 &&
        companies.map((company) => <Item company={company} key={company.id} />)}
    </S.Container>
  );
};
