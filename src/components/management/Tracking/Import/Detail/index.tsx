import { useCallback, useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { BatchDetail } from "./Batch";

import { useTranslation } from "react-i18next";
import { ImportListData } from "contracts/management";

import { useDispatch, useSelector } from "react-redux";
import { ImportDetailActions } from "store/ducks/management";
import { RootState } from "store";
import { overlayRef } from "./Overlay";

const overlay = {
  show: () => {
    if (overlayRef.current) {
      overlayRef.current.style.visibility = "visible";
    }
  },
  hide: async () => {
    if (overlayRef.current) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      overlayRef.current.style.visibility = "hidden";
    }
  },
};

interface DetailProps {
  data: ImportListData | null;
}
export const Detail = ({ data }: DetailProps): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const goBack = useCallback(() => navigate(`/management/tracking/import`), []);
  const { loading, data: processData } = useSelector(
    (state: RootState) => state.endProcess
  );
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (loading) {
        overlay.show();
      }

      if (!loading) {
        await overlay.hide();
      }
    })();
  }, [loading]);

  useEffect(() => {
    (async () => {
      if (data) {
        await overlay.hide();
      }

      if (!data) {
        overlay.show();
      }
    })();
  }, [data]);

  const format = useCallback(
    (value: string | number | undefined) =>
      Number(value)?.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    []
  );

  useEffect(() => {
    dispatch(ImportDetailActions.request(data?.id));
  }, [processData]);

  return (
    <S.Container>
      <S.HeaderTitle>
        <S.InfoContainer>
          <S.Infos>
            <S.Title>
              <p>{t("management.tracking.detalhe.plant")}</p>
              {data?.order?.company?.plantCode ?? ""}
            </S.Title>
            <S.Title>
              <p>{t("management.tracking.detalhe.po")}</p>
              {data?.orderReference ?? ""}
            </S.Title>
            <S.Title>
              <p>{t("management.tracking.detalhe.nf")}</p>
              {data?.invoiceNumber ?? ""}
            </S.Title>
            <S.Title>
              <p>{t("management.tracking.detalhe.productDescription")}</p>
              {`[${data?.order?.product?.code ?? ""}] ${
                data?.order?.product?.description ?? ""
              }`}
            </S.Title>
          </S.Infos>

          <S.Infos>
            <S.Title>
              <p>{t("management.tracking.importacao.comexTotal")}</p>
              {format(data?.total?.comex) ?? "---"}
            </S.Title>
            <S.Title>
              <p>{t("management.tracking.importacao.sapTotal")}</p>
              {format(data?.total?.sap) ?? "---"}
            </S.Title>
            <S.Title>
              <p>{t("management.tracking.importacao.wmsTotal")}</p>
              {format(data?.total?.wms) ?? "---"}
            </S.Title>
          </S.Infos>
        </S.InfoContainer>
        <S.BackButton onClick={goBack}>
          <S.Arrow />
          {t("management.tracking.detalhe.voltar")}
        </S.BackButton>
      </S.HeaderTitle>
      <S.Content>
        {data?.stockMovementsSnapshot.map((snapshot) => (
          <S.Box>
            <BatchDetail
              snapshot={snapshot}
              plantDelivery={data?.order.orderItem[0].plant_delivery}
            />
            {/* <BatchNotifications notifications={notificationList} /> */}
          </S.Box>
        ))}
      </S.Content>
    </S.Container>
  );
};
