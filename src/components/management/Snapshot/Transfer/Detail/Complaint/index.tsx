import React, { useEffect } from "react";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { StockTransferSnapshot, TransferComplaint } from "contracts/management";
import { date } from "utils";



interface IComplaintProps {
  data?: StockTransferSnapshot;
  onInsertComplaint: () => void
  endProcess: () => void
  isLoadingEndProcess?: boolean
}

type TComplaitList = {
  [key: string | number]: boolean | null
}

export const Complaint = React.memo(({ data, onInsertComplaint, endProcess, isLoadingEndProcess,  }: IComplaintProps): JSX.Element => {
  const [open, setOpen] = React.useState<TComplaitList>({});
  const { t } = useTranslation();


  const handleDropdown = (key: string) => {
    setOpen({
      ...open,
      [key]: !open[key]
    })
  }

  const RenderComplaint = React.useMemo((): JSX.Element => {

    if (data && data.complaint.length > 0) {
      return (
        <>
          {data.complaint.map((transferComplaint: TransferComplaint, key) => {
            const _key = `_key${key}`
        
            return ( 
                <S.Content>
                  <S.Item onClick={() => {
                    handleDropdown(_key)
                  }}>
                    <S.ComplaintInfo>
                      <p>{transferComplaint.number}</p>
                      <S.Info>
                        {t("management.tracking.detalhe.abertopor")} <p>{transferComplaint.user.email}</p>
                      </S.Info>
                      <S.Info>
                        {t("management.tracking.detalhe.em")} <p>{date(transferComplaint.created_at)}</p>
                      </S.Info>
                    </S.ComplaintInfo>
                    <S.Open isOpen={open[_key] as boolean}>
                      <S.ChevronDownIcon />
                    </S.Open>
                  </S.Item>
                  <S.List isOpen={open[_key] as boolean}>
                  <S.Row>
                      <S.Detail>{transferComplaint.description}</S.Detail>
                  </S.Row>
                  
                  <S.Row>

                    {data.whoisRegularizer && `${t("management.tracking.detalhe.processoFinalizado")} ${data.whoisRegularizer.name}`}

                    {!data.whoisRegularizer &&  (
                    <S.Button onClick={endProcess} disabled={data.whoisRegularizer}>
                      {isLoadingEndProcess && <S.ActivityIndicator/>}
                      <>  
                        <S.EndFenceIcon />
                        {t("management.tracking.detalhe.finalizarprocesso")}
                        </>
                    </S.Button>)
                    }
                     
                  </S.Row>
                  </S.List>
                </S.Content>
            )
          })}
        </>
      );
    } else {
      return (
        <S.Content>
          <S.Button onClick={onInsertComplaint}>
            <S.Alert />
            {t("management.tracking.detalhe.inserircomplaint")}
          </S.Button>
        </S.Content>
      );
    }
  }, [open, t, data]);

  return (
    <S.Container>
      <S.Title>{t("management.tracking.detalhe.complaint")}</S.Title>
      {RenderComplaint}
    </S.Container>
  );
});
