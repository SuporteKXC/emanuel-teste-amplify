import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector, RootStateOrAny } from "react-redux"
import { useHistory } from "react-router-dom"
import { usePermissions, useTranslation } from "hooks"
import { translations } from "./translations"

import {
  PaginateUsersActions,
  PaginateUsersState,
} from "store/ducks/settings/users"

import { SelectedFilterActions, SelectedFilterState } from "store/ducks/filter"

import * as S from "./styles"
import { MainContainer, Paginator, MenuSelector } from "components/shared"
import { GridUsers, FilterUsers } from "components/settings"

export const ListUsers: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { getTranslation } = useTranslation(translations)
  const { isAdminRoot } = usePermissions()

  const [query, setQuery] = useState<Record<string, any>>({
    limit: 10,
    page: 1,
  })

  const { data, loading, pagination } = useSelector<
    RootStateOrAny,
    PaginateUsersState
  >((state) => state.paginateUsers)

  const { data: dataFilter } = useSelector<RootStateOrAny>(
    (state) => state.selectedFilter
  ) as SelectedFilterState

  const handleSubmitFilter = useCallback(
    (value) => {
      const data = {
        ...dataFilter,
        ...value,
        page: 1,
      }
      dispatch(SelectedFilterActions.success(data))
      setQuery((state) => ({ ...state, data }))
    },
    [setQuery, dispatch, dataFilter]
  )

  const handlePageChange = useCallback(
    (value) => {
      const data = {
        ...dataFilter,
        page: value,
      }
      dispatch(SelectedFilterActions.success(data))
      setQuery((state) => ({ ...state, data }))
    },
    [setQuery, dispatch, dataFilter]
  )

  const getData = useCallback(() => {
    dispatch(PaginateUsersActions.request({ ...query, ...dataFilter }))
  }, [dispatch, query, dataFilter])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <MainContainer>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation("configuracoes")} <MenuSelector page="users" />
          {loading && <S.LoadingPage />}
        </h1>
        <S.HeaderButtons>
          {isAdminRoot() ? (
            <S.ButtonMini onClick={() => history.push("/settings/user/new")}>
              {getTranslation("novoUsuario")}
            </S.ButtonMini>
          ) : (
            <></>
          )}
          <FilterUsers onFilter={handleSubmitFilter} />
        </S.HeaderButtons>
      </S.PageHeader>
      <S.PageContent>
        <GridUsers users={data} root={isAdminRoot()} />
        <Paginator
          pagination={pagination}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </S.PageContent>
    </MainContainer>
  )
}
