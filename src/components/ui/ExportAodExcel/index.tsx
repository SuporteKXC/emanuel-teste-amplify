import React, { useCallback } from "react";
import { Button } from "../button";
import { Sheet } from "lucide-react";
import { writeFileXLSX, utils } from "xlsx";
import { format } from "date-fns"

type ExportAodExcelProps = {
  data: any[];
};

export const ExportAodExcel: React.FC<ExportAodExcelProps> = ({ data }) => {
  const exportFile = useCallback(() => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, `AOD_Tracking${format(new Date(), "dd.MM.yyyy")}.xlsx`);
  }, [data]);
  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full max-w-full md:max-w-max h-8 font-GilroySemibold lg:flex bg-green-600 text-white hover:bg-green-500 hover:text-white duration-300"
      onClick={exportFile}
    >
      <Sheet className="mr-2 h-4 w-4" />
      Exportar AOD
    </Button>
  );
};
