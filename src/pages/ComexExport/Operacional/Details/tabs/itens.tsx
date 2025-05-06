import { Separator } from "@/components/ui/separator";
import { ExportOrder } from "@/contracts/exportOrder";
import { Package2 } from "lucide-react";
import React from "react";

const Items: React.FC<{ order: ExportOrder }> = ({ order }) => {
  return (
    <div className=" flex flex-col gap-4 bg-white h-full">
      <div className=" flex flex-col gap-4 rounded-sm p-4">
        {!order.items.length && <p>Sem items para mostrar...</p>}
        {order.items.map((item, index) => {
          return (
            <>
              <div className="flex justify-between">
                <p className="flex gap-3 font-GilroySemibold text-[16px]">
                  {" "}
                  <Package2 /> Produto: {item.product.description}
                </p>
                <p className="flex gap-3 font-GilroySemibold text-[16px]">
                  {" "}
                  Item: {item.item}
                </p>
                <p className="flex gap-3 font-GilroySemibold text-[16px]">
                  {" "}
                  Quantidade: {item.qty}
                </p>
              </div>
              {index+1 !== order.items.length ? <Separator /> : <></>}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Items;
