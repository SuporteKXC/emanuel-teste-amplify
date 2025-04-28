import React from "react";
import { useHistory } from "react-router-dom";
import * as S from "./styles";
import { VehicleType } from "interfaces/vehicle-type";
import { useTranslation } from 'hooks';
import { translations } from './translations';

type GridVehicleTypesProps = {
  vehicleTypes: VehicleType[] | Record<string, any>[];
};

type ItemProps = {
  vehicleType: VehicleType | Record<string, any>;
};

const Item: React.FC<ItemProps> = ({ vehicleType }) => {
  const history = useHistory();
  return (
    <S.ItemContainer
      onClick={() => history.push(`/settings/vehicle-type/${vehicleType.id}`)}
    >
      <S.ItemContent>
        <S.ItemValue>{vehicleType.id}</S.ItemValue>
        <S.ItemValue>{vehicleType.name}</S.ItemValue>
        <S.ButtonDetail>
          <S.IconDetail />
        </S.ButtonDetail>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export const GridVehicleTypes: React.FC<GridVehicleTypesProps> = ({
  vehicleTypes = [],
}) => {
  const { getTranslation } = useTranslation(translations);
  return (
    <S.Container>
      <S.Header>
        <S.Label>Id</S.Label>
        <S.Label>{getTranslation('nome')}</S.Label>
      </S.Header>
      {vehicleTypes.length > 0 &&
        vehicleTypes.map((vehicleType) => (
          <Item vehicleType={vehicleType} key={vehicleType.id} />
        ))}
    </S.Container>
  );
};
