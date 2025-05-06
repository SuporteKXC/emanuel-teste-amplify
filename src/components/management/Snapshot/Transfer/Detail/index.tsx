import { useCallback, useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { BatchDetail } from "./Batch";
import { Notifications } from "./Notifications";
import { Complaint } from "./Complaint";
import { useTranslation } from "react-i18next";
import { StockTransferSnapshot, TransferListData } from "contracts/management";
import { ComplaintModal } from "./ComplaintModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { overlayRef } from "./Overlay";
import { TransferDetailActions, TransferEndProcessActions } from "store/ducks/management/transfer";


const overlay = {
  show: () => {
    if(overlayRef.current) {
      overlayRef.current.style.visibility = 'visible'
    }
  },
  hide: async () => {
    if(overlayRef.current) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    overlayRef.current.style.visibility = 'hidden'
    }
  }
}

interface DetailProps {
  data: TransferListData[]
}
export const Detail = ({ data }: DetailProps): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false)
  const goBack = useCallback(() => navigate(`/management/snapshot/transfer`), []);
  const [complaintSnapshotId, setComplaintSnapshotId] = useState<number | null>(null)

  const { loading, data: processData } = useSelector((state: RootState) => state.transferEndProcess)
  const dispatch = useDispatch()

  const handleModalComplaint = (snapshot: StockTransferSnapshot) => {
    setComplaintSnapshotId(snapshot.id)
    setIsOpen(true)
  }

  const endProcess = async (snapshot: StockTransferSnapshot) => {  
    dispatch(TransferEndProcessActions.request(snapshot.id))
  }


  useEffect(() => {
    (async () => {
      if(loading){
        overlay.show()
      }
      
      if(!loading) {
        await overlay.hide()
      }  
    })()

  },[loading])


  useEffect(() => {

    (async () => {

      if(data) {
        await overlay.hide()
      }
      
      if(!data){
        overlay.show()
      }
    })()
  }, [data])



  useEffect(() => {
      if(data) {
        dispatch(TransferDetailActions.request(data[0].id))
      }
  },[processData])

 
  return (
    <S.Container>
      <ComplaintModal isOpen={isOpen} onClickOutside={() => setIsOpen(false)} snapshotId={complaintSnapshotId} setIsOpen={setIsOpen}/>
      <S.HeaderTitle>
        <S.Infos>
          <S.Title>
            <p>{t("management.tracking.detalhe.plant")}</p>{data ? data[0]?.stockElement[0]?.company?.plantCode : ""}
          </S.Title>
          {/* <S.Title>
            <p>{t("management.tracking.detalhe.po")}</p>{"PO"}
          </S.Title> */}
          {/* <S.Title>
            <p>{t("management.tracking.detalhe.nf")}</p>{"invoiceNumber"}
          </S.Title> */}
          {/* <S.Title>
            <p>{t("management.tracking.detalhe.qtd")}</p>N/A
          </S.Title> */}
          <S.Title>
            <p>{t("management.tracking.detalhe.productDescription")}</p>
            {`[${data ? data[0]?.code : ""}] ${data ? data[0]?.description : ""}`}
          </S.Title>
        </S.Infos>
        <S.BackButton onClick={goBack}>
          <S.Arrow />
          {t("management.tracking.detalhe.voltar")}
        </S.BackButton>
      </S.HeaderTitle>

      <S.Content>
        {data && data[0].stockElement.map(stkEl => (

          <S.Box>
            <BatchDetail snapshot={stkEl} plantDelivery={stkEl.stockTransferSnapshot[0].createdAt}/>
            {/* <BatchNotifications notifications={notificationList} /> */}
            <Complaint 
              data={stkEl.stockTransferSnapshot[0]}
              isLoadingEndProcess={loading}
              endProcess={() => {
                endProcess(stkEl.stockTransferSnapshot[0])
              }}
              onInsertComplaint={() => {
              handleModalComplaint(stkEl.stockTransferSnapshot[0])
              }}
            />
          </S.Box>     
        ))}
      </S.Content>
    </S.Container>
  );
};
