import React, { useCallback, useEffect } from "react";
import * as S from "./styles";
import {
  DivergenceList,
  DivergenceFilter,
} from "components/management/Snapshot";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import {
  SnapshotDivergentFilterActions,
  SnapshotDivergentListActions,
} from "store/ducks/management/snapshotDivergent";
import { ManagementPaginator } from "components";

export const Divergence: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { data, pagination, loading } = useSelector(
    (state: RootState) => state.snapshotDivergentList
  );

  const { data: dataFilter } = useSelector(
    (state: RootState) => state.snapshotDivergentFilterData
  );

  const fetchSnapshotDivergent = useCallback(() => {
    dispatch(SnapshotDivergentListActions.request(dataFilter));
  }, [dispatch, dataFilter]);

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(
        SnapshotDivergentFilterActions.setFilterData({
          ...dataFilter,
          page: page,
        })
      );
    },
    [dispatch, SnapshotDivergentFilterActions, dataFilter]
  );

  useEffect(() => {
    fetchSnapshotDivergent();
  }, [dataFilter]);

  return (
    <S.Container>
      <DivergenceFilter />
      <DivergenceList data={data} loading={loading} />
      <ManagementPaginator
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </S.Container>
  );
};
