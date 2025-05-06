import React, { useCallback, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./styles";
import { Select } from "components/shared";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import {
  ComplaintResponsiblesActions,
  ComplaintTypesActions,
} from "store/ducks/management";

import { FormHandles } from "@unform/core";
import { DatePickerUnform } from "components/shared/Forms/DatePickerUnform";

import {
  ComplaintFilterActions,
  ComplaintImpactedAreaActions,
  IComplaintFilter,
} from "@/store/ducks/management/complaint";
import { parseSelectOptions } from "@/utils/parseSelectOptions";

export const ComplaintFilter = React.memo((props: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const formRef = useRef<FormHandles>(null);
  const [dateEnd, setDateEnd] = useState<Date>(new Date());
  const [dateStart, setDateStart] = useState<Date>(new Date())

  const { data: complaintFilterData } = useSelector(
    (state: RootState) => state.complaintFilterData
  );

  const { data: complaintTypes, loading: complaintTypesLoading } = useSelector(
    (state: RootState) => state.complaintTypes
  );
  const { data: responsibles, loading: responsiblesLoading } = useSelector(
    (state: RootState) => state.complaintResponsibles
  );
  const { data: impactedArea, loading: impactedAreaLoading } = useSelector(
    (state: RootState) => state.complaintImpactedArea
  );

  const complaintTypesOptions = parseSelectOptions(
    complaintTypes,
    "name",
    "id"
  );
  const impactedAreaOptions = parseSelectOptions(impactedArea, "name", "id");
  const responsiblesOptions = parseSelectOptions(responsibles, "name", "id");

  const disabledFilter = Object.keys(complaintFilterData)
    .filter(
      (key) =>
        ![
          "limit",
          "page",
          "plantDeliveryDateStart",
          "plantDeliveryDateEnd",
        ].includes(key)
    )
    .every((key) => complaintFilterData[key as keyof IComplaintFilter] == null);

  const filterDataChange = useCallback(
    (data: any) => {
      dispatch(
        ComplaintFilterActions.setFilterData({
          ...complaintFilterData,
          ...data,
          page: 1,
          dtEndProcess: format(data.dtEndProcess, "yyyy-MM-dd"),
          dtStartProcess: format(data.dtStartProcess, "yyyy-MM-dd"),
        })
      );
    },
    [complaintFilterData]
  );

  const fetchs = () => {
    dispatch(ComplaintResponsiblesActions.request());
    dispatch(ComplaintTypesActions.request());
    dispatch(ComplaintImpactedAreaActions.request());
  };

  
  const changeDateStart = useCallback(
    (date: Date) => {
      setDateStart(date);

      // dispatch(
      //   ComplaintFilterActions.setFilterData({
      //     ...complaintFilterData,
      //     dtStartProcess: format(new Date(date), "yyyy-MM-dd"),
      //   })
      // )
    },[complaintFilterData]
  )
  const changeDateEnd = useCallback(
    (date: Date) => {
      setDateEnd(date);

      // dispatch(
      //   ComplaintFilterActions.setFilterData({
      //     ...complaintFilterData,
      //     dtEndProcess: format(new Date(date), "yyyy-MM-dd"),
      //   })
      // );
    },
    [complaintFilterData]
  );

  const clearFilter = useCallback(() => {
    if (formRef.current) {
      formRef.current.setFieldValue("complaintResponsible", "");
      formRef.current.setFieldValue("complaintType", "");
      formRef.current.setFieldValue("impactedArea", "");
      ComplaintFilterActions.reset();
      dispatch(ComplaintFilterActions.setFilterData({}));
    }
  }, [formRef, ComplaintFilterActions, dateEnd]);

  useEffect(() => {
    fetchs();
  }, []);

  return (
    <S.Container>
      <S.FilterForm ref={formRef} onSubmit={filterDataChange} placeholder="">
        <DatePickerUnform
          label={"Data de criação (Início)"}
          selected={dateStart}
          dateFormat="dd/MM/yyyy"
          name="dtStartProcess"
          onChange={changeDateStart}
        /> 
        <DatePickerUnform
          label={"Data de criação (Fim)"}
          selected={dateEnd}
          dateFormat="dd/MM/yyyy"
          name="dtEndProcess"
          onChange={changeDateEnd}
        />
        <Select
          name="complaintResponsible"
          scheme="secondary"
          isLoading={responsiblesLoading}
          options={responsiblesOptions}
          placeholder={"Responsável"}
        />

        <Select
          name="complaintType"
          scheme="secondary"
          isLoading={complaintTypesLoading}
          options={complaintTypesOptions}
          placeholder={"Tipo de complaint"}
        />
        <Select
          name="impactedArea"
          scheme="secondary"
          isLoading={impactedAreaLoading}
          options={impactedAreaOptions}
          placeholder={"Área impactada"}
        />
        <S.ItemWrapper>
          <S.ButtonSubmit>
            <S.Search size={24} />
            <S.MensagemClear>{t("management.message.search")}</S.MensagemClear>
          </S.ButtonSubmit>

          {!disabledFilter && (
            <S.ButtonFilter type="reset" onClick={clearFilter}>
              <S.CloseIcon />
              <S.MensagemClear>
                {t("management.message.clearSearch")}
              </S.MensagemClear>
            </S.ButtonFilter>
          )}
        </S.ItemWrapper>
      </S.FilterForm>
    </S.Container>
  );
});
