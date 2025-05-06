import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./styles";
import { Select } from "components/shared";
import { DatePicker } from "components/shared/Forms/DatePicker";
import { SnapshotListQuery } from "contracts/management";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/locale/pt-br";
import { CompaniesListActions } from "store/ducks/management/companies";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { SelectOption } from "contracts";
import { ProductsListActions } from "store/ducks/management/products";
import { AsyncSelect } from "components/shared/Forms/AsyncSelect";
import { FormHandles } from "@unform/core";
import ExportExcel from "components/shared/ExportExcel";
import { useSnapshotExport } from "hooks/useExports";
import { SnapshotFilterActions } from "store/ducks/management";
import { format } from "date-fns";
import { InputJust } from "../../../../shared/Forms/InputJust";
import { DatePickerUnform } from "components/shared/Forms/DatePickerUnform";
import { StorageLocationIndexActions } from "store/ducks/management/storageLocation";

export const SnapshotFilter = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const resolver = useRef<(value: any) => void>();

  const defaultDate =
    moment().hours() < 12
      ? moment().locale("pt-br").subtract(1, "days").format("YYYY-MM-DD")
      : moment().locale("pt-br").format("YYYY-MM-DD");

  const [snapshotDate, setSnapshotDate] = useState<Date>(
    new Date(defaultDate + " 00:00")
  );

  const statusOptions = [
    { label: "OK", value: "ok" },
    { label: "DIVERGENTE", value: "divergente" },
  ];

  const { exportSnapshot, loadingSnapshotExport, progress } =
    useSnapshotExport();

  const { data: companies, loading: loadingCompanies } = useSelector(
    (state: RootState) => state.companiesList
  );

  const { data: products, loading: loadingProducts } = useSelector(
    (state: RootState) => state.snapshotProductsList
  );

  const { data: snapshotFilterData } = useSelector(
    (state: RootState) => state.snapshotFilterData
  );

  const { data: StorageLocationData, loading: loadingStorageLocation } =
    useSelector((state: RootState) => state.storageLocationIndex);

  const companiesOptions: SelectOption[] | undefined = useMemo(() => {
    if (!companies) return;
    return companies.map((company) => ({
      label: company?.plantCode ?? "---",
      value: company.id,
    }));
  }, [companies]);

  const productsOptions: SelectOption[] | undefined = useMemo(() => {
    if (!products) return;
    return products.map((product) => ({
      label: product.description + " " + product.code,
      value: product.id,
    }));
  }, [products]);

  const storageLocationOptions: SelectOption[] | undefined = useMemo(() => {
    if (!StorageLocationData) return;
    return StorageLocationData.map((storageLocation: any) => ({
      label:
        storageLocation.company?.plantCode ??
        "---" + " - " + storageLocation.code,
      value: storageLocation.id,
    }));
  }, [StorageLocationData]);

  // const formRef = React.useRef(null);
  const formRef = useRef<FormHandles>(null);

  const changeDate = useCallback(
    (date: any) => {
      setSnapshotDate(date);

      dispatch(
        SnapshotFilterActions.setFilterData({
          ...snapshotFilterData,
          page: 1,
          date: format(new Date(date), "yyyy-MM-dd"),
        })
      );
    },
    [SnapshotFilterActions, snapshotFilterData]
  );

  // const changePlant = React.useCallback((opt: any) => {
  //   setFilter((prev) => ({ ...prev, companyId: opt.value }));
  // }, []);

  // const changeStatus = React.useCallback((opt: any) => {
  //   setFilter((prev) => ({ ...prev, status: opt?.value }));
  // }, []);

  // const changeProduct = React.useCallback((opt: any) => {
  //   setFilter((prev) => ({ ...prev, productId: opt?.value }));
  // }, []);

  // const changeBatch = React.useCallback(
  //   ({ target }: React.ChangeEvent<HTMLInputElement>) => {
  //     setFilter((prev) => ({ ...prev, batch: target.value }));
  //   },
  //   []
  // );

  const handleExport = React.useCallback(
    () => exportSnapshot(snapshotFilterData),
    [snapshotFilterData]
  );

  const loadCompanies = useCallback(() => {
    dispatch(CompaniesListActions.request());
  }, [dispatch]);

  const loadProducts = useCallback(() => {
    dispatch(ProductsListActions.request());
  }, [dispatch]);

  const loadStorageLocation = useCallback(() => {
    dispatch(StorageLocationIndexActions.request());
  }, [dispatch]);

  const filterDateInicial = useCallback(() => {
    dispatch(
      SnapshotFilterActions.setFilterData({
        ...snapshotFilterData,
        date: defaultDate,
      })
    );
  }, []);

  const filterDataChange = useCallback((data: any) => {
    dispatch(
      SnapshotFilterActions.setFilterData({
        ...snapshotFilterData,
        ...data,
        date: format(data.date, "yyyy-MM-dd"),
      })
    );
  }, []);

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    loadStorageLocation();
  }, [loadStorageLocation]);

  useEffect(() => {
    filterDateInicial();
  }, []);

  const clearFilter = useCallback(() => {
    if (formRef.current) {
      formRef.current.setFieldValue("company_id", "");
      formRef.current.setFieldValue("product_id", "");
      formRef.current.setFieldValue("storage_location_id", "");
      formRef.current.setFieldValue("batch", "");
      SnapshotFilterActions.reset();
      dispatch(
        SnapshotFilterActions.setFilterData({
          limit: 5,
          page: 1,
          company_id: null,
          product_id: null,
          storage_location_id: null,
          batch: null,
          date: format(new Date(snapshotDate), "yyyy-MM-dd"),
        })
      );
    }
  }, [formRef, SnapshotFilterActions, snapshotDate]);

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

  return (
    <>
      <S.Container>
        <S.FilterForm ref={formRef} onSubmit={filterDataChange} placeholder="">
          <DatePickerUnform
            selected={snapshotDate}
            dateFormat="dd/MM/yyyy"
            name="date"
            onChange={changeDate}
          />
          {/* <Select
            name="company_id"
            scheme="secondary"
            isLoading={loadingCompanies}
            options={companiesOptions}
            placeholder={t("management.snapshot.snapshot.planta")}
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
            defaultOptions={productsOptions}
            isLoading={loadingProducts}
            minMenuHeight={500}
            cacheOptions
            isClearable
          />
          <InputJust
            name="batch"
            placeholder={t("management.snapshot.snapshot.lote")}
          />
          <Select
            name="status"
            scheme="secondary"
            options={statusOptions}
            placeholder={t("management.snapshot.snapshot.status")}
          />
          <S.Ghost />
         <S.ItemWrapper>
          <S.ButtonSubmit>
            <S.Search size={30} />
            <S.MensagemClear>{t("management.message.search")}</S.MensagemClear>
          </S.ButtonSubmit>
            {snapshotFilterData.batch ||
            snapshotFilterData.company_id ||
            snapshotFilterData.product_id ||
            snapshotFilterData.status ||
            snapshotFilterData.storage_location_id ? (
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
          <ExportExcel
            loading={loadingSnapshotExport}
            progress={progress}
            onExport={handleExport}
            compact
          />
        </S.DownloadWrapper>
        </S.FilterForm>
      </S.Container>
    </>
  );
};
