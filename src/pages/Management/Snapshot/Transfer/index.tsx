import React, { useCallback, useEffect, useState } from "react"
import * as S from "./styles"
import { TransferList } from "components/management/Snapshot/Transfer/TransferList"
import { ManagementPaginator } from "components"
import { TransferFilter } from "components/management/Snapshot/Transfer/Filter"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store"
import { TransferFilterActions, TransferListActions } from "store/ducks/management/transfer"


export const Transfer: React.FC = () => {
    const dispatch = useDispatch();

    const { data, loading, pagination } = useSelector(
      (state: RootState) => state.transferList
    );

    const { data: dataFilter } = useSelector(
        (state: RootState) => state.transferFilterData
      );

    const fecthTransferList = async () => {
        dispatch(TransferListActions.request(dataFilter));
    }


    useEffect(() => {
        fecthTransferList()
    },[dataFilter])

    const handlePageChange = useCallback((page: number) => {
        dispatch(TransferFilterActions.setFilterData({
            ...dataFilter,
            page: page
        }))
    },[dispatch, TransferFilterActions, dataFilter]);

    return (
    <S.Container>   
        <TransferFilter />
        <TransferList data={data} loading={loading}/>
        <ManagementPaginator
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </S.Container>)
}
