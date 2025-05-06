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
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
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
import { useTransfersExport } from "hooks/useExports";

import { TransferFilterActions } from "store/ducks/management/transfer";

const statusOptions = [
  {
    label: "ok",
    value: "ok",
  },
  {
    label: "divergente",
    value: "divergente",
  },
];

const defaultDate =
  moment().hours() < 13
    ? moment().locale("pt-br").subtract(1, "days").format("YYYY-MM-DD")
    : moment().locale("pt-br").format("YYYY-MM-DD");

export const TransferFilter = React.memo(() => {
  const formRef = useRef<FormHandles>(null);
  const { t } = useTranslation();
  const [dateStart, setDateStart] = useState<Date>(
    new Date(defaultDate + " 00:00")
  );
  const [dateEnd, setDateEnd] = useState<Date>(
    new Date(defaultDate + " 00:00")
  );

  const dispatch: AppDispatch = useDispatch();
  const resolver = React.useRef<(value: any) => void>();
  const { exportTransfers, loadingTransfersExport, progress } =
    useTransfersExport();

  const { data: products, loading: loadingProducts } = useSelector(
    (state: RootState) => state.snapshotProductsList
  );

  const { data: transferFilterData } = useSelector(
    (state: RootState) => state.transferFilterData
  );

  const { data: StorageLocationData, loading: loadingStorageLocation } =
    useSelector((state: RootState) => state.storageLocationIndex);

  const handleExport = useCallback(() => {
    exportTransfers(transferFilterData);
  }, [transferFilterData]);

  const productsOptions: SelectOption[] | undefined = React.useMemo(() => {
    if (!products) return;
    return products.map((product) => ({
      label: product.description,
      value: product.id,
    }));
  }, [products]);

  const storageLocationOptions: SelectOption[] | undefined = useMemo(() => {
    if (!StorageLocationData) return;
    return StorageLocationData.map((storageLocation) => ({
      label: storageLocation.code + " " + storageLocation.description,
      value: storageLocation.id,
    }));
  }, [StorageLocationData]);

  const loadProducts = React.useCallback(() => {
    dispatch(ProductsListActions.request());
  }, [dispatch]);

  const loadCompanies = React.useCallback(() => {
    dispatch(CompaniesListActions.request());
  }, [dispatch]);

  const loadStorageLocation = useCallback(() => {
    dispatch(StorageLocationIndexActions.request());
  }, [dispatch]);

  const changeDateStart = useCallback(
    (date: any) => {
      setDateStart(date);

      dispatch(
        TransferFilterActions.setFilterData({
          ...transferFilterData,
          startDate: format(new Date(date), "yyyy-MM-dd"),
        })
      );
    },
    [transferFilterData]
  );

  const changeDateEnd = useCallback(
    (date: any) => {
      setDateEnd(date);

      dispatch(
        TransferFilterActions.setFilterData({
          ...transferFilterData,
          endDate: format(new Date(date), "yyyy-MM-dd"),
        })
      );
    },
    [transferFilterData]
  );

  const filterDataChange = useCallback(
    (data: any) => {
      console.log(
        format(new Date(dateStart), "yyyy-MM-dd"),
        format(new Date(dateEnd), "yyyy-MM-dd")
      );
      dispatch(
        TransferFilterActions.setFilterData({
          ...transferFilterData,
          ...data,
          page: 1,
          endDate: format(new Date(dateEnd), "yyyy-MM-dd"),
          startDate: format(new Date(dateStart), "yyyy-MM-dd"),
        })
      );
    },
    [transferFilterData]
  );

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  useEffect(() => {
    loadStorageLocation();
  }, [loadStorageLocation]);

  const clearFilter = React.useCallback(() => {
    if (formRef.current) {
      formRef.current.setFieldValue("companyId", "");
      formRef.current.setFieldValue("productId", "");
      formRef.current.setFieldValue("storageLocationId", "");
      formRef.current.setFieldValue("batch", "");
      formRef.current.setFieldValue("status", "");
      TransferFilterActions.reset();

      dispatch(
        TransferFilterActions.setFilterData({
          limit: 5,
          page: 1,
          companyId: null,
          productId: null,
          batch: null,
          storageLocationId: null,
          startDate: format(new Date(dateStart), "yyyy-MM-dd"),
          endDate: format(new Date(dateEnd), "yyyy-MM-dd"),
        })
      );
    }
  }, [formRef, SnapshotDivergentFilterActions, dateStart, dateEnd]);

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
      <S.Container>
        <S.FilterForm ref={formRef} onSubmit={filterDataChange} placeholder="">
          <DatePickerUnform
            name="startDate"
            selected={dateStart}
            dateFormat="dd/MM/yyyy"
            onChange={changeDateStart}
          />
          <DatePickerUnform
            name="endDate"
            selected={dateEnd}
            dateFormat="dd/MM/yyyy"
            onChange={changeDateEnd}
          />
          <Select
            name="storageLocationId"
            scheme="secondary"
            isLoading={loadingStorageLocation}
            options={storageLocationOptions}
            placeholder={t("management.snapshot.snapshot.storageLocation")}
          />
          <AsyncSelect
            name="productId"
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
            placeholder={t("management.tracking.importacao.status")}
          />
          <S.Ghost />
          <S.ItemWrapper>
            <S.ButtonSubmit>
              <S.Search size={24} />
              <S.MensagemClear>
                {t("management.message.search")}
              </S.MensagemClear>
            </S.ButtonSubmit>
            {transferFilterData.batch ||
            transferFilterData.companyId ||
            transferFilterData.productId ||
            transferFilterData.status ||
            transferFilterData.storageLocationId ? (
              <S.ButtonFilter type="reset" onClick={clearFilter}>
                <S.CloseIcon />
                <S.MensagemClear>
                  {t("management.message.clearSearch")}
                </S.MensagemClear>
              </S.ButtonFilter>
            ) : null}
            <ExportExcel
              compact
              onExport={handleExport}
              loading={loadingTransfersExport}
              progress={progress}
            />
          </S.ItemWrapper>
        </S.FilterForm>
      </S.Container>
    </>
  );
});
