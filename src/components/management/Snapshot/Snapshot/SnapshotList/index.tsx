import React from "react";
import * as S from "./styles";
import { SnapshotItem } from "./Item";
import { SnapshotListData } from "contracts/management";
import { useTranslation } from "react-i18next";

interface SnapshotListProps {
  data: SnapshotListData[] | null;
  loading?: boolean;
}

export const SnapshotList = React.memo(
  ({ data, loading }: SnapshotListProps) => {
    const { t } = useTranslation();
    return (
      <S.Container>
      {loading ? (
        <S.ActivityIndicator />
      ) : data?.length ? (
        data.map((snapshot) => (
          <SnapshotItem item={snapshot} />
        ))
      ) : (
        <p>{t("management.snapshot.snapshot.nenhumSnapshot")}</p>
      )}
    </S.Container>
    )
  }
);
