import React from "react";
import { useHistory } from "react-router-dom";
import * as S from "./styles";
import { ClientType } from "interfaces/client-type";
import { useTranslation } from 'hooks';
import { translations } from './translations';

interface IGridClientTypesProps {
  clientTypes: ClientType[] | Record<string, any>[];
}

interface IClientTypeProps {
  clientType: ClientType | Record<string, any>;
}

const Item: React.FC<IClientTypeProps> = ({ clientType }) => {
  const history = useHistory();
  return (
    <S.ItemContainer
      onClick={() => history.push(`/settings/client-type/${clientType.id}`)}
    >
      <S.ItemContent>
        <S.ItemValue>{clientType.id || "--"}</S.ItemValue>
        <S.ItemValue>{clientType.name || "--"}</S.ItemValue>
        <S.ButtonDetail>
          <S.IconDetail />
        </S.ButtonDetail>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export const GridClientTypes: React.FC<IGridClientTypesProps> = ({
  clientTypes = [],
}) => {
  const { getTranslation } = useTranslation(translations);
  return (
    <S.Container>
      <S.Header>
        <S.Label>{getTranslation('id')}</S.Label>
        <S.Label>{getTranslation('segmentacao')}</S.Label>
      </S.Header>
      {clientTypes.length > 0 &&
        clientTypes.map((clientType) => (
          <Item clientType={clientType} key={clientType.id} />
        ))}
    </S.Container>
  );
};
