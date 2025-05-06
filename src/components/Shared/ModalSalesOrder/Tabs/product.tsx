import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SalesOrder } from "@/contracts/salesOrder";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const ProductTab: React.FC<{ salesOrder: SalesOrder | null }> = ({
  salesOrder,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const base = "salesOrder.drawer.details";

  return (
    <div className="text-sm px-6 mt-4 w-full rounded border-2">
      <ScrollArea className="px-8 ">
      {true ? (
          <Table className="h-full gap-4 grid-cols-4 w-full border-b-2">
            <TableHeader>
              <TableRow>
                <TableHead
                  scope="col"
                  className="w-[30%] text-start py-2 font-GilroyBold"
                >
                  {t(`${base}.codigo`)}
                </TableHead>
                <TableHead
                  scope="col"
                  className="w-[50%] text-start py-2 font-GilroyBold"
                >
                  {t(`${base}.descricao`)}
                </TableHead>
                <TableHead
                  scope="col"
                  className="w-[20%] text-start py-2 font-GilroyBold"
                >
                  {t(`${base}.quantidade`)}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {salesOrder?.document?.documentItems?.map((element) => {
                return (
                  <TableRow key={element.id} className="border-b-2 cursor-pointer" onClick={() => element?.documentId ? navigate(`/tracking-delivery/detail/${element.documentId}`) : ""}>
                    <TableCell className="w-[30%] text-start py-2">
                      {element?.productCode}
                    </TableCell>
                    <TableCell className="w-[50%] text-start py-2">
                      {element?.productDescription}
                    </TableCell>
                    <TableCell className="w-[20%] text-start py-2">
                      {element.quantity}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <></>
        )}
      </ScrollArea>
    </div>
  );
};
