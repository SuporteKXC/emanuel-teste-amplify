import { usePermission } from "@/hooks";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { holidaySchema, HolidayType } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InnerNavigator,
  InnerNavigatorOption,
} from "@/components/ui/InnerNavigator";
import { Form, FormField } from "@/components/ui/form";
import { CheckboxGs, InputGs, SelectGs } from "@/components/ui/Forms";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/ButtonGs";
import DatePickerGs from "@/components/ui/Forms/datePickerGs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { CompanyActions } from "@/store/ducks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { HolidayApi } from "@/queries/Holidays";
import { getHoliday } from "@/queries/Holidays/getHoliday";
import { notify } from "@/services";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the holiday ID from URL params
  const { hasPermissionTo } = usePermission();
  
  const dispatch = useDispatch();
  const { data: companies, loading: companyLoading } = useSelector(
    (state: RootState) => state.company
  );
  
  const { data: holidayData, isLoading: isHolidayLoading } = useQuery({
    queryKey: ['holiday', id],
    queryFn: () => HolidayApi.getHoliday(parseInt(id!)!),
    enabled: !!id, 
  });
  
  const form = useForm<z.infer<typeof holidaySchema>>({
    resolver: zodResolver(holidaySchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  
  useEffect(() => {
    if (holidayData) {
      form.reset({
        name: holidayData.name,
        holidayDate: new Date(holidayData.holidayDate),
        companyId: holidayData.companyId,
        fixed: !!holidayData.fixed,
      });
    }
  }, [holidayData, form]);
  
  // Mutation for updating holiday
  const {
    mutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ["update-holiday"],
    mutationFn: (data: HolidayType) => HolidayApi.updateHoliday(parseInt(id!), data),
  });
  
  const navigatorOptions: InnerNavigatorOption[] = useMemo(
    () => [
      {
        title: "Feriados",
        route: "/config/holidays",
        hasPermission: hasPermissionTo("LISTHOLIDAY"),
      },
      {
        title: "Editar feriado",
        route: `/config/holidays/editar/${id}`,
        hasPermission: hasPermissionTo("UPDATEHOLIDAY"),
      },
    ],
    [hasPermissionTo, id]
  );

  useEffect(() => {
    dispatch(CompanyActions.request());
  }, []);
  
  useEffect(() => {
    if (isSuccess) {
      notify("success", "Feriado atualizado.")
      navigate(`/config/holidays/`);
    }
  }, [isSuccess]);
  
  if (isHolidayLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <section className="w-full flex flex-col gap-6">
      <InnerNavigator options={navigatorOptions} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutate(data))}
          className="flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white rounded-lg p-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <InputGs
                  {...field}
                  label="Nome do feriado"
                  placeholder="..."
                  disabled={isPending}
                />
              )}
            />
            <FormField
              control={form.control}
              name="holidayDate"
              render={({ field }) => (
                <DatePickerGs
                  {...field}
                  label={"Data"}
                  maxDate={new Date("31/12/2100")}
                  fieldValue={field.value ? new Date(field.value) : new Date()}
                  fieldOnChange={field.onChange}
                />
              )}
            />
            <FormField
              control={form.control}
              name="companyId"
              render={({ field }) => (
                <SelectGs
                  {...field}
                  label={"Empresa"}
                  disabled={companyLoading || isPending}
                  value={`${field.value}`}
                  onValueChange={(value) =>
                    form.setValue("companyId", parseInt(value))
                  }
                  content={
                    companies?.map((e: any) => ({
                      name: e.name_fantasy,
                      value: e.id.toString(),
                    })) || []
                  }
                />
              )}
            />
            <FormField
              control={form.control}
              name="fixed"
              render={({ field }) => (
                <CheckboxGs 
                  {...field} 
                  label="É fixo?" 
                  defaultChecked={field.value}
                  disabled={isPending} 
                />
              )}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button.Root
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => {
                navigate(-1);
              }}
              disabled={isPending}
            >
              Voltar
            </Button.Root>
            <Button.Root disabled={isPending} size="sm" type="submit">
              Atualizar
            </Button.Root>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default Update;