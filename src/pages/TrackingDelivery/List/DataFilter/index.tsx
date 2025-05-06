import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter } from "lucide-react";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ComboboxGs, InputGs } from "@/components/ui/Forms";
import {
  extractCarriers,
  extractClients,
  extractOrigins,
  extractDestinations,
} from "@/utils/extractFilter";
import { Button } from "@/components/ui/button";
import DateRangePickerGs from "@/components/ui/Forms/dateRangePickerGs";
import { addDays, format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useTranslation } from "react-i18next";

export type TrackingDeliveryFilter = {
  documentNumber: string;
  carrierId: string;
  clientId: string;
  emissionDate: FilterDateBetween;
  deadlineDate: FilterDateBetween;
  deliveryDate: FilterDateBetween;
  origin: string;
  destination: string;
};

type FilterDateBetween = {
  from: Date | undefined;
  to: Date | undefined;
};

interface DataFilterProps {
  className?: string;
  onFilter: (data: TrackingDeliveryFilter) => void;
  clearFilters: () => void;
  options: any;
  handleStatusFilter: (status: string, checked: string | boolean) => void;
}

const parseDateString = (dateString: string): Date | undefined => {
  return dateString ? parseISO(dateString) : undefined;
};

export function DataFilter({
  className,
  options,
  handleStatusFilter,
  onFilter,
  clearFilters,
}: DataFilterProps) {
  const { documents, loading }: { documents: any; loading: boolean } =
    useSelector((state: RootState) => state.documentsList);
  const { data: filters } = useSelector(
    (state: RootState) => state.documentsFilter
  );
  const { t } = useTranslation();

  const form = useForm<TrackingDeliveryFilter>({
    defaultValues: {
      documentNumber: filters.formFilter.documentNumber,
      carrierId: filters.formFilter.carrierId,
      clientId: filters.formFilter.clientId,
      emissionDate: {
        from: filters.formFilter.emissionDateStart
          ? parseDateString(filters.formFilter.emissionDateStart)
          : addDays(new Date(), -31),
        to: filters.formFilter.emissionDateEnd
          ? parseDateString(filters.formFilter.emissionDateEnd)
          : new Date(),
      },
      deadlineDate: {
        from: filters.formFilter.deadlineDateStart
          ? parseDateString(filters.formFilter.deadlineDateStart)
          : undefined,
        to: filters.formFilter.deadlineDateEnd
          ? parseDateString(filters.formFilter.deadlineDateEnd)
          : undefined,
      },
      deliveryDate: {
        from: filters.formFilter.deliveryDateStart
          ? parseDateString(filters.formFilter.deliveryDateStart)
          : undefined,
        to: filters.formFilter.deliveryDateEnd
          ? parseDateString(filters.formFilter.deliveryDateEnd)
          : undefined,
      },
      origin: filters.formFilter.originCity,
      destination: filters.formFilter.destinationCity,
    },
  });
  const [isOpened, setIsOpened] = useState(false);

  const carriers = extractCarriers(documents || []);
  const clients = extractClients(documents || []);
  const origins = extractOrigins(documents || []);
  const destinations = extractDestinations(documents || []);

  useEffect(() => {
    if (filters.formFilter.filterCount > 0) {
      setIsOpened(true);
    }
  }, [filters.formFilter.filterCount]);

  const handleClearFilters = () => {
    form.reset({
      documentNumber: "",
      carrierId: "",
      clientId: "",
      emissionDate: {
        from: new Date(addDays(new Date(), -31)),
        to: new Date(),
      },
      deadlineDate: {
        from: undefined,
        to: undefined,
      },
      deliveryDate: {
        from: undefined,
        to: undefined,
      },
      origin: "",
      destination: "",
    });

    clearFilters();
  };

  return (
    <div
      id="dataFilter"
      className={cn(
        "flex flex-col w-full rounded-md bg-white px-6 py-4 shadow-sm shadow-slate-300",
        className
      )}
    >
      <nav className="flex justify-between">
        <div className="flex gap-4">
          {options.map((option: any, index: any) => (
            <div className="flex items-center gap-2" key={index}>
              <Checkbox
                id={option.id}
                checked={filters.statusFilter.includes(option.id)}
                onCheckedChange={(checked) => {
                  handleStatusFilter(option.id, checked);
                }}
              />
              <label
                htmlFor={option.id}
                className="text-sm cursor-pointer font-semibold text-slate-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          {filters.formFilter.filterCount > 0 && (
            <span className="text-xs">
              {filters.formFilter.filterCount} filtro(s) selecionado(s)
            </span>
          )}
          <Filter
            className="cursor-pointer"
            fill={isOpened ? "#1E293B" : "none"}
            color="#1E293B"
            size={16}
            onClick={() => {
              setIsOpened(!isOpened);
            }}
          />
        </div>
      </nav>
      {isOpened && (
        <div id="filterForm" className="border-t-slate-300 border-t pt-3 mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onFilter)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="documentNumber"
                  render={({ field }) => (
                    <InputGs
                      {...field}
                      label={t("trackingDelivery.fields.documentNumber")}
                      placeholder={t("trackingDelivery.fields.documentNumber")}
                      disabled={loading}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="emissionDate"
                  render={({ field }) => (
                    <DateRangePickerGs
                      label={t("trackingDelivery.fields.emissionDate")}
                      selected={{
                        from: field.value?.from
                          ? new Date(field.value.from)
                          : addDays(new Date(), -31),
                        to: field.value?.to
                          ? new Date(field.value.to)
                          : new Date(),
                      }}
                      onSelect={field.onChange}
                      loading={loading}
                      disabled="future"
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="deadlineDate"
                  render={({ field }) => (
                    <DateRangePickerGs
                      label={t("trackingDelivery.fields.deadlineDate")}
                      selected={{
                        from: field.value?.from
                          ? new Date(field.value.from)
                          : undefined,
                        to: field.value?.to
                          ? new Date(field.value.to)
                          : undefined,
                      }}
                      onSelect={field.onChange}
                      loading={loading}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryDate"
                  render={({ field }) => (
                    <DateRangePickerGs
                      label={t("trackingDelivery.fields.deliveryDate")}
                      selected={{
                        from: field.value?.from
                          ? new Date(field.value.from)
                          : undefined,
                        to: field.value?.to
                          ? new Date(field.value.to)
                          : undefined,
                      }}
                      onSelect={field.onChange}
                      loading={loading}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="origin"
                  render={({ field }) => (
                    <ComboboxGs
                      {...field}
                      label={t("trackingDelivery.fields.origin")}
                      fieldName="origin"
                      form={form}
                      content={origins}
                      fieldValue={field.value}
                      loading={loading}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <ComboboxGs
                      {...field}
                      label={t("trackingDelivery.fields.destination")}
                      fieldName="destination"
                      form={form}
                      content={destinations}
                      fieldValue={field.value}
                      loading={loading}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="carrierId"
                  render={({ field }) => (
                    <ComboboxGs
                      {...field}
                      label={t("trackingDelivery.fields.carrier")}
                      fieldName="carrierId"
                      form={form}
                      content={carriers}
                      fieldValue={field.value}
                      loading={loading}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientId"
                  render={({ field }) => (
                    <ComboboxGs
                      {...field}
                      label={t("trackingDelivery.fields.client")}
                      fieldName="clientId"
                      form={form}
                      content={clients}
                      fieldValue={field.value}
                      loading={loading}
                    />
                  )}
                />
              </div>
              <Button
                disabled={loading}
                className="mt-4 bg-primary-500"
                type="submit"
              >
                {t("trackingDelivery.filterForm.applyFilters")}
              </Button>
              <Button
                disabled={loading}
                className="mt-4 ml-4 bg-gray-400"
                type="button"
                onClick={handleClearFilters}
              >
                {t("trackingDelivery.filterForm.clearFilters")}
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
