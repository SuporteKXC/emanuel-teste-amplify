import { useCallback, useEffect, useState } from "react";
import { MainContainer, Paginator } from "components/shared";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import FilterStocks from "./Filter";
import {
  PageHeader,
  PageContent,
  ButtonMini,
} from "styles/styled-components";
import { ArrowLeft, PackageIcon } from "lucide-react";
import { ExportStocksActions, ExportStocksState, PaginateStocksActions, PaginateStocksState } from "store/ducks/wms";
import { ListStocks } from "./List";
import InnerNavigator from "../InnerNavigator";
import { HeaderButtons, LoadingPage } from "pages/Settings/SettingMain/styles";
import { useHistory } from "react-router-dom";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { format } from "date-fns";
import { moeda } from "utils";
import { useTranslation } from 'hooks';
import { translations } from './translations';

const Stocks = () => {
  const [query, setQuery] = useState({
    clientId: "",
    productId: "",
    invoiceNumber: "",
    dueDateStart:"",
    ag:"",
    cd:"",
    limit: 10,
    page: 1,
  });
  const navigate = useHistory()
  const dispatch = useDispatch();
  const [exportActive, setExportActive] = useState(false);
  const { getTranslation } = useTranslation(translations);

  const { data, loading, pagination } = useSelector<RootState, any>(
    (state) => state.paginateStocks
  ) as PaginateStocksState;

  const { data: fileData, loading: fileLoading } = useSelector<
    RootStateOrAny,
    ExportStocksState
  >((state) => state.exportStocks) as ExportStocksState;
  
  const paginationAdapt = {
    page: pagination?.currentPage,
    lastPage: pagination?.lastPage,
    ...pagination
  }

  console.log("data",data.length, pagination)
  const handlePageChange = (page: number) => {
    setQuery({ ...query, page: page });
  };

  const handleQuery = (data: any) => {
    setQuery({
      ...query,
      clientId: data?.companyId,
      productId: data?.productId,
      dueDateStart: data?.dueDateStart,
      invoiceNumber: data?.invoice,
    });
  };
  const handleCheck= (data: any) =>{
    if(data.todos){
      setQuery({
        ...query,
        ag:"",
        cd:"",
      })
      return
    }
    setQuery({
      ...query,
      ag: data.ag ? "true" : "",
      cd: data.cd ? "true" : ""
    })
  }
  
  useEffect(() => {
    dispatch(PaginateStocksActions.request(query));
  }, [dispatch, query]);

  const exportToCSV = useCallback((csvData: any, fileName: string) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(csvData);

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const data = new Blob([excelBuffer], { type: fileType });

    setExportActive(false);
    FileSaver.saveAs(data, fileName + fileExtension);
  }, []);

  const getFileData = useCallback(async () => {
    const filterData = {
      ...query,
      page: null,
      limit: null
    }

    dispatch(ExportStocksActions.request({ all: true, ...filterData }));
    setExportActive(true);
  }, [dispatch, query]);

  const generateFile = useCallback(() => {
    if (fileData) {
      const newFile: any[] = [];
      const fileName = `${format(new Date(), "yyyyMMddHHmmss")}_STOCKS`;

      fileData.forEach((line) => {
        const {
          id,
          client,
          product,
          productUnit,
          quantity,
          batch,
          manufacturingDate,
          stockType,
          expirationDate,
          price,
          totalPrice,
          invoiceNumber,
        } = line;

        const ID = id ?? "---";
        const CLIENTE = client && client.tradeName ? client.tradeName : "---";
        const CODIGO = product && product.code ? product.code : "---";
        const PRODUTO = product && product.name ? product.name : "---";
        const UN = productUnit && productUnit.name ? productUnit.name : "---";
        const QTD = quantity.toFixed(2) ?? "---";
        const LOTE = batch ?? "---";
        const DT_FAB =
          manufacturingDate ? format(new Date(manufacturingDate), "dd/MM/yyyy") : "---";
        const AG = stockType?.toUpperCase() === "AG" ? "Sim" : "Não";
        const DT_VENCIMENTO =
          expirationDate ? format(new Date(expirationDate), "dd/MM/yyyy") : "---";
        const VALOR = moeda(price) ?? "---";
        const VALOR_TOTAL = moeda(totalPrice) ?? "---";
        const NF = invoiceNumber ?? "---";

        const fileLine = {
          ID,
          CLIENTE,
          CODIGO,
          PRODUTO,
          UN,
          QTD,
          LOTE,
          DT_FAB,
          AG,
          DT_VENCIMENTO,
          VALOR,
          VALOR_TOTAL,
          NF,
        };

        newFile.push(fileLine);
      });

      exportToCSV(newFile, fileName);
    }
  }, [fileData, exportToCSV]);


  useEffect(() => {
    if (!fileLoading && exportActive) {
      generateFile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileLoading, exportActive]);

  return (
    <MainContainer>
      <PageHeader>
        <h1>
          <PackageIcon style={{ marginRight: "16px" }} />
          {getTranslation('stock')}
        </h1>
        <HeaderButtons>
          <ButtonMini onClick={()=> navigate.goBack()} btStyle="dark">
            <ArrowLeft /> {getTranslation('back')}
          </ButtonMini>
        </HeaderButtons>
      </PageHeader>
      <PageContent>
        <InnerNavigator />
        <FilterStocks lastUpdate={pagination?.lastUpdate} onCheck={handleCheck} onSubmit={handleQuery} fileLoading={fileLoading} onExport={getFileData} />
        {loading ? <LoadingPage/> : <ListStocks stocks={data} /> }
        <Paginator pagination={paginationAdapt} onPageChange={handlePageChange} />
      </PageContent>
    </MainContainer>
  );
};

export default Stocks;
