import type { FormHandles, SubmitHandler } from '@unform/core';
import { SelectOptions } from 'constants/Common';
import type { FindMany, SelectOption } from 'contracts/Common';
import { CompactSearch, CompactSelect, Input, Select } from 'components/Shared';
import { Form } from '@unform/web';
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

export interface FindStockOrders extends FindMany {
  companyId?: unknown;
  warehouseId?: unknown;
  withdrawalDateFrom?: string;
  withdrawalDateTo?: string;
  status?: string;
}

interface Props {
  onFilter?: (query: FindStockOrders) => void;
  currentFilter: FindStockOrders;
  delay?: number;
}

export const StockOrderFilters: React.FC<Props> = ({
  delay = 1000,
  currentFilter,
  onFilter,
}) => {
  const { profile, userBelongsToAnyOf } = useAuth();
  const { companyOptions, loadingCompanies, fetchCompanies } = useCompanies();
  const { warehouseOptions, loadingWarehouses, fetchWarehouses } =
    useWarehouses();

  const formRef = useRef<FormHandles>(null);
  const modalRef = useRef<FormHandles>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<FindStockOrders>({
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

  const formConfig = useCallback(
    (clear?: any) => {
      const autoSet: Array<keyof FindStockOrders> = [
        'withdrawalDateFrom',
        'withdrawalDateTo',
        'status',
        'warehouseId',
        'companyId',
      ];
      if (clear) {
        if (userBelongsToAnyOf('warehouseMember')) {
          for (const field of autoSet) {
            const noDelete = ['warehouseId'];
            if (!noDelete.includes(field)) {
              formRef.current?.clearField(field);
            }
          }
        } else if (userBelongsToAnyOf('companyMember')) {
          for (const field of autoSet) {
            const noDelete = ['companyId'];
            if (!noDelete.includes(field)) {
              formRef.current?.clearField(field);
            }
          }
        } else {
          formRef.current?.reset();
        }

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
          if (autoSet.includes(field as keyof FindStockOrders)) {
            modalRef.current?.setFieldValue(field, value);
          }
        }
      }
    },
    [modalOpen, userBelongsToAnyOf]
  );

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
              <Input
                label="Dt. Retirada de"
                name="withdrawalDateFrom"
                type="date"
              />
              <Input
                label="Dt. Retirada até"
                name="withdrawalDateTo"
                type="date"
              />
              <Select
                label="Status"
                name="status"
                options={SelectOptions.STATUS}
                isClearable
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

  const onSubmit = useCallback<SubmitHandler>((data) => {
    setFilters((state) => ({
      ...state,
      ...data,
      dirty: true,
    }));
    setModalOpen(false);
  }, []);

  const invokeOnFilter = useCallback((): void => {
    if (!filters.dirty || !onFilter) return;
    onFilter(filters);
  }, [filters, onFilter]);

  // throttled methods
  const onSearch = useMemo(
    () => throttle(handleSearch, delay),
    [delay, handleSearch]
  );

  useEffect(() => {
    invokeOnFilter();
  }, [invokeOnFilter]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    getWarehouses();
  }, [getWarehouses]);

  return (
    <S.Container>
      <Form ref={formRef} onSubmit={() => {}} className="filter">
        <CompactSelect
          name="warehouseId"
          placeholder="Armazéns"
          options={warehouseOptions}
          isLoading={loadingWarehouses}
          onChange={handleWarehouseChange}
          isClearable={!userBelongsToAnyOf('warehouseMember')}
        />
        <CompactSelect
          name="companyId"
          placeholder="Clientes"
          options={companyOptions}
          isLoading={loadingCompanies}
          onChange={handleCompanyChange}
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
