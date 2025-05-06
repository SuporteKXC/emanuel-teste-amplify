import React, { useCallback, useEffect } from "react";
import * as S from './styles';
import { Detail } from "components/management/Tracking/Import";
import {  useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ImportDetailActions } from "store/ducks/management";
import { RootState } from "store";



export const ImportDetail: React.FC = () => {
  const { id } = useParams()
  const  navigate = useNavigate()
  const dispatch = useDispatch()
  const { data } = useSelector((state: RootState) => state.importDetail)
  const {data: insertComplaint} = useSelector((state: RootState) => state.InsertComplaint)
  

  const onFailure = () => {
    navigate(`/management/tracking/import`)
  }

  const onSuccess = ()  => {}

  const fetchDetails = useCallback(() => {
    dispatch(ImportDetailActions.request(id, onSuccess, onFailure))
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
