
import React, { useEffect, useState, useCallback } from 'react';
import {
  GoogleMap,
  Marker,
  OverlayView,
  DirectionsService,
  DirectionsRenderer,
  Polyline,
} from '@react-google-maps/api';

import marker from 'assets/images/tracking/markerTruck.png';
import markerWarehouse from 'assets/images/tracking/marker-warehouse.png';
import markerClient from 'assets/images/tracking/marker-client.png';
// import { useTranslation } from 'hooks';
import { translations } from './translations';
import * as S from './styles';
import { Document } from '@/contracts/trackingDelivery';
// import { Invoice } from 'interfaces/invoice';

interface IProps {
  invoice: Document;
}

const containerMapStyle = {
  width: '100%',
  height: '100%',
};

interface ITruckPosition {
  lat: number;
  lng: number;
}

const DELIVERED_OCCURRENCES_IDS = [1, 2, 100, 25];
const KEY = 'AIzaSyAn_SVk6tzoIx1R81mGsLuJuKOP6zZ6ROs';

export const MapTrackingInvoice: React.FC<IProps> = ({ invoice }) => {
  const [truckPositions, setTruckPositions] = useState<ITruckPosition[]>([]);
  const [directions, setDirections] = useState<any>(null);
  const [route, setRoute] = useState<any>(null);
  const [lastPosition, setLastPosition] = useState<any>(null);
  const [destinationMarker, setDestinationMarker] = useState<any>(null);
  const [infoStart, setInfoStart] = useState<boolean>(false);
  const [infoEnd, setInfoEnd] = useState<boolean>(false);
  const [infoCarrier, setInfoCarrier] = useState<boolean>(false);
  const [realDestiny, setRealDestiny] = useState<any>('');
  const [isRedespacho, setIsRedespacho] = useState(false);
  // const { getTranslation } = useTranslation(translations);

  const [directionOptions, setDirectionOptions] =
    useState<any>(null);

  const fetchTruckPositions = useCallback(() => {
    const { documentGeolocations } = invoice;
    if (documentGeolocations && documentGeolocations?.length > 0 && route) {
      let positions = [];

      documentGeolocations.forEach(
        ({ longitude, latitude, occurrenceTypeId }: any, index: any) => {
          if (longitude && latitude) {
            if (Number(longitude) !== 0 || Number(latitude) !== 0) {
              positions.push({
                lat: parseFloat(latitude),
                lng: parseFloat(longitude),
              });
            }
            if (DELIVERED_OCCURRENCES_IDS.includes(occurrenceTypeId)) {
              positions.unshift(route.endLocation);
            }
          }
        }
      );

      positions.push(route.startLocation);
      return setTruckPositions(positions);
    }
  }, [invoice, route]);

  const onDirectionService = useCallback(
    (result: any) => {
      if (result?.status === 'OK') {
        const startLocation = {
          lat: result.routes[0].legs[0].start_location.lat(),
          lng: result.routes[0].legs[0].start_location.lng(),
        };
        const endLocation = {
          lat: result.routes[0].legs[0].end_location.lat(),
          lng: result.routes[0].legs[0].end_location.lng(),
        };
        if (!destinationMarker) {
          setDestinationMarker(endLocation);
        }
        setRoute({ startLocation, endLocation });
        setDirections(result);
      }
    },
    [destinationMarker]
  );

  const fetchLastPosition = useCallback(() => {
    if (invoice) {
      if (
        invoice.status === 'entregue' ||
        invoice.status === 'entregue_cliente' ||
        invoice.status === 'entregue_atraso'
      ) {
        const position = destinationMarker;
        setLastPosition(position);
      } else {
        if (invoice.documentGeolocations?.length) {
          const position = {
            lat: Number(invoice.documentGeolocations[0].latitude),
            lng: Number(invoice.documentGeolocations[0].longitude),
          };
          setLastPosition(position);
        }
      }
    }
  }, [invoice, destinationMarker]);

  const fetchDirectionOptions = useCallback(
    (destination: any) => {
      const { 
        originAddress,
        originCity,
        originState,
        originCountry,
        originZipcode
      } = invoice;
      const withoutRodovias = originAddress.toUpperCase().includes("RODOVIA") ? "" : originAddress
      const options = {
        origin: `${originCity}/${originState}, ${originZipcode && originZipcode.replace(/^(\d{5})(\d{3})/, '$1-$2')}`,
        destination,
        travelMode: 'DRIVING',
      };

      console.log("ORIGEM:", options.origin)
      setDirectionOptions(options);
    },
    [invoice]
  );

  const renderInfoStartLocation = useCallback(() => {
    return (
      <S.Box>
        <S.ButtonClose onClick={() => setInfoStart(false)}>
          <S.IconClose />
        </S.ButtonClose>
        <S.Label>Centro</S.Label>
        <S.Value>
          {invoice.company?.plantCode} - {invoice.company?.nameFantasy}
        </S.Value>
        <S.Label>Endereço</S.Label>
        <S.Value>
          {/* {realDestiny
            ? realDestiny
            : `${invoice.company?.address_street}, ${invoice.company?.address_number}, ${invoice.company?.address_neighborhood}, ${invoice.company?.address_city}/${invoice.company?.address_state}`} */}
          {`${invoice.originAddress}, ${invoice.originCity}/${invoice.originState}`}
        </S.Value>
      </S.Box>
    );
  }, [invoice, realDestiny]);

  const renderInfoEndLocation = useCallback(() => {
    let destiny = '';
    if (invoice.redespacho && invoice.carrier.tradeName) {
      destiny = invoice.carrier.tradeName;
    } else {
      destiny =
        invoice.destinationState !== 'EX' && invoice.client
          ? `${invoice.client.id} - ${invoice.client.tradeName}`
          : '';
          // : `${invoice?.dest_razao_social}`;
    }

    return (
      <S.Box>
        <S.ButtonClose onClick={() => setInfoEnd(false)}>
          <S.IconClose />
        </S.ButtonClose>
        <S.Label>{invoice.redespacho ? 'Redespacho' : 'Cliente'}</S.Label>
        <S.Value>{destiny}</S.Value>
        <S.Label>Endereço</S.Label>
        <S.Value>{realDestiny}</S.Value>
      </S.Box>
    );
  }, [invoice, realDestiny]);

  const renderInfoCarrier = useCallback(() => {
    return (
      <S.Box>
        <S.ButtonClose onClick={() => setInfoCarrier(false)}>
          <S.IconClose />
        </S.ButtonClose>
        <S.Label>Transportadora</S.Label>
        <S.Value>
          {invoice.carrier?.id} - {invoice.carrier?.tradeName}
        </S.Value>
      </S.Box>
    );
  }, [invoice]);

  useEffect(() => {
    if (invoice) {
      let destination_adress: any = null;
      // if (invoice.redespacho) {
      //   destination_adress = `${invoice.transp_endereco_completo}, ${invoice.transp_nome_municipio}/${invoice.transp_uf}`;
      //   setIsRedespacho(true);
      // } else 
      // if (invoice.brazilDocument.entregaCep) {
      //   destination_adress = `${invoice.brazilDocument.entregaXlgr}, ${invoice.brazilDocument.entregaNro}, ${invoice.brazilDocument.entregaXmun}/${invoice.brazilDocument.entregaUf}, ${invoice.brazilDocument.entregaCep}`;
      // } else 
 
      if(invoice.entregaIdMunicipioIbge) {
        destination_adress = `${invoice.entregaLogradouro}, ${invoice.entregaNomeMunicipio}/${invoice.destinationState}, ${invoice.destinationZipcode}`;
      }
      else if (invoice.destinationZipcode) {
        destination_adress = `${invoice.destinationAddress}, ${invoice.destinationCity}/${invoice.destinationState}, ${invoice.destinationZipcode}`;
      } else if (invoice.harbor) {
        if (invoice.harbor.lat && invoice.harbor.long) {
          destination_adress = {
            lat: invoice.harbor.lat,
            lng: invoice.harbor.long,
          };
        } else {
          destination_adress = `Brasil, ${invoice.harbor_description}`;
        }
      } else if (invoice.harbor_description) {
        destination_adress = `Brasil, ${invoice.harbor_description}`;
        if (invoice.harbor_description === 'SANTOS') {
          destination_adress = `Brasil, PORTO DE SANTOS`;
        }
      }

      setRealDestiny(destination_adress);
      fetchDirectionOptions(destination_adress);
    }
  }, [invoice, fetchDirectionOptions]);

  useEffect(() => {
    fetchLastPosition();
  }, [fetchLastPosition]);

  useEffect(() => {
    fetchTruckPositions();
  }, [fetchTruckPositions]);

  return (
    <S.Container className='shadow-sm shadow-slate-300'>
      <S.LegendBox>
        <S.Legend>
          <S.Line className="blue" /> Rota Google
        </S.Legend>
        <S.Legend>
          <S.Line className="purple" /> Rota Transportadora
        </S.Legend>
      </S.LegendBox>
      {KEY && (
        <GoogleMap
          mapContainerStyle={containerMapStyle}
          zoom={10}
          clickableIcons={false}
          options={{ mapId: '87412a572f003751', scrollwheel: false }}
        >
          {route && (
            <>
              {infoStart && (
                <OverlayView
                  mapPaneName="floatPane"
                  position={route.startLocation}
                >
                  {renderInfoStartLocation()}
                </OverlayView>
              )}
              <Marker
                position={route.startLocation}
                icon={markerWarehouse}
                zIndex={990}
                clickable
                onClick={() => setInfoStart(true)}
              />
              {infoEnd && (
                <OverlayView
                  mapPaneName="floatPane"
                  position={route.endLocation}
                >
                  {renderInfoEndLocation()}
                </OverlayView>
              )}
              <Marker
                position={route.endLocation}
                icon={isRedespacho ? markerWarehouse : markerClient}
                zIndex={991}
                clickable
                onClick={() => setInfoEnd(true)}
              />
              <Marker
                position={route.startLocation}
                icon={markerWarehouse}
                zIndex={990}
                clickable
                onClick={() => setInfoStart(true)}
              />
              {invoice.redespacho && (
                <Marker
                  position={destinationMarker}
                  icon={markerClient}
                  zIndex={990}
                />
              )}
            </>
          )}
          {lastPosition && (
            <>
              {infoCarrier && (
                <OverlayView mapPaneName="floatPane" position={lastPosition}>
                  {renderInfoCarrier()}
                </OverlayView>
              )}
              <Marker
                position={lastPosition}
                icon={marker}
                zIndex={992}
                clickable
                onClick={() => setInfoCarrier(true)}
              />
            </>
          )}

          {directions && (
            <DirectionsRenderer options={{ directions: directions }} />
          )}
          {directionOptions && (
            <DirectionsService
              options={directionOptions}
              callback={onDirectionService}
            />
          )}
          {truckPositions.length > 0 && (
            <Polyline
              visible={true}
              path={truckPositions}
              options={{
                geodesic: true,
                strokeColor: '#EE7C2C',
                strokeOpacity: 1.0,
                strokeWeight: 4,
              }}
            />
          )}
        </GoogleMap>
      )}
    </S.Container>
  );
};
