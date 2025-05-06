import React from "react";
import * as S from "./styles";
import { ImportItem } from "./Item";
import { ImportListData } from "contracts/management";
import { useTranslation } from "react-i18next";

interface ImportListProps  {
data: ImportListData[] | null
loading: boolean
fetch: () => void
}

export const ImportList = React.memo(({ data, loading, fetch }: ImportListProps) => {
  const { t } = useTranslation();
  return (
    <S.Container>
    {loading ? (
      <S.ActivityIndicator />
    ) : (
      <>
        {data && data.length ? (
          data.map((item, index) => <ImportItem onUpdate={fetch} key={index.toString()} list={item} />)
        ) : (
          <p>{t("management.tracking.importacao.nenhumSnapshot")}</p>
        )}
      </>
    )}
  </S.Container>
  );
});
