import { useCallback, useState, useEffect } from 'react';
import * as S from './styles';
import { updateKeyNames } from 'utils/updateKeyNames';
import { utils, writeFileXLSX } from 'xlsx';
import { BarDatum, ComputedDatum, ResponsiveBar } from '@nivo/bar';
import { groupBy } from 'lodash';

interface ChartProps {
  data: [],
  title: string,
  groupBy: string,
  color: any,
  formatChart: (data: any, type: string) => BarDatum[],
  filters: any
}

export function Chart(props: ChartProps) {
  const [data, setData] = useState<[]>(props.data);
  const [formattedData, setFormattedData] = useState<BarDatum[]>(props.formatChart(props.data, 'quantity'));
  const [viewType, setViewType] = useState<'quantity' | 'percentage'>('quantity');

  const exportFile = useCallback(() => {

    data.forEach((element: any) => {
      element.sale_qtd = element.sale_qtd ? parseFloat(element.sale_qtd).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 20}) : null;
      element.average_total = element.average_total ? parseFloat(element.average_total).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 20}) : null;

      element.stock_qtd = element.stock_qtd ? parseFloat(element.stock_qtd).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 20}) : null;
      element.stock_sales_avg = element.stock_sales_avg ? parseFloat(element.stock_sales_avg).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 20}) : null;
      element.stock_sales_monthly_avg = element.stock_sales_monthly_avg ? parseFloat(element.stock_sales_monthly_avg).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 20}) : null;
    })

    const newData = updateKeyNames(data);
    const ws = utils.json_to_sheet(newData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Forecast_ABC");
    
    let filename = `Report_Forecast_${props.groupBy.replace(' ','_')}_${props.filters.startDate}_${props.filters.endDate}`;

    if (props.filters.plantCode !== null) {
        filename += `_Plant_${props.filters.plantCode}`;
    }

    if (props.filters.bu !== null) {
        filename += `_BU_${props.filters.bu}`;
    }

    filename += '.xlsx';

    writeFileXLSX(wb, filename);
  }, [data, props.filters]);

  const toggleView = useCallback(() => {
    if(viewType === 'quantity') {
      const formatJsonData = props.formatChart(data, 'percentage')
      setFormattedData(formatJsonData);
      setViewType('percentage');
    } else {
      const formatJsonData = props.formatChart(data, 'quantity')
      setFormattedData(formatJsonData);
      setViewType('quantity');
    }
  }, [data, viewType]);

  return (
    <S.Container>
      <S.Header>
        <h1>{props.title} ({viewType.toUpperCase()})</h1>
        <S.Controls>
          <S.ToggleGroup>
            <S.ButtonView variant="quantity" viewType={viewType} onClick={toggleView}>$</S.ButtonView>
            <S.ButtonView variant="percentage" viewType={viewType} onClick={toggleView}>%</S.ButtonView>
          </S.ToggleGroup>
          
          <S.ButtonXLS onClick={exportFile}>Exportar Dados</S.ButtonXLS>
        </S.Controls>
      </S.Header>
      <S.ChartContainer width={formattedData.length * 250}>
        <ResponsiveBar
          data={formattedData}
          keys={[
            'A',
            'B',
            'C'
          ]}
          indexBy={props.groupBy}
          layers={['grid', 'axes', 'bars', 'markers', 'legends', 'annotations']}
          margin={{ top: 50, right: 100, bottom: 60, left: 80 }}
          padding={0.2}
          groupMode="grouped"
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: props.color || 'nivo' }}
          borderColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      1.6
                  ]
              ]
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: props.groupBy,
              legendPosition: 'middle',
              legendOffset: 40
          }}
          axisLeft={{
              tickSize: 2,
              tickPadding: 1,
              tickRotation: 0,
              legend: 'Sales',
              legendPosition: 'middle',
              legendOffset: -70,
              format: value => `${Number(value).toLocaleString('pt-BR', {
                minimumFractionDigits: 0
              })}`
          }}
          valueFormat={value => `${Number(value).toLocaleString('pt-BR', {
            minimumFractionDigits: 0
          })}${viewType === 'percentage' ? '%' : ''}`}
          labelSkipWidth={12}
          labelSkipHeight={0}
          labelTextColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      1.6
                  ]
              ]
          }}
          legends={[
              {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemOpacity: 1
                          }
                      }
                  ]
              }
          ]}
          role="application"
          ariaLabel="Sales by Origin"
          barAriaLabel={e=>e.id+": "+e.formattedValue+" in origin: "+e.indexValue}
        />
      </S.ChartContainer>
    </S.Container>
  );
}
