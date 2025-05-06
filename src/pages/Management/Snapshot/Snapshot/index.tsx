import React, { useCallback, useEffect } from "react";
import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { SnapshotFilter, SnapshotList } from "components/management/Snapshot";
import {
  SnapshotListActions as MainActions,
  SnapshotFilterActions,
  SnapshotListActions,
} from "store/ducks/management";
import { RootState } from "store";
import { ManagementPaginator } from "components";
import "moment/locale/pt-br";

export const Snapshot: React.FC = () => {
  const dispatch = useDispatch();

  const { data, loading, pagination } = useSelector(
    (state: RootState) => state.snapshotList
  );

  const { data: dataFilter } = useSelector(
    (state: RootState) => state.snapshotFilterData
  );

  const fetchSnapshotDivergent = useCallback(() => {
    dispatch(SnapshotListActions.request(dataFilter));
  }, [dispatch, dataFilter]);

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(
        SnapshotFilterActions.setFilterData({
          ...dataFilter,
          page: page,
        })
      );
    },
    [dispatch, SnapshotFilterActions, dataFilter]
  );

  useEffect(() => {
    fetchSnapshotDivergent();
  }, [dataFilter]);

  return (
    <S.Container>
      <SnapshotFilter />
      <SnapshotList data={data} loading={loading} />
      <ManagementPaginator
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </S.Container>
  );
};
