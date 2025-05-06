import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { ImportListData, STATUS } from "contracts/management";
import { date } from "utils";
import { Button } from "@/components/ui/ButtonGs";
import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog";
import { StockOrderProductCreateActions } from "@/store/ducks/management/stockOrderProduct";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

interface ItemProps {
  list?: ImportListData;
  onUpdate: () => void;
}

export const ImportItem = React.memo(({ list, onUpdate }: ItemProps): JSX.Element => {
  const navigate = useNavigate();
  const not = "-";
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const [complaintOpen, setComplaintOpen] = React.useState(false);
  const openDetail = useCallback(
    () => navigate(`/management/tracking/import/detail/${list?.id}`),
    []
  );

  const {loading} = useSelector((state: RootState) => state.stockOrderProductCreate)

  const format = React.useCallback(
    (value: string | number | undefined) =>
      Number(value)?.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    []
  );

  const RenderBatch: JSX.Element = useMemo(
    () => (
      <>
        {list?.stockMovementsSnapshot.length ? (
          <S.Content>
            <S.Header>
              <p>{t("management.tracking.importacao.lote")}</p>
              <p>{t("management.tracking.importacao.dtentradaa")}</p>
              <p>{t("management.tracking.importacao.dtentradae")}</p>
              <p>{t("management.tracking.importacao.quantidadea")}</p>
              <p>{t("management.tracking.importacao.quantidadee")}</p>
              {/* <p>{t("management.tracking.importacao.valora")}</p>
              <p>{t("management.tracking.importacao.valore")}</p>
              <p>{t("management.tracking.importacao.notificacoes")}</p>
              <p>{t("management.tracking.importacao.notificadoem")}</p> */}
              <p>{t("management.tracking.importacao.reguladoem")}</p>
              <p>{t("management.tracking.importacao.status")}</p>
              <S.Button onClick={openDetail}>
                <S.ArrowRight />
              </S.Button>
            </S.Header>

            <S.ItemContainer>
              {list?.stockMovementsSnapshot.map((item, index) => (
                <S.Item status={STATUS[item.status]} key={index}>
                  <p className="batch">{item?.stockElement?.batch}</p>
                  <p>{item.wsmImportDate ? date(item.wsmImportDate) : not}</p>
                  <p>{item.sapImportDate ? date(item.sapImportDate) : not}</p>
                  <p>{format(item.wmsQty) ?? not}</p>
                  <p>{format(item.sapQty) ?? not}</p>
                  {/* <p>{item.valor_a ?? not}</p>
                  <p>{item.valor_e ?? not}</p>
                  <p>{item.notificacoes ?? not}</p>
                  <p>{item.notificado_em ?? not}</p> */}
                  <p>
                    {item.regularizedAt ||
                    (!item.regularizedAt && item.status == "FINALIZADO")
                      ? date(item.regularizedAt || item.sapImportDate)
                      : not}
                  </p>
                  <p className="status">{STATUS[item.status] ?? not}</p>
                </S.Item>
              ))}
            </S.ItemContainer>
          </S.Content>
        ) : (
          <S.Wait>
            <S.WaitTitle>{STATUS[list?.order?.status!] ?? ""}</S.WaitTitle>
          </S.Wait>
        )}
      </>
    ),
    [t, list?.stockMovementsSnapshot]
  );

  const orderItem = useMemo(
    () => list?.order.orderItem.find((item) => item.customs_clearance_date !== null),
    [list?.order.orderItem]
  );
  
  const submitStockOrderProduct = ()=>{
    const data = {
      orderId: list?.orderId,
      productId: list?.productId,
      complaintId: null
    }
    dispatch(StockOrderProductCreateActions.request(data,onUpdate))
    setOpen(false)
  }

  return (
    <S.Container>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex-col gap-10">
          <DialogTitle>Deseja marcar como recebido?</DialogTitle>
          <div className="flex items-center justify-center gap-3">
            <Button.Root variant="secondary" onClick={() => setOpen(false)}>
              Não
            </Button.Root>
            <Button.Root disabled={loading} onClick={submitStockOrderProduct}>
              {loading ? "Carregando..." : "Sim"}
            </Button.Root>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={complaintOpen} onOpenChange={setComplaintOpen}>
        <DialogContent className="flex-col gap-10">
          <DialogTitle>
            Deseja marcar como recebido com divergência?
          </DialogTitle>
          <div className="flex items-center justify-center gap-3">
            <Button.Root
              variant="secondary"
              onClick={() => setComplaintOpen(false)}
            >
              Não
            </Button.Root>
            <Button.Root
              onClick={() =>
                navigate(
                  `/management/tracking/complaint/new?order=${list?.orderId}&product=${list?.productId}`
                )
              }
            >
              Sim
            </Button.Root>
          </div>
        </DialogContent>
      </Dialog>
      <S.Product>
        <S.TitleContainer>
          <S.Title>
            <p>{t("management.tracking.importacao.dataDesembaraco")}</p>
            {orderItem?.customs_clearance_date
              ? date(orderItem.customs_clearance_date!)
              : not}
          </S.Title>
          <S.Title>
            <p>{t("management.tracking.importacao.dataCarregamento")}</p>
            {orderItem?.loading_at_the_terminal
              ? date(orderItem.loading_at_the_terminal!)
              : not}
          </S.Title>
          <S.Title>
            <p>{t("management.tracking.importacao.chegada")}</p>
            {orderItem?.plant_delivery ? date(orderItem?.plant_delivery!) : not}
          </S.Title>
          <S.Title>
            <p>{t("management.tracking.importacao.plant")}</p>
            {list?.order?.company?.plantCode}
          </S.Title>
          <S.Title>
            <p>{t("management.tracking.importacao.po")}</p>
            {list?.order?.order_reference}
          </S.Title>
          <S.Title>
            <p>{t("management.tracking.importacao.nf")}</p>
            {orderItem?.doc_num}
          </S.Title>
          <S.Title className="description">
            <p>{t("management.tracking.importacao.productDescription")}</p>
            {list?.product &&
              `[${list?.product?.code ?? "---"}] ${
                list?.product?.description ?? "---"
              }`}
            {!list?.product && not}
          </S.Title>
        </S.TitleContainer>
        <S.TitleContainer>
          <S.Title>
            <p>{t("management.tracking.importacao.comexTotal")}</p>
            {format(list?.total?.comex) ?? not}
          </S.Title>
          <S.Title>
            <p>{t("management.tracking.importacao.sapTotal")}</p>
            {format(list?.total?.sap) ?? not}
          </S.Title>
          <S.Title>
            <p>{t("management.tracking.importacao.wmsTotal")}</p>
            {format(list?.total?.wms) ?? not}
          </S.Title>
          {list?.order?.stockOrderProduct ? (
            <p>
              {list.order.stockOrderProduct.complaintId ? (
                <span
                style={{
                  color: "#fff",
                  backgroundColor: "#0085ff",
                  borderRadius: "8px",
                  padding: "1.5px 7px 2.7px 7px",
                }}
              >
                Recebido com avaria
              </span>
              ) : (
                <span
                  style={{
                    color: "#fff",
                    backgroundColor: "#0085ff",
                    borderRadius: "8px",
                    padding: "1.5px 7px 2.7px 7px",
                  }}
                >
                  Recebido
                </span>
              )}
            </p>
          ) : !list?.stockMovementsSnapshot?.length ? (
            <>
              <S.Title className="description">
                <Button.Root
                  onClick={() => setOpen(true)}
                  className="px-2 h-[20px]"
                  variant="tertiary"
                >
                  Recebido
                </Button.Root>
              </S.Title>
              <S.Title>
                <Button.Root
                  onClick={() => setComplaintOpen(true)}
                  className="px-2 h-[20px] min-w-max"
                  variant="tertiary"
                >
                  Recebido com divergência
                </Button.Root>
              </S.Title>
            </>
          ) : (
            <></>
          )}
        </S.TitleContainer>
      </S.Product>
      {list?.order?.stockOrderProduct &&
      !Boolean(list?.stockMovementsSnapshot?.length) ? (
        <S.Wait>
          <S.WaitTitle>
            {STATUS[list?.order?.status!] || list?.order?.status}
          </S.WaitTitle>
        </S.Wait>
      ) : (
        RenderBatch
      )}
    </S.Container>
  );
});
