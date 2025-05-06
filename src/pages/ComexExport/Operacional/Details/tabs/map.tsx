import { api } from "@/services";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import markerWarehouse from "@/assets/images/tracking/marker-warehouse.png";
import markerClient from "@/assets/images/tracking/marker-client.png";

const containerMapStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "6px",
};

type LocationReferenceResponseType = {
  lat: string;
  lng: string;
  description: string;
};

const getCoordinates = async (): Promise<LocationReferenceResponseType[]> => {
  const { data } = await api.get("location-reference");

  return data;
};

type MapPerItemProps = {
  origin: string;
  destiny: string;
  exportOrderItemId: number | string;
};

const MapPerItem = ({
  origin,
  destiny,
  exportOrderItemId,
}: MapPerItemProps) => {
  const [ready, setReady] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: [`coordinates-${exportOrderItemId}`],
    queryFn: getCoordinates,
    select: (coordinates) => {
      /**  */
      const coordinatesFiltered = coordinates.filter(
        (coordinate) =>
          coordinate.description === origin ||
          coordinate.description === destiny
      );

      return coordinatesFiltered;
    },
  });

  const coordinates =
    data && data.length > 1
      ? data.map((coordinate) => ({
          lat: Number(coordinate.lat),
          lng: Number(coordinate.lng),
        }))
      : [];

  useEffect(() => {
    if (mapRef.current && coordinates.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      coordinates.forEach((coord) => bounds.extend(coord));
      mapRef.current.fitBounds(bounds);
    }
  }, [coordinates]);

  useEffect(() => {
    return () => {
      mapRef.current = null;
    };
  }, []);

  if (isLoading) {
    return <span>Carregando...</span>;
  }

  return (
    <GoogleMap
      onLoad={(map) => {
        mapRef.current = map;
      }}
      mapContainerStyle={containerMapStyle}
      zoom={3}
      clickableIcons={false}
      center={coordinates.length > 0 ? coordinates[0] : { lat: 0, lng: 0 }}
      options={{ mapId: "87412a572f003751" }}
      onIdle={() => {
        setReady(true);
      }}
    >
      {ready && (
        <>
          <Marker position={coordinates[0]} icon={markerWarehouse} />
          <Marker
            position={coordinates[coordinates.length - 1]}
            icon={markerClient}
          />

          <Polyline
            path={coordinates}
            options={{
              strokeColor: "#FF0000", // Cor da linha
              strokeOpacity: 0.8, // Opacidade da linha
              strokeWeight: 2, // Espessura da linha
            }}
          />
        </>
      )}
    </GoogleMap>
  );
};

type MapShipsgoProps = {
  code: string;
};
const MapShipsgo = ({ code }: MapShipsgoProps) => {
  return (
    <iframe
      src={`https://shipsgo.com/iframe/where-is-my-container/${code}?tags=hide-search-box`}
      id="IframeShipsgoLiveMap"
      className="h-[550px] col-span-2 w-[100%]"
      title="Shipsgo Live Map"
    ></iframe>
  );
};

type MapProps = {
  data: any;
  type: "shipsgo" | "googlemaps";
};

const Map: React.FC<MapProps> = ({ type, data }) => {
  const componentRender = {
    googlemaps: (
      <MapPerItem
        origin={data?.exportOrder?.company?.country}
        destiny={data?.destination}
        exportOrderItemId={data?.id}
      />
    ),
    shipsgo: <MapShipsgo code={data?.container_code} />,
  };

  return <div className="w-full h-[500px]">{componentRender[type]}</div>;
};

export default Map;
