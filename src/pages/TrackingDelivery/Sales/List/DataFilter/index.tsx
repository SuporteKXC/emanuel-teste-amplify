import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter } from "lucide-react";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ComboboxGs, InputGs } from "@/components/ui/Forms";
import { Button } from "@/components/ui/button";
import DateRangePickerGs from "@/components/ui/Forms/dateRangePickerGs";
import { addDays, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useTranslation } from "react-i18next";
import { SwitchGs } from "@/components/ui/Forms/switchGs";

export type TrackingDeliveryFilter = {
  orderReference: string;
  sellType: string;
  deliveryDocumentNumber: string;
  documentNumber: string;
  plantCode: string;
  justification: boolean;
  emissionDate: FilterDateBetween;
  deadlineDate: FilterDateBetween;
  deliveryDate: FilterDateBetween;
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
  const { data, loading } = useSelector(
    (state: RootState) => state.salesOrderIndex
  );
  const { data: filters } = useSelector(
    (state: RootState) => state.salesOrderFilter
  );

  const { t } = useTranslation();
  const base = "salesOrder.filter";

  const sellTypeData = [{
    name: t(`${base}.import`),
    value: "import"
  },
  {
    name: t(`${base}.export`),
    value: "export"
  }];

  const form = useForm<TrackingDeliveryFilter>({
    defaultValues: {
      sellType: filters.formFilter.sellType,
      orderReference: filters.formFilter.orderReference,
      deliveryDocumentNumber: filters.formFilter.deliveryDocumentNumber,
      documentNumber: filters.formFilter.documentNumber,
      plantCode: filters.formFilter.plantCode,
      justification: filters.formFilter.justification,
      emissionDate: {
        from: filters.formFilter.emissionDateStart
          ? parseDateString(filters.formFilter.emissionDateStart)
          : undefined,
        to: filters.formFilter.emissionDateEnd
          ? parseDateString(filters.formFilter.emissionDateEnd)
          : undefined,
      },
      deadlineDate: {
        from: filters.formFilter.deadlineDateStart
          ? parseDateString(filters.formFilter.deadlineDateStart)
          : addDays(new Date(), -30),
        to: filters.formFilter.deadlineDateEnd
          ? parseDateString(filters.formFilter.deadlineDateEnd)
          : new Date(),
      },
      deliveryDate: {
        from: filters.formFilter.deliveryDateStart
          ? parseDateString(filters.formFilter.deliveryDateStart)
          : undefined,
        to: filters.formFilter.deliveryDateEnd
          ? parseDateString(filters.formFilter.deliveryDateEnd)
          : undefined,
      },
    },
  });
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (filters.formFilter.filterCount > 0) {
      setIsOpened(true);
    }
  }, [filters.formFilter.filterCount]);

  const handleClearFilters = () => {
    form.reset({
      sellType: "",
      orderReference: "",
      deliveryDocumentNumber: "",
      documentNumber: "",
      plantCode: "",
      justification: false,
      emissionDate: {
        from: undefined,
        to: undefined,
      },
      deadlineDate: {
        from: new Date(addDays(new Date(), -31)),
        to: new Date(),
      },
      deliveryDate: {
        from: undefined,
        to: undefined,
      },
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
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="sellType"
                render={({ field }) => (
                  <ComboboxGs
                    {...field}
                    label={t(`${base}.sellType`)}
                    fieldName="sellType"
                    form={form}
                    content={sellTypeData}
                    fieldValue={field.value}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="orderReference"
                render={({ field }) => (
                  <InputGs
                    {...field}
                    label={t(`${base}.salesOrder`)}
                    placeholder={t(`${base}.salesOrder`)}
                    disabled={loading}
                  />
                )}
                />
                <FormField
                  control={form.control}
                  name="deliveryDocumentNumber"
                  render={({ field }) => (
                    <InputGs
                      {...field}
                      label={t(`${base}.deliveryDocumentNumber`)}
                      placeholder={t(`${base}.deliveryDocumentNumber`)}
                      disabled={loading}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="documentNumber"
                  render={({ field }) => (
                    <InputGs
                      {...field}
                      label={t(`${base}.documentNumber`)}
                      placeholder={t(`${base}.documentNumber`)}
                      disabled={loading}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="plantCode"
                  render={({ field }) => (
                    <InputGs
                      {...field}
                      label={t(`${base}.plantCode`)}
                      placeholder={t(`${base}.plantCode`)}
                      disabled={loading}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="deadlineDate"
                  render={({ field }) => (
                    <DateRangePickerGs
                      label={t(`${base}.dataPrazo`)}
                      selected={{
                        from: field.value?.from
                          ? new Date(field.value.from)
                          : addDays(new Date(), -30),
                        to: field.value?.to
                          ? new Date(field.value.to)
                          : new Date(),
                      }}
                      onSelect={field.onChange}
                      loading={loading}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="emissionDate"
                  render={({ field }) => (
                    <DateRangePickerGs
                      label={t(`${base}.dataEmissao`)}
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
                      disabled="future"
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryDate"
                  render={({ field }) => (
                    <DateRangePickerGs
                      label={t(`${base}.dataEntrega`)}
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
                <div className="justify-start flex items-center">
                  <FormField
                    control={form.control}
                    name="justification"
                    render={({ field }) => (
                      <SwitchGs
                        label={t(`${base}.justJustifications`)}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        {...field}
                      />
                    )}
                  />
                </div>
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
