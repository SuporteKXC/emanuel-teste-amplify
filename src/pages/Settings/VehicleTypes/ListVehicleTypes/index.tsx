import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  PaginateVehicleTypesActions,
  PaginateVehicleTypesState,
} from "store/ducks/settings/vehicle-types";

import * as S from "./styles";
import { MainContainer, Paginator, Search, MenuSelector } from "components/shared";
import { GridVehicleTypes } from "components/settings";
import { useTranslation } from "hooks";
import { translations } from "./translations";
export const ListVehicleTypes: React.FC = () => {
  const dispatch = useDispatch();
  const { getTranslation } = useTranslation(translations);
  const history = useHistory();
  const [query, setQuery] = useState({
    search: "",
    limit: 10,
    page: 1,
  });
  const { data, loading, pagination } = useSelector<
    RootStateOrAny,
    PaginateVehicleTypesState
  >((state) => state.paginateVehicleTypes);

  const handleSearchChange = useCallback((value) => {
    setQuery((state) => ({ ...state, search: value, page: 1 }));
  }, []);

  const handlePageChange = useCallback((value) => {
    setQuery((state) => ({ ...state, page: value }));
  }, []);

  const getData = useCallback(() => {
    dispatch(PaginateVehicleTypesActions.request({ ...query }));
  }, [dispatch, query]);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <MainContainer>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation("configuracoes")} <MenuSelector page="vehicle-types" />
          {loading && <S.LoadingPage />}
        </h1>
        <Search onSearch={handleSearchChange} />
        <S.ButtonMini
          onClick={() => history.push("/settings/vehicle-type/new")}
        >
          {getTranslation("novoTipo")}
        </S.ButtonMini>
      </S.PageHeader>
      <S.PageContent>
        <GridVehicleTypes vehicleTypes={data} />
        <Paginator
          pagination={pagination}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </S.PageContent>
    </MainContainer>
  );
};
