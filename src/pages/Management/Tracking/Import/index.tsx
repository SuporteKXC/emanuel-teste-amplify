import React, { useCallback, useEffect } from "react";
import * as S from "./styles";
import { ImportList, ImportFilter } from "components/management/Tracking/Import";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { ImportFilterActions, ImportListActions } from "store/ducks/management";
import { ManagementPaginator } from "components";

export const Import: React.FC = () => {
  const dispatch = useDispatch()
  const {data, loading, pagination} = useSelector((state: RootState) => state.importList)
  const { data: dataFilter } = useSelector((state: RootState) => state.importFilterData)


  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(
        ImportFilterActions.setFilterData({
          ...dataFilter,
          page: page,
        })
      );
    },
    [dispatch, ImportFilterActions, dataFilter]
  );


  const fetchImportList = useCallback(() => {
    dispatch(ImportListActions.request(dataFilter))
  },[dispatch, dataFilter])

  useEffect(() => {
    fetchImportList()
  },[])

  useEffect(() => {
    fetchImportList();
  }, [dataFilter]);
  
  return (
    <S.Container>
      <ImportFilter/>
      <ImportList data={data} fetch={fetchImportList} loading={loading} />
      <ManagementPaginator
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </S.Container>
  );
};