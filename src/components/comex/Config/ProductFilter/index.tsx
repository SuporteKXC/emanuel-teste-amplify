import { useCallback, useEffect, useState, useRef, RefObject } from "react";
import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { Form } from "@unform/web";

import { useValidation } from "hooks";
import { Input, Select, MultiSelect } from "components";
import { useTranslation } from "react-i18next";
import { CompanyActions, ResponsibleActions } from "store/ducks";
import {
  IOperationalFilter,
  OperationalFilterActions,
  OrderItemStatusActions,
} from "store/ducks/comex/operational";
import {
  ProductActions,
  UpdateProductActions,
  ProductPaginateActions,
  ProductFilterActions,
  IProductFilter,
} from "store/ducks";
import { CompanyData, ResponsibleData } from "contracts";
import { FormHandles, SubmitHandler } from "@unform/core";
import { setSelectValue, setMultiSelectValue } from "utils";

interface Groups {
  label: string;
  value: string;
}

export const FilterProduct = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const { handleFormErrors } = useValidation();
  const formRef = useRef<FormHandles>(null);

  const { data } = useSelector((state: RootState) => state.productFilterData);

  const { data: responsiblesData, loading: loadingResponsiblesData } =
    useSelector((state: RootState) => state.responsibles);

  const fetchResponsibles = useCallback(() => {
    dispatch(ResponsibleActions.request());
  }, [dispatch]);

  useEffect(() => fetchResponsibles(), [fetchResponsibles]);

  const responsiblesValid: Groups[] = [];
  responsiblesData?.forEach((item: ResponsibleData) => {
    const responsiblesAdapt = {
      value: `${item.id}`,
      label: item.name,
    };
    responsiblesValid.push(responsiblesAdapt);
  });

  const onSubmit = useCallback<SubmitHandler<IProductFilter>>(
    async (data): Promise<void> => {
      try {
        if (!formRef) return;
        formRef.current?.setErrors({});

        dispatch(ProductFilterActions.setFilterData(data));
      } catch (error) {
        if (formRef) handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors]
  );

  const persistFilter = useCallback(() => {
    // Persist inputs
    const keysOfOperationalFilter: (keyof IProductFilter)[] = [
      "code",
      "description",
    ];
    keysOfOperationalFilter.forEach((field) =>
      formRef?.current?.setFieldValue(field, data[field])
    );

    // Persist multi-selects
    setMultiSelectValue("responsible", responsiblesValid, data, formRef);
  }, [formRef, data]);

  const clearFilter = useCallback(() => {
    if (formRef.current) {
      formRef.current.setFieldValue("responsible", []);
    }
    dispatch(ProductFilterActions.reset());
  }, [dispatch, formRef]);

  useEffect(() => persistFilter(), [persistFilter]);

  return (
    <Form ref={formRef} onSubmit={onSubmit} placeholder="">
      <S.Filter>
        <S.GridContainerText>
          <Input name="code" label={t("comex.filterandButton.productCode")} />
          <Input
            name="description"
            label={t("comex.filterandButton.product")}
          />
          <MultiSelect
            name="responsible"
            options={responsiblesValid}
            label={t("general.config.users.responsibles")}
            placeholder={t("comex.filterandButton.selectPlaceholder")}
            isLoading={loadingResponsiblesData}
          />
        </S.GridContainerText>

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
