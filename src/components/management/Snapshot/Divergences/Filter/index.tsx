import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./styles";
import { Select } from "components/shared";
import { DropdownMenu } from "components/shared/DropdownMenu";
import { DivergenceModal } from "../DivergenceModal";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { JustificationSnapshotTypesListActions } from "store/ducks/management/justificationSnapshotTypes";
import { AsyncSelect } from "components/shared/Forms/AsyncSelect";
import { ProductsListActions } from "store/ducks/management/products";
import { SelectOption } from "contracts";
import { CompaniesListActions } from "store/ducks/management/companies";
import moment from "moment";
import "moment/locale/pt-br";
import { SnapshotDivergentFilterActions } from "store/ducks/management/snapshotDivergent/filterSnapshotDivergent";
import { InputJust } from "components/shared/Forms/InputJust";
import { DatePickerUnform } from "components/shared/Forms/DatePickerUnform";
import { format } from "date-fns";
import { FormHandles } from "@unform/core";
import { StorageLocationIndexActions } from "store/ducks/management/storageLocation";
import ExportExcel from "components/shared/ExportExcel";
import { useDivergenceExport } from "hooks/useExports";

export const DivergenceFilter = React.memo(() => {
  const [open, setOpen] = useState<boolean>(false);
  const formRef = useRef<FormHandles>(null);
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const resolver = React.useRef<(value: any) => void>();
  const {
    exportDivergence,
    loadingDivergenceExport: loading,
    progress,
  } = useDivergenceExport();

  const { data: products, loading: loadingProducts } = useSelector(
    (state: RootState) => state.snapshotProductsList
  );

  const { data: companies, loading: loadingCompanies } = useSelector(
    (state: RootState) => state.companiesList
  );

  const {
    data: justificationSnapshotTypeData,
    loading: justificationSnapshotTypeLoading,
  } = useSelector((state: RootState) => state.justificationSnapshotTypeList);

  const { data: snapshotDivergentFilterData } = useSelector(
    (state: RootState) => state.snapshotDivergentFilterData
  );

  const { data: StorageLocationData, loading: loadingStorageLocation } =
    useSelector((state: RootState) => state.storageLocationIndex);

  const defaultDate =
    moment().hours() < 13
      ? moment().locale("pt-br").subtract(1, "days").format("YYYY-MM-DD")
      : moment().locale("pt-br").format("YYYY-MM-DD");

  const [snapshotDate, setSnapshotDate] = React.useState<Date>(
    new Date(defaultDate + " 00:00")
  );

  const handleModal = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleExport = useCallback(() => {
    exportDivergence(snapshotDivergentFilterData);
  }, [snapshotDivergentFilterData]);

  const dropDownOptions = [
    {
      title: t("management.snapshot.divergencias.justificar"),
      action: handleModal,
    },
  ];

  const productsOptions: SelectOption[] | undefined = React.useMemo(() => {
    if (!products) return;
    return products.map((product) => ({
      label: product.description,
      value: product.id,
    }));
  }, [products]);

  const companiesOptions: SelectOption[] | undefined = React.useMemo(() => {
    if (!companies) return;
    return companies.map((company) => ({
      label: company?.plantCode ?? "---",
      value: company.id,
    }));
  }, [companies]);

  const justificationOptions: SelectOption[] | undefined = React.useMemo(() => {
    if (!justificationSnapshotTypeData) return;
    return justificationSnapshotTypeData.map((justification) => ({
      label: justification.name,
      value: justification.id,
    }));
  }, [justificationSnapshotTypeData]);

  const storageLocationOptions: SelectOption[] | undefined = useMemo(() => {
    if (!StorageLocationData) return;
    return StorageLocationData.map((storageLocation: any) => ({
      label:
        storageLocation.company?.plantCode ??
        "---" + " - " + storageLocation.code,
      value: storageLocation.id,
    }));
  }, [StorageLocationData]);

  const fetchJustificationSnapshotTypes = useCallback(() => {
    dispatch(JustificationSnapshotTypesListActions.request());
  }, [dispatch]);

  const loadProducts = React.useCallback(() => {
    dispatch(ProductsListActions.request());
  }, [dispatch]);

  const loadCompanies = React.useCallback(() => {
    dispatch(CompaniesListActions.request());
  }, [dispatch]);

  const loadStorageLocation = useCallback(() => {
    dispatch(StorageLocationIndexActions.request());
  }, [dispatch]);

  const filterDateInicial = useCallback(() => {
    dispatch(
      SnapshotDivergentFilterActions.setFilterData({
        ...snapshotDivergentFilterData,
        date: defaultDate,
      })
    );
  }, [snapshotDivergentFilterData]);

  const changeDate = useCallback(
    (date: any) => {
      setSnapshotDate(date);

      dispatch(
        SnapshotDivergentFilterActions.setFilterData({
          ...snapshotDivergentFilterData,
          page: 1,
          date: format(new Date(date), "yyyy-MM-dd"),
        })
      );
    },
    [SnapshotDivergentFilterActions, snapshotDivergentFilterData]
  );

  const filterDataChange = useCallback(
    (data: any) => {
      dispatch(
        SnapshotDivergentFilterActions.setFilterData({
          ...snapshotDivergentFilterData,
          ...data,
          page: 1,
          date: format(new Date(data.date), "yyyy-MM-dd"),
        })
      );
    },
    [snapshotDivergentFilterData]
  );

  useEffect(() => {
    fetchJustificationSnapshotTypes();
  }, [fetchJustificationSnapshotTypes]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  useEffect(() => {
    loadStorageLocation();
  }, [loadStorageLocation]);

  useEffect(() => {
    filterDateInicial();
  }, []);

  const clearFilter = React.useCallback(() => {
    if (formRef.current) {
      formRef.current.setFieldValue("company_id", "");
      formRef.current.setFieldValue("product_id", "");
      formRef.current.setFieldValue("storage_location_id", "");
      formRef.current.setFieldValue("batch", "");
      formRef.current.setFieldValue("justification_id", "");
      SnapshotDivergentFilterActions.reset();

      dispatch(
        SnapshotDivergentFilterActions.setFilterData({
          limit: 5,
          page: 1,
          company_id: null,
          product_id: null,
          batch: null,
          date: format(new Date(snapshotDate), "yyyy-MM-dd"),
        })
      );
    }
  }, [formRef, SnapshotDivergentFilterActions, snapshotDate]);

  const searchProducts = React.useCallback(
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

  return (
    <>
      <DivergenceModal isOpen={open} onClickOutside={handleModal} />
      <S.Container>
        <S.FilterForm ref={formRef} onSubmit={filterDataChange} placeholder="">
          {/* <DatePicker
            selected={snapshotDate}
            dateFormat="dd/MM/yyyy"
            name="date"
            onChange={changeDate}
          /> */}
          <DatePickerUnform
            name="date"
            selected={snapshotDate}
            dateFormat="dd/MM/yyyy"
            onChange={changeDate}
          />
          {/* <InputJust
            name="date"
            type="date"
          /> */}
          {/* <Select
            name="company_id"
            scheme="secondary"
            isLoading={loadingCompanies}
            options={companiesOptions}
            placeholder={t("management.snapshot.snapshot.planta")}
            // onChange={changePlant}
          /> */}
          <Select
            name="storage_location_id"
            scheme="secondary"
            isLoading={loadingStorageLocation}
            options={storageLocationOptions}
            placeholder={t("management.snapshot.snapshot.storageLocation")}
          />
          <AsyncSelect
            name="product_id"
            label=""
            placeholder={t("management.snapshot.snapshot.produto")}
            menuPlacement="top"
            loadOptions={searchProducts}
            // onChange={changeProduct}
            defaultOptions={productsOptions}
            isLoading={loadingProducts}
            minMenuHeight={500}
            cacheOptions
            isClearable
          />
          {/* <Input
            name="batch"
            label={t("management.snapshot.snapshot.lote")}
          /> */}
          <InputJust
            name="batch"
            placeholder={t("management.snapshot.snapshot.lote")}
          />
          <Select
            name="justification_id"
            scheme="secondary"
            options={justificationOptions}
            isLoading={justificationSnapshotTypeLoading}
            placeholder={t("management.snapshot.divergencias.justificativa")}
          />
          <S.Ghost />
          <S.ItemWrapper>
            <S.ButtonSubmit>
              <S.Search size={30} />
              <S.MensagemClear>
                {t("management.message.search")}
              </S.MensagemClear>
            </S.ButtonSubmit>
            {snapshotDivergentFilterData.batch ||
            snapshotDivergentFilterData.company_id ||
            snapshotDivergentFilterData.justification_id ||
            snapshotDivergentFilterData.product_id ||
            snapshotDivergentFilterData.storage_location_id ? (
              <S.ButtonFilter type="reset" onClick={clearFilter}>
                <S.CloseIcon />
                <S.MensagemClear>
                  {t("management.message.clearSearch")}
                </S.MensagemClear>
              </S.ButtonFilter>
            ) : null}
          </S.ItemWrapper>
          <div />
          <div />
          <div />
          <S.DownloadWrapper>
            <ExportExcel compact onExport={handleExport} loading={loading} />
            <S.DropWrapper>
              <DropdownMenu options={dropDownOptions} />
            </S.DropWrapper>
          </S.DownloadWrapper>
        </S.FilterForm>
      </S.Container>
    </>
  );
});
