import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { format, subDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./styles";
import { SelectOption } from "contracts";
import { Select } from "components/shared";
// import { DatePicker } from "components/shared/Forms/DatePicker";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { IImportFilter, ImportFilterActions } from "store/ducks/management";
import { ProductsListActions } from "store/ducks/management/products";
import { InputJust } from "components/shared/Forms/InputJust";
import { STATUS } from "contracts/management";
import { FormHandles } from "@unform/core";
import { DatePickerUnform } from "components/shared/Forms/DatePickerUnform";
import ExportExcel from "components/shared/ExportExcel";
import { useImportTrackingExport } from "hooks/useExports";
import { AsyncSelect } from "components/shared/Forms/AsyncSelect";
import { CompaniesListActions } from "@/store/ducks/management/companies";

const statusOptions = Object.entries(STATUS).map(([value, label]) => ({
  label,
  value,
}));

export const ImportFilter = React.memo((props: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const formRef = useRef<FormHandles>(null);
  const resolver = useRef<(value: any) => void>();
  const { data: importFilterData } = useSelector(
    (state: RootState) => state.importFilterData
  );
  const { data: products } = useSelector(
    (state: RootState) => state.snapshotProductsList
  );
  const { data: companies } = useSelector(
    (state: RootState) => state.companiesList
  );
  const { exportImport, loadingImportExport, progress } =
    useImportTrackingExport();

  const [dateStart, setDateStart] = useState<Date>(
    importFilterData.plantDeliveryDateStart
      ? new Date(`${importFilterData.plantDeliveryDateStart} 00:00:00`)
      : subDays(new Date(), 365)
  );
  const [dateEnd, setDateEnd] = useState<Date>(
    importFilterData.plantDeliveryDateEnd
      ? new Date(`${importFilterData.plantDeliveryDateEnd} 00:00:00`)
      : new Date()
  );

  const disabledFilter = Object.keys(importFilterData)
    .filter(
      (key) =>
        ![
          "limit",
          "page",
          "plantDeliveryDateStart",
          "plantDeliveryDateEnd",
        ].includes(key)
    )
    .every((key) => importFilterData[key as keyof IImportFilter] == null);

  const filterDataChange = useCallback(
    (data: any) => {
      dispatch(
        ImportFilterActions.setFilterData({
          ...importFilterData,
          ...data,
          forComplaint: false,
          page: 1,
          plantDeliveryDateStart: format(
            data.plantDeliveryDateStart,
            "yyyy-MM-dd"
          ),
          plantDeliveryDateEnd: format(data.plantDeliveryDateEnd, "yyyy-MM-dd"),
        })
      );
    },
    [importFilterData]
  );

  const loadProducts = useCallback(() => {
    dispatch(ProductsListActions.request());
  }, [dispatch]);

  const loadPlants = useCallback(() => {
    dispatch(CompaniesListActions.request());
  }, [dispatch]);

  const productsOptions: SelectOption[] | undefined = useMemo(() => {
    if (!products) return;
    return products.map((product) => ({
      label: product.description + " " + product.code,
      value: product.id,
    }));
  }, [products]);

  const companiesOptions: SelectOption[] | undefined = useMemo(() => {
    if (!companies) return;
    return companies.map((company) => ({
      label: company.nameFantasy,
      value: company.id,
    }));
  }, [companies]);

  const searchProducts = useCallback(
    (search?: string) => {
      if (!search) return Promise.resolve([]);
      dispatch(ProductsListActions.request({ search }));
      return new Promise<SelectOption[]>((resolve) => {
        resolver.current = resolve;
        resolver.current(productsOptions);
      });
    },
    [dispatch, productsOptions]
  );

  const changeDateStart = useCallback(
    (date: any) => {
      setDateStart(date);

      dispatch(
        ImportFilterActions.setFilterData({
          ...importFilterData,
          plantDeliveryDateStart: format(new Date(date), "yyyy-MM-dd"),
        })
      );
    },
    [importFilterData]
  );

  const changeDateEnd = useCallback(
    (date: any) => {
      setDateEnd(date);

      dispatch(
        ImportFilterActions.setFilterData({
          ...importFilterData,
          plantDeliveryDateEnd: format(new Date(date), "yyyy-MM-dd"),
        })
      );
    },
    [importFilterData]
  );

  const clearFilter = useCallback(() => {
    if (formRef.current) {
      formRef.current.setFieldValue("productId", "");
      formRef.current.setFieldValue("storageLocationId", "");
      formRef.current.setFieldValue("batch", "");
      formRef.current.setFieldValue("status", "");
      formRef.current.setFieldValue("invoice", "");
      formRef.current.setFieldValue("po", "");
      ImportFilterActions.reset();
      dispatch(
        ImportFilterActions.setFilterData({
          limit: 5,
          page: 1,
          companyId: null,
          productId: null,
          storageLocationId: null,
          batch: null,
          invoice: null,
          po: null,
          plantDeliveryDateStart: format(new Date(dateStart), "yyyy-MM-dd"),
          plantDeliveryDateEnd: format(new Date(dateEnd), "yyyy-MM-dd"),
        })
      );
    }
  }, [formRef, ImportFilterActions, dateStart, dateEnd]);

  const handleExport = React.useCallback(() => {
    exportImport({ ...importFilterData, page: 1 });
  }, [importFilterData]);

  useEffect(() => {
    loadProducts();
    loadPlants();
  }, []);

  return (
    <S.Container>
      <S.FilterForm ref={formRef} onSubmit={filterDataChange} placeholder="">
        <DatePickerUnform
          selected={dateStart}
          label={'Data de registro (Início)'}
          dateFormat="dd/MM/yyyy"
          name="plantDeliveryDateStart"
          onChange={changeDateStart}
          minDate={new Date("2023-08-16 12:00:00")}
        />
        <DatePickerUnform
          selected={dateEnd}
          label={'Data de registro (Fim)'}
          dateFormat="dd/MM/yyyy"
          name="plantDeliveryDateEnd"
          onChange={changeDateEnd}
          minDate={new Date("2023-08-16 12:00:00")}
        />
         <InputJust
          name="po"
          placeholder={t("management.tracking.importacao.po")}
        />
        <InputJust
          name="invoice"
          placeholder={t("management.tracking.importacao.notafiscal")}
        />
        <InputJust
          name="batch"
          placeholder={t("management.tracking.importacao.lote")}
        />
        <AsyncSelect
          name="companyId"
          label=""
          menuPlacement="bottom"
          defaultOptions={companiesOptions}
          minMenuHeight={500}
          cacheOptions
          isClearable
          placeholder={t("management.tracking.importacao.planta")}
        />
        <AsyncSelect
          name="productId"
          label=""
          menuPlacement="top"
          loadOptions={searchProducts}
          defaultOptions={productsOptions}
          minMenuHeight={500}
          cacheOptions
          isClearable
          placeholder={t("management.tracking.importacao.produto")}
        />
        <Select
          name="status"
          scheme="secondary"
          options={statusOptions}
          placeholder={t("management.tracking.importacao.status")}
        />
        <S.ItemWrapper>
          <S.ButtonSubmit>
            <S.Search size={30} />
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
        <div />
        <div />
        <S.DownloadWrapper>
          <ExportExcel
            onExport={handleExport}
            loading={loadingImportExport}
            progress={progress}
          />
        </S.DownloadWrapper>
      </S.FilterForm>
    </S.Container>
  );
});
