import React, { useState } from "react";
import { format } from "date-fns";
import { v4 } from "uuid";
import { Modal } from "components/shared";
import { DocumentOccurrence, Geolocation } from "contracts/trackingDelivery";
import * as S from "./styles";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface Props {
  geolocations: Geolocation[] | null;
  occurrences: DocumentOccurrence[] | null;
  isOpen: boolean;
  close: () => void;
}

type Option = "geolocations" | "occurrences";

export const ListGeolocations: React.FC<Props> = ({
  isOpen,
  close,
  geolocations,
  occurrences,
}) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Option>("geolocations");
  
  return (
    <Modal isOpen={isOpen}>
      <S.Container>
        <S.Header>
          <S.Title>
            <S.Icon />
            {selected === "geolocations" && `${t('trackingDelivery.header.locations')} GPS`}
            {selected === "occurrences" && t('trackingDelivery.header.occurrences')}
          </S.Title>
          <S.HeaderButtons>
            <Button
              className={selected === "geolocations" ? "bg-primary-500 hover:bg-primary-500" : "bg-gray-500 hover:bg-primary-500"}
              onClick={() => setSelected("geolocations")}
            >
              {t('trackingDelivery.header.locations')}
            </Button>
            <Button
              className={selected === "occurrences" ? "bg-primary-500 hover:bg-primary-500" : "bg-gray-500 hover:bg-primary-500"}
              onClick={() => setSelected("occurrences")}
            >
              {t('trackingDelivery.header.occurrences')}
            </Button>
          </S.HeaderButtons>
        </S.Header>
        <S.GeolocationWrapper active={selected === "geolocations"}>
          {geolocations &&
            geolocations.map((geolocation) => (
              <S.Geolocation key={v4()}>
                <S.Value>
                  {geolocation.geolocationDate &&
                  geolocation.geolocationDate !== "0000-00-00 00:00:00"
                    ? format(
                        new Date(geolocation.geolocationDate),
                        "dd/MM/yyyy HH:mm"
                      )
                    : format(
                        new Date(geolocation.createdAt),
                        "dd/MM/yyyy HH:mm"
                      )}
                </S.Value>
                <S.Value>
                  {geolocation.latitude || "---"}{" "}
                  {geolocation.longitude || "---"}{" "}
                </S.Value>
                <S.Value>{geolocation.description}</S.Value>
              </S.Geolocation>
            ))}
        </S.GeolocationWrapper>
        <S.OccurrenceWrapper active={selected === "occurrences"}>
          {occurrences &&
            occurrences.map((occurrence) => (
              <S.Occurrence key={occurrence.id}>
                <S.Value>
                  {
                    format(
                      new Date(occurrence.createdAt),
                      "dd/MM/yyyy HH:mm"
                    )
                  }
                </S.Value>
                <S.Value>
                  {occurrence.documentGeolocation.latitude || "---"}{" "}
                  {occurrence.documentGeolocation.longitude || "---"}{" "}
                </S.Value>
                <S.Value>
                  {occurrence.occurrenceType.id} -{" "}
                  {occurrence.occurrenceType.name}
                </S.Value>
              </S.Occurrence>
            ))}
        </S.OccurrenceWrapper>
        <S.ButtonsWrapper>
          <Button onClick={close}>
            {t('trackingDelivery.general.close')}
          </Button>
        </S.ButtonsWrapper>
      </S.Container>
    </Modal>
  );
};
