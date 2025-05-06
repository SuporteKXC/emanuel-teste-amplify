import React, { useEffect } from "react";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { Complaint as IComplaint, WhoisRegularizer } from "contracts/management";
import { date } from "utils";
import { apiStocks } from "services";
import { ComplaintDownloadButton } from "../ComplaintDownloadButton";



interface IComplaintProps {
  data?: IComplaint[] | null | undefined;
  onInsertComplaint: () => void
  endProcess: () => void
  isLoadingEndProcess?: boolean
  isRegularized: WhoisRegularizer
}

type TComplaitList = {
  [key: string | number]: boolean | null
}

export const Complaint = React.memo(({ data, onInsertComplaint, endProcess, isLoadingEndProcess, isRegularized }: IComplaintProps): JSX.Element => {
  const [open, setOpen] = React.useState<TComplaitList>({});
  const { t } = useTranslation();


  const handleDropdown = (key: string) => {
    setOpen({
      ...open,
      [key]: !open[key]
    })
  }


  const downloadPdf = async () => {
   
  }


  const RenderComplaint = React.useMemo((): JSX.Element => {

    if (data && data.length) {
      return (
        <>
          {data.map((complaint, key) => {
            const _key = `_key${key}`
            return ( 
                <S.Content>
                  <S.Item onClick={() => {
                    handleDropdown(_key)
                  }}>
                    <S.ComplaintInfo>
                      <p>{complaint.number}</p>
                      <S.Info>
                        {t("management.tracking.detalhe.abertopor")} <p>{complaint.user.email}</p>
                      </S.Info>
                      <S.Info>
                        {t("management.tracking.detalhe.em")} <p>{date(complaint.createdAt)}</p>
                      </S.Info>
                      <S.Info>
                        <ComplaintDownloadButton label="Download PDF" complaintId={complaint.id} />
                      </S.Info>
                    </S.ComplaintInfo>
                    <S.Open isOpen={open[_key] as boolean}>
                      <S.ChevronDownIcon />
                    </S.Open>
                  </S.Item>
                  <S.List isOpen={open[_key] as boolean}>
                  <S.Row>
                      <S.Detail>{complaint.description}</S.Detail>
                  </S.Row>
                  
                  <S.Row>

                    {isRegularized && `${t("management.tracking.detalhe.processoFinalizado")} ${isRegularized.name}`}

                    {!isRegularized &&  (
                    <S.Button onClick={endProcess} disabled={isRegularized}>
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
