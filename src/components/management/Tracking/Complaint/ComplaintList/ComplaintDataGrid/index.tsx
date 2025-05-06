import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { ComplaintData, STATUS } from "contracts/management";
import { date } from "utils";

interface ComplaintDataGridProps {
  data: ComplaintData[];
}

export const ComplaintDataGrid = React.memo(
  ({ data }: ComplaintDataGridProps): JSX.Element => {
    const navigate = useNavigate();
    const not = "---";
    const { t } = useTranslation();

    const openDetail = (item: ComplaintData) =>
      navigate(`/management/tracking/complaint/new/${item.id}`);

    return (
      <S.Container>
        <S.Content>
          <S.Header>
            <p>#</p>
            <p>{"Data de recebimento"}</p>
            <p>{t("Tipo de complaint")}</p>
            <p>{t("Responsável")}</p>
            <p>{t("Área impactada")}</p>
            <p>{t("Descrição")}</p>
            <p>{"Data de encerramento"}</p>
            <p>#</p>
          </S.Header>
          <S.ItemContainer>
            {data.map((item) => (
              <S.Item>
                <p>{item?.id}</p>
                <p>{item?.createdAt ? date(item?.createdAt) : not}</p>
                <p>{item?.complaintTypes[0]?.name}</p>
                <p>{item?.responsible?.name}</p>
                <p>{item?.impactedArea?.name}</p>
                <p>{item?.complaintTypes[0]?.description}</p>
                <p>{item?.ncClosingDate ? date(item?.ncClosingDate) : not}</p>

                <S.Button onClick={() => openDetail(item)}>
                  <S.ArrowRight />
                </S.Button>
              </S.Item>
            ))}
          </S.ItemContainer>
        </S.Content>
      </S.Container>
    );
  }
);
