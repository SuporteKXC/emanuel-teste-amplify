import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, MarkerF, OverlayView } from "@react-google-maps/api";

import * as S from "./styles";
import shipIcon from "assets/icons/boat-sharp.svg";
import planeIcon from "assets/icons/plane.svg";
import { IOrderItemLocation, OrderItemData } from "contracts";
import { useTranslation } from "react-i18next";

const containerMapStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "6px",
};

interface OrderItemMapProps {
  isVisible: boolean;
  orderItemLocation: IOrderItemLocation | null;
  orderItem: OrderItemData | null;
  isFlight?: boolean;
}

export const OrderItemMap: React.FC<OrderItemMapProps> = ({
  isVisible,
  orderItemLocation,
  orderItem,
  isFlight,
}) => {
  const { t, i18n } = useTranslation();
  const [vesselBadge, setVesselBadge] = useState(false);
  const [iconMaker, setIconMaker] = useState<string>("");

  const rotationIcon = useCallback(() => {
    setIconMaker(() => "");
    const iconUrl = planeIcon;
    const rotate = orderItemLocation?.rotate
      ? orderItemLocation.rotate
      : orderItem?.angle_rotate;

    fetch(iconUrl)
      .then((response) => response.text())
      .then((svgString) => {
        // Cria um nó SVG a partir da string SVG
        const parser = new DOMParser();
        const svgNode = parser
          .parseFromString(svgString, "image/svg+xml")
          .querySelector("svg");

        let base64String;

        if (svgNode) {
          // Adiciona a transformação de rotação, se não tiver, vira 180 para o avião ficar para baixo
          svgNode.setAttribute("transform", `rotate(${rotate ? rotate : 180})`);

          // Converte o nó SVG de volta para uma string
          const modifiedSvgString = new XMLSerializer().serializeToString(
            svgNode
          );
          // Codifica a string modificada como Base64
          base64String = btoa(modifiedSvgString);
        } else {
          base64String = btoa(svgString);
        }

        const url = `data:image/svg+xml;base64,${base64String}`;
        setIconMaker(() => url);
      })
      .catch(() => setIconMaker(() => iconUrl));
  }, [orderItem, orderItemLocation]);

  useEffect(() => {
    if (isFlight) {
      rotationIcon();
    } else {
      setIconMaker(shipIcon);
    }
  }, [orderItem, orderItemLocation, isFlight]);

  const dateIsValid = (date: any) => {
    return date instanceof Date && !isNaN(date.getTime())
  }

  return (
    <S.Container isVisible={isVisible}>
      {isVisible && (
        <GoogleMap
          mapContainerStyle={containerMapStyle}
          zoom={3}
          clickableIcons={false}
          center={
            orderItemLocation
              ? orderItemLocation
              : { lat: Number(0), lng: Number(0) }
          }
          options={{ mapId: "87412a572f003751" }}
        >
          {orderItemLocation && iconMaker && (
            <MarkerF
              position={orderItemLocation}
              icon={iconMaker}
              zIndex={991}
              clickable
              onClick={() => setVesselBadge(true)}
            />
          )}
   
          {orderItemLocation && vesselBadge && (
            <OverlayView mapPaneName="floatPane" position={orderItemLocation}>
              <S.Box>
                <S.ButtonClose onClick={() => setVesselBadge(false)}>
                  <S.IconClose />
                </S.ButtonClose>
                <S.Label>
                  {" "}
                  {isFlight
                    ? t("comex.operational.orderItem.map.plane")
                    : t("comex.operational.orderItem.map.vessel")}{" "}
                </S.Label>
                <S.Value>{orderItem?.current_vessel}</S.Value>
                <S.Label>
                  {t("comex.operational.orderItem.map.shipperAddress")}
                </S.Label>
                <S.Value>{orderItem?.shipper_address}</S.Value>
                <S.Label>{t("comex.operational.orderItem.map.destiny")}</S.Label>
                <S.Value>{orderItem?.plant_destiny}</S.Value>
                <S.Label>{t("comex.operational.orderItem.map.grActual")}</S.Label>
                <S.Value>
                  {!orderItem?.gr_actual
                    ? "-"
                    : dateIsValid(new Date(orderItem?.gr_actual)) ? new Date(orderItem?.gr_actual).toLocaleDateString() : "-"}
                </S.Value>
                <S.Label>
                  {t("comex.operational.orderItem.map.lastPositUpdate")}
                </S.Label>
                <S.Value>
                  {!orderItem?.last_position_update
                    ? "-"
                    : dateIsValid(new Date(
                      orderItem?.last_position_update
                    )) ? new Date(
                      orderItem?.last_position_update
                    ).toLocaleDateString(i18n.language, {
                      hour: "numeric",
                      minute: "numeric",
                    }) : "-"}
                </S.Value>
              </S.Box>
            </OverlayView>
          )}
        </GoogleMap>
      )}
    </S.Container>
  );
};
