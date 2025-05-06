import React, { useCallback, useEffect } from "react";
import * as S from "./styles";
import { CarriersTopPanel } from "layouts";
import { ManagementPaginator as Paginator } from "components";
import { CarrierFilter } from "../filterCarrier";
import { PaginateCarriersActions } from "store/ducks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { Carrier } from "contracts/general/Carrier";
import { useNavigate } from "react-router-dom";
import { Formatter } from "utils/Formatter";
import { useTranslation } from "react-i18next";

interface ItemProps {
  item: Carrier;
}

const empty = "---";

export const ListCarriers = () => {
  let filter: any;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    data: carriers,
    loading,
    pagination,
  } = useSelector((state: RootState) => state.paginateCarriers);

  const getCarriers = useCallback(
    (query?: any) => {
      filter = { ...filter, ...query };
      dispatch(PaginateCarriersActions.request({ ...filter }));
    },
    [filter]
  );

  useEffect(() => {
    getCarriers();
  }, [getCarriers]);

  const Item = React.useCallback(
    ({ item }: ItemProps) => (
      <S.Item>
        <p>{item.id || empty}</p>
        <p>{item.tradeName || empty}</p>
        <p>{Formatter.document(item.documentNumber, item.documentType)}</p>
        <p>{item.addressCity || empty}</p>
        <p>{item.addressState || empty}</p>
        <button
          title={t("general.config.carriers.editar")}
          onClick={() => navigate(`/config/carriers/${item.id}`)}
        >
          <S.EditIcon />
        </button>
      </S.Item>
    ),
    []
  );

  return (
    <>
      <CarriersTopPanel />
      <CarrierFilter onFilter={getCarriers} />
      <S.ItemContainer>
        <S.ItemHeader>
          <span>ID</span>
          <span>{t("general.config.carriers.nome")}</span>
          <span>{t("general.config.carriers.documento")}</span>
          <span>{t("general.config.carriers.cidade")}</span>
          <span>{t("general.config.carriers.estado")}</span>
          <span />
        </S.ItemHeader>
        {loading && <S.Loading />}
        {carriers?.map((carrier) => (
          <Item item={carrier} key={carrier.id} />
        ))}
      </S.ItemContainer>
      <Paginator
        pagination={pagination}
        onPageChange={(page) => getCarriers({ page })}
      />
    </>
  );
};
