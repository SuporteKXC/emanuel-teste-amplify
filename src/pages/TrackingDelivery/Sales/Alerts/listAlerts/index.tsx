import React, { useCallback, useEffect, useState } from "react";
import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { AlertActions } from "store/ducks/comex/alerts";
import { useTranslation } from "react-i18next";
import { FilterAlerts } from "components/comex/Alerts/filterAlerts";
import { DataTable } from "@/components/ui/DataTable";
import { useColumns } from "./columns";
import SalesLayout from "@/layouts/Sales/SalesLayout";

export const SalesAlerts: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { t } = useTranslation();

  const { columns } = useColumns();

  const {
    data: alerts,
    meta,
    loading,
  } = useSelector((state: RootState) => state.alerts);
  const { currentCountry } = useSelector((state: RootState) => state.country);
  const { data: filterData } = useSelector(
    (state: RootState) => state.alertsFilter
  );

  const fetchAlerts = useCallback(() => {
    dispatch(AlertActions.request(filterData));
  }, [filterData]);

  useEffect(() => fetchAlerts(), [filterData, currentCountry]);

  let criticals = 0;
  const orderItensAlertsIds: number[] = [];
  let favorites = 0;
  const orderItensFavoritesIds: number[] = [];
  alerts &&
    Array.isArray(alerts) &&
    alerts.forEach((item) => {
      const orderItem = item?.order_item_alert?.order_item;

      if (
        orderItem?.process_critical === "1" &&
        !orderItensAlertsIds.includes(orderItem.id)
      ) {
        orderItensAlertsIds.push(item?.order_item_alert?.order_item?.id);
        criticals++;
      }
      if (
        orderItem?.user_favorit &&
        orderItem?.user_favorit[0] &&
        !orderItensFavoritesIds.includes(orderItem?.id)
      ) {
        orderItensFavoritesIds.push(item?.order_item_alert?.order_item?.id);
        favorites++;
      }
    });
  return (
    <SalesLayout>
      <S.PageHeader>
        <S.AlertTriangleIcon height={30} width={30} />
        {t("comex.alerts.title")}

        {/* <ExportExcel
          onExport={() => {
            setExportActive(true);
            generateFile();
          }}
          loading={loading}
        /> */}

        <S.ClickWrapper onClick={() => setIsFilterOpen(!isFilterOpen)}>
          {isFilterOpen ? <S.TogglerOpenIcon /> : <S.TogglerCloseIcon />}{" "}
          {t("comex.filterandButton.filter")}
        </S.ClickWrapper>
      </S.PageHeader>
      {isFilterOpen && <FilterAlerts module={5} />}

      <S.AlertStates>
        {t("comex.alerts.all")}&nbsp;<strong>{meta?.total}</strong>
        {t("comex.alerts.critics")}&nbsp;<strong>{criticals}</strong>
        {t("comex.alerts.favorite")}&nbsp;<strong>{favorites}</strong>
      </S.AlertStates>
      <DataTable columns={columns} data={alerts ?? []} isLoading={loading} />
    </SalesLayout>
  );
};

export default SalesAlerts;
