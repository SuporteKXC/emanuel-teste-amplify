import { Scaffold } from 'layouts';
import React, { useCallback, useEffect, useState } from 'react';
import * as S from './styles'
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import {
  Paginator,
} from "components/shared/Pagination";
import { ProductActions, UpdateProductActions, ProductPaginateActions, ProductFilterActions } from 'store/ducks';
import { useTranslation } from 'react-i18next';
import ExportExcel from 'components/shared/ExportExcel';
import { exportToCSV } from 'utils';
import { ProductDataPaginate } from "contracts";
import { useNavigate } from 'react-router-dom';
import { FilterProduct } from 'components/comex/Config/ProductFilter';
import { usePermission } from 'hooks';

export const ListProducts: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<any[]>([])
  const { i18n,t } = useTranslation();
  const [setIsUpdating, setSetIsUpdating] = useState(new Set());
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const { hasPermissionTo } = usePermission();

  const { data: productFilterData } = useSelector(
    (state: RootState) => state.productFilterData
  );

  const { data: productPaginate, meta, loading: loadingProductPaginate } = useSelector(
    (state: RootState) => state.productPaginate
  );

  const fetchProductPaginate = useCallback(() => {
    try {
      dispatch(ProductPaginateActions.request(productFilterData));
    }
    catch {
      console.log('Error')
    }
  }, [productFilterData]);

  const onSuccess = useCallback(() => {
    fetchProductPaginate();
    setSetIsUpdating(new Set());
  }, [])

  useEffect(() => { fetchProductPaginate() }, [productFilterData]);

  const handlePageChange = useCallback((page: number) => {
    dispatch(ProductFilterActions.setFilterData({...productFilterData, page}))
  }, [dispatch, productFilterData]);
  
  const generateFile = useCallback(
    (productPaginate: ProductDataPaginate) => {
      if (!productPaginate) return;

      const fileName = `${t(`settings.product.title`)} ${new Date().toLocaleDateString(
        i18n.language,
        {
          day: '2-digit',
          month: '2-digit',
        }
      )}`;

      const exportFile = productPaginate?.data.map((product) => ({
        [t(`settings.product.code`)]: product?.code,
        [t(`settings.product.description`)]: product?.description,
        [t(`settings.product.action`)]: !product?.alert_critical ? t('comex.filterandButton.normal') : t('comex.filterandButton.critical'),
      }));

      exportToCSV(exportFile, fileName);
  }, [productPaginate]);

  const exportProducts = useCallback(() => {
    dispatch(ProductPaginateActions.request({ ...productFilterData, limit: 'undefined' }, generateFile));
  }, [productFilterData, generateFile]);

  return (
    <>
      <S.PageHeader>
        <div className='wrapper'>
          <S.ListCircleIcon height='24px' />
          {t('comex.settings.product.title')}
        </div>
        <ExportExcel
          loading={loadingProductPaginate}
          onExport={() => exportProducts()}
        />
        <S.ClickWrapper onClick={() => setIsFilterOpen(!isFilterOpen)}>
          {isFilterOpen ? <S.TogglerOpenIcon /> : <S.TogglerCloseIcon />}{' '}
          {t('comex.filterandButton.filter')}
        </S.ClickWrapper>
      </S.PageHeader>
      {isFilterOpen && <FilterProduct />}
      <S.GridHeader>
          <div>{t('comex.settings.product.code')}</div>
          <div>{t('comex.settings.product.description')}</div>
          <div>{t('comex.settings.product.action')}</div>
      </S.GridHeader>
      {loadingProductPaginate ? <S.ActivityIndicator /> :
        <S.GridContainer>
          {productPaginate && Array.isArray(productPaginate) ? productPaginate.map((item, index) => (
            <S.ItemWrapper key={item.id} onClick={() => navigate(`update/${item.id}`)}>
              <div>{item.code}</div>
              <div>{item.description}</div>
              {hasPermissionTo("UPDATEPRODUCT") && <S.Button
                size='small'
                mood={item.alert_critical ? 'danger' : 'secondary'}
                onClick={() => {
                  setSetIsUpdating(prev => new Set([...prev, index]));
                  dispatch(UpdateProductActions.request(
                    item.id,
                    // Invertendo
                    item.alert_critical === 0 ? 1 : 0,
                    onSuccess
                  ))
                }
                }
              >
                {setIsUpdating.has(index) ? <S.ActivityIndicator /> :
                  !item.alert_critical ? t('comex.filterandButton.normal') : t('comex.filterandButton.critical')}
              </S.Button>}
            </S.ItemWrapper>
          )) : <></>
          }
        </S.GridContainer>
      }

      <Paginator onPageChange={handlePageChange} pagination={meta} />
    </>
  )
}

export default ListProducts;
