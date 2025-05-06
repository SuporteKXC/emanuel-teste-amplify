import { useCallback, useEffect, useState, useRef } from "react";
import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { Form } from "@unform/web";
import { useValidation } from "hooks";
import { Input, Select, MultiSelect } from "components";
import { useTranslation } from "react-i18next";
import { CompanyActions, UserSupplierListActions } from "store/ducks";
import { OrderItemStatusActions } from "store/ducks/comex/operational";
import { CompanyData } from "contracts";
import { FormHandles } from "@unform/core";
import { IOrderFilter, OrderFilterActions } from "store/ducks/comex/panels";
import { setMultiSelectValue, setSelectValue } from "utils";
import { useAvailableFilters } from "@/hooks/useAvailableFilters";

interface Groups {
  label: string;
  value: string;
}

export const FilterPanel = () => {
  const { handleFormErrors } = useValidation();
  const formRef = useRef<FormHandles>(null);
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const { filterIsShown } = useAvailableFilters();
  const companyValid: Groups[] = [];

  const { data } = useSelector((state: RootState) => state.ordersFilter);

  const { data: companyData, loading: loadingCompany } = useSelector(
    (state: RootState) => state.company
  );

  const { data: orderItemStatusData, loading: loadingOrderItemStatus } =
    useSelector((state: RootState) => state.orderItemStatus);

  const { data: userSupplierData, loading: loadingUserSupplierData } =
    useSelector((state: RootState) => state.userSupplierList);

  const fetchCompanies = useCallback(() => {
    dispatch(CompanyActions.request());
  }, [dispatch]);

  const fetchOrderItemStatus = useCallback(() => {
    dispatch(OrderItemStatusActions.request());
  }, [dispatch]);

  const fetchUserSupplier = useCallback(() => {
    dispatch(UserSupplierListActions.request({}));
  }, [dispatch]);

  useEffect(() => {
    fetchUserSupplier();
  }, [fetchUserSupplier]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    fetchOrderItemStatus();
  }, [fetchOrderItemStatus]);

  companyData?.forEach((item: CompanyData) => {
    const companyAdapt = {
      value: `${item.id}`,
      label: item.name_fantasy,
    };
    companyValid.push(companyAdapt);
  });

  const urgentOptions = [
    {
      value: "1",
      label: t("comex.filterandButton.yes"),
    },
    {
      value: "0",
      label: t("comex.filterandButton.no"),
    },
  ];

  const supplierSelectOptions = userSupplierData?.map((supplier: any) => ({
    value: supplier.user_id,
    label: supplier.user.name,
  }));

  const onSubmit = useCallback(
    async (data: any): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        dispatch(OrderFilterActions.setFilterData(data));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors]
  );

  const persistFilter = useCallback(() => {
    if (formRef.current) {
      const keysOfOrdersFilter: (keyof IOrderFilter)[] = [
        "responsible",
        "grActualStart",
        "grActualEnd",
        "product",
      ];
      keysOfOrdersFilter.forEach((field) =>
        formRef.current?.setFieldValue(field, data[field])
      );

      setSelectValue("urgent", urgentOptions, data, formRef);

      setMultiSelectValue("company", companyValid, data, formRef);
      setMultiSelectValue("statusProcess", orderItemStatusData, data, formRef);
    }
  }, [formRef, data]);

  const clearFilter = useCallback(() => {
    if (formRef.current) {
      formRef.current.setFieldValue("company", []);
      formRef.current.setFieldValue("statusProcess", []);
      formRef.current.setFieldValue("urgent", "");
    }
    dispatch(OrderFilterActions.reset());
  }, []);

  useEffect(() => persistFilter(), [persistFilter]);

  return (
    <Form ref={formRef} onSubmit={onSubmit} placeholder="">
      <S.Filter>
        <S.GridContainerMultiSelect>
          {filterIsShown("company") ? (
            <MultiSelect
              options={companyValid}
              name="company"
              label={t("general.config.users.companies")}
              placeholder={t("comex.filterandButton.selectPlaceholder")}
              isLoading={loadingCompany}
            />
          ) : (
            <></>
          )}
          {filterIsShown("userSupplier") ? (
            <Select
              name="userSupplier"
              options={supplierSelectOptions || []}
              label={t("comex.filterandButton.userSupplier")}
              placeholder={t("comex.filterandButton.selectPlaceholder")}
            />
          ) : (
            <></>
          )}
          {filterIsShown("statusProcess") ? (
            <MultiSelect
              options={orderItemStatusData}
              name="statusProcess"
              label={t("comex.panels.nextStep")}
              placeholder={t("comex.filterandButton.selectPlaceholder")}
              isLoading={loadingOrderItemStatus}
            />
          ) : (
            <></>
          )}
        </S.GridContainerMultiSelect>

        <S.GridContainer>
          {filterIsShown("product") ? (
            <Input
              name="product"
              label={t("comex.panels.filter.productOrDescription")}
            />
          ) : (
            <></>
          )}
          {filterIsShown("responsible") ? (
            <Input
              name="responsible"
              label={t("comex.filterandButton.importationAnalyst")}
            />
          ) : (
            <></>
          )}
          {filterIsShown("grActualStart") ? (
            <Input
              name="grActualStart"
              label={t("comex.filterandButton.dateInitialActualGR")}
              type="date"
            />
          ) : (
            <></>
          )}
          {filterIsShown("grActualEnd") ? (
            <Input
              name="grActualEnd"
              label={t("comex.filterandButton.dateEndActualGR")}
              type="date"
            />
          ) : (
            <></>
          )}
          {filterIsShown("urgent") ? (
            <Select
              name="urgent"
              options={urgentOptions}
              label={t("comex.filterandButton.urgent")}
              placeholder={t("comex.filterandButton.selectPlaceholder")}
            />
          ) : (
            <></>
          )}
        </S.GridContainer>

        <S.ButtonWrapper>
          <S.Button mood="primary">
            {t("comex.filterandButton.filter")}
          </S.Button>
          <S.Button type="reset" mood="light" onClick={clearFilter}>
            {t("comex.filterandButton.clear")}
          </S.Button>
        </S.ButtonWrapper>
      </S.Filter>
    </Form>
  );
};
