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
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/ButtonGs";
import DatePickerGs from "@/components/ui/Forms/datePickerGs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { CompanyActions } from "@/store/ducks";
import { useMutation } from "@tanstack/react-query";
import { createHoliday } from "@/queries/Holidays/createHoliday";
import { notify } from "@/services";

const Create = () => {
  const navigate = useNavigate();
  const { hasPermissionTo } = usePermission();
  const defaultFormValues = {
    name: "",
    boolean: false,
  };

  const dispatch = useDispatch();
  const { data, loading: companyLoading } = useSelector(
    (state: RootState) => state.company
  );
  const form = useForm<z.infer<typeof holidaySchema>>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(holidaySchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const {
    data: createdData,
    mutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ["create-holiday"],
    mutationFn: (data: HolidayType) => createHoliday(data),
  });
  const navigatorOptions: InnerNavigatorOption[] = useMemo(
    () => [
      {
        title: "Feriados",
        route: "/config/holidays",
        hasPermission: hasPermissionTo("LISTHOLIDAY"),
      },
      {
        title: "Novo feriado",
        route: "/config/holidays/novo",
        hasPermission: hasPermissionTo("CREATEHOLIDAY"),
      },
    ],
    [hasPermissionTo]
  );

  useEffect(() => {
    dispatch(CompanyActions.request());
  }, []);
  useEffect(() => {
    if (isSuccess) {
      notify('success', "Feriado cadastrado.")
      navigate(`/config/holidays/`);
    }
  }, [isSuccess]);
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
                  disabled={false}
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
                  disabled={companyLoading}
                  value={`${field.value}`}
                  onValueChange={(value) =>
                    form.setValue("companyId", parseInt(value))
                  }
                  content={
                    data?.map((e: any) => ({
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
                <CheckboxGs {...field} label="É fixo?" disabled={false} />
              )}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button.Root
              variant="secondary"
              size="sm"
              type="reset"
              onClick={() => {
                navigate(-1);
              }}
            >
              Voltar
            </Button.Root>
            <Button.Root disabled={isPending} size="sm" type="submit">
              Cadastrar
            </Button.Root>
          </div>
        </form>
      </Form>
    </section>
  );
};
export default Create;
