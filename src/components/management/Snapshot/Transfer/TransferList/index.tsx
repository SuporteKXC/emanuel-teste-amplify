import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { TransferItem } from "./Item";
import { TransferListData } from "contracts/management";


interface IsnapshotDivergentProps {
  data: TransferListData[] | null;
  loading?: boolean;
}

export const TransferList = ({ data, loading }: IsnapshotDivergentProps) => {
  const { t } = useTranslation();


  return (
    <S.Container>
      {loading ? (
        <S.ActivityIndicator />
      ) : data?.length ? (
        data.map((element, index) => (
          <TransferItem key={index} data={element}/>
        ))
      ) : (
        <p>{t("management.snapshot.transfer.nenhumaTransfer")}</p>
      )}
    </S.Container>
  );
};
