import * as S from "./styles";
import { DivergenceItem } from "./Item";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { JustificationModal } from "../JustificationModal";


interface IsnapshotDivergentProps {
  data: any[] | null;
  loading?: boolean;
}

export const DivergenceList = ({data, loading}: IsnapshotDivergentProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [elementDivergent, setElementDivergent] = useState<any>({});

  useEffect(() => {
  }, [open]);

  const handleModal = useCallback(() => {
    setOpen((prev: any) => !prev)
  }, [setOpen, setElementDivergent]);

  return (
    <S.Container>
      <JustificationModal isOpen={open} onClickOutside={handleModal} elementDivergent={elementDivergent} />
      {loading ? (
        <S.ActivityIndicator />
      ) : data?.length ? (
        data.map((element: any, index: any) => (
          <DivergenceItem key={index} data={element} setOpen={setOpen} setElementDivergent={setElementDivergent}/>
        ))
      ) : (
        <p>{t("management.snapshot.divergencias.nenhumaDivergencia")}</p>
      )}
    </S.Container>
  );
};
