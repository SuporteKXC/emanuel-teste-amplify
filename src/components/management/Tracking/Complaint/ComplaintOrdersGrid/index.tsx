import { ImportListData, StockMovementsSnapshot } from "@/contracts/management";
import { date, truncate } from "@/utils";
import React, { useCallback, useEffect, useRef, useState } from "react";

import * as S from "./styles";
import { Input, ManagementPaginator, Modal } from "@/components/shared";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  ImportFilterActions,
  ImportListActions,
} from "@/store/ducks/management";
import { format, setISODay, subDays } from "date-fns";
import { DatePickerUnform } from "@/components/shared/Forms/DatePickerUnform";
import { InputJust } from "@/components/shared/Forms/InputJust";
import { Select } from "@/components/shared/Forms/Select";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Button } from "@/styles/components/buttons";
import { parseSelectOptions } from "@/utils/parseSelectOptions";
import { ComplaintUpdateMovementActions } from "@/store/ducks/management/complaint";
import { ChevronRightIcon } from "@/styles/components/icons";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { InputGs } from "@/components/ui/Forms";
import { PropsValue } from "react-select";
import { SelectOption } from "@/contracts";

type ComplaintOrdersGridProps = {
  onSelectOrders: (item: any, isChecked?: boolean) => void;
  orders: any[];
};

