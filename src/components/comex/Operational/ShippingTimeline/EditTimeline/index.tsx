import { OrderItemData } from "@/contracts";
import { RootState } from "@/store";
import { FormField, Form } from "@/components/ui/form";
import { InputGs } from "@/components/ui/Forms";
import { Button } from "@/components/ui/ButtonGs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import DatePickerGs from "@/components/ui/Forms/datePickerGs";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

interface Props {
  orderItem: OrderItemData;
  onSubmit: (data: TimelineDates) => void;
  onCancel: () => void;
}

interface ComplementaryDates {
  name: string;
  label: string;
}
const complementaryData: ComplementaryDates[] = [
  {
    name: "docs_received_date",
    label: "Aguardando DOCs",
  },
  {
    name: "protocol_mapa_in26_date",
    label: "Aguardando Protocolo LI",
  },
  {
    name: "post_import_license_release_date",
    label: "Aguardando Deferimento LI",
  },
  {
    name: "transport_doc_delivery_date",
    label: "Doc. Transporte",
  },
];
interface TimelineDates {
  [key: string]: string | Date | null;
}

const isValidDateRange = (date: Date) =>
  date > new Date("2020-01-01") && date < new Date("2100-12-31");

const EditTimeline: React.FC<Props> = ({ orderItem, onSubmit, onCancel }) => {
  const [timelineDates, setTimelineDates] = useState<TimelineDates>({});
  const { loading } = useSelector((state: RootState) => state.updateOrderItem);

  const form = useForm({
    defaultValues: timelineDates,
  });

  const timeline = useMemo(() => {
    const aux = [...(orderItem.timeline_type?.timelines || [])];
    aux.sort((a, b) => (a.step > b.step ? 1 : -1));
    return aux;
  }, [orderItem.timeline_type]);

  const [initialDates, setInitialDates] = useState<TimelineDates>({});

  const changeDates = (date: string | Date, field: string) => {
    setTimelineDates((prev) => ({
      ...prev,
      [field]: isValidDateRange(new Date(date))
        ? new Date(date).toISOString()
        : "",
    }));
  };

  useEffect(() => {
    const newTimelineDates: TimelineDates = {};
    timeline.forEach((item) => {
      newTimelineDates[item.field] = orderItem[item.field];
    });
    complementaryData.forEach((item) => {
      newTimelineDates[item.name] = orderItem[item.name];
    });
    setTimelineDates(newTimelineDates);
    setInitialDates(newTimelineDates);
  }, [timeline, orderItem]);

  const hasChanges = useCallback(() => {
    const normalize = (val: string | Date | null) =>
      val instanceof Date ? val.toISOString() : val || "";

    return Object.keys(initialDates).some((key) => {
      return normalize(timelineDates[key]) !== normalize(initialDates[key]);
    });
  }, [timelineDates, initialDates]);

  const renderTimelineFields = useCallback(() => {
    return timeline.map((item) => (
      <>
        <div
          className="grid grid-cols-[1fr_1fr] gap-1 items-center"
          key={item.step}
        >
          <FormField
            control={form.control}
            name={item.field}
            render={({ field }) => (
              <DatePickerGs
                {...field}
                fieldValue={
                  timelineDates[item.field]
                    ? new Date(timelineDates[item.field]!)
                    : null
                }
                label={item.description}
                fieldOnChange={(date) => changeDates(date, item.field)}
              />
            )}
          />
          {item.aux_field ? (
            <FormField
              control={form.control}
              name={item.aux_field}
              render={({ field }) => (
                <InputGs
                  {...field}
                  label="Número"
                  value={[orderItem[item.aux_field]]}
                />
              )}
            />
          ) : null}
        </div>
      </>
    ));
  }, [timeline, timelineDates, form.control, changeDates]);

  return (
    <div className="bg-white p-8 rounded-lg w-full">
      <h2 className="mb-4">Editar Timeline:</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {
            hasChanges() ? onSubmit(timelineDates) : onCancel();
          })}
        >
          <section className="grid grid-cols-2 grid-rows-6 grid-flow-col gap-y-2 gap-x-6 w-max ">
            {renderTimelineFields()}
          </section>
          <DropdownMenuSeparator />
          <section
            className={`grid grid-cols-${complementaryData.length} my-6 gap-y-2 gap-2 w-max`}
          >
            {complementaryData.map((item) => (
              <FormField
                key={item.name}
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <DatePickerGs
                    {...field}
                    fieldValue={
                      timelineDates[item.name]
                        ? new Date(timelineDates[item.name]!)
                        : null
                    }
                    label={item.label}
                    fieldOnChange={(date) => changeDates(date, item.name)}
                  />
                )}
              />
            ))}
          </section>
          <div className="flex justify-end gap-4">
            <Button.Root
              variant="secondary"
              size="sm"
              type="reset"
              onClick={() => {
                form.reset();
                onCancel();
              }}
            >
              Cancelar
            </Button.Root>
            <Button.Root size="sm" type="submit" disabled={loading}>
              {!loading ? "Salvar" : "..."}
            </Button.Root>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditTimeline;
