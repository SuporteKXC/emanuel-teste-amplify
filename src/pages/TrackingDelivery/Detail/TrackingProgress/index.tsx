import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./styles";

import { ListDistanceActions, ListDistanceState } from "store/ducks/trackingDelivery/distance";
import { Document, Geolocation } from "@/contracts/trackingDelivery";
import { RootState } from "@/store";

interface IProps {
  invoice: Document;
}

export const TrackingProgress: React.FC<IProps> = ({ invoice }) => {
  const dispatch = useDispatch();
  const [position, setPosition] = useState<number>(0);
  const [positionToFinished, setPositionToFinished] = useState<number>(0);
  const [truckDistance, setTruckDistance] = useState<number>(0);
  const [distanceToFinished, setDistanceToFinished] = useState<number>(0);

  useSelector<RootState>(
    (state) => state.listDistance
  ) as ListDistanceState;

  const onSuccess = useCallback(
    (data: any) => {
      console.log("data", data);
      const { distance, duration } = data;

      if (distance && duration && invoice.distance) {
        const distanceCompleted = Math.abs(invoice.distance - distance);

        console.log("distanceCompleted", distanceCompleted);

        if (distanceCompleted > 0) {
          const formattedDistance = Number(distanceCompleted.toFixed(2));

          setTruckDistance(formattedDistance);
        } else {
          setTruckDistance(0);
        }

        const formattedDistance = Number(distance.toFixed(2));
        setDistanceToFinished(formattedDistance);

        const position = Number(
          ((distanceCompleted * 100) / invoice.distance).toFixed(2)
        );

        if (position < 0) return setPosition(0);
        setPositionToFinished(100 - position);
        setPosition(position);
      }
    },
    [invoice]
  );

  const getDistance = useCallback(() => {
    function getLastGeolocation(geolocations: Geolocation[]): string | null {
      for (let geolocation of geolocations) {
        if (geolocation.latitude && geolocation.longitude) {
          return `${geolocation.latitude}, ${geolocation.longitude}`;
        }
      }
      return null;
    }
    const deliveredStatus = [
      "entregue-cliente",
      "entregue",
      "entregue-atraso",
      "entregue-sem-prazo",
    ];
    if (invoice.status && deliveredStatus.includes(invoice.status)) {
      setPositionToFinished(0);
      setPosition(100);
    } else {
      if (invoice.documentGeolocations && invoice.documentGeolocations.length > 0) {
        const origins = getLastGeolocation(invoice.documentGeolocations);
        const destinations = `${invoice.destinationCountry || "Brasil"}, ${
          invoice.destinationZipcode &&
          invoice.destinationZipcode.replace(/^(\d{5})(\d{3})/, "$1-$2")
        }`;
        if (origins && destinations) {
          console.log("origins", origins);
          console.log("destinations", destinations);
          dispatch(
            ListDistanceActions.request({ origins, destinations }, onSuccess)
          );
        }
      }
    }
  }, [dispatch, invoice, onSuccess]);

  useEffect(() => {
    getDistance();
  }, [getDistance]);

  return (
    <S.Container>
      <S.IllustrationPin />
      <S.IllustrationTree2 />
      <S.IllustrationTree1 />
      <S.IllustrationPacks />
      <S.IllustrationBuildings />
      <S.IllustrationBg1 />
      <S.IllustrationBg2 />
      <S.IllustrationBg3 />
      <S.Truck position={position}>
        <S.IllustrationTruck />
      </S.Truck>
      <S.Line />
      <S.DistanceContainer>
        <S.BallTruck position={position} />
        <S.LabelTruck position={position}>{truckDistance} km</S.LabelTruck>
        <S.BallStart />
        <S.LabelStart>0</S.LabelStart>
        <S.BallEnd />
        <S.LabelEnd>
          {invoice.distance ? `${invoice.distance} km` : "---"}
        </S.LabelEnd>
        <S.DistanceToFinishedLine position={positionToFinished}>
          <S.LabelPositionToFinished distance={distanceToFinished}>
            {distanceToFinished} km
          </S.LabelPositionToFinished>
        </S.DistanceToFinishedLine>
        <S.DistanceLine />
      </S.DistanceContainer>
    </S.Container>
  );
};
