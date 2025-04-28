import { useCallback, useEffect, useState } from "react";
import { MainContainer, Paginator } from "components/shared";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import FilterStockMovement from "./Filter";
import { PageHeader, PageContent, ButtonMini } from "styles/styled-components";
import { ArrowLeft, PackageIcon } from "lucide-react";
import {
  ExportStockMovementActions,
  PaginateStockMovementActions,
  PaginateStocksState,
  ExportStockMovementState,
} from "store/ducks/wms";
import { ListStocks } from "./List";
import InnerNavigator from "../InnerNavigator";
import { HeaderButtons, LoadingPage } from "pages/Settings/SettingMain/styles";
import { useHistory } from "react-router-dom";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { format } from "date-fns";
import { useTranslation } from "hooks";
import { translations } from "./translations";
// import { moeda } from "utils";

const StocksMovement = () => {
  const [query, setQuery] = useState({
    clientId: "",
    productId: "",
    movementType: "",
    entranceDateStart: "",
    entranceDateEnd: "",
    limit: 10,
    page: 1,
  });
  const navigate = useHistory();
  const dispatch = useDispatch();
  const [exportActive, setExportActive] = useState(false);
  const { getTranslation } = useTranslation(translations);

  const { data, loading, pagination } = useSelector<RootState, any>(
    (state) => state.paginateStockMovement
  ) as PaginateStocksState;

  const { data: fileData, loading: fileLoading } = useSelector<RootState, any>(
    (state) => state.exportStockMovement
  ) as ExportStockMovementState;

  const paginationAdapt = {
    page: pagination?.currentPage,
    lastPage: pagination?.lastPage,
    ...pagination,
  };

  const handlePageChange = (page: number) => {
    setQuery({ ...query, page: page });
  };

  const handleQuery = (data: any) => {
    setQuery({
      ...query,
      clientId: data?.clientId,
      productId: data?.productId,
      entranceDateStart: data?.entranceDateStart,
      entranceDateEnd: data?.entranceDateEnd,
      movementType: data?.movementType,
    });
  };

  useEffect(() => {
    dispatch(PaginateStockMovementActions.request(query));
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
      limit: null,
    };

    dispatch(ExportStockMovementActions.request({ all: true, ...filterData }));
    setExportActive(true);
  }, [dispatch, query]);

  const generateFile = useCallback(() => {
    if (fileData) {
      const newFile: any[] = [];
      const fileName = `${format(new Date(), "yyyyMMddHHmmss")}_STOCK_MOVEMENT`;

      fileData.forEach((line) => {
        const {
          id,
          client,
          product,
          productUnit,
          quantity,
          batch,
          entranceDate,
          movementType,
        } = line;

        const ID = id ?? "---";
        const CLIENTE = client && client.tradeName ? client.tradeName : "---";
        const CODIGO = product && product.code ? product.code : "---";
        const PRODUTO = product && product.name ? product.name : "---";
        const UN = productUnit && productUnit.name ? productUnit.name : "---";
        const QTD = quantity
          ? quantity.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : "---";
        const LOTE = batch ?? "---";
        const DT = entranceDate
          ? format(new Date(entranceDate), "dd/MM/yyyy HH:mm")
          : "---";
        const TIPO = movementType === "E" ? "ENTRADA" : "SAIDA";
        const DT_ENT = movementType === "E" ? DT : "---";
        const DT_SAIDAS = movementType === "S" ? DT : "---";
        const fileLine = {
          ID,
          CLIENTE,
          CODIGO,
          PRODUTO,
          UN,
          QTD,
          LOTE,
          TIPO,
          DT_ENT,
          DT_SAIDAS,
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
          {getTranslation("stock")}
        </h1>
        <HeaderButtons>
          <ButtonMini onClick={() => navigate.goBack()} btStyle="dark">
            <ArrowLeft /> {getTranslation("back")}
          </ButtonMini>
        </HeaderButtons>
      </PageHeader>
      <PageContent>
        <InnerNavigator />
        <FilterStockMovement
          lastUpdate={pagination?.lastUpdate}
          onSubmit={handleQuery}
          fileLoading={fileLoading}
          onExport={getFileData}
        />
        {loading ? <LoadingPage /> : <ListStocks stocks={data} />}
        <Paginator
          pagination={paginationAdapt}
          onPageChange={handlePageChange}
        />
      </PageContent>
    </MainContainer>
  );
};

export default StocksMovement;
