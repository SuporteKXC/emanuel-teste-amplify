import React, { useState, useEffect, useCallback } from 'react';
import * as S from './styles';
import { Form } from '@unform/web';
import { Chart } from 'react-google-charts';
import TablePerformance from './TablePerformance';
import { CheckboxInput } from 'components/shared';
import { useTranslation } from 'react-i18next';
import { OrderItemDelayActions } from 'store/ducks/comex/dashboard';
import type { AppDispatch, RootState } from 'store';

import { FilterDashboard } from './FilterDashboard';
import { useDispatch, useSelector } from 'react-redux';

const Performance = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const { data: orderItemsDelay, loading } = useSelector(
    (state: RootState) => state.orderItemsDelay
  );
  
  const { data: filterData } = useSelector((state: RootState) => state.orderItensDelayFilter);

  const fetchDelay = useCallback(() => {
    dispatch(OrderItemDelayActions.request(filterData));
  }, [dispatch, filterData]);

  useEffect(() => {
    fetchDelay();
  }, [filterData]);

  return (
    <S.Container>
      <S.Header>
        <div className="wrapper">
          <S.BarChartIcon />
          {t('comex.dashboard.title')}
        </div>
        <S.ClickWrapper onClick={() => setIsFilterOpen(!isFilterOpen)}>
          {isFilterOpen ? <S.TogglerOpenIcon /> : <S.TogglerCloseIcon />}{' '}
          {t('comex.filterandButton.filter')}
        </S.ClickWrapper>
      </S.Header>
      {isFilterOpen && <FilterDashboard />}
      {loading ? (
        <S.Center>
          <S.ActivityIndicator />
        </S.Center>
      ) : (
        orderItemsDelay && (
          <>
            <S.SubHeader>Performance</S.SubHeader>
            <S.GraphWrapper>
              <S.GraphContainer>
                <p>Total</p>
                <Chart
                  width="100%"
                  height="300px"
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Performance Corteva Total', 'Performance'],

                    [
                      `Delay (${
                        orderItemsDelay?.delayTotal
                          ? orderItemsDelay?.delayTotal.atrasado || 0
                          : 0
                      })`,
                      orderItemsDelay?.delayTotal
                        ? orderItemsDelay?.delayTotal.atrasado || 0
                        : 0,
                    ],

                    [
                      `On Time (${
                        orderItemsDelay?.delayTotal
                          ? orderItemsDelay?.delayTotal.adiantado || 0
                          : 0
                      })`,
                      orderItemsDelay?.delayTotal
                        ? orderItemsDelay?.delayTotal.adiantado || 100
                        : 100,
                    ],
                  ]}
                  options={{
                    width: 250,
                    height: 250,
                    pieHole: 0.5,
                    // pieSliceText: 'none',
                    legend: {
                      position: 'bottom',
                    },
                    isStacked: true,
                    slices: {
                      0: { color: '#DB4C55' },

                      1: { color: '#02B99D' },
                    },
                  }}
                />
                {/*  <div>
              {total.responsabilities &&
                total.responsabilities[0] &&
                total.responsabilities.map((item) => (
                  <div key={item.name}>
                    <p>{item.title}</p>
                    <S.BarPercent
                      height="16"
                      percent={item.delay_percent}
                      color="y"
                    >
                      <strong>{item.delay_percent}</strong>
                    </S.BarPercent>
                  </div>
                ))}
            </div> */}
              </S.GraphContainer>
              {orderItemsDelay?.orderItemDelayCompany.map((item) => {
                return (
                  <S.GraphContainer key={item.company?.id}>
                    <p>{item.company?.name_fantasy}</p>
                    <Chart
                      width="100%"
                      height="300px"
                      chartType="PieChart"
                      loader={<div>Loading Chart</div>}
                      data={[
                        ['Performance Corteva', 'Performance'],

                        [
                          `Delay (${item?.atrasado ? item?.atrasado : 0})`,
                          item?.atrasadoPorcent ? item?.atrasadoPorcent : 0,
                        ],

                        [
                          `On Time (${item?.adiantado ? item?.adiantado : 0})`,
                          item?.adiantadoPorcent ? item?.adiantadoPorcent : 0,
                        ],
                      ]}
                      options={{
                        width: 250,
                        height: 250,
                        pieHole: 0.5,
                        legend: {
                          position: 'bottom',
                        },
                        isStacked: true,
                        slices: {
                          0: { color: '#DB4C55' },

                          1: { color: '#02B99D' },
                        },
                      }}
                    />
                    {/*  <div>
              {empresaX.responsabilities &&
                empresaX.responsabilities[0] &&
                empresaX.responsabilities.map((item) => (
                  <div key={item.name}>
                    <p>{item.title}</p>
                    <S.BarPercent
                      height="16"
                      percent={item.delay_percent}
                      color="y"
                    >
                      <strong>{item.delay_percent}</strong>
                    </S.BarPercent>
                  </div>
                ))}
            </div> */}
                  </S.GraphContainer>
                );
              })}
            </S.GraphWrapper>
            <S.SubHeader>{t('comex.dashboard.time')}</S.SubHeader>
            <TablePerformance obj={orderItemsDelay?.tabelaDays} />
          </>
        )
      )}
    </S.Container>
  );
};

export default Performance;
