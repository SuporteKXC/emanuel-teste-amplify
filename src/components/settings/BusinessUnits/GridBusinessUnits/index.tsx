import React from "react";
import { useHistory } from "react-router-dom";
import * as S from "./styles";
import { BusinessUnit } from "interfaces/business-unit";
import { useTranslation } from 'hooks';
import { translations } from './translations';

interface IGridBusinessUnitsProps {
  units: BusinessUnit[] | Record<string, any>[];
}

interface IBusinessUnitProps {
  unit: BusinessUnit | Record<string, any>;
}

const Item: React.FC<IBusinessUnitProps> = ({ unit }) => {
  const history = useHistory();
  return (
    <S.ItemContainer
      onClick={() => history.push(`/settings/business-units/${unit.id}`)}
    >
      <S.ItemContent>
        <S.ItemValue>{unit.id || "--"}</S.ItemValue>
        <S.ItemValue>{unit.name || "--"}</S.ItemValue>
        <S.ButtonDetail>
          <S.IconDetail />
        </S.ButtonDetail>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export const GridBusinessUnits: React.FC<IGridBusinessUnitsProps> = ({
  units = [],
}) => {
  const { getTranslation } = useTranslation(translations);
  return (
    
    <S.Container>
      <S.Header>
        <S.Label>{getTranslation('id')}</S.Label>
        <S.Label>{getTranslation('nome')}</S.Label>
      </S.Header>
      {units.length > 0 &&
        units.map((unit) => <Item unit={unit} key={unit.id} />)}
    </S.Container>
  );
};
