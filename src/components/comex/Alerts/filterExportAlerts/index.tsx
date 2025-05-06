import { useCallback, useEffect, useState, useRef } from "react";
import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { Form } from "@unform/web";

import { useValidation } from "hooks";
import { Input, Select, MultiSelect } from "components";
import { useTranslation } from "react-i18next";
import {
  AlertTypesActions,
  CompanyActions,
  UserSupplierListActions,
} from "store/ducks";
import { CompanyData } from "contracts";
import { FormHandles, SubmitHandler } from "@unform/core";
import { AlertsFilterActions, IAlertsFilter } from "store/ducks/comex/alerts";
import { setMultiSelectValue, setSelectValue } from "utils";
import { useAvailableFilters } from "@/hooks/useAvailableFilters";

interface Groups {
  id: string;
  label: string;
  value: string;
}
interface Props {
  module: number
}
export const FilterExportAlerts: React.FC<Props> = ({module}) => {
  const dispatch: AppDispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const { filterIsShown } = useAvailableFilters();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors, handleApiErrors } = useValidation();
  const [isUpdatingSet, setIsUpdatingSet] = useState(new Set());
  const [alertOption, setAlertOption] = useState<Groups[]>([]);

  const { data } = useSelector((state: RootState) => state.alertsFilter);

  const { data: alertTypesData, loading: loadingAlertTypes } = useSelector(
    (state: RootState) => state.alertTypes
  );

  const { data: companyData, loading: loadingCompanies } = useSelector(
    (state: RootState) => state.company
  );

  const { data: userSupplierData, loading: loadingUserSupplierData } =
    useSelector((state: RootState) => state.userSupplierList);

  const fetchAlertTypes = useCallback(() => {
    dispatch(AlertTypesActions.request({module_id: module}, onSuccess));
  }, [dispatch]);

  const fetchCompanies = useCallback(() => {
    dispatch(CompanyActions.request());
  }, [dispatch]);

  const fetchUserSupplier = useCallback(() => {
    dispatch(UserSupplierListActions.request({}));
  }, [dispatch]);

  const onSuccess = useCallback(() => setIsUpdatingSet(new Set()), []);

  useEffect(() => fetchAlertTypes(), [fetchAlertTypes]);
  useEffect(() => fetchCompanies(), [fetchCompanies]);
  useEffect(() => fetchUserSupplier(), [fetchUserSupplier]);

  const companyValid: Groups[] = [];

  companyData?.forEach((item: CompanyData) => {
    const companyAdapt = {
      id: `${item.id}`,
      value: `${item.id}`,
      label: item.name_fantasy,
    };
    companyValid.push(companyAdapt);
  });

  const readOptions = [
    {
      value: "1",
      label: t("comex.alerts.read"),
    },
    {
      value: "0",
      label: t("comex.alerts.notRead"),
    },
  ];

  const supplierSelectOptions = userSupplierData?.map((supplier: any) => ({
    value: supplier.user_id,
    label: supplier.user.name,
  }));

  useEffect(() => {
    if (alertTypesData) {
      const listAlert = alertTypesData.map((alert) => ({
        id: String(alert.id),
        value: String(alert.id),
        label: alert.description,
      }));

      setAlertOption(listAlert);
    }
  }, [alertTypesData]);

  const onSubmit = useCallback<SubmitHandler<IAlertsFilter>>(
    async (data): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        dispatch(AlertsFilterActions.setFilterData({ ...data, page: 1, limit: 10000 }));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors]
  );

  const persistFilter = useCallback(() => {
    // Persist inputs
    const keysOfOperationalFilter: (keyof IAlertsFilter)[] = [
      "po",
      "poItem",
      "responsible",
      "alertDate",
    ];
    keysOfOperationalFilter.forEach((field) =>
      formRef?.current?.setFieldValue(field, data[field])
    );

    // Persist selects
    setSelectValue("read", readOptions, data, formRef);

    // Persist multi-selects
    setMultiSelectValue("company", companyValid, data, formRef);
    setMultiSelectValue("alertTypes", alertOption, data, formRef);
  }, [formRef, data, companyValid]);

  const clearFilter = useCallback(() => {
    if (formRef.current) {
      formRef.current.setFieldValue("company", []);
      formRef.current.setFieldValue("alertTypes", []);
      formRef.current.setFieldValue("read", "");
    }
    dispatch(AlertsFilterActions.reset());
  }, [dispatch, formRef]);

  useEffect(() => persistFilter(), [persistFilter]);

  return (
    <Form ref={formRef} onSubmit={onSubmit} placeholder="">
      <S.Filter>
        <S.GridContainerMultiSelect>
          {filterIsShown("company") ? (
            <MultiSelect
              name="company"
              options={companyValid}
              label={t("general.config.users.companies")}
              placeholder={t("comex.filterandButton.selectPlaceholder")}
              isLoading={loadingCompanies}
            />
          ) : (
            <></>
          )}
          {/* {filterIsShown("userSupplier") ? (
            <Select
              name="userSupplier"
              options={supplierSelectOptions || []}
              label={t("comex.filterandButton.userSupplier")}
              placeholder={t("comex.filterandButton.selectPlaceholder")}
            />
          ) : (
            <></>
          )} */}
          {filterIsShown("alertTypes") ? (
            <MultiSelect
              options={alertOption}
              name="alertTypes"
              label={t("comex.alerts.alertTypes")}
              placeholder={t("comex.filterandButton.selectPlaceholder")}
              isLoading={loadingAlertTypes}
              isDisabled={loadingAlertTypes}
            />
          ) : (
            <></>
          )}
          {filterIsShown("po") ? (
            <Input name="po" label={t("comex.alerts.po")} />
          ) : (
            <></>
          )}
        </S.GridContainerMultiSelect>

        <S.GridContainer>
          {filterIsShown("poItem") ? (
            <Input name="poItem" label={t("comex.alerts.poItem")} />
          ) : (
            <></>
          )}
          {filterIsShown("message") ? (
            <Input name="message" label={t("comex.alerts.message")} />
          ) : (
            <></>
          )}
          {/* {filterIsShown("responsible") ? (
            <Input
              name="responsible"
              label={t("comex.filterandButton.importationAnalyst")}
            />
          ) : (
            <></>
          )} */}
          {filterIsShown("read") ? (
            <Select
              name="read"
              options={readOptions}
              label={t("comex.filterandButton.status")}
              placeholder={t("comex.filterandButton.selectPlaceholder")}
            />
          ) : (
            <></>
          )}
          {filterIsShown("alertDate") ? (
            <Input
              name="alertDate"
              label={t("comex.filterandButton.date")}
              type="date"
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
