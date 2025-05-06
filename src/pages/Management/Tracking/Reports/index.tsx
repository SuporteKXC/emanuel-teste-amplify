import * as S from './styles';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Chart } from 'components/management/Tracking/Reports/Chart';
import { ChartFilter } from 'components/management/Tracking/Reports/Filter';
import { businessUnitGroup, originGroup, originGroupReclass, businessUnitGroupReclass } from 'utils/chartFormatters';
import { format, subDays } from "date-fns";
import moment from "moment";
import "moment/locale/pt-br";

interface fetchDataProps {
  startDate: string,
  endDate: string,
  stockDate: string,
  plantCode?: number | null
  storageLocation?: number | null
  bu?: string | null
}

export const Reports = () : JSX.Element => {
  const [data, setData] = useState<[]>([]);
  const [dataBusinessUnit, setDataBusinessUnit] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBusinessUnit, setIsLoadingBusinessUnit] = useState(false);
  const dateStart = subDays(new Date(), 7)
  const dateEnd = new Date()
  const stockDate = moment().hours() < 12
  ? moment().locale("pt-br").subtract(1, "days").toDate()
  : moment().locale("pt-br").toDate()

  const [filters, setFilters] = useState<fetchDataProps>({ 
    startDate: format(dateStart, "yyyy-MM-dd"), 
    endDate: format(dateEnd, "yyyy-MM-dd"),
    plantCode: null,
    storageLocation: null,
    bu: null,
    stockDate: format(stockDate, "yyyy-MM-dd"),
  } as fetchDataProps);

  const token = useSelector((state: any) => state.auth.data.token);

  const fetchDataOrigin = async (props: fetchDataProps) => {
    try {
      setIsLoading(true);
      
      const { startDate, endDate, plantCode, stockDate, storageLocation, bu } = props;

      let url = `https://iff-stocks-management-2caa4f37c332.herokuapp.com/api/v1/reports/origin?startDate=${startDate}&endDate=${endDate}&stockDate=${stockDate}`
      
      if (plantCode) {
        url += `&plantCode=${plantCode}`;
      }

      if (storageLocation) {
        url += `&storageLocation=${storageLocation}`;
      }

      if (bu) {
        url += `&bu=${encodeURIComponent(bu)}`;
      }
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataBusinessUnit = async (props: fetchDataProps) => {
    try {
      setIsLoadingBusinessUnit(true);

      const { startDate, endDate, plantCode, storageLocation, bu, stockDate } = props;
      
      let url = `https://iff-stocks-management-2caa4f37c332.herokuapp.com/api/v1/reports/business-unit?startDate=${startDate}&endDate=${endDate}&stockDate=${stockDate}`
     
      if (plantCode) {
        url += `&plantCode=${plantCode}`;
      }

      if (storageLocation) {
        url += `&storageLocation=${storageLocation}`;
      }

      if (bu) {
        url += `&bu=${encodeURIComponent(bu)}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setDataBusinessUnit(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoadingBusinessUnit(false);
    }
  };

  const makeBUOptions = useCallback(() => {
    const buOptions = ['Nourish', 'Health & Bioscience'].map((value: any) => ({
      label: 'BU: ' + value.toString(),
      value: value.toString(),
    }));
    return buOptions;

  }, []);

  const makePlantOptions = useCallback(() => {
    // const uniquePlantCodesSet = new Set();

    // data.forEach((item: any) => {
    //   uniquePlantCodesSet.add(item.plant_code);
    // });

    // const uniquePlantCodesArray = Array.from(uniquePlantCodesSet);

    const plantOptions = [102,105,180,231].map((value: any) => ({
      label: 'Planta: ' + value.toString(),
      value: value,
    }));

    return plantOptions;

  }, []);

  useEffect(() => {
    fetchDataOrigin(filters);
    fetchDataBusinessUnit(filters);
  }, [filters]);

  return (
    <>
      <ChartFilter 
        plantOptions={makePlantOptions()}
        buOptions={makeBUOptions()}
        setFilters={setFilters}
      />
      {!isLoading && 
      <>
        <Chart 
          title="ABC Curve Danisco - Healthly Inventory Level" 
          groupBy="Origem" 
          data={data} 
          formatChart={originGroup} 
          filters={filters}
          color='nivo'
        /> 

        <Chart 
          title="ABC Curve Danisco - Healthly Inventory Level - Final" 
          groupBy="Origem" 
          data={data} 
          formatChart={originGroupReclass} 
          filters={filters}
          color='oranges'
        /> 
      </>
        || <S.LoadingChart />
      }
      {!isLoadingBusinessUnit && 
        <>
          <Chart 
            title="ABC Curve Danisco - Healthly Inventory Level" 
            groupBy="Business Unit" 
            data={dataBusinessUnit} 
            formatChart={businessUnitGroup} 
            filters={filters}
            color='nivo'
          /> 

          <Chart 
            title="ABC Curve Danisco - Healthly Inventory Level" 
            groupBy="Business Unit" 
            data={dataBusinessUnit} 
            formatChart={businessUnitGroupReclass} 
            filters={filters}
            color='oranges'
          /> 
        </>
        || <S.LoadingChart />
      }
    </>
  )
}