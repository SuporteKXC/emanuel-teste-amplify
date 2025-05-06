import React, { useCallback, useRef, useState } from "react";
import { format, subDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./styles";
import { FormHandles } from "@unform/core";
import { DatePickerUnform } from "components/shared/Forms/DatePickerUnform";
import { Select } from "components/shared";
import { useTranslation } from "react-i18next";
import * as HoverCard from "@radix-ui/react-hover-card";
import moment from "moment";
import "moment/locale/pt-br";

export const ChartFilter = React.memo((props: any) => {
  const formRef = useRef<FormHandles>(null);
  const { t } = useTranslation();

  const [dateStart, setDateStart] = useState<Date>(subDays(new Date(), 7));

  const [dateEnd, setDateEnd] = useState<Date>(new Date());

  const [stockDate, setStockDate] = useState<Date>(
    moment().hours() < 12
      ? moment().locale("pt-br").subtract(1, "days").toDate()
      : moment().locale("pt-br").toDate()
  );

  const [plantCode, setPlantCode] = useState<number | null>(null);
  const [bu, setBu] = useState<string | null>(null);

  const changeDateStart = useCallback((date: any) => {
    setDateStart(date);
  }, []);

  const changeDateEnd = useCallback((date: any) => {
    setDateEnd(date);
  }, []);

  const changeStockDate = useCallback((date: any) => {
    setStockDate(date);
  }, []);

  const changePlantCode = useCallback((plant: any) => {
    setPlantCode(plant.value);
  }, []);

  const changeBU = useCallback((bu: any) => {
    setBu(bu.value);
  }, []);

  const onSubmit = useCallback(() => {
    const startDateFormat = format(dateStart, "yyyy-MM-dd");
    const endDateFormat = format(dateEnd, "yyyy-MM-dd");
    const stockDateFormat = format(stockDate, "yyyy-MM-dd");

    const filters = {
      plantCode: plantCode,
      bu: bu,
      startDate: startDateFormat,
      endDate: endDateFormat,
      stockDate: stockDateFormat,
    };

    props.setFilters(filters);
  }, [dateStart, dateEnd, plantCode, bu, stockDate]);

  const clearFilter = useCallback(() => {
    if (formRef.current) {
      formRef.current.setFieldValue("bu", "BU");
      formRef.current.setFieldValue("plantCode", "Planta");
    }

    setDateStart(subDays(new Date(), 7));
    setDateEnd(new Date());
    setStockDate(subDays(new Date(), 1));
    setPlantCode(null);
    setBu(null);

    const startDateFormat = format(dateStart, "yyyy-MM-dd");
    const endDateFormat = format(dateEnd, "yyyy-MM-dd");

    const filters = {
      plantCode: plantCode,
      bu: bu,
      startDate: startDateFormat,
      endDate: endDateFormat,
    };

    props.fetchOrigin(filters);
    props.fetchBusinessUnit(filters);
  }, [formRef]);

  return (
    <S.Container>
      <S.FilterForm ref={formRef} onSubmit={onSubmit} placeholder="">
        <DatePickerUnform
          selected={dateStart}
          dateFormat="dd/MM/yyyy"
          name="plantDeliveryDateStart"
          onChange={changeDateStart}
        />
        <DatePickerUnform
          selected={dateEnd}
          dateFormat="dd/MM/yyyy"
          name="plantDeliveryDateEnd"
          onChange={changeDateEnd}
        />
        <Select
          name="bu"
          scheme="secondary"
          options={props.buOptions}
          placeholder="BU"
          onChange={changeBU}
        />
        <Select
          name="plantCode"
          scheme="secondary"
          options={props.plantOptions}
          placeholder="Planta"
          onChange={changePlantCode}
        />
        <DatePickerUnform
          selected={stockDate}
          dateFormat="dd/MM/yyyy"
          name="stockDate"
          onChange={changeStockDate}
        />
        <HoverCard.Root>
          <HoverCard.Trigger asChild>
            <S.QuestionIcon />
          </HoverCard.Trigger>
          <HoverCard.Portal>
            <S.HoverCardContent sideOffset={5}>
              <p>
                O filtro no campo ao lado representa a data do estoque e é
                utilizado para calcular a classificação ABC final.
              </p>
            </S.HoverCardContent>
          </HoverCard.Portal>
        </HoverCard.Root>
        <S.ItemWrapper>
          <S.ButtonSubmit>
            <S.Search size={24} />
            <S.MensagemClear>{t("management.message.search")}</S.MensagemClear>
          </S.ButtonSubmit>
          {(plantCode || bu) && (
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
