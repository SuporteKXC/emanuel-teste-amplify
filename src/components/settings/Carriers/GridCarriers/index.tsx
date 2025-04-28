import React from "react";
import { useHistory } from "react-router-dom";
import * as S from "./styles";
import { Carrier } from "interfaces/carrier";
import { cnpj } from "utils";
import { useTranslation } from 'hooks';
import { translations } from './translations';

interface IGridCarriersProps {
  carriers: Carrier[] | Record<string, any>[];
}

interface ICarrierProps {
  carrier: Carrier | Record<string, any>;
}

const Item: React.FC<ICarrierProps> = ({ carrier }) => {
  const history = useHistory();
  return (
    <S.ItemContainer
      onClick={() => history.push(`/settings/carrier/${carrier.id}`)}
    >
      <S.ItemContent>
        <S.ItemValue>{carrier.carrier_code || "--"}</S.ItemValue>
        <S.ItemValue>{carrier.cnpj ? cnpj(carrier.cnpj) : "--"}</S.ItemValue>
        <S.ItemValue>
          {carrier.address_city
            ? `${carrier.address_city}/${carrier.address_state} `
            : "--"}
        </S.ItemValue>
        <S.ItemValue>{carrier.trade_name || "--"}</S.ItemValue>
        <S.ButtonDetail>
          <S.IconDetail />
        </S.ButtonDetail>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export const GridCarriers: React.FC<IGridCarriersProps> = ({
  carriers = [],
}) => {
  const { getTranslation } = useTranslation(translations);
  
  return (
    <S.Container>
      <S.Header>
        <S.Label>{getTranslation('codigo')}</S.Label>
        <S.Label>{getTranslation('cnpj')}</S.Label>
        <S.Label>{getTranslation('cidade')}</S.Label>
        <S.Label>{getTranslation('nomeFantasia')}</S.Label>
      </S.Header>
      {carriers.length > 0 &&
        carriers.map((carrier) => <Item carrier={carrier} key={carrier.id} />)}
    </S.Container>
  );
};
