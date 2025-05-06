import { ListedStock } from 'contracts/Stocks';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import { ExportStocksActions } from 'store/ducks/stocks';
import { Formatter } from 'utils';

interface IUseStocks {
  stocksExport: ListedStock[];
  loadingStocks: boolean;
  fetchStocksForExport: (filters?: any) => void;
}

export const useStocks = (): IUseStocks => {
  const dispatch: AppDispatch = useDispatch();

  const { data: stocks, loading: loadingMain } = useSelector(
    (state: RootState) => state.exportStocks
  );

  const [stocksExport, setDataExport] = useState<any>();
  const [loading, setLoading] = useState<boolean>(loadingMain);

  const loadingStocks = useMemo((): boolean => {
    if (loadingMain) return loadingMain;
    return loading;
  }, [loadingMain]);

  const onSuccess = useCallback(async () => {
    setLoading(true);
    const exports = await Promise.all(
      stocks.map(
        ({
          company,
          warehouse,
          product,
          quantity,
          batch,
          productUnit,
          entranceDate,
          manufacturingDate,
          price,
          expirationDate,
          invoiceNumber,
          updatedAt,
          startDate,
          dueDate,
          time,
        }) => {
          return {
            'CLIENTE': company?.tradeName ?? '',
            'ENDEREÇO CLIENTE': `${company?.addressStreet}, ${company?.addressNumber} - ${company?.addressNeighborhood}, ${company?.addressCity} - ${company?.addressState}, ${company?.addressZipcode}`,
            'ARMAZÉM': warehouse?.tradeName ?? '',
            'ENDEREÇO ARMAZÉM': `${warehouse?.addressStreet}, ${warehouse?.addressNumber} - ${warehouse?.addressNeighborhood}, ${warehouse?.addressCity} - ${warehouse?.addressState}, ${warehouse?.addressZipcode}`,
            'CÓDIGO': product?.code ?? '',
            'DESCRIÇÃO': product?.name ?? '',
            'UN': productUnit?.name ?? '',
            'QTD': quantity ?? '',
            'LOTE': batch ?? '',
            'DT FAB': manufacturingDate
              ? Formatter.date(manufacturingDate, {
                  format: 'dd/MM/yyyy',
                })
              : '',
            'DT VENC': expirationDate
              ? Formatter.date(expirationDate, { format: 'dd/MM/yyyy' })
              : '',
            'VALOR': price ?? '',
            'NF': invoiceNumber ?? '',
            'CONTRATO': product?.contract ?? '',
            'DESCRIÇÃO DO CONTRATO': product?.contractDescription ?? '',
            'DT ENTRADA': entranceDate
              ? Formatter.date(entranceDate, { format: 'dd/MM/yyyy' })
              : '',
            'DT INíCIO AG': startDate ? Formatter.date(startDate) : '',
            'DIAS RESTANTES': time ?? '',
            'DT VENC AG': dueDate ? Formatter.date(dueDate) : '',
            'ULT. ATUALIZAÇÃO': updatedAt
              ? Formatter.date(updatedAt, { format: 'dd/MM/yyyy HH:mm' })
              : '',
          };
        }
      )
    );

    setDataExport(exports);
    setLoading(false);
  }, [stocks]);

  const fetchStocksForExport = useCallback(
    (filter?: any): void => {
      dispatch(ExportStocksActions.request(filter));
    },
    [dispatch]
  );

  useEffect(() => {
    stocks && onSuccess();
  }, [onSuccess]);

  return {
    stocksExport,
    loadingStocks,
    fetchStocksForExport,
  };
};

export type StocksHook = ReturnType<typeof useStocks>;
