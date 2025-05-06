import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import { Input, Select } from "components";
import { useValidation } from "hooks";
import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import {
  CreditHistoriesFilterActions,
  ICreditHistoryFilter,
} from "store/ducks";
import * as S from "./styles";

export const CreditHistoriesFilter = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { handleFormErrors } = useValidation();
  const formRef = useRef<FormHandles>(null);
  const ModalOption = [
    {
      label: t("comex.filterandButton.maritime"),
      value: "MARITIMA",
    },
    {
      label: t("comex.filterandButton.air"),
      value: "AEREA",
    },
  ];
  const { data } = useSelector(
    (state: RootState) => state.creditHistoriesFilterData
  );

  const onSubmit = useCallback<SubmitHandler<ICreditHistoryFilter>>(
    async (data): Promise<void> => {
      try {
        if (!formRef) return;
        formRef?.current?.setErrors({});
        dispatch(CreditHistoriesFilterActions.setFilterData(data));
      } catch (error) {
        if (formRef) handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors]
  );

  const persistFilter = useCallback(() => {
    const keysOfCreditHistoriesFilter: (keyof ICreditHistoryFilter)[] = [
      "username",
      "dateInicio",
      "dateFim",
    ];
    keysOfCreditHistoriesFilter.forEach((field) =>
      formRef?.current?.setFieldValue(field, data[field])
    );
  }, [formRef, data]);

  useEffect(() => persistFilter(), [persistFilter]);

  const clearFilter = useCallback(() => {
    if (formRef.current) formRef.current.reset();
    dispatch(CreditHistoriesFilterActions.reset());
  }, [dispatch, formRef]);

  return (
    <Form ref={formRef} onSubmit={onSubmit} placeholder="">
      <S.Filter>
        <S.InputWrapper>
          <Input name="username" label={t("comex.filterandButton.username")} />
          <Input
            name="dateInicio"
            label={t("comex.filterandButton.dateCreatedStart")}
            type="date"
            placeholder="De:"
          />
          <Input
            name="dateFim"
            label={t("comex.filterandButton.dateCreatedEnd")}
            type="date"
            placeholder="Até:"
          />
          <Select
            name="modal"
            options={ModalOption}
            label={"Modal"}
            placeholder={t("comex.filterandButton.selectPlaceholder")}
          />
        </S.InputWrapper>
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
