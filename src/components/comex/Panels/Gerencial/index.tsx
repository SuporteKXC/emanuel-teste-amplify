import React, { useState, useCallback, useEffect } from "react";
import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { OrderFilterActions, ProductsActions, ExportProductsActions } from "store/ducks/comex/panels";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FilterPanel } from "../filterPanel";
import { peso, exportToCSV } from "utils";
import ExportExcel from 'components/shared/ExportExcel';
import { Paginator } from "components/shared";
import { ProductData } from "contracts";

export const Gerencial: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [dataWithTotals, setDataWithTotals] = useState();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  
  const { data: products, loading, meta } = useSelector((state: RootState) => state.productsList);
  const { loading: exportLoading } = useSelector((state: RootState) => state.exportProductsList);
  const { data: filterData } = useSelector((state: RootState) => state.ordersFilter);
  const { currentCountry } = useSelector((state: RootState) => state.country);

  const fetchOrders = useCallback(() => {
    dispatch(ProductsActions.request(filterData));
  }, [dispatch, filterData]);

  useEffect(() => fetchOrders(), [filterData, currentCountry]);

  const handlePageChange = useCallback((page: number) => {
    dispatch(OrderFilterActions.setFilterData({...filterData, page}))
  }, [dispatch, filterData]);

  const totalsArray: any[] = [];

  products?.map((item) => {
    const totals = {
      total: 0,
      total_pendente: 0,
      total_entrege: 0,
    };

    item?.order_itens?.map((order_item) => {
      totals.total += Number(order_item?.qty);
      if (order_item.plant_delivery) {
        totals.total_entrege += Number(order_item?.qty);
      } else {
        totals.total_pendente += Number(order_item?.qty);
      }
    });
    // item.totals = totals;
    totalsArray.push(totals);
  });

  const generateFile = useCallback(
    (products: { data: ProductData[] }) => {
      if (!products) return;

      const fileName = `${t(`panels.managerial`)} ${new Date().toLocaleDateString(
        i18n.language,
        {
          day: '2-digit',
          month: '2-digit',
        }
      )}`;
      
    const exportFile = products?.data.reduce((acc, product, productIndex) => {
        if (!product?.order_itens || !product?.order_itens[0]) return acc;
      
        return [
          ...acc,
          ...product?.order_itens.map(order_item => ({
            [t(`panels.id_product`)]: `${product?.code ? product?.code : ''}`,
            [t(`panels.PO`)]: `${order_item?.order?.order_reference ? order_item?.order?.order_reference : '' }-${order_item?.item ? order_item?.item : ''}`,
            [t(`panels.poNumber`)]: `${order_item?.order?.order_reference ? order_item?.order?.order_reference : ''}`,
            [t(`panels.poItem`)]: `${order_item?.id ? order_item?.id : ''}`,
            [t(`panels.nextStep`)]: order_item.process_status ? order_item.process_status : '',
            [t(`panels.description`)]: product?.description ? product?.description : '',
            [t(`panels.urgent`)]: product?.alert_critical ? t(`filterandButton.yes`) : t(`filterandButton.no`),
            // [t(`panels.importationAnalyst`)]: order_item?.order?.csr_name ? order_item?.order?.csr_name : '' ,
            // [t(`panels.responsible_po`)]: order_item?.order?.responsible_po ? order_item?.order?.responsible_po : '' ,
            [t(`panels.company`)]: order_item?.order?.company?.consignee ? order_item?.order?.company?.consignee : '' ,
            [t(`panels.actualGR`)]: order_item?.gr_actual ? format(new Date(order_item?.gr_actual), 'dd-MM-yyyy') : '--/--/----',
            [t(`panels.plantDelivery`)]: order_item?.plant_delivery ? format(new Date(order_item?.plant_delivery), 'dd-MM-yyyy') : '--/--/----',
            [t(`panels.qty`)]: order_item?.qty ? String(peso(+order_item?.qty)) : '',
            // [t(`panels.qtyAll`)]: totalsArray[productIndex].total >= 0 ? String(peso(totalsArray[productIndex].total)) : '',
            [t(`panels.totalToReceive`)]: order_item?.plant_delivery ? '' : String(peso(+order_item?.qty)),
            // [t(`panels.totalToReceive`)]: totalsArray[productIndex].total_pendente >= 0 ? String(peso(totalsArray[productIndex].total_pendente)) : '',
            [t(`panels.totalReceived`)]: order_item?.plant_delivery ? String(peso(+order_item?.qty)) : '',
            // [t(`panels.totalReceived`)]: totalsArray[productIndex].total_entrege >= 0 ? String(peso(totalsArray[productIndex].total_entrege)) : '',
          }))
        ]
      },
      [] as { [x: string]: string }[]
    );
    
    exportToCSV(exportFile, fileName);
  }, [i18n.language]);

  const exportOrders = useCallback(() => {
    dispatch(ExportProductsActions.request({
      ...filterData,
      limit: "undefined",
    },
    generateFile
    ));
  }, [dispatch, filterData, generateFile]);

  return (
    <S.Container>
      <S.Header>
        <div className="wrapper">
          <S.IconMonitor />
          {t("comex.panels.managerial")}
        </div>
        <ExportExcel
          loading={exportLoading}
          onExport={() => exportOrders()}
        />
        <S.ClickWrapper onClick={() => setIsFilterOpen(!isFilterOpen)}>
          {isFilterOpen ? <S.TogglerOpenIcon /> : <S.TogglerCloseIcon />}{" "}
          {t("comex.filterandButton.filter")}
        </S.ClickWrapper>
      </S.Header>
      {isFilterOpen && <FilterPanel />}
      {loading ?
        <S.ActivityIndicator />
       : 
      <S.GridContainer>
        <S.GridHeader>
          <p>{t("comex.panels.id_product")}</p>
          <p>{t("comex.panels.actualGR")}</p>
        </S.GridHeader>
        {products &&
          Array.isArray(products) &&
          products?.map((product, index_product) => (
            <S.ListContainer key={product?.id}>
              <div className="container">
                <p className="empresa">{product?.consignee}</p>
                <p className="codigo">{product?.code}</p>
                <p className="name">{product?.description}</p>
              </div>
              <S.ListInfo>
                <S.ListLinks>
                  <S.ListWrapper>
                    {product?.order_itens?.map((item) => (
                      <S.ListItens
                        key={item?.id}
                        onClick={() => navigate(
                          `order-item/${item?.id}`,
                          {state: { from: location.pathname}}
                        )}
                      >
                        <S.DaysIcon />
                        <S.GrActualDate isDelivered={!!item?.gr_effective}>
                          {item?.gr_actual
                          ? format(new Date(item?.gr_actual), "dd-MM-yyyy")
                          : "--/--/----"}
                        </S.GrActualDate>
                        <p>
                          <span className="wrapper">
                            <S.BoxIcon width={20} height={20} />
                            {peso(Number(item?.qty))}
                          </span>
                        </p>
                      </S.ListItens>
                    ))}
                  </S.ListWrapper>
                </S.ListLinks>
                <S.ListTotals>
                  <S.Total>
                    <span>{t("comex.panels.all")}</span>
                    <div className="wrapper">
                      <S.BoxIcon width={20} height={20} />
                      {peso(totalsArray[index_product].total)}
                    </div>
                  </S.Total>
                  <S.TotalReceived>
                    <span>{t("comex.panels.totalReceived")}</span>
                    <div className="wrapper">
                      <S.BoxIcon width={20} height={20} />
                      {peso(totalsArray[index_product].total_entrege)}
                    </div>
                  </S.TotalReceived>
                  <S.TotalToReceive>
                    <span>{t("comex.panels.totalToReceive")}</span>
                    <div className="wrapper">
                      <S.BoxIcon width={20} height={20} />
                      {peso(totalsArray[index_product].total_pendente)}
                    </div>
                  </S.TotalToReceive>
                </S.ListTotals>
              </S.ListInfo>
            </S.ListContainer>
          ))}
      </S.GridContainer>
      }
      <Paginator onPageChange={handlePageChange} pagination={meta}/>
    </S.Container>
  );
};
export default Gerencial;