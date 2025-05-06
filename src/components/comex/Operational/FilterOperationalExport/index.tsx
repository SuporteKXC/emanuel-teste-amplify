import { useCallback, useEffect, useRef } from "react";
import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { Form } from "@unform/web";

import { usePermission, useValidation } from "hooks";
import { Input, Select, MultiSelect, ToggleInput } from "components";
import { useTranslation } from "react-i18next";
import {
  CompanyActions,
  ResponsibleActions,
  UserSupplierListActions,
} from "store/ducks";
import {
  IOperationalFilter,
  OperationalFilterActions,
  OrderItemStatusActions,
  OrderItemProcessTypesActions,
} from "store/ducks/comex/operational";
import { FormHandles, SubmitHandler } from "@unform/core";
import { setSelectValue, setMultiSelectValue } from "utils";
import { objectToSelectOptions } from "@/utils/inputOptionsFormatter";
import { useAvailableFilters } from "@/hooks/useAvailableFilters";

import { notify } from "@/services";
import { format, subDays } from "date-fns";
import { useCountries } from "@/hooks/useCountries";

const DAY_UNIT_IN_MILLISECONDS = 24 * 3600 * 1000;

interface Groups {
  label: string;
  value: string;
}

type FilterOperationalProps = {
  customOnSubmit?: (data: SubmitHandler<IOperationalFilter>) => void;
};

