import { SelectOption, WithAddress } from 'contracts/Common';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import { ListStockRelatedCompaniesActions as MainActions } from 'store/ducks/stockManager';
import { Formatter } from 'utils';

interface FindCompanies {
  warehouseId?: unknown;
}

interface SelectOptionCompany extends SelectOption, WithAddress {}

export const useStockRelatedCompanies = () => {
  const dispatch: AppDispatch = useDispatch();

  const { data: companies, loading: loadingCompanies } = useSelector(
    (state: RootState) => state.listStockRelatedCompanies
  );

  const [options, setOptions] = useState<SelectOptionCompany[]>([]);

  const fetchCompanies = useCallback(
    (query?: FindCompanies): void => {
      dispatch(MainActions.request({ ...query }));
    },
    [dispatch]
  );

  const onCompaniesLoad = useCallback((): void => {
    setOptions(
      companies.map((item) => ({
        ...item,
        value: item.id,
        label: `${item.tradeName} - ${Formatter.document(item.document, item.documentType)}`,
      }))
    );
  }, [companies]);

  useEffect(() => {
    onCompaniesLoad();
  }, [onCompaniesLoad]);

  return {
    companies,
    companyOptions: options,
    loadingCompanies,
    fetchCompanies,
  };
};
