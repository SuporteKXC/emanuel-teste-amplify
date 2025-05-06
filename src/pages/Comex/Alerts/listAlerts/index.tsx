import React, { useCallback, useEffect, useState } from "react";
import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { Filter } from "lucide-react";
import type { AppDispatch, RootState } from "store";
import { AlertActions } from "store/ducks/comex/alerts";
import { useTranslation } from "react-i18next";
import { AlertTriangle } from "lucide-react";
import { FilterAlerts } from "components/comex/Alerts/filterAlerts";
import { FilterExportAlerts } from "components/comex/Alerts/filterExportAlerts";
import { DataTable } from "@/components/ui/DataTable";
import { useColumns } from "./columns";
import { useExportColumns } from "./columnsExport";
import { useParams } from "react-router-dom";
import { ExportOrderItemAlertActions } from "@/store/ducks/comex/exportAlert";

type ModuleIdDictionaryKey = 'config' | 'comex' | 'wms' | 'tracking' | 'sales' | 'comex-export';

interface ModuleInfo {
  id: number;
  name: string;
}

const Modules: Record<ModuleIdDictionaryKey, ModuleInfo> = {
  'config': { id: 1, name: 'Configurador' },
  'comex': { id: 2, name: 'Comex' },
  'wms': { id: 3, name: 'Estoque' },
  'tracking': { id: 4, name: 'Tracking' },
  'sales': { id: 5, name: 'Saídas' },
  'comex-export': {id: 6, name: "Exportação Comex"}
};

export const ListAlerts: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const { t } = useTranslation();
  const { module } = useParams<{module: ModuleIdDictionaryKey}>()
  const { columns } = useColumns();
  const { exportColumns } = useExportColumns();
  
  const {
    data: alerts,
    meta,
    loading,
  } = useSelector((state: RootState) => {
    if(Modules[module!].id == 6){
      return state.exportOrderItemAlert
    } else {
      return state.alerts
    }
  });

  const { currentCountry } = useSelector((state: RootState) => state.country);
  const { data: filterData } = useSelector(
    (state: RootState) => state.alertsFilter
  );

  const fetchAlerts = useCallback(() => {
    if(Modules[module!].id == 6){
      dispatch(ExportOrderItemAlertActions.request({...filterData, module: Modules[module!].id}))
    } else {
      dispatch(AlertActions.request({...filterData, module: Modules[module!].id}));
    }
  }, [filterData,module]);

  useEffect(() => fetchAlerts(), [filterData, currentCountry, module]);

  let criticals = 0;
  const orderItensAlertsIds: number[] = [];
  let favorites = 0;
  const orderItensFavoritesIds: number[] = [];

  if (Array.isArray(alerts)) {
    if(Modules[module!].id == 6) {
      alerts.forEach((item) => {
        const orderItem = item?.order_item_alert?.order_item;
        if (!orderItem) return;
  
        const orderId = orderItem.id;
  
        if (
          orderItem.process_critical === "1" &&
          !orderItensAlertsIds.includes(orderId)
        ) {
          orderItensAlertsIds.push(orderId);
          criticals++;
        }
      });
      
    } else {
      alerts.forEach((item) => {
        const orderItem = item?.order_item_alert?.order_item;
        if (!orderItem) return;
  
        const orderId = orderItem.id;
  
        if (
          orderItem.process_critical === "1" &&
          !orderItensAlertsIds.includes(orderId)
        ) {
          orderItensAlertsIds.push(orderId);
          criticals++;
        }
  
        const userFavorite = orderItem.user_favorit;
        if (userFavorite?.[0] && !orderItensFavoritesIds.includes(orderId)) {
          orderItensFavoritesIds.push(orderId);
          favorites++;
        }
      });
    }
  }
  useEffect(() => {
    setIsFilterOpen(true);
  },[module])

  return (
    <>
      <div className="flex w-full p-4 justify-between items-center font-GilroySemibold" style={{backgroundColor: "white", width: "100%", height: "60px", borderRadius: "10px"}}>
        <div className="flex items-center gap-2 text-ml">
          <AlertTriangle size={32} />
          {t("comex.alerts.title")} {module && Modules[module]?.name?.toUpperCase()}
        </div>
        <div className="flex gap-4">
          <div
            className="flex cursor-pointer h-fit"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            {isFilterOpen ? <Filter/> : <Filter/>}
          </div>
        </div>
      </div>

      {
        module && Modules[module].id == 6 ? 
        (isFilterOpen && module && <FilterExportAlerts module={Modules[module].id} />)
        :
        (isFilterOpen && module && <FilterAlerts module={Modules[module].id} />)
      }

      <div className="flex p-4 space-x-5 font-GilroySemibold">
        <span>
          {t("comex.alerts.all")}&nbsp;<strong>{meta?.total}</strong>
        </span>
        <span>
          {t("comex.alerts.critics")}&nbsp;
          <strong className="text-[#ffebb0]">{criticals}</strong>
        </span>
      </div>
      { Modules[module!].id == 6 ? 
        <DataTable columns={exportColumns} data={alerts ?? []} isLoading={loading} /> :
        <DataTable columns={columns} data={alerts ?? []} isLoading={loading} />
      }
    </>
  );
};

export default ListAlerts;
