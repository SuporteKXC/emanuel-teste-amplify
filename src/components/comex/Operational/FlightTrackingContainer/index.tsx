import {} from "components";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { IFlightTracking } from "contracts";
import {
  differenceInHours,
  differenceInMinutes,
  format,
  parseISO,
} from "date-fns";
import React, { useEffect, useState, useCallback } from "react";

interface IFlightTrackingData extends IFlightTracking {}
interface IFlightTrackingContainer {
  data: IFlightTrackingData | null;
  loading: boolean;
  disabled: boolean;
  action: () => void;
}
export const FlightTrackingContainer = ({
  data,
  loading,
  action,
  disabled,
}: IFlightTrackingContainer) => {
  const { t } = useTranslation();

  const differenceInHoursMinutes = useCallback((date1: any, date2: any) => {
    const diffInMinutes = differenceInMinutes(date1, date2);
    const diffInHours = differenceInHours(date1, date2);

    const diffHours = Math.abs(diffInHours);
    const diffMinutes = Math.abs(diffInMinutes) % 60;

    const hours = diffHours < 10 ? `0${diffHours}` : diffHours;
    const minutes = diffMinutes < 10 ? `0${diffMinutes}` : diffMinutes;

    return `${hours}:${minutes}`;
  }, []);
  return (
    <S.TrackingContainer>
      <S.Center>
        <h3>{t("comex.operational.orderItem.tracking.title")}</h3>
      </S.Center>
      {!data && (
        <S.TrackingSubscription>
          {loading ? (
            t("comex.operational.orderItem.tracking.waitingPhrase")
          ) : (
            <>
              <S.Center>
                {t("comex.operational.orderItem.tracking.subscriptionTitle")}
              </S.Center>
              <S.Button onClick={() => action()} disabled={disabled}>
                {t("comex.operational.orderItem.tracking.subscribeButton")}
              </S.Button>
            </>
          )}
        </S.TrackingSubscription>
      )}

      {data && (
        <>
          <S.InformationContainer>
            <S.InformationItem>
              <S.InformationLabel>
                {t("comex.operational.orderItem.flightInfo.flight")}
              </S.InformationLabel>
              <S.InformationText>{data.ident} </S.InformationText>
            </S.InformationItem>

            <S.InformationItem>
              <S.InformationLabel>
                {t("comex.operational.orderItem.flightInfo.status")}
              </S.InformationLabel>
              <S.InformationText>{data.status} </S.InformationText>
            </S.InformationItem>

            <S.InformationItem>
              <S.InformationLabel>
                {t("comex.operational.orderItem.flightInfo.origin")}
              </S.InformationLabel>
              <S.InformationText>
                {data.origin.name} - {data.origin.city}
              </S.InformationText>
            </S.InformationItem>

            <S.InformationItem>
              <S.InformationLabel>
                {t("comex.operational.orderItem.flightInfo.destination")}
              </S.InformationLabel>
              <S.InformationText>
                {data.destination.name} - {data.destination.city}{" "}
              </S.InformationText>
            </S.InformationItem>

            <S.InformationItem>
              <S.InformationLabel>
                {t("comex.operational.orderItem.flightInfo.departure")}
              </S.InformationLabel>
              <S.InformationText>
                {data.actual_out
                  ? format(new Date(data.actual_out), "dd/MM/yyyy HH:mm:ss")
                  : "---"}
              </S.InformationText>
            </S.InformationItem>

            <S.InformationItem>
              <S.InformationLabel>
                {t("comex.operational.orderItem.flightInfo.estimated")}
              </S.InformationLabel>
              <S.InformationText active={true}>
                {data.estimated_in
                  ? format(new Date(data.estimated_in), "dd/MM/yyyy HH:mm:ss")
                  : "---"}
              </S.InformationText>
            </S.InformationItem>

            <S.InformationItem>
              <S.InformationLabel>
                {t("comex.operational.orderItem.flightInfo.duration")}
              </S.InformationLabel>
              <S.InformationText>{data.progress_percent}% </S.InformationText>
            </S.InformationItem>

            <S.InformationItem>
              <S.InformationLabel>
                {t("comex.operational.orderItem.flightInfo.travelTime")}
              </S.InformationLabel>
              <S.InformationText>
                {data.estimated_in && data.actual_out
                  ? differenceInHoursMinutes(
                      new Date(data.estimated_in),
                      new Date(data.actual_out)
                    )
                  : "---"}
              </S.InformationText>
            </S.InformationItem>
          </S.InformationContainer>
        </>
      )}
    </S.TrackingContainer>
  );
};