const ComplaintOrdersGrid = ({
  orders,
  onSelectOrders,
}: ComplaintOrdersGridProps) => {
  const dispatch = useDispatch();
  const { data: stockOrders, pagination } = useSelector(
    (state: RootState) => state.importList
  );
  const { data: dataFilter } = useSelector(
    (state: RootState) => state.importFilterData
  );
  const formRef = useRef<FormHandles>(null);

  const { data: complaintTypes } = useSelector(
    (state: RootState) => state.complaintTypes
  );

  const { loading: movementLoading } = useSelector(
    (state: RootState) => state.complaintUpdateMovement
  );

  const complaintTypesOptions = parseSelectOptions(
    complaintTypes,
    "name",
    "id"
  );
  const [item, setItem] = useState<StockMovementsSnapshot | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const [dateStart, setDateStart] = useState<Date>(
    dataFilter.plantDeliveryDateStart
      ? new Date(`${dataFilter.plantDeliveryDateStart} 00:00:00`)
      : subDays(new Date(), 7)
  );
  const [dateEnd, setDateEnd] = useState<Date>(
    dataFilter.plantDeliveryDateEnd
      ? new Date(`${dataFilter.plantDeliveryDateEnd} 00:00:00`)
      : new Date()
  );

  const formatQtdNumber = React.useCallback(
    (value: string | number | undefined) =>
      Number(value)?.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    []
  );

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(
        ImportFilterActions.setFilterData({
          ...dataFilter,
          page: page,
        })
      );
    },
    [dispatch, ImportFilterActions, dataFilter]
  );

  const changeDateStart = useCallback(
    (date: any) => {
      setDateStart(date);

      dispatch(
        ImportFilterActions.setFilterData({
          ...dataFilter,
          plantDeliveryDateStart: format(new Date(date), "yyyy-MM-dd"),
        })
      );
    },
    [dataFilter]
  );

  const changeDateEnd = useCallback(
    (date: any) => {
      setDateEnd(date);

      dispatch(
        ImportFilterActions.setFilterData({
          ...dataFilter,
          plantDeliveryDateEnd: format(new Date(date), "yyyy-MM-dd"),
        })
      );
    },
    [dataFilter]
  );

  const filterDataChange = useCallback(
    (data: any) => {
      dispatch(
        ImportFilterActions.setFilterData({
          ...dataFilter,
          ...data,
          page: 1,
          forComplaint: true,
          plantDeliveryDateStart: format(
            data.plantDeliveryDateStart,
            "yyyy-MM-dd"
          ),
          plantDeliveryDateEnd: format(data.plantDeliveryDateEnd, "yyyy-MM-dd"),
        })
      );
    },
    [dataFilter]
  );

  const fetchImportList = useCallback(() => {
    dispatch(ImportListActions.request(dataFilter));
  }, [dispatch, dataFilter]);

  useEffect(() => {
    fetchImportList();
  }, [dataFilter]);

  const handleId = (item: StockMovementsSnapshot) => {
    setItem(item);
    setOpenModal(true);
  };
  const onSuccess = () => {
    setOpenModal(false);
  };
  const handleMovementSubmit = async (data: any) => {
    dispatch(ComplaintUpdateMovementActions.request(item?.id, data, onSuccess));
  };
  return (
    <>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="p-3 rounded-lg bg-white">
          <Form
            className="mt-0"
            onSubmit={handleMovementSubmit}
            ref={formRef}
            placeholder=""
          >
            <DialogHeader className="p-3">
              Divergências para o item lote:{" "}
              <span className="font-bold">{item?.stockElement.batch}</span>
            </DialogHeader>
            <Input
              type="number"
              defaultValue={`${item?.defectQty}`}
              placeholder={"Qtd. divergência"}
              name="defectQty"
            />
            <Select
              options={complaintTypesOptions}
              defaultValue={
                complaintTypesOptions?.find(
                  (i: any) => i?.value === item?.defectTypeId
                ) as PropsValue<SelectOption>
              }
              scheme={{ outerHeight: "10px", innerHeight: "12px" }}
              placeholder={"Tipo de divergência"}
              name="defectTypeId"
            />
            <div className="flex justify-between gap-2">
              <Button
                mood="light"
                type="button"
                onClick={() => setOpenModal(false)}
              >
                Cancelar
              </Button>
              <Button disabled={movementLoading} type="submit">
                Salvar
              </Button>
            </div>
          </Form>
        </DialogContent>
      </Dialog>
      <S.InsideFilterContainer>
        <S.Title>
          <h2>Pesquisar Orders</h2>
        </S.Title>
        <Form ref={formRef} onSubmit={filterDataChange} placeholder="">
          <DatePickerUnform
            selected={dateStart}
            dateFormat="dd/MM/yyyy"
            name="plantDeliveryDateStart"
            onChange={changeDateStart}
            minDate={new Date("2023-08-16 12:00:00")}
          />
          <DatePickerUnform
            selected={dateEnd}
            dateFormat="dd/MM/yyyy"
            name="plantDeliveryDateEnd"
            onChange={changeDateEnd}
            minDate={new Date("2023-08-16 12:00:00")}
          />
          <InputJust
            label="Número da NF"
            name="invoice"
            placeholder="Número da NF"
          />
          <InputJust
            label="Número da PO"
            name="po"
            placeholder="Número da PO"
          />
          <S.ButtonSubmit>
            <S.Search size={24} />
            <S.MensagemClear>Buscar</S.MensagemClear>
          </S.ButtonSubmit>
        </Form>
      </S.InsideFilterContainer>

      <S.OrderList>
        <S.OrderHeader>
          <p>lote</p>
          <p>po</p>
          <p>nota fiscal</p>
          <p>data de recebimento</p>
          <p>site embarcador</p>
          <p>analista responsável</p>
          <p>planta recebedora</p>
          <p>cód. material</p>
          <p>desc. material</p>
          <p>qtd. total</p>
          <p>qtd. desvio</p>
          <p>#</p>
        </S.OrderHeader>
        <S.ItemContainer>
          {stockOrders?.map((stock: ImportListData) => {
            return stock.stockMovementsSnapshot.map((item) => {
              return (
                <S.Item style={{ cursor: "pointer" }} key={item.id}>
                  <p>{item?.stockElement?.batch}</p>
                  <p>{stock?.orderReference}</p>
                  <p>{stock?.invoiceNumber}</p>
                  <p>
                    {stock?.order?.orderItem[0]?.plant_delivery
                      ? date(stock?.order?.orderItem[0]?.plant_delivery)
                      : "---"}
                  </p>
                  <p>
                    {truncate(
                      stock?.order?.orderItem[0]?.supplier?.description,
                      11
                    )}
                  </p>
                  <p>
                    {truncate(
                      stock?.order?.orderItem[0]?.supplier?.user_suppliers[0]
                        ?.user?.name,
                      12
                    )}
                  </p>
                  <p>{truncate(stock?.order?.company?.nameFantasy, 18)}</p>
                  <p>{stock?.product?.code}</p>
                  <p>{truncate(stock?.product?.description, 15)}</p>
                  <p>{formatQtdNumber(item.sapQty)}</p>
                  <p>{formatQtdNumber(item.divergencyQty)}</p>
                  <p>
                    <input
                      type="checkbox"
                      checked={orders.find((order) => order.id === item.id)}
                      onChange={(e) => {
                        onSelectOrders(
                          {
                            ...item,
                            orderReference: stock?.orderReference,
                            invoiceNumber: stock?.invoiceNumber,
                            plant_delivery:
                              stock?.order?.orderItem[0]?.plant_delivery,
                            description:
                              stock?.order?.orderItem[0]?.supplier
                                ?.description ?? "---",
                            name:
                              stock?.order?.orderItem[0]?.supplier
                                ?.user_suppliers[0]?.user?.name ?? "---",
                            nameFantasy:
                              stock?.order?.company?.nameFantasy ?? "---",
                            materialCode: stock?.product?.code ?? "---",
                            materialDescription:
                              stock?.product?.description ?? "---",
                          },
                          e.target.checked
                        );
                      }}
                    />
                    <p onClick={() => handleId(item)}>
                      <ChevronRightIcon />
                    </p>
                  </p>
                </S.Item>
              );
            });
          })}
        </S.ItemContainer>
        <ManagementPaginator
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </S.OrderList>
    </>
  );
};

export default ComplaintOrdersGrid;
