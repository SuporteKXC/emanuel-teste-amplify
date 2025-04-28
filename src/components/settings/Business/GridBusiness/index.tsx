import React from "react";
import { useHistory } from "react-router-dom";
import * as S from "./styles";
import { Business } from "interfaces/business";
import { useTranslation } from 'hooks';
import { translations } from './translations';

interface IGridBusinessProps {
  businesses: Business[] | Record<string, any>[];
}

interface IBusinessProps {
  business: Business | Record<string, any>;
}

const Item: React.FC<IBusinessProps> = ({ business }) => {
  const history = useHistory();
  return (
    <S.ItemContainer
      onClick={() => history.push(`/settings/business/${business.id}`)}
    >
      <S.ItemContent>
        <S.ItemValue>{business.unit.name || "--"}</S.ItemValue>
        <S.ItemValue>{business.activity_division || "--"}</S.ItemValue>
        <S.ItemValue>{business.description || "--"}</S.ItemValue>
        <S.ButtonDetail>
          <S.IconDetail />
        </S.ButtonDetail>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export const GridBusiness: React.FC<IGridBusinessProps> = ({
  businesses = [],
}) => {
  const { getTranslation } = useTranslation(translations);

  return (
    <S.Container>
      <S.Header>
        <S.Label>{getTranslation('unidade')}</S.Label>
        <S.Label>{getTranslation('setor')}</S.Label>
        <S.Label>{getTranslation('descricao')}</S.Label>
      </S.Header>
      {businesses.length > 0 &&
        businesses.map((business) => <Item business={business} key={business.id} />)}
    </S.Container>
  );
};
