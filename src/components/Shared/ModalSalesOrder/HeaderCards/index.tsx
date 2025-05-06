import { SalesOrder } from "@/contracts/salesOrder";
import { format } from "date-fns";
import { DateTime } from "luxon";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
    salesOrder: SalesOrder | null
}

const HeaderCards: React.FC<Props> = ({ salesOrder, ...props }) => {
  const {t} = useTranslation()
  const base = "salesOrder.drawer";
  const cardInfo = [
    {
      label: t(`${base}.pedidoVenda`),
      value: salesOrder?.order_reference
    },
    {
      label: t(`${base}.entrega`),
      value: salesOrder?.delivery_date ? format(new Date(salesOrder?.delivery_date),'dd/MM/yyyy') : "--/--/----",
    },
    {
      label: t(`${base}.nota`),
      value: salesOrder?.document?.documentNumber
    },
    {
      label: t(`${base}.dataEmissao`),
      value: salesOrder?.emission_date ? format(new Date(salesOrder?.emission_date),'dd/MM/yyyy') : "--/--/----",
    },
    {
      label: t(`${base}.prazo`),
      value:salesOrder?.deadline_date ? format(new Date(salesOrder?.deadline_date),'dd/MM/yyyy') : "--/--/----",
    },
    {
      label: t(`${base}.faturado`),
      value: salesOrder?.document?.createdAt ? format(new Date(salesOrder?.document?.createdAt ),'dd/MM/yyyy') : "--/--/----",//salesOrder?.document?.created_at
    },
    {
      label: t(`${base}.rota`),
      value: salesOrder?.route
    },
  ];
  const Card = ({ info }:any) => {
    return (
      <div className="px-6 flex flex-col justify-center items-center">
        <p className="text-1xl text-slate-800">{info.label}</p>
        <p className="font-GilroyBold text-xl text-slate-800">{info.value}</p>
      </div>
    );
  };
  return (
    <div className=" mt-2 w-[100%] items-center justify-center grid grid-cols-7">
      {cardInfo.map((card, index) => (
        <Card info={card} key={index} />
      ))}
    </div>
  );
};

export default HeaderCards;
