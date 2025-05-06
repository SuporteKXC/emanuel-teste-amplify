import * as S from './styles';
import { useCallback, useEffect, useState } from 'react';
import XLSX from 'sheetjs-style-v2';
import * as FileSaver from 'file-saver';

interface Download {
  /**Exemplo de formato necessário [ {'titulo': 'descricao1'}, {'titulo': 'descricao2'}... ] */
  archive: Array<any>;
  /**Nome do arquivo */
  archiveName: string;
  loading?: boolean;
  /**Função fetch */
  action: () => any;
}

export const DownloadXLS = ({
  archiveName,
  archive,
  loading = false,
  action,
}: Download) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet: charset=UTF8';
  const fileExtension = '.xlsx';

  const [handleClick, setHandleClick] = useState<boolean>(false);
  const [exports, setExports] = useState<any[]>([]);

  const exportData = useCallback(async () => {
    if (!loading && exports?.length && handleClick) {
      const ws = XLSX.utils.json_to_sheet(exports);
      const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, archiveName + fileExtension);
      setHandleClick(false);
    }
  }, [exports]);

  useEffect(() => {
    setExports(archive);
  }, [archive]);

  useEffect(() => {
    exportData();
  }, [exportData]);

  useEffect(() => {
    if (handleClick) action && action();
  }, [handleClick]);

  return (
    <S.DownloadXLS onClick={() => setHandleClick(true)} loading={loading}>
      <span>Exportar XLSX</span>
      <S.ContentAction>
        {loading ? <S.XLSLoading /> : <S.DownloadIcon />}
      </S.ContentAction>
    </S.DownloadXLS>
  );
};
