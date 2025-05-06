import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreditHistoryActions, ExportCreditHistoriesActions } from 'store/ducks';
import * as S from './styles';
import type { AppDispatch, RootState } from 'store';
import { useTranslation } from 'react-i18next';
import { Paginator } from 'components';
import { ICreditHistory } from "contracts";
import ExportExcel from 'components/shared/ExportExcel';
import { exportToCSV } from 'utils';
import { CreditHistoriesFilter } from 'components/comex/Config/CreditHistoriesFilter';

export const ListCreditHistory: React.FC = () => {
  const { i18n,t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const [isUpdatingSet, setIsUpdatingSet] = useState(new Set());
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: creditHistoriesData, meta, loading } = useSelector(
    (state: RootState) => state.creditHistories
  );
  
  const { data: filterData } = useSelector(
    (state: RootState) => state.creditHistoriesFilterData
  )
  
  const { loading: exportLoading } = useSelector(
    (state: RootState) => state.exportCreditHistories
  );

  const fetchCreditHistories = useCallback(() => {
    dispatch(CreditHistoryActions.request(filterData, onSuccess))
  }, [dispatch, filterData]);

  const onSuccess = useCallback(() => setIsUpdatingSet(new Set()), [])

  useEffect(() => fetchCreditHistories(), [filterData]);
  
  const handlePageChange = useCallback((page: number) => {
    dispatch(CreditHistoryActions.request({ ...filterData, page }));
  }, [dispatch, filterData]);
  
  const generateFile = useCallback(
    (exportCreditHistories: { data: ICreditHistory[] }) => {
      if (!exportCreditHistories) return;

      const fileName = `Credit-histories ${new Date().toLocaleDateString(
        i18n.language,
        {
          day: '2-digit',
          month: '2-digit',
        }
      )}`;

      const exportFile = exportCreditHistories?.data.map((creditHistory) => ({
        [t(`settings.creditHistory.exportation.RegisterDate`)]: creditHistory.created_at
          ? new Date(creditHistory.created_at).toLocaleDateString()
          : '-',
        [t(`settings.creditHistory.exportation.ServiceType`)]: creditHistory.service_type?.description,
        [t(`settings.creditHistory.exportation.UserName`)]: creditHistory.user?.name,
        [t(`settings.creditHistory.exportation.CreditCharged`)]: creditHistory?.credit_charged
      }));

      exportToCSV(exportFile, fileName);
    },
    [i18n.language]
  );
  
  const fetchExportCreditHistories = useCallback(() => {
    dispatch(ExportCreditHistoriesActions.request({
        ...filterData,
        limit: 'undefined',
    }, generateFile));
  }, [filterData, generateFile]);
  
  return (
    <>
      <S.PageHeader>
        <S.MoneyCheckIcon height='24px' />
        <div>{t('comex.settings.creditHistory.title')}</div>
        <S.ButtonWrapper>
         {/*  <Link to={'novo'}>
            <S.Buttons>{t('comex.settings.creditHistory.addBtn')}</S.Buttons>
          </Link> */}
        </S.ButtonWrapper>
        <ExportExcel
          loading={exportLoading}
          onExport={() => fetchExportCreditHistories()}
        />
        <S.ClickWrapper onClick={() => setIsFilterOpen(!isFilterOpen)}>
          {isFilterOpen ? <S.TogglerOpenIcon /> : <S.TogglerCloseIcon />}{' '}
          {t('comex.filterandButton.filter')}
        </S.ClickWrapper>
      </S.PageHeader>
      {isFilterOpen && <CreditHistoriesFilter />}
      <S.GridHeader>
        <div>{t('comex.settings.creditHistory.dateRegistration')}</div>
        <div>{t('comex.settings.creditHistory.serviceType')}</div>
        <div>{t('comex.settings.creditHistory.userName')}</div>
        <div>{t('comex.settings.creditHistory.creditCharged')}</div>
      </S.GridHeader>
      {loading ? <S.ActivityIndicator /> :
        <S.GridContainer>
          {creditHistoriesData && Array.isArray(creditHistoriesData) && creditHistoriesData.map((item, index) => (
            <S.ItemWrapper key={item.id}>
              <S.Item>{item?.created_at ?
                new Date(item?.created_at).toLocaleDateString(i18n.language, {
                  hour: '2-digit',
                  minute: '2-digit',
                }) :
                '--/--/----'
              }
              </S.Item>
              <S.Item>{item?.service_type?.description}</S.Item>
              <S.Item>{item?.user?.name}</S.Item>
              <S.Item>{item?.credit_charged}</S.Item>
              <S.Ghost/>
              {/* <Link to={`update/${item.id}`} state={item}>
                <S.Buttons>{t('comex.filterandButton.change')}</S.Buttons>
              </Link>
              <S.Buttons
                tag='delete'
                onClick={() => {
                  setIsUpdatingSet(prev => new Set([...prev, index]))
                  dispatch(DeleteCreditHistoryActions.request(item.id, () => fetchCreditHistories()))
                }}
              >{isUpdatingSet.has(index) ? <S.ActivityIndicator /> : t('comex.filterandButton.delete')}
              </S.Buttons> */}
            </S.ItemWrapper>)
          )}
        </S.GridContainer>
      }
      <Paginator onPageChange={handlePageChange} pagination={meta} />
    </>)
}

export default ListCreditHistory;
