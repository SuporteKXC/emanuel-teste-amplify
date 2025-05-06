import { Button } from "@/components/ui/ButtonGs";
import { DataTable } from "@/components/ui/DataTable";
import { useColumns } from "./columns";
import { AppDispatch, RootState } from "@/store";
import { ListOrderFilesActions } from "@/store/ducks";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InvoiceIcon as Document } from "styles/components/icons";
export const OrderFiles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { columns } = useColumns();
  const { data: orderFiles,loading } = useSelector((state: RootState) => state.listOrderFiles);

  const fetchOrderFiles = useCallback(() => {
    dispatch(ListOrderFilesActions.request());
  },[]);

  useEffect(() => {
    fetchOrderFiles()
  },[])
  return (
    <section>
      <header className="flex mb-4 w-full justify-between rounded-[10px] font-GilroySemibold text-[24px]">
        <div className="flex gap-2 items-center">
          <span>
            <Document height={30} width={30} />
          </span>
          Documentação
        </div>
        <Button.Root onClick={() => {navigate('criar')}} className="enabled:bg-green-400 enabled:hover:bg-green-500 enabled:text-white px-6 py-2.5 text-sm">Adicionar documento</Button.Root>
      </header>
      <DataTable 
        columns={columns}
        data={orderFiles ?? []}
        exportTable={false}
        isLoading={loading} />
    </section>
  );
};
