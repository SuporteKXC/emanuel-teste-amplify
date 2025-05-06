import React, { useCallback, useEffect } from "react";
import * as S from "./styles";
import { ClientsTopPanel } from "layouts";
import { ManagementPaginator as Paginator } from "components";
import { ClientFilter } from "../filterClient";
import { PaginateClientsActions } from "store/ducks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { Client } from "contracts/general/Client";
import { useNavigate } from "react-router-dom";
import { Formatter } from "utils/Formatter";
import { useTranslation } from "react-i18next";
import { Validator } from "@/utils";

interface ItemProps {
  item: Client;
}

const empty = "---";

export const ListClients = () => {
  let filter: any;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    data: clients,
    loading,
    pagination,
  } = useSelector((state: RootState) => state.paginateClients);

  const getClients = useCallback(
    (query?: any) => {
      filter = { ...filter, ...query };
      dispatch(PaginateClientsActions.request({ ...filter }));
    },
    [filter]
  );

  useEffect(() => {
    getClients();
  }, [getClients]);
 
  const Item = React.useCallback(
    ({ item }: ItemProps) => (
      <S.Item>
        <p>{item.id || empty}</p>
        <p>{item.tradeName || empty}</p>
        <p>{ Validator.isValidCNPJ(item.documentNumber) ? Formatter.document(item.documentNumber, item.documentType) : item.documentNumber}</p>
        <p>{item.addressCity || empty}</p>
        <p>{item.addressState || empty}</p>
        <button
          title={t("general.config.clients.editar")}
          onClick={() => navigate(`/config/clients/${item.id}`)}
        >
          <S.EditIcon />
        </button>
      </S.Item>
    ),
    []
  );

  return (
    <>
      <ClientsTopPanel />
      <ClientFilter onFilter={getClients} />
      <S.ItemContainer>
        <S.ItemHeader>
          <span>ID</span>
          <span>{t("general.config.clients.nome")}</span>
          <span>{t("general.config.clients.documento")}</span>
          <span>{t("general.config.clients.cidade")}</span>
          <span>{t("general.config.clients.estado")}</span>
          <span />
        </S.ItemHeader>
        {loading && <S.Loading />}
        {clients?.map((client) => (
          <Item item={client} key={client.id} />
        ))}
      </S.ItemContainer>
      <Paginator
        pagination={pagination}
        onPageChange={(page) => getClients({ page })}
      />
    </>
  );
};