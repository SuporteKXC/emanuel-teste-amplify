import React, { useCallback, useEffect, useState } from "react";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import {
  CancelOrderItensActions,
  DeleteUserFavoriteActions,
  NewUserFavoriteActions,
  OperationalFilterActions,
  OrderItemActions,
  SelectedIdsActions,
} from "store/ducks/comex/operational";
import { differenceInMinutes, format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  SortableHeadersGroup,
  SortableHeader,
  Paginator,
} from "components/shared/Pagination";
import { useAuth, usePermission } from "hooks";
import { OrderItemData, SortingParams } from "contracts";
import { peso } from "utils";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileStackIcon } from "lucide-react";

export const ListOperational = () => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { hasPermissionTo } = usePermission();
  const [sort, setSort] = useState({});
  const [isCancelingSet, setIsCancelingSet] = useState<Set<number>>(new Set());

  const { data, loading, meta } = useSelector(
    (state: RootState) => state.orderItems
  );

  const { data: userData } = useSelector(
    (state: RootState) => state.auth
  );

  const { ids: selectedOrderItensIds } = useSelector(
    (state: RootState) => state.orderItemSelectedIdsReducer
  )
  const { currentCountry } = useSelector(
    (state: RootState) => state.country
  );
  
  const { data: filterData } = useSelector(
    (state: RootState) => state.operationalFilterData
  );

  const { loading: cancelLoading } = useSelector(
    (state: RootState) => state.cancelOrderItens
  );

  const onSort = useCallback(
    (order: SortingParams) => {
      setSort(order);
      dispatch(
        OperationalFilterActions.setFilterData({ ...filterData, order })
      );
    },
    [dispatch, filterData]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(OperationalFilterActions.setFilterData({ ...filterData, page }));
    },
    [dispatch, filterData]
  );

  const fetchOrders = useCallback(
    () => dispatch(OrderItemActions.request(filterData)),
    [dispatch, filterData]
  );

  useEffect(() => {
    fetchOrders();
  }, [filterData, currentCountry]);

  const handleFavoriteCreate = useCallback(
    (user_id: number, order_item_id: number) => {
      dispatch(OrderItemActions.startLoading());
      dispatch(
        NewUserFavoriteActions.request(
          { user_id, order_item_id },
          () => fetchOrders(),
          () => dispatch(OrderItemActions.stopLoading())
        )
      );
    },
    [fetchOrders]
  );

  const handleFavoriteDelete = useCallback(
    (id: string) => {
      dispatch(OrderItemActions.startLoading());
      dispatch(
        DeleteUserFavoriteActions.request(
          id,
          () => fetchOrders(),
          () => dispatch(OrderItemActions.stopLoading())
        )
      );
    },
    [fetchOrders]
  );

  const dayInMinutes = 24 * 60;
  const check24HoursUpdate = (dateString: string) =>
    differenceInMinutes(new Date(), parseISO(dateString)) < dayInMinutes;

  const selectToCancel = (id: number) => {
    setIsCancelingSet((prev) => {
      const previous = new Set([...prev]);
      if (previous.has(id)) {
        previous.delete(id);
        return previous;
      }
      return new Set([...previous, id]);
    });
  };

  const cancelOrderItensHandler = useCallback(() => {
    dispatch(
      CancelOrderItensActions.request({ ids: [...isCancelingSet] }, () => {
        fetchOrders();
        setIsCancelingSet(new Set());
      })
    );
  }, [isCancelingSet]);

  const handleCheck = (checked: boolean,id: string,po: string) => {
    if(checked){
      dispatch(SelectedIdsActions.addSelectedId(id,po))
    }else{
      dispatch(SelectedIdsActions.removeSelectedId(id,po))
    }
  }


  const handleSelectAll = (data: OrderItemData[] | null, checked: boolean) => {
    const items = data?.map((item) => {
      return {
        id: String(item.id),
        po: `${item?.order?.order_reference}-${item?.item}: ${item?.product?.description}`,
      }
    }) || []

    if (checked) {
      items.map((item) => dispatch(SelectedIdsActions.addSelectedId(item.id,item.po)))
    } else {
      items.map((item) => dispatch(SelectedIdsActions.removeSelectedId(item.id,item.po)))
    }

  }


  return (
    <>
      <S.Container>
        {loading ? (
          <S.ActivityIndicator />
        ) : (
          <>
                  <div className="flex gap-4">
                    <S.Total>
                      {t("comex.operational.all")} {meta?.total}
                    </S.Total>
                    <S.Total>POs selecionadas: {selectedOrderItensIds.length}</S.Total>
                  </div>    
                  {
                  data && Array.isArray(data) && data.length > 0 ?
                    <>
                      <S.GridHeader>
                        <S.Ghost width={"2px"} />
                        <SortableHeadersGroup onSort={onSort} currentSort={sort}>
                          <SortableHeader
                            label={t("comex.operational.PO")}
                            column="order_reference"
                          />
                          <S.SortHeader>{t("comex.operational.orderItem.tracking.responsiblePo")}</S.SortHeader>
                          <S.SortHeader>{t("comex.operational.item")}</S.SortHeader>
                          <SortableHeader
                            label={t("comex.operational.product")}
                            column="product_code"
                          />
                          <SortableHeader
                            label={t("comex.operational.description")}
                            column="description"
                          />
                          <SortableHeader
                            label={t("comex.operational.quantity")}
                            column="qty"
                          />
                          <SortableHeader
                            label={t("comex.operational.UOM")}
                            column="uom"
                          />
                          <SortableHeader
                            label={t("comex.operational.registerDate")}
                            column="register_date"
                          />
                          <SortableHeader
                            label={t("comex.operational.shipperAddress")}
                            column="shipper_address"
                          />
                          <SortableHeader
                            label={t("comex.operational.ATA")}
                            column="ata_date"
                          />
                          <SortableHeader
                            label={t("comex.operational.plantDelivery")}
                            column="plant_delivery"
                          />
                          <SortableHeader
                            label={t("comex.operational.actualGR")}
                            column="gr_actual"
                          />
                          <SortableHeader
                            label={t("comex.operational.status")}
                            column="process_status"
                          />
                          <S.Ghost width={"24px"} />
                          <S.Ghost width={"24px"} />
                          <S.Ghost width={"24px"} />
                          <S.Ghost width={"20px"} />
                          <S.Ghost width={"24px"} />
                          <S.Ghost width={"24px"} />
                          <S.Ghost width={"24px"} />
                          <S.Ghost width={"20px"} />
                          <Checkbox
                            id="select-all"
                            className="border-slate-400"
                            onCheckedChange={(checked: boolean) => {
                              handleSelectAll(data, checked);
                            }}
                            defaultChecked={data?.every((item) => selectedOrderItensIds.includes(String(item.id))) ?? false}
                            onClick={(e) => e.stopPropagation()}
                            checked={data?.every((item) => selectedOrderItensIds.includes(String(item.id))) ?? false}
                          />
                        </SortableHeadersGroup>
                        <S.Ghost width={"2px"} />
                      </S.GridHeader>
                      {
                        data &&
                          Array.isArray(data) &&
                          data.map((item, index) => (
                            <S.ItemWrapper
                              key={item.id}
                              onClick={() =>
                                navigate(`order-item/${item?.id}`, {
                                  state: { from: location.pathname },
                                })
                              }
                              isCritical={!!Number(item?.process_critical)}
                              channel={item?.channel}
                            >
                                  <S.Item />
                                  <S.Item>{item?.order?.order_reference}</S.Item>
                                  <S.Item>{
                                    item?.supplier?.responsible_analists
                                      ?.map((e) => e.name)
                                      .join(", ")}
                                  </S.Item>
                                  <S.Item>{item?.item}</S.Item>
                                  <S.Item>{item?.product?.code}</S.Item>
                                  <S.Item>{item?.product?.description}</S.Item>
                                  <S.Item>{peso(Number(item?.qty))}</S.Item>
                                  <S.Item>{item?.uom}</S.Item>
                                  <S.Item>
                                    <span>
                                      {item?.register_date
                                        ? format(new Date(item?.register_date), "dd-MM-yyyy")
                                        : "--/--/----"}
                                    </span>
                                  </S.Item>
                                  <S.Item>{item?.shipper_address}</S.Item>
                                  <S.Item>
                                    <span>
                                      {item?.ata_date
                                        ? format(new Date(item?.ata_date), "dd-MM-yyyy")
                                        : "--/--/----"}
                                    </span>
                                  </S.Item>
                                  <S.Item>
                                    <span>
                                      {item?.plant_delivery
                                        ? format(new Date(item?.plant_delivery), "dd-MM-yyyy")
                                        : "--/--/----"}
                                    </span>
                                  </S.Item>
                                  <S.Item>
                                    <span>
                                      {item?.gr_actual
                                        ? format(new Date(item?.gr_actual), "dd-MM-yyyy")
                                        : "--/--/----"}
                                    </span>
                                  </S.Item>
                                  <S.Item>{item?.process_status}</S.Item>
                                  <S.Item title={t("comex.operational.orderItem.processCritical.title")}>
                                    {item?.process_critical ==='1' ? (
                                      <S.ProcessCriticalIcon
                                        width={20}      
                                      />
                                    ) : (
                                      <S.Ghost width={"24px"} />
                                    )}
                                  </S.Item>
                                  <S.Item title="Contém arquivos">
                                    {item.order?.order_files.length ? (
                                      <FileStackIcon />
                                    ) : (
                                      <></>
                                    )}
                                  </S.Item>
                                  <S.Item>
                                    {item?.canceled_at && (
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger>
                                            <S.BlockIcon color="#ff0001" />
                                          </TooltipTrigger>
                                          <TooltipContent className="max-w-xs font-sans text-xs p-4">
                                            <p>PO/Item cancelado</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    )}
                                  </S.Item>
                                    <S.Item title="Contém justificativas">
                                        {item.justification.length > 0 ? (
                                          <S.MessageIcon />
                                        ) : (
                                          <S.Ghost width={"24px"} />
                                        )}
                                      </S.Item>
                                      <S.Item>
                                        {check24HoursUpdate(item?.updated_at) ? (
                                          <S.Updated24HourIcon
                                            wasUpdated={check24HoursUpdate(item?.updated_at)}
                                            title={t("comex.operational.wasUpdated24h")}
                                          /> ) : (<S.Ghost width={"24px"} />)}
                                      </S.Item>
                                     <S.Item>
                                    <S.StarFillIcon
                                      width={20}
                                      $isFavorite={!!item?.user_favorit?.length}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        !item?.user_favorit?.length
                                          ? handleFavoriteCreate(profile!?.userId, item?.id)
                                          : handleFavoriteDelete(item?.user_favorit[0].id);
                                      }}
                                    />
                                    </S.Item>
                                    <S.Item>
                                    {cancelLoading && isCancelingSet.has(item?.id) ? (
                                      <S.ActivityIndicator />
                                    ) : (
                                      <S.TrashCancel
                                        selected={isCancelingSet?.has(item?.id)}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          !item.canceled_at &&
                                            hasPermissionTo("CANCELORDERITEM") &&
                                            selectToCancel(item?.id);
                                        }}
                                        disabled={
                                          !!item.canceled_at ||
                                          !hasPermissionTo("CANCELORDERITEM")
                                        }
                                      />
                                      )}
                                       </S.Item>
                                       <S.Item>
                                        <Checkbox
                                        id={item?.id.toString()}
                                        onCheckedChange={(checked: boolean) => {
                                          const po = `${item?.order?.order_reference}-${item?.item}: ${item?.product?.description}`
                                          handleCheck(checked, item?.id.toString(),po);
                                      }}
                                      defaultChecked={selectedOrderItensIds?.includes(item?.id.toString())}
                                      onClick={(e) => e.stopPropagation()}
                                      checked={selectedOrderItensIds?.includes(item?.id.toString())}
                                      />
                                    </S.Item>
                              </S.ItemWrapper>
                              ))
                      }
                    </>
                  : <span className="text-2xl">{t('comex.operational.poEmpty')}</span>
                }
          </>
        )}
        <Paginator onPageChange={handlePageChange} pagination={meta} />
      </S.Container>

      <S.FloatBar active={isCancelingSet.size > 0}>
        <S.TextSelected>
          {t("comex.operational.cancelPo.warn")}&nbsp;
          {` ${isCancelingSet.size}`}
        </S.TextSelected>
        <S.ButtonsWrapper>
          <S.Button
            mood="light"
            size="small"
            onClick={() => setIsCancelingSet(new Set())}
          >
            {t("comex.operational.cancelPo.clean")}
          </S.Button>
          <S.Button
            mood="danger"
            size="small"
            onClick={() => cancelOrderItensHandler()}
          >
            {t("comex.operational.cancelPo.confirm")}
          </S.Button>
        </S.ButtonsWrapper>
      </S.FloatBar>
    </>
  );
};

export default ListOperational;
