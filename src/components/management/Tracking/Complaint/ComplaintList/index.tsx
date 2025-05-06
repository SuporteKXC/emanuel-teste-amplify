import React from "react";
import * as S from "./styles";
import { ComplaintDataGrid } from "./ComplaintDataGrid";
import { ComplaintData } from "contracts/management";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface ComplaintListProps {
  data: ComplaintData[] | [];
  loading?: boolean;
}

export const ComplaintList = React.memo(
  ({ data, loading }: ComplaintListProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
      <S.Container>
        <S.ActionsContainer>
          <S.ButtonSubmit
            onClick={() => navigate(`/management/tracking/complaint/new`)}
          >
            <S.MensagemClear>
              {t("management.message.novoComplaint")}
            </S.MensagemClear>
          </S.ButtonSubmit>
        </S.ActionsContainer>
        {loading ? (
          <S.ActivityIndicator />
        ) : (
          <>
            {data && data.length ? (
              <ComplaintDataGrid data={data} />
            ) : (
              <p>{t("management.tracking.importacao.nenhumSnapshot")}</p>
            )}
          </>
        )}
      </S.Container>
    );
  }
);
