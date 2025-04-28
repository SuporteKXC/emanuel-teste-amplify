import React from "react";
import { useHistory } from "react-router-dom";
import * as S from "./styles";
import { Vehicle } from "interfaces/vehicle";
import { useTranslation } from "hooks";
import { translations } from "./translations";

interface IGridCarriersProps {
  vehicles: Vehicle[] | Record<string, any>[];
}

interface ItemProps {
  vehicle: Vehicle | Record<string, any>;
}

const Item: React.FC<ItemProps> = ({ vehicle }) => {
  const history = useHistory();
  
  return (
    <S.ItemContainer
      onClick={() => history.push(`/settings/vehicle/${vehicle.id}`)}
    >
      <S.ItemContent>
        <S.ItemValue>{vehicle.id}</S.ItemValue>
        <S.ItemValue>{vehicle.duration}</S.ItemValue>
        <S.ItemValue>{vehicle.weight}</S.ItemValue>
        <S.ItemValue>{vehicle.pallet || '---'}</S.ItemValue>
        <S.ItemValue>{vehicle.company.code}</S.ItemValue>
        <S.ItemValue>{vehicle.vehicleType.name}</S.ItemValue>
        <S.ItemValue>{vehicle.distance_between_delivery || '---'}</S.ItemValue>
        <S.ItemValue>{vehicle.max_distance || '---'}</S.ItemValue>
        <S.ItemValue>{vehicle.max_delivery || '---'}</S.ItemValue>
        <S.ButtonDetail>
          <S.IconDetail />
        </S.ButtonDetail>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export const GridVehicles: React.FC<IGridCarriersProps> = ({
  vehicles = [],
}) => {
  const { getTranslation } = useTranslation(translations);
  return (
    
    <S.Container>
      <S.Header>
        <S.Label>{getTranslation('codigo')}</S.Label>
        <S.Label>{getTranslation('duracao')}</S.Label>
        <S.Label>{getTranslation('peso')}</S.Label>
        <S.Label>{getTranslation('paletes')}</S.Label>
        <S.Label>{getTranslation('centro')}</S.Label>
        <S.Label>{getTranslation('veiculo')}</S.Label>
        <S.Label>{getTranslation('disEntrega')}</S.Label>
        <S.Label>{getTranslation('disMaxima')}</S.Label>
        <S.Label>{getTranslation('maxEntregas')}</S.Label>
      </S.Header>
      {vehicles.length > 0 &&
        vehicles.map((vehicle) => <Item vehicle={vehicle} key={vehicle.id} />)}
    </S.Container>
  );
};
