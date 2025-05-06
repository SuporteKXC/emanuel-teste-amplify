import React, { useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { PaginateCompaniesActions } from "@/store/ducks";
import CompaniesLayout from "@/layouts/Companies/CompaniesLayout";
import { DataTable } from "components/ui/DataTable";
import { useColumns } from "./columns";

export const ListCompanies = () => {
  let filter: any;
  const dispatch = useDispatch();
  const { columns } = useColumns();

  const { data: companies, loading } = useSelector(
    (state: RootState) => state.paginateCompanies
  );

  const getCampanies = (query?: any) => {
    filter = { ...filter, ...query };
    dispatch(PaginateCompaniesActions.request({ ...filter }));
  };

  useEffect(() => {
    getCampanies();
  }, [dispatch]);

  return (
    <CompaniesLayout>
      <DataTable
        columns={columns}
        data={companies ?? []}
        exportTable={false}
        isLoading={loading}
      />
    </CompaniesLayout>
  );
};
