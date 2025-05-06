import React, { useCallback, useEffect } from "react";
import * as S from "./styles";
import { TransitTimesTopPanel } from "layouts";
import { ManagementPaginator as Paginator } from "components";
import { TransitTimeFilter } from "../filterTransitTime";
import { PaginateTrackingTransitTimesActions as PaginateActions } from "store/ducks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { TrackingTransitTime } from "contracts/general/TrackingTransitTime";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ItemProps {
  item: TrackingTransitTime;
}

const empty = "---";

export const ListTransitTimes = () => {
  let filter: any;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    data: transitTimes,
    loading,
    pagination,
  } = useSelector((state: RootState) => state.paginateTrackingTransitTimes);

  const getTransitTimes = useCallback((query?: any) => {
    filter = query;
    dispatch(PaginateActions.request({ ...query }));
  }, []);

  const onPageChange = React.useCallback(
    (page: number) => {
      getTransitTimes({ ...filter, page });
    },
    [filter]
  );

  useEffect(() => {
    getTransitTimes();
  }, []);

  const Item = React.useCallback(
    ({ item }: ItemProps) => (
      <S.Item>
        <p>{item.id || empty}</p>
        <p>{item.carrier?.tradeName || empty}</p>
        <p>{item.type || empty}</p>
        <p>{item.cityOrigin?.name || empty}</p>
        <p>{item.cityDestiny?.name || empty}</p>
        <p>{item.deadlineDedicated || empty}</p>
        <p>{item.deadlineFractional || empty}</p>
        <p>{item.weight || empty}</p>
        <button
          title={t("general.config.transitTimes.editar")}
          onClick={() => navigate(`/config/tracking-transit-times/${item.id}`)}
        >
          <S.EditIcon />
        </button>
      </S.Item>
    ),
    []
  );

  return (
    <>
      <TransitTimesTopPanel />
      <TransitTimeFilter onFilter={getTransitTimes} />
      <S.ItemContainer>
        <S.ItemHeader>
          <span>ID</span>
          <span>{t("general.config.transitTimes.transportadora")}</span>
          <span>{t("general.config.transitTimes.tipo")}</span>
          <span>{t("general.config.transitTimes.origem")}</span>
          <span>{t("general.config.transitTimes.destino")}</span>
          <span>{t("general.config.transitTimes.prazoLotacao")}</span>
          <span>{t("general.config.transitTimes.prazoFracionado")}</span>
          <span>{t("general.config.transitTimes.peso")}</span>
          <span />
        </S.ItemHeader>
        {loading && <S.Loading />}
        {transitTimes?.map((transitTime) => (
          <Item item={transitTime} key={transitTime.id} />
        ))}
      </S.ItemContainer>
      <Paginator pagination={pagination} onPageChange={onPageChange} />
    </>
  );
};
