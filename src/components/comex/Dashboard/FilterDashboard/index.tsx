import { useCallback, useEffect, useRef } from "react";
import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { Form } from "@unform/web";
import { useValidation } from "hooks";
import { Input, Select, MultiSelect } from "components";
import { useTranslation } from "react-i18next";
import { CompanyActions } from "store/ducks";
import { FormHandles } from "@unform/core";
import {
  IOrderItensDelayFilter,
  OrderItensDelayFilterActions,
} from "store/ducks/comex/dashboard";
import { setMultiSelectValue, setSelectValue } from "utils";
import { useAvailableFilters } from "@/hooks/useAvailableFilters";

interface Groups {
  label: string;
  value: string;
}

export const FilterDashboard = () => {
  const { handleFormErrors } = useValidation();
  const formRef = useRef<FormHandles>(null);
  const { filterIsShown} = useAvailableFilters()
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const { data } = useSelector(
    (state: RootState) => state.orderItensDelayFilter
  );

  // Campo company ocultado: pedido em -> https://trello.com/c/dcYqggLJ/88-colocar-a-op%C3%A7%C3%A3o-maritimo-como-padr%C3%A3o-no-filtro-de-modal-no-dashboard-performance
  /* const { data: companyData, loading: companyLoading } = useSelector(
    (state: RootState) => state.company
  ); 
  
  const fetchCompanies = useCallback(() => {
    dispatch(CompanyActions.request());
  }, [dispatch]);
  
  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);
  
  const companyValid: Groups[] = [];
  
  companyData?.forEach((item: CompanyData) => {
    const companyAdapt = {
      value: `${item.id}`,
      label: item.name_fantasy,
    };
    companyValid.push(companyAdapt);
  }); */

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
  const modalOptions = [
    {
      value: "AEREA",
      label: t("comex.filterandButton.air"),
    },
    {
      value: "MARITIMA",
      label: t("comex.filterandButton.maritime"),
    },
    {
      value: "RODOVIARIA",
      label: t("comex.filterandButton.road"),
    },
  ];

  const onSubmit = useCallback(
    async (data: any): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        dispatch(OrderItensDelayFilterActions.setFilterData(data));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors]
  );

  const persistFilter = useCallback(() => {
    if (formRef.current) {
      const keysOfOrdersFilter: (keyof IOrderItensDelayFilter)[] = [
        "country",
        "plantDeliveryStart",
        "plantDeliveryEnd",
      ];
      keysOfOrdersFilter.forEach((field) =>
        formRef.current?.setFieldValue(field, data[field])
      );

      setSelectValue("urgent", urgentOptions, data, formRef);
      setSelectValue("modal", modalOptions, data, formRef);

      // Campo company ocultado: pedido em -> https://trello.com/c/dcYqggLJ/88-colocar-a-op%C3%A7%C3%A3o-maritimo-como-padr%C3%A3o-no-filtro-de-modal-no-dashboard-performance
      // setMultiSelectValue('company', companyValid, data, formRef);
    }
  }, [formRef, data]);

  const clearFilter = useCallback(() => {
    if (formRef.current) {
      formRef.current.setFieldValue("company", []);
      formRef.current.setFieldValue("modal", "");
      formRef.current.setFieldValue("urgent", "");
    }
    dispatch(OrderItensDelayFilterActions.reset());
  }, []);

  useEffect(() => persistFilter(), [persistFilter]);

  return (
    <Form ref={formRef} onSubmit={onSubmit} placeholder="">
      <S.Filter>
        <S.GridContainer>
          {filterIsShown('country') ? <Input name="country" label={t("comex.filterandButton.country")} /> : <></>}
          {filterIsShown('modal') ? <Select
            name="modal"
            options={modalOptions}
            label={"Modal"}
            placeholder={t("comex.filterandButton.selectPlaceholder")}
          /> : <></>}
          {/*
          // Campo company ocultado: pedido em -> https://trello.com/c/dcYqggLJ/88-colocar-a-op%C3%A7%C3%A3o-maritimo-como-padr%C3%A3o-no-filtro-de-modal-no-dashboard-performance

           <MultiSelect
            options={companyValid}
            name="company"
            label={t("general.config.users.companies")}
            placeholder={t("comex.filterandButton.selectPlaceholder")}
            isLoading={companyLoading}
          /> */}
          {filterIsShown('plantDeliveryStart') ? <Input
            name="plantDeliveryStart"
            label={t("comex.filterandButton.dateInitialPlant")}
            type="date"
          /> : <></>}
        {filterIsShown('plantDeliveryEnd') ?   <Input
            name="plantDeliveryEnd"
            label={t("comex.filterandButton.dateEndPlant")}
            type="date"
          /> : <></>}
          {filterIsShown('urgent') ? <Select
            name="urgent"
            options={urgentOptions}
            label={t("comex.filterandButton.urgent")}
            placeholder={t("comex.filterandButton.selectPlaceholder")}
          /> : <></>}
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