export const FilterOperationalExport = (props: FilterOperationalProps) => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const { handleFormErrors } = useValidation();
  const formRef = useRef<FormHandles>(null);
  const { filterIsShown } = useAvailableFilters();
  const { hasPermissionTo } = usePermission();

  const { data: userData } = useSelector((state: RootState) => state.auth);

  const userCompanyIds =
    userData?.profile.user_company.map(
      (userCompany) => userCompany.company_id
    ) ?? [];

  const { data } = useSelector(
    (state: RootState) => state.operationalFilterData
  );

  const { data: companyData, loading: companyLoading } = useSelector(
    (state: RootState) => state.company
  );

  const { data: orderItemStatusData, loading: loadingOrderItemStatusData } =
    useSelector((state: RootState) => state.orderItemStatus);

  const {
    data: orderItemProcessTypesData,
    loading: loadingOrderItemProcessTypesData,
  } = useSelector((state: RootState) => state.orderItemProcessTypes);

  const { data: responsiblesData, loading: loadingResponsiblesData } =
    useSelector((state: RootState) => state.responsibles);

  const { data: userSupplierData, loading: loadingUserSupplierData } =
    useSelector((state: RootState) => state.userSupplierList);

  const { listCountries, countriesOptions, loadingCountries } = useCountries();

  const fetchCompanies = useCallback(() => {
    dispatch(CompanyActions.request());
  }, [dispatch]);

  const fetchOrderItemStatus = useCallback(() => {
    dispatch(OrderItemStatusActions.request());
  }, [dispatch]);

  const fetchOrderItemProcessTypes = useCallback(() => {
    dispatch(OrderItemProcessTypesActions.request());
  }, [dispatch]);

  const fetchResponsibles = useCallback(() => {
    dispatch(ResponsibleActions.request());
  }, [dispatch]);

  const fetchUserSupplier = useCallback(() => {
    if (hasPermissionTo("LISTUSERSUPPLIER")) {
      dispatch(UserSupplierListActions.request({}));
    }
  }, [dispatch]);

  useEffect(() => fetchCompanies(), [fetchCompanies]);
  useEffect(() => fetchOrderItemStatus(), [fetchOrderItemStatus]);
  useEffect(() => fetchOrderItemProcessTypes(), [fetchOrderItemProcessTypes]);
  useEffect(() => fetchResponsibles(), [fetchResponsibles]);
  useEffect(() => fetchUserSupplier(), [fetchUserSupplier]);
  useEffect(() => {
    listCountries();
  }, [listCountries]);

  const supplierSelectOptions = userSupplierData?.map((supplier: any) => ({
    value: supplier.user_id,
    label: supplier.user.name,
  }));

  const companyValid: Groups[] = objectToSelectOptions(
    companyData,
    "name_fantasy"
  ).filter((company) => userCompanyIds.includes(parseInt(company.value)));

  const responsiblesValid = objectToSelectOptions(responsiblesData, "name");

  const onSubmit = useCallback<SubmitHandler<IOperationalFilter>>(
    async (data): Promise<void> => {
      try {
        if (!formRef) return;
        formRef.current?.setErrors({});
        const diff =
          new Date(data!.registerDateEnd!).getTime() -
          new Date(data!.registerDateStart!).getTime();
        const diffInDays = diff / DAY_UNIT_IN_MILLISECONDS;
        if (diffInDays > 180) {
          notify("error", "Diferença de datas não pode ser maior que 180 dias!");
          return;
        }
        const notPermittedCompanyIds =
          data?.company?.filter((c) => !userCompanyIds.includes(Number(c))) ??
          [];

        if (notPermittedCompanyIds?.length > 0) {
          notify(
            "error",
            "Você não tem permissão para acessar as empresas selecionadas no filtro."
          );
          return;
        }

        dispatch(OperationalFilterActions.setFilterData(data));
      } catch (error) {
        if (formRef) handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors]
  );

  const filterUrgent = [
    {
      value: "1",
      label: t("comex.filterandButton.yes"),
    },
    {
      value: "0",
      label: t("comex.filterandButton.no"),
    },
  ];

  const filterProgress = [
    {
      value: "late",
      label: t("comex.filterandButton.late"),
    },
    {
      value: "deadline",
      label: t("comex.filterandButton.deadline"),
    },
  ];

  const filterChannel = [
    {
      value: "AMARELO",
      label: t("comex.filterandButton.yellow"),
    },
    {
      value: "VERMELHO",
      label: t("comex.filterandButton.red"),
    },
  ];

  const filterUserSupplier = supplierSelectOptions || [];

  const persistFilter = useCallback(() => {
    const keysOfOperationalFilter: (keyof IOperationalFilter)[] = [
      "po",
      "poItem",
      "customerPo",
      "product",
      "shipper",
      "destinationPlant",
      "canceled",
      "criticalProcess",
      "ataStart",
      "AtaEnd",
      "grActualStart",
      "grActualEnd",
      "modal",
      "userSupplier",
      "registerDateStart",
      "registerDateEnd",
    ];

    keysOfOperationalFilter.forEach((field) =>
      formRef?.current?.setFieldValue(field, data[field])
    );

    setSelectValue("userSupplier", filterUserSupplier, data, formRef);
    setSelectValue("channel", filterChannel, data, formRef);
    setSelectValue("urgent", filterUrgent, data, formRef);
    setSelectValue("inProgress", filterProgress, data, formRef);

    setMultiSelectValue("company", companyValid, data, formRef);
    setMultiSelectValue("statusProcess", orderItemStatusData, data, formRef);
    setMultiSelectValue("destinationPlant", countriesOptions, data, formRef);
    setMultiSelectValue(
      "processType",
      orderItemProcessTypesData,
      data,
      formRef
    );
    setMultiSelectValue("responsible", responsiblesValid, data, formRef);
  }, [
    formRef,
    data,
    companyValid,
    orderItemStatusData,
    countriesOptions,
    filterChannel,
    filterUrgent,
    filterProgress,
  ]);

  const clearFilter = useCallback(() => {
    if (formRef.current) {
      formRef.current.setFieldValue("company", []);
      formRef.current.setFieldValue("statusProcess", []);
      formRef.current.setFieldValue("processType", []);
      formRef.current.setFieldValue("responsible", []);
      formRef.current.setFieldValue("destinationPlant", []);
      formRef.current.setFieldValue("channel", "");
      formRef.current.setFieldValue("userSupplier", "");
      formRef.current.setFieldValue("urgent", "");
      formRef.current.setFieldValue("inProgress", "");
    }
    dispatch(OperationalFilterActions.reset());
  }, [dispatch, formRef]);

  useEffect(() => persistFilter(), [persistFilter]);

  return (
    <Form
      ref={formRef}
      onSubmit={
        props.customOnSubmit ? props.customOnSubmit : onSubmit
      }
      placeholder=""
    >
      <S.Filter>
        <S.GridContainerMultiSelect>
          {filterIsShown("company") && (
            <MultiSelect
              name="company"
              options={companyValid}
              label={t("general.config.users.companies")}
              placeholder={t("comex.filterandButton.selectPlaceholder")}
              isLoading={companyLoading}
            />
          )}
          {filterIsShown("statusProcess") && (
            <MultiSelect
              name="statusProcess"
              options={orderItemStatusData}
              label={t("comex.panels.nextStep")}
              placeholder={t("comex.filterandButton.selectPlaceholder")}
              isLoading={loadingOrderItemStatusData}
            />
          )}
          {filterIsShown("processType") && (
            <MultiSelect
              name="processType"
              options={orderItemProcessTypesData}
              label={t("comex.panels.processTypes")}
              placeholder={t("comex.filterandButton.selectPlaceholder")}
              isLoading={loadingOrderItemProcessTypesData}
            />
          )}
        </S.GridContainerMultiSelect>

        <S.GridContainer gridReapt={5}>
          {filterIsShown("responsible") && (
            <MultiSelect
              name="responsible"
              options={responsiblesValid}
              label={t("comex.filterandButton.importationAnalyst")}
              placeholder={t("comex.filterandButton.selectPlaceholder")}
              isLoading={loadingResponsiblesData}
            />
          )}
          {filterIsShown("userSupplier") && (
            <Select
              name="userSupplier"
              options={supplierSelectOptions || []}
              label={t("comex.filterandButton.userSupplier")}
              placeholder={t("comex.filterandButton.selectPlaceholder")}
            />
          )}
        </S.GridContainer>

        {/* {filterIsShown("ataStart") ? (
  <DatePicker
    name="ataStart"
    label={t("comex.filterandButton.ataStart")}
    placeholder={t("comex.filterandButton.selectDate")}
  />
) : (
  <></>
)}

{filterIsShown("ataEnd") ? (
  <DatePicker
    name="ataEnd"
    label={t("comex.filterandButton.ataEnd")}
    placeholder={t("comex.filterandButton.selectDate")}
  />
) : (
  <></>
)}

{filterIsShown("grActualStart") ? (
  <DatePicker
    name="grActualStart"
    label={t("comex.filterandButton.grActualStart")}
    placeholder={t("comex.filterandButton.selectDate")}
  />
) : (
  <></>
)} */}

<S.GridContainerDate>
          {filterIsShown("ataStart") ? (
            <Input
              name="ataStart"
              label={t("comex.filterandButton.dateInitialATA")}
              type="date"
              placeholder="De:"
            />
          ) : (
            <></>
          )}
          {filterIsShown("ataEnd") ? (
            <Input
              name="ataEnd"
              label={t("comex.filterandButton.dateEndActualTA")}
              type="date"
              placeholder="Até:"
            />
          ) : (
            <></>
          )}
          {filterIsShown("grActualStart") ? (
            <Input
              name="grActualStart"
              label={t("comex.filterandButton.dateInitialActualGR")}
              type="date"
              placeholder="De:"
            />
          ) : (
            <></>
          )}
          {filterIsShown("grActualEnd") ? (
            <Input
              name="grActualEnd"
              label={t("comex.filterandButton.dateEndActualGR")}
              type="date"
              placeholder="Até:"
            />
          ) : (
            <></>
          )}
          {filterIsShown("registerDateStart") ? (
            <Input
              name="registerDateStart"
              label={t("comex.filterandButton.registerDateStart")}
              type="date"
              placeholder="De:"
            />
          ) : (
            <></>
          )}
          {filterIsShown("registerDateEnd") ? (
            <Input
              name="registerDateEnd"
              label={t("comex.filterandButton.registerDateEnd")}
              type="date"
              placeholder="Até:"
            />
          ) : (
            <></>
          )}
        </S.GridContainerDate>


        <S.ButtonWrapper>
          <S.Button mood="primary">
            {props.customOnSubmit && "Gerar"}
            {!props.customOnSubmit && t("comex.filterandButton.filter")}
          </S.Button>
          <S.Button type="reset" mood="light" onClick={clearFilter}>
            {t("comex.filterandButton.clear")}
          </S.Button>
        </S.ButtonWrapper>
      </S.Filter>
    </Form>
  );
};
