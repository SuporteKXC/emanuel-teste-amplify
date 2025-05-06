import { OrderItemData } from "@/contracts";
import { RootState } from "@/store";
import { Form } from "@unform/web";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DatePickerUnform } from "components/shared/Forms/DatePickerUnform";
import { FormHandles } from "@unform/core";

interface EditPrevisionProps {
  onSuccess: (data: DatesProps) => void;
  onClose: () => void;
  orderItem: OrderItemData;
}

export interface DatesProps {
  etd_date: string | Date;
  eta_date: string | Date;
  revised_eta_date: string | Date;
  gr_actual: string | Date;
}

const EditPrevision: React.FC<EditPrevisionProps> = ({
  onSuccess,
  onClose,
  orderItem,
}) => {
  const { t } = useTranslation();
  const formRef = useRef<FormHandles>(null);
  const initialDates: DatesProps = {
    etd_date: orderItem.etd_date ? new Date(orderItem.etd_date) : "",
    eta_date: orderItem.eta_date ? new Date(orderItem.eta_date) : "",
    revised_eta_date: orderItem.revised_eta_date
      ? new Date(orderItem.revised_eta_date)
      : "",
    gr_actual: orderItem.gr_actual ? new Date(orderItem.gr_actual) : "",
  };
  const [dates, setDates] = useState<DatesProps>(initialDates);

  const handleSubmit = () => {
    const format = (d: string | Date) =>
      d instanceof Date ? d.toISOString() : "";

    const hasChanged = Object.keys(initialDates).some(
      (key) => format(dates[key as keyof DatesProps]) !== format(initialDates[key as keyof DatesProps])
    );
    hasChanged ? onSuccess(dates) : onClose();
  };
  return (
    <Form
      ref={formRef}
      initialData={orderItem as OrderItemData}
      placeholder=""
      onSubmit={() => {
        handleSubmit();
      }}
    >
      <div className="grid grid-cols-1 gap-y-4">
        <div className="w-max">
          <p className="font-GilroySemibold text-14 text-gray-900">
            ETD ({t("comex.operational.orderItem.tracking.ETDFull")}):
          </p>

          <DatePickerUnform
            onChangeRaw={(e: any) => e.preventDefault()}
            maxDate={new Date("31/12/2100")}
            minDate={new Date("01/01/2020")}
            dateFormat="dd/MM/yyyy"
            selected={dates.etd_date}
            onChange={(date: string | Date) =>
              setDates({ ...dates, etd_date: date })
            }
            name="etd_date"
          />
        </div>
        <div className="w-max">
          <p className="font-GilroySemibold text-14 text-gray-900">
            ETA ({t("comex.operational.orderItem.tracking.ETAFull")}):
          </p>

          <DatePickerUnform
            onChangeRaw={(e: any) => e.preventDefault()}
            maxDate={new Date("31/12/2100")}
            minDate={new Date("01/01/2020")}
            dateFormat="dd/MM/yyyy"
            selected={dates.eta_date}
            onChange={(date: string | Date) =>
              setDates({ ...dates, eta_date: date })
            }
            name="eta_date"
          />
        </div>
        <div className="w-max">
          <p className="font-GilroySemibold text-14 text-gray-900">
            ETA Revisado:
          </p>

          <DatePickerUnform
            onChangeRaw={(e: any) => e.preventDefault()}
            maxDate={new Date("31/12/2100")}
            minDate={new Date("01/01/2020")}
            dateFormat="dd/MM/yyyy"
            selected={dates.revised_eta_date}
            onChange={(date: string | Date) =>
              setDates({ ...dates, revised_eta_date: date })
            }
            name="revised_eta_date"
          />
        </div>
        <div className="w-max">
          <p className="font-GilroySemibold text-14 text-gray-900">GR Atual:</p>
          <DatePickerUnform
            onChangeRaw={(e: any) => e.preventDefault()}
            maxDate={new Date("31/12/2100")}
            minDate={new Date("01/01/2020")}
            dateFormat="dd/MM/yyyy"
            selected={dates.gr_actual}
            className="w-full"
            onChange={(date: any) => setDates({ ...dates, gr_actual: date })}
            name="gr_actual"
          />
        </div>
        <div className="flex justify-around">
          <button className="top-2" type="reset" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="bg-primary text-white py-2 px-4 rounded-lg"
            type="submit"
          >
            Salvar
          </button>
        </div>
      </div>
    </Form>
  );
};

export default EditPrevision;
