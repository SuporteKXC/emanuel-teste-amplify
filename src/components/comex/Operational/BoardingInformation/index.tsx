import { OrderItemData } from "@/contracts";
import React, { useMemo } from "react";
import { Boxes } from "lucide-react";
import { useTranslation } from "react-i18next";

interface BoardingInformationProps {
  orderItem: OrderItemData;
}
interface Items {
  label: string;
  value: string;
}
const TransportItem: React.FC<Items> = ({ label, value }) => (
  <div className="flex items-center">
    <h4 className="text-[14px] font-GilroySemibold font-normal text-[#292d41]">
      {label}
    </h4>
    <span className="pl-2 font-sans text-xs text-[#2E2E36]">
      {value || "--"}
    </span>
  </div>
);

const BoardingInformation: React.FC<BoardingInformationProps> = ({ orderItem }) => {
  const { t } = useTranslation();
  const base = "comex.operational.orderItem.tracking";

  console.log(orderItem)
  const transportItems = useMemo<Items[]>(() => {
    if (!orderItem) return [];
    return [
      {
        label: `${t(`${base}.customsBrokerProcess`)}:`,
        value: orderItem?.customs_broker_process || "--",
      },
      {
        label: ``,
        value: "ﾠ",
      },
      {
        label: `${t(`${base}.fobValue`)}:`,
        value: orderItem?.fob_value || "--",
      },
      {
        label: `${t(`${base}.cargoType`)}:`,
        value: orderItem?.cargo_type || "--",
      },
    ];
  }, [orderItem, t]);

  return (
    <div className="w-full p-8 bg-white rounded-lg">
      <div className='flex items-center mr-2 mb-5 after:content-[""] after:h-[1px] after:w-full after:ml-2 after:bg-[#000]'>
        <Boxes className="min-w-6 h-6 mr-2 text-[#000000]" />
        <h4 className="text-[14px] whitespace-nowrap uppercase">
          {t(`${base}.boardingInformation`)}
        </h4>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {transportItems.map((item) => (
          <TransportItem
            key={item.label}
            value={item.value || "--"}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardingInformation;
