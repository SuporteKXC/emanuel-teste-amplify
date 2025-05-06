import React, { useCallback, useEffect } from "react";
import * as S from './styles';

import {  useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ImportDetailActions } from "store/ducks/management";
import { RootState } from "store";
import { Detail } from "components/management/Snapshot/Transfer/Detail";
import { TransferDetailActions } from "store/ducks/management/transfer";



export const TransferDetail: React.FC = () => {
  const { id } = useParams()
  const  navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { data } = useSelector((state: RootState) => state.transferDetail)

  const {data: insertComplaint} = useSelector((state: RootState) => state.transferInsertComplaint)
  

  const onFailure = () => {
    navigate(`/management/snapshot/transfer`)
  }

  const onSuccess = ()  => {}

  const fetchDetails = useCallback(() => {
    dispatch(TransferDetailActions.request(id, onSuccess, onFailure))
  },[id])

  useEffect(() => {
    fetchDetails()
  },[id, insertComplaint])  

  return (
    <S.Container>
      <Detail data={data}/>
    </S.Container>
  );
};
