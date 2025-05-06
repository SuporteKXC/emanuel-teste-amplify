import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import {
  FetchRecalculateDeadlineActions,
  FetchRecalculateDeadlineState,
} from "store/ducks/trackingDelivery/recalculate-deadline";
import {
  UpdateDeadlineActions,
  UpdateDeadlineState,
} from "store/ducks/trackingDelivery/update-deadline";
import { Modal } from "components/shared";
import * as S from "./styles";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Document } from "@/contracts/trackingDelivery";
import { useTranslation } from "react-i18next";

interface Props {
  invoice: Document;
  isOpen: boolean;
  close: () => void;
  onActionSuccess: () => void;
}

export const RecalculateDeadline: React.FC<Props> = ({
  isOpen,
  invoice,
  close,
  onActionSuccess,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: dataRecalculate, loading: loadingRecalculate } = useSelector<
    RootState,
    FetchRecalculateDeadlineState
  >((state) => state.fetchRecalculateDeadline);

  const { loading: loadingUpdateInvoice } = useSelector<
    RootState,
    UpdateDeadlineState
  >((state) => state.updateDeadline);

  const onSuccess = useCallback(() => {
    close();
    onActionSuccess();
  }, [close, onActionSuccess]);

  // const { country } = useSelector<RootStateOrAny, CountryState>(
  //   (state) => state.country
  // );

  const handleUpdateInvoice = useCallback(() => {
    if (dataRecalculate) {
      const data = {
        documentId: invoice.id,
        deadlineDate: dataRecalculate,
      };
      dispatch(UpdateDeadlineActions.request(data, onSuccess));
    }
  }, [dataRecalculate, dispatch, onSuccess, invoice]);

  const getNewDeadline = useCallback(() => {
    if (isOpen) {
      dispatch(
        FetchRecalculateDeadlineActions.request({
          documentId: invoice.id,
          // idEstrangeiro:
          //   (invoice.client && invoice.client.id_exterior) ||
          //   invoice.dest_uf === "EX",
          // country_id: country.id
        })
      );
    }
  }, [dispatch, invoice, isOpen]);

  useEffect(() => {
    getNewDeadline();
  }, [getNewDeadline]);

  useEffect(() => {
    return () => {
      dispatch(FetchRecalculateDeadlineActions.reset());
    };
  }, [dispatch]);

  return (
    <Modal isOpen={isOpen}>
      <S.Container>
        <S.Header>
          <S.Title>
            <S.IconMessage />
            {t("trackingDelivery.header.recalculateDeadline")}
          </S.Title>
        </S.Header>
        <S.Content>
          <S.Column>
            <S.Label>
              {t("trackingDelivery.header.currentDeadline")}
            </S.Label>
            <S.Value>
              {invoice.deadlineDate
                ? format(new Date(invoice.deadlineDate), "dd/MM/yyyy")
                : "--------"}
            </S.Value>
          </S.Column>
          <S.IconArrowRight />
          <S.Column>
            <S.Label>
              {t("trackingDelivery.header.newDeadline")}
            </S.Label>
            {loadingRecalculate ? (
              t("trackingDelivery.header.recalculating")
            ) : (
              <S.Value>
                {dataRecalculate
                  ? format(new Date(dataRecalculate), "dd/MM/yyyy")
                  : "--------"}
              </S.Value>
            )}
          </S.Column>
        </S.Content>
        <S.ButtonsWrapper>
          <Button onClick={close} type="button">
            {t("trackingDelivery.general.close")}
          </Button>
          <Button
            onClick={handleUpdateInvoice}
            disabled={!dataRecalculate || loadingUpdateInvoice || false}
            type="submit"
          >
            {t("trackingDelivery.general.save")}
          </Button>
        </S.ButtonsWrapper>
      </S.Container>
    </Modal>
  );
};
