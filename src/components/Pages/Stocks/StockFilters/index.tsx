import type { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { CompactSearch, CompactSelect, Input } from 'components/Shared';
import type { FindMany, SelectOption } from 'contracts/Common';
import { useAuth, useCompanies, useWarehouses } from 'hooks';
import { throttle } from 'lodash';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as S from './styles';

export interface FindStocks extends FindMany {
  companyId?: unknown;
  warehouseId?: unknown;
  batch?: string | unknown;
  invoiceNumber?: string | unknown;
  manufacturingDateFrom?: string | unknown;
  manufacturingDateTo?: string | unknown;
  expirationDateFrom?: string | unknown;
  expirationDateTo?: string | unknown;
  entranceDateFrom?: string | unknown;
  entranceDateTo?: string | unknown;
  contractDescription?: string | unknown;
  dueDateFrom?: string | unknown;
  dueDateTo?: string | unknown;
}

interface Props {
  onFilter?: (query: FindStocks) => void;
  currentFilter: FindStocks;
  delay?: number;
}

const autoSet: Array<keyof FindStocks> = [
  'search',
  'batch',
  'invoiceNumber',
  'entranceDateFrom',
  'entranceDateTo',
  'expirationDateFrom',
  'expirationDateTo',
  'manufacturingDateFrom',
  'manufacturingDateTo',
  'contractDescription',
  'dueDateFrom',
  'dueDateTo',
  'warehouseId',
  'companyId',
];

export const StockFilters: React.FC<Props> = ({
  delay = 1000,
  currentFilter,
  onFilter,
}) => {
  const { profile, userBelongsToAnyOf } = useAuth();
  const { companyOptions, loadingCompanies, fetchCompanies } = useCompanies();
  const { warehouseOptions, loadingWarehouses, fetchWarehouses } =
    useWarehouses();
  const modalRef = useRef<FormHandles>(null);
  const formRef = useRef<FormHandles>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<FindStocks>({
    ...currentFilter,
    dirty: false,
  });

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setFilters((state) => ({
        ...state,
        dirty: true,
        search: e.target.value,
      }));
    },
    []
  );

  const formConfig = useCallback(
    (clear?: any) => {
      if (clear) {
        formRef.current?.reset();
        modalRef.current?.reset();

        const filterModal = modalRef.current?.getData();

        setFilters((state) => ({
          ...state,
          ...filterModal,
          search: '',
          warehouseId: '',
          companyId: '',
          dirty: true,
        }));

        setModalOpen(false);
      } else {
        for (const [field, value] of Object.entries(filters)) {
          if (autoSet.includes(field as keyof FindStocks)) {
            modalRef.current?.setFieldValue(field, value);
          }
        }
      }
    },
    [modalOpen, userBelongsToAnyOf]
  );

  const onSubmit = useCallback<SubmitHandler>((data) => {
    setFilters((state) => ({
      ...state,
      ...data,
      dirty: true,
    }));
    setModalOpen(false);
  }, []);

  const handleCompanyChange = useCallback(
    (option: SelectOption | null): void => {
      setFilters((state) => ({
        ...state,
        dirty: true,
        companyId: option?.value,
      }));
    },
    []
  );

  const handleWarehouseChange = useCallback(
    (option: SelectOption | null): void => {
      setFilters((state) => ({
        ...state,
        dirty: true,
        warehouseId: option?.value,
      }));
    },
    []
  );

  const invokeOnFilter = useCallback((): void => {
    if (!filters.dirty || !onFilter) return;

    onFilter(filters);
  }, [filters, onFilter]);

  // throttled methods
  const onSearch = useMemo(
    () => throttle(handleSearch, delay),
    [delay, handleSearch]
  );

  const onCompanyChange = useMemo(
    () => throttle(handleCompanyChange, delay),
    [delay, handleCompanyChange]
  );

  const onWarehouseChange = useMemo(
    () => throttle(handleWarehouseChange, delay),
    [delay, handleWarehouseChange]
  );

  const getWarehouses = useCallback(() => {
    if (profile?.company && !profile.root) {
      fetchWarehouses({
        havingStock: true,
        relatedCompany: true,
        companyId: profile.company.id,
      });
    } else {
      fetchWarehouses({ havingStock: true });
    }
  }, [fetchWarehouses, profile]);

  useEffect(() => {
    invokeOnFilter();
  }, [invokeOnFilter]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    getWarehouses();
  }, [getWarehouses]);

  useEffect(() => {
    modalOpen && formConfig();
  }, [formConfig]);

  const FilterModal = useCallback((): JSX.Element => {
    return (
      <S.ModalBackground isOpen={modalOpen}>
        <S.ModalContainer>
          <S.FormPageHeader title="Filtrar" icon={<S.IconFilter />} />
          <Form ref={modalRef} onSubmit={onSubmit} onReset={formConfig}>
            <S.FormRow>
              <Input label="Número NF" name="invoiceNumber" />
              <Input label="Lote" name="batch" />
              <Input label="Contrato" name="contractDescription" />
            </S.FormRow>
            <S.FormRow>
              <Input
                label="Dt. Fabricação de"
                name="manufacturingDateFrom"
                type="date"
              />
              <Input
                label="Dt. Fabricação até"
                name="manufacturingDateTo"
                type="date"
              />
              <Input
                label="Dt. Vencimento de"
                name="expirationDateFrom"
                type="date"
              />
              <Input
                label="Dt. Vencimento até"
                name="expirationDateTo"
                type="date"
              />
            </S.FormRow>
            <S.FormRow>
              <Input
                label="Dt. Entrada de"
                name="entranceDateFrom"
                type={'date'}
              />
              <Input
                label="Dt. Entrada até"
                name="entranceDateTo"
                type={'date'}
              />
              <Input
                label="Dt. Vencimento AG de"
                name="dueDateFrom"
                type={'date'}
              />
              <Input
                label="Dt. Vencimento AG até"
                name="dueDateTo"
                type={'date'}
              />
            </S.FormRow>
            <S.FormActions>
              <S.Button type="submit">Filtrar</S.Button>
              <S.Button mood="light" onClick={() => setModalOpen(false)}>
                Cancelar
              </S.Button>
              <S.Button type="reset" mood="danger">
                Limpar Filtro
              </S.Button>
            </S.FormActions>
          </Form>
        </S.ModalContainer>
      </S.ModalBackground>
    );
  }, [modalOpen]);

  return (
    <S.Container>
      <Form ref={formRef} onSubmit={() => {}} className="filter">
        <CompactSelect
          name="warehouseId"
          placeholder="Armazéns"
          options={warehouseOptions}
          isLoading={loadingWarehouses}
          onChange={onWarehouseChange}
          isClearable
        />
        <CompactSelect
          name="companyId"
          placeholder="Clientes"
          options={companyOptions}
          isLoading={loadingCompanies}
          onChange={onCompanyChange}
          isClearable
        />
        <CompactSearch
          onChange={onSearch}
          defaultValue={filters?.search}
          placeholder="Buscar"
          name="search"
        />
        <S.ButtonFilter onClick={() => setModalOpen(true)}>
          <S.IconFilter />
        </S.ButtonFilter>
      </Form>
      <FilterModal />
    </S.Container>
  );
};
