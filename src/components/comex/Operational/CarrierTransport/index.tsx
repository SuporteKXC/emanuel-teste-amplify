import { OrderItemData } from "@/contracts";
import React, { useMemo } from "react";
import iconPackage from "assets/icons/package.svg";
import { useTranslation } from "react-i18next";

interface CarrierTransportProps {
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

const CarrierTransport: React.FC<CarrierTransportProps> = ({ orderItem }) => {
  const { t } = useTranslation();
  const base = "comex.operational.orderItem.tracking";
  const transportItems = useMemo<Items[]>(() => {
    if (!orderItem) return [];
    return [
      {
        label: t(`${base}.carrierAgentCode`),
        value: orderItem?.carrier_code || "--",
      },
      {
        label: t(`${base}.carrierAgent`),
        value: orderItem?.agente_carga || "--",
      },
      {
        label: t(`${base}.shipName`),
        value: orderItem?.current_vessel || "--",
      },
      {
        label: t(`${base}.containerNumber`),
        value: orderItem?.container_code || "--",
      },
      { label: t(`${base}.carrier`), value: orderItem?.carrier || "--" },
      { label: "IMO: ", value: orderItem?.current_vessel_code || "--" },
    ];
  }, [orderItem, t]);

  return (
    <div className="w-full h-full p-8 bg-white rounded-lg">
      <div className='flex items-center mr-2 mb-5 after:content-[""] after:h-[1px] after:w-full after:ml-2 after:bg-[#000]'>
        <img src={iconPackage} className="mr-2" alt="" />
        <h4 className="text-[14px] whitespace-nowrap uppercase">
          {t(`${base}.transportInfo`)}
        </h4>
      </div>
      <div className="grid grid-cols-3 gap-2">
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

export default CarrierTransport;
