import { SelectOption } from 'contracts/Common';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import { ListCompaniesActions } from 'store/ducks/companies';
import { Formatter } from 'utils';

export const useCompanies = () => {
  const dispatch: AppDispatch = useDispatch();

  const { data: companies, loading: loadingCompanies } = useSelector(
    (state: RootState) => state.listCompanies
  );

  const [options, setOptions] = useState<SelectOption[]>([]);

  const fetchCompanies = useCallback((): void => {
    dispatch(ListCompaniesActions.request());
  }, [dispatch]);

  const onCompaniesLoad = useCallback((): void => {
    setOptions(
      companies.map(({ id, tradeName, documentType, document }) => ({
        value: id,
        label: `${tradeName} - ${Formatter.document(document, documentType)}`,
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

export type CompaniesHook = ReturnType<typeof useCompanies>;
