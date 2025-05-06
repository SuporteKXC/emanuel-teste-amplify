import React, { useCallback } from "react";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  ComboboxContentProps,
  ComboboxGs,
  InputGs,
} from "@/components/ui/Forms";
import DateRangePickerGs from "@/components/ui/Forms/dateRangePickerGs";
import { addDays, format } from "date-fns";
import { Button } from "@/components/ui/ButtonGs";
import { DeliveryVoucherFilter } from "@/store/ducks/trackingDelivery/delivery-vouchers";
import { extractCarriers, extractClients } from "./utils";
import { DeliveryVoucher } from "@/contracts/trackingDelivery";

type FilterFormProps = {
  initialValues: DeliveryVoucherFilter;
  onSubmit: (data: Partial<DeliveryVoucherFilter>) => void;
  isLoading: boolean;
  data: DeliveryVoucher[];
  isReport?: boolean;
};

type FormValues = {
  documentNumber: string;
  emissionDate: {
    from: Date;
    to: Date;
  };
  deliveryDate: {
    from: Date | undefined;
    to: Date | undefined;
  };
  origin: string;
  destination: string;
  carrierId: string;
  clientId: string;
};

export const FilterForm: React.FC<FilterFormProps> = ({
  initialValues,
  onSubmit,
  isLoading,
  data,
  isReport,
}) => {
  const carriers = extractCarriers(data);
  const clients = extractClients(data);

  const form = useForm({
    defaultValues: {
      documentNumber: initialValues.documentNumber,
      emissionDate: {
        from: initialValues.emissionDateStart
          ? new Date(initialValues.emissionDateStart)
          : addDays(new Date(), -31),
        to: initialValues.emissionDateEnd
          ? new Date(initialValues.emissionDateEnd)
          : new Date(),
      },
      deliveryDate: {
        from: initialValues.deliveryDateStart
          ? new Date(initialValues.deliveryDateStart)
          : undefined,
        to: initialValues.deliveryDateEnd
          ? new Date(initialValues.deliveryDateEnd)
          : undefined,
      },
      origin: initialValues.originCity,
      destination: initialValues.destinationCity,
      carrierId: initialValues.carrierId,
      clientId: initialValues.clientId,
    },
  });

  const handleSubmit = (data: FormValues) => {
    const filterObject: Partial<DeliveryVoucherFilter> = {};

    if (data.documentNumber) {
      filterObject.documentNumber = data.documentNumber;
    }

    if (data.carrierId) {
      filterObject.carrierId = data.carrierId;
    }

    if (data.clientId) {
      filterObject.clientId = data.clientId;
    }

    if (data.origin) {
      filterObject.originCity = data.origin;
    }

    if (data.destination) {
      filterObject.destinationCity = data.destination;
    }

    if (data.emissionDate) {
      filterObject.emissionDateStart = format(
        data.emissionDate.from,
        "yyyy-MM-dd"
      );
      filterObject.emissionDateEnd = format(data.emissionDate.to, "yyyy-MM-dd");
    }

    if (data.deliveryDate) {
      filterObject.deliveryDateStart = data.deliveryDate.from
        ? format(data.deliveryDate.from, "yyyy-MM-dd")
        : undefined;
      filterObject.deliveryDateEnd = data.deliveryDate.to
        ? format(data.deliveryDate.to, "yyyy-MM-dd")
        : undefined;
    }

    onSubmit(filterObject);
  };

  const handleReset = useCallback(() => {
    form.reset({
      documentNumber: "",
      emissionDate: {
        from: addDays(new Date(), -31),
        to: new Date(),
      },
      deliveryDate: {
        from: undefined,
        to: undefined,
      },
      origin: "",
      destination: "",
      carrierId: "",
      clientId: "",
    });
  }, [form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6"
      >
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="documentNumber"
            render={({ field }) => (
              <InputGs
                {...field}
                label="NF"
                placeholder="Número da nota fiscal"
                disabled={isLoading}
              />
            )}
          />
          <FormField
            control={form.control}
            name="emissionDate"
            render={({ field }) => (
              <DateRangePickerGs
                label="Dt. Emissão"
                selected={{
                  from: field.value.from,
                  to: field.value.to,
                }}
                onSelect={field.onChange}
                loading={isLoading}
                disabled="future"
              />
            )}
          />
          <FormField
            control={form.control}
            name="deliveryDate"
            render={({ field }) => (
              <DateRangePickerGs
                label="Dt. Entrega"
                selected={{
                  from: field.value.from,
                  to: field.value.to,
                }}
                onSelect={field.onChange}
                loading={isLoading}
              />
            )}
          />
          <FormField
            control={form.control}
            name="carrierId"
            render={({ field }) => (
              <ComboboxGs
                {...field}
                label="Transportadora"
                fieldName="carrierId"
                form={form}
                content={carriers ?? []}
                fieldValue={field.value}
                loading={isLoading}
              />
            )}
          />
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <ComboboxGs
                {...field}
                label="Cliente"
                fieldName="clientId"
                form={form}
                content={clients ?? []}
                fieldValue={field.value}
                loading={isLoading}
              />
            )}
          />
        </div>
        <div className="flex gap-2 justify-end">
          <Button.Root
            variant="secondary"
            size="sm"
            onClick={() => handleReset()}
          >
            Limpar
          </Button.Root>
          <Button.Root size="sm" type="submit">
            {isReport && "Gerar"}
            {!isReport && "Filtrar"}
          </Button.Root>
        </div>
      </form>
    </Form>
  );
};
