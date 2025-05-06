import { OrderItemData } from "@/contracts";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Boxes } from "lucide-react";

interface EditBoardingProps {
  onSuccess: (data: DatesProps) => void;
  onClose: () => void;
  orderItem: OrderItemData;
  loading: boolean;
}

export interface DatesProps {
  customs_broker_process: string;
  fob_value: string;
  cargo_type: string;
}

const EditBoarding: React.FC<EditBoardingProps> = ({
  onSuccess,
  onClose,
  orderItem,
  loading,
}) => {
  const { t } = useTranslation();
  const base = "comex.operational.orderItem.tracking";
  const formRef = useRef<FormHandles>(null);

  const [dates, setDates] = useState<DatesProps>({
    customs_broker_process: orderItem.customs_broker_process || "",
    fob_value: orderItem.fob_value || "",
    cargo_type: orderItem.cargo_type || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDates((prev) => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="w-full p-8 bg-white rounded-lg">
      <div className='flex items-center mr-2 mb-5 after:content-[""] after:h-[1px] after:w-full after:ml-2 after:bg-[#000]'>
        <Boxes className="min-w-6 h-6 mr-2 text-[#000000]" />
        <h4 className="text-[14px] whitespace-nowrap uppercase">
          {t(`${base}.boardingInformation`)}
        </h4>
      </div>
      <Form
        ref={formRef}
        onSubmit={() => onSuccess(dates)}
        initialData={orderItem}
      >
        <div className="grid grid-cols-1 gap-y-4">
          <div className="w-full">
            <label className="block mb-1 text-sm text-gray-900 font-GilroySemibold">
              {t(`${base}.customsBrokerProcess`)}:
            </label>
            <input
              name="customs_broker_process"
              type="text"
              value={dates.customs_broker_process}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-sm border rounded"
            />
          </div>

          <div className="w-full">
            <label className="block mb-1 text-sm text-gray-900 font-GilroySemibold">
              {t(`${base}.fobValue`)}:
            </label>
            <input
              name="fob_value"
              type="text"
              value={dates.fob_value}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-sm border rounded"
            />
          </div>

          <div className="w-full">
            <label className="block mb-1 text-sm text-gray-900 font-GilroySemibold">
              {t(`${base}.cargoType`)}:
            </label>
            <input
              name="cargo_type"
              type="text"
              maxLength={3}
              value={dates.cargo_type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-sm border rounded"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button type="reset" onClick={onClose} className="text-gray-600">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center px-4 py-2 text-white rounded-lg bg-primary min-w-20 min-h-10"
            >
              {loading ? (
                <svg
                  className="w-4 h-4 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Salvar"
              )}
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditBoarding;
