import React, { useState, useCallback, useEffect } from 'react';
import * as S from './styles';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import { OrderFilterActions, ProductsActions, ExportProductsActions  } from 'store/ducks/comex/panels';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FilterPanel } from '../filterPanel';
import { peso, exportToCSV } from 'utils/';
import ExportExcel from 'components/shared/ExportExcel';
import { Paginator } from 'components/shared';
import { ProductData } from "contracts";
import clsx from 'clsx';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


const COMEX_CLIENT = import.meta.env.VITE_COMEX_CLIENT;

export const AlteracaoGr: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  
  let itemTotal: number = 0;
  
  const addTotal = (qty: any) => {
    itemTotal += parseInt(qty);
  };
  
  const zeraTotal = () => {
    itemTotal = 0;
  };
  
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
  
  const generateFile = useCallback(
    (products: { data: ProductData[] }) => {
      if (!products) return;

      const fileName = `${t(`panels.changeGR`)} ${new Date().toLocaleDateString(
        i18n.language,
        {
          day: '2-digit',
          month: '2-digit',
        }
      )}`;
      
      const exportFile = products?.data?.reduce((acc, product) => {
        if (!product?.order_itens || !product?.order_itens[0]) return acc;
        
        zeraTotal()
        product.order_itens.forEach(item => addTotal(item.qty));
        
        return [
          ...acc,
          ...product.order_itens.map(order_item => ({
            [t(`panels.id_product`)]:
              `${product?.code ? product?.code : ''}`,
            [t(`panels.PO`)]: `${order_item?.order?.order_reference ? order_item?.order?.order_reference : '' }-${order_item?.item ? order_item?.item : ''}`,
            [t(`panels.poNumber`)]: `${order_item?.order?.order_reference ? order_item?.order?.order_reference : ''}`,
            [t(`panels.poItem`)]: `${order_item?.id ? order_item?.id : ''}`,
            [t(`panels.nextStep`)]: order_item.process_status ? order_item.process_status : '',
            [t(`panels.description`)]: product?.description ? product?.description : '',
            [t(`panels.urgent`)]: product?.alert_critical ? t(`filterandButton.yes`) : t(`filterandButton.no`),
            // [t(`panels.importationAnalyst`)]: order_item?.order?.csr_name ? order_item?.order?.csr_name : '' ,
            // [t(`panels.responsible_po`)]: order_item?.order?.responsible_po ? order_item?.order?.responsible_po : '' ,
            [t(`panels.company`)]: order_item?.order?.company?.consignee ? order_item?.order?.company?.consignee : '' ,
            [t(`panels.originalGR`)]: order_item?.gr_original ? format(new Date(order_item?.gr_original), 'dd-MM-yyyy') : '--/--/----',
            [t(`panels.previsionGR`)]: order_item?.gr_expected ? format(new Date(order_item?.gr_expected), 'dd-MM-yyyy') : '--/--/----',
            [t(`panels.actualGR`)]: order_item?.gr_actual ? format(new Date(order_item?.gr_actual), 'dd-MM-yyyy') : '--/--/----',
            [t(`panels.plantDelivery`)]: order_item?.plant_delivery ? format(new Date(order_item?.plant_delivery), 'dd-MM-yyyy') : '--/--/----',
            [t(`panels.qty`)]: order_item?.qty ? String(peso(+order_item?.qty)) : '',
          }))
        ]},
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

  const STATUS = {
    CHEGADA_COM_ATRASO: (plant_delivery: Date, gr_actual: Date) => plant_delivery && gr_actual && new Date(plant_delivery) > new Date(gr_actual),
    NAO_RECEBIDO: (plant_delivery: Date | null, gr_actual: Date | null) => !plant_delivery && gr_actual,
    CHEGADA_ANTECIPADA: (plant_delivery: Date , gr_actual: Date) => plant_delivery && gr_actual && new Date(plant_delivery) < new Date(gr_actual),
    SEM_DATA_GR: (gr_actual: Date | null) => !gr_actual
  }

  return (
    <S.Container>
      <S.Header>
        <div className="wrapper">
          <S.IconMonitor />
          {t('comex.panels.changeGR')}
        </div>
        <ExportExcel
          loading={exportLoading}
          onExport={() => exportOrders()}
        />
        <S.ClickWrapper onClick={() => setIsFilterOpen(!isFilterOpen)}>
          {isFilterOpen ? <S.TogglerOpenIcon /> : <S.TogglerCloseIcon />}{' '}
          {t('comex.filterandButton.filter')}
        </S.ClickWrapper>
      </S.Header>
      {isFilterOpen && <FilterPanel />}
      {loading ? (
        <S.ActivityIndicator />
      ) : (
        <>
          <S.GridContainer>
            <S.GridHeader>
              <p>{t('comex.panels.id_product')}</p>
              <p>{t('comex.panels.PO')}</p>
              {COMEX_CLIENT !== 'IFF - Comex' && <p>{t('comex.panels.originalGR')}</p>}
              {COMEX_CLIENT !== 'IFF - Comex' && <p>{t('comex.panels.previsionGR')}</p>}
              <p>{t('comex.panels.actualGR')}</p>
              <p>{t('comex.panels.plantDelivery')}</p>
              <p>{t('comex.panels.qty')}</p>
            </S.GridHeader>
            {products && Array.isArray(products) && products?.map((product) => (
              <S.ListContainer key={product.id}>
                  <div>
                    <p className="empresa">{product?.consignee}</p>
                    <p className="codigo">{product?.code}</p>
                    <p className="name">{product?.description}</p>
                  </div>
                <S.ListInfo>
                  <S.ListLinks>
                    {product?.order_itens?.map((order_item) => (
                      <S.ListItens
                        key={order_item.id}
                        onClick={() => navigate(
                          `order-item/${order_item?.id}`,
                          {state: { from: location.pathname}}
                        )}
                      >
                        <p>
                          {order_item.order.order_reference}-{order_item.item}
                        </p>
                        { COMEX_CLIENT !== 'IFF - Comex' && 
                          (<p>
                            <S.DaysIcon />{' '}
                            {order_item?.gr_original
                              ? format(new Date(order_item?.gr_original), 'dd-MM-yyyy')
                              : '--/--/----'}
                          </p>) 
                        }
                        { COMEX_CLIENT !== 'IFF - Comex' && 
                          (<p>
                            <S.DaysIcon />{' '}
                            {order_item?.gr_expected
                              ? format(new Date(order_item?.gr_expected), 'dd-MM-yyyy')
                              : '--/--/----'}
                          </p>) 
                        }
                        <p className={clsx({
                          'text-red-500':   STATUS.CHEGADA_COM_ATRASO(order_item?.plant_delivery, order_item?.gr_actual),
                          'text-green-500': STATUS.NAO_RECEBIDO(order_item?.plant_delivery,  order_item?.gr_actual),
                          'text-blue-500':  STATUS.CHEGADA_ANTECIPADA(order_item?.plant_delivery, order_item?.gr_actual),
                          'text-gray-500':  STATUS.SEM_DATA_GR(order_item?.gr_actual)
                        })}>
                          <S.DaysIcon />{' '}
                          {order_item?.gr_actual
                            ? format(new Date(order_item?.gr_actual), 'dd-MM-yyyy')
                            : '--/--/----'}
                        </p>

                        <div className='flex gap-2'>
                            <p className={order_item?.plant_delivery ? new Date(order_item?.plant_delivery) > new Date(order_item?.gr_actual) ? "text-red-500" : "text-blue-500" : '' }>
                            <S.DaysIcon />{" "}
                            {order_item?.plant_delivery
                              ? format(new Date(order_item?.plant_delivery), 'dd-MM-yyyy')
                              : '--/--/----'}
                            </p>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger> 
                                  <Info/>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {STATUS.CHEGADA_COM_ATRASO(order_item?.plant_delivery, order_item?.gr_actual) && 'Entregue com atraso'}
                                  {STATUS.CHEGADA_ANTECIPADA(order_item?.plant_delivery, order_item?.gr_actual) && 'Entrega antecipada'}
                                  {STATUS.NAO_RECEBIDO(order_item?.plant_delivery,  order_item?.gr_actual) && 'Pendente'}
                                  {STATUS.SEM_DATA_GR(order_item?.gr_actual) && 'Pendente sem prazo'}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                         
                        </div>
                        <p>
                          <span className="wrapper">
                            <S.BoxIcon
                              width={20}
                              height={20}
                              className="icon-box"
                            />
                            {peso(Number(order_item.qty))}
                            {addTotal(order_item.qty)}
                          </span>
                        </p>
                      </S.ListItens>
                    ))}
                  </S.ListLinks>
                  <S.Total>
                    <>
                      <p>{t('comex.panels.all')} </p>
                      <p>{peso(itemTotal)}</p>
                      {zeraTotal()}
                    </>
                  </S.Total>
                </S.ListInfo>
              </S.ListContainer>
            ))}
          </S.GridContainer>
        </>
      )}
      <Paginator onPageChange={handlePageChange} pagination={meta} />
    </S.Container>
  );
};

export default AlteracaoGr;