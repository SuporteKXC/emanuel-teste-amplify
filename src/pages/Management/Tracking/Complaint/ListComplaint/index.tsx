import React, { useCallback, useEffect } from "react";

import * as S from "./styles";
import {
  ComplaintFilter,
  ComplaintList,
} from "@/components/management/Tracking";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  ComplaintFilterActions,
  ComplaintListActions,
} from "@/store/ducks/management/complaint";
import { ManagementPaginator } from "@/components";

export const Complaint: React.FC = () => {
  const dispatch = useDispatch();

  const { data, loading, pagination } = useSelector(
    (state: RootState) => state.complaintList
  );

  const { data: dataFilter } = useSelector(
    (state: RootState) => state.complaintFilterData
  );

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(
        ComplaintFilterActions.setFilterData({
          ...dataFilter,
          page: page,
        })
      );
    },
    [dispatch, ComplaintFilterActions, dataFilter]
  );

  const fetchImportList = useCallback(() => {
    dispatch(ComplaintListActions.request(dataFilter));
  }, [dispatch, dataFilter]);

  useEffect(() => {
    fetchImportList();
  }, []);

  useEffect(() => {
    fetchImportList();
  }, [dataFilter]);

  return (
    <S.Container>
      <ComplaintFilter />
      <ComplaintList data={data} loading={false} />
      <ManagementPaginator
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </S.Container>
  );
};
