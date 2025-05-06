import { Card } from "@/components/ui/CardGs";
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
import { Package2, Truck, Store } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

export const DetailsTab: React.FC<{ salesOrder: SalesOrder | null }> = ({
  salesOrder,
}) => {
  const { t } = useTranslation();
  const base = "salesOrder.drawer.details";
  const cards = [
    {
      label: t(`${base}.origem`),
      icon: <Package2 className="stroke-slate-800" />,
      value: salesOrder?.company?.nameFantasy ?? "---",
    },
    {
      label: t(`${base}.transportadora`),
      icon: <Truck className="stroke-slate-800" />,
      value: salesOrder?.carrier?.tradeName ?? "---",
    },
    {
      label: t(`${base}.destino`),
      icon: <Store className="stroke-slate-800" />,
      value: salesOrder?.client?.tradeName ?? "---",
    },
  ];
  return (
    <div className="text-sm px-6 mt-4 w-full rounded border-2">
      <div className="grid grid-cols-3 gap-4 p-8">
        {cards.map((card, index) => (
          <Card.Root key={index}>
            <Card.Header>
              <div className="flex items-center justify-between w-full">
                <h5 className="font-GilroyBold text-sm text-slate-800">
                  {card.label}
                </h5>
                {card.icon}
              </div>
            </Card.Header>
            <Card.Content>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between font-GilroySemibold text-1xl text-slate-800">
                  <span className={"text-slate-800"}>{card.value}</span>
                </div>
              </div>
            </Card.Content>
          </Card.Root>
        ))}
      </div>
      <ScrollArea className="px-8 ">
        {true ? (
          <Table className="h-full gap-4 grid-cols-4 w-full border-b-2">
            <TableHeader>
              <TableRow>
                <TableHead
                  scope="col"
                  className="px-5 w-[10%] text-start py-2 font-GilroyBold"
                >
                  {t(`${base}.item`)}
                </TableHead>
                <TableHead
                  scope="col"
                  className="w-[10%] text-start py-2 font-GilroyBold"
                >
                  {t(`${base}.codigo`)}
                </TableHead>
                <TableHead
                  scope="col"
                  className="w-[60%] text-start py-2 font-GilroyBold"
                >
                  {t(`${base}.descricao`)}
                </TableHead>
                <TableHead
                  scope="col"
                  className="w-[10%] text-start py-2 font-GilroyBold"
                >
                  {t(`${base}.un`)}
                </TableHead>
                <TableHead
                  scope="col"
                  className="w-[10%] text-start py-2 font-GilroyBold"
                >
                  {t(`${base}.quantidade`)}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {salesOrder?.sales_order_itens?.map((element) => {
                return (
                  <TableRow key={element.id} className="border-b-2">
                    <TableCell className="px-5 w-[10%] text-start py-2">
                      {element.item}
                    </TableCell>
                    <TableCell className="w-[10%] text-start py-2">
                      {element.product?.code}
                    </TableCell>
                    <TableCell className="w-[60%] text-start py-2">
                      {element.product?.description}
                    </TableCell>
                    <TableCell className="w-[10%] text-start py-2">
                      {element.product?.un}
                    </TableCell>
                    <TableCell className="w-[10%] text-start py-2">
                      {element.qty}
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
