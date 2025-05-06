import {
  InnerNavigatorOption,
  InnerNavigator,
} from "@/components/ui/InnerNavigator";
import { Form, FormField } from "@/components/ui/form";
import { usePermission } from "@/hooks";
import { AppDispatch, RootState } from "@/store";
import React, { FC, useCallback, useEffect, useState } from "react";
import {
  CheckboxGs,
  InputGs,
  SelectGs
} from "@/components/ui/Forms";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/ButtonGs";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NewSupplierActions, UserActions } from "@/store/ducks";
import { CreateSupplier as ICreateSupplier } from "@/store/ducks"
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import DatePickerGs from "@/components/ui/Forms/datePickerGs";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface IProps {}

/**
 * @author
 * @function @CreateSupplier
 **/

type FormData = {
  code: string;
  description: string;
  isSpecial: boolean;
  userSupplier: {
    user_id: string | undefined
    expired_at: Date | null
  }[];
}

const schema = z.object({
  code: z.string({
    required_error: "Codigo Obrigatório"
  })
  .min(1, {
    message: "Deve ter ao menos 1 Carácter"
  }).trim(),
  description: z.string({
    required_error: "Codigo Fornecedor Obrigatório"
  })
  .min(1, {
    message: "Deve ter ao menos 1 Carácter"
  })
  .trim(),
  isSpecial: z.boolean(),
  userSupplier: z.object({
    user_id: z.string({
      required_error: "Usuario Obrigatório"
    }).trim(),
    expired_at: z.date({
      required_error: "Data de Expiração Obrigatório",
      invalid_type_error: "Campo de Data Obrigatório"
    })
  })
  .array()
  .min(0),
});

export const CreateSupplier: FC<IProps> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { hasPermissionTo } = usePermission();
  const [_, setIsUpdatingSet] = useState(new Set());
  const [userOptions, setUserOptions] = useState<{name:string,value:string}[]>([]);

  const { loading: submitLoading } = useSelector(
    (state: RootState) => state.newSupplier
  );

  const fetchUsers = useCallback(() => {
    dispatch(UserActions.request("", onSuccess));
  }, []);

  const onSuccess = useCallback((data: any[]): void => {
    setIsUpdatingSet(new Set());
    const options = data.map((e) => {
      return { name: e.name, value: e.id };
    });
    setUserOptions(options);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const navigatorOptions: InnerNavigatorOption[] = [
    {
      title: t("general.asideMenu.config.suppliers.title"),
      route: "/config/suppliers",
      hasPermission: true,
    },
    {
      title: t("comex.filterandButton.addSupplier"),
      route: "/config/suppliers/novo",
      hasPermission: hasPermissionTo("CREATESUPPLIER", "LISTUSER"),
    },
  ];

  const handleSubmitSuccess = (id:string )=>{
    navigate(`/config/suppliers`)
  }

  const handleSubmit = (data: FormData) => {
    const postObject: Partial<ICreateSupplier> = {};
    if (data.code) {
      postObject.code = data.code;
    }
    if (data.description) {
      postObject.description = data.description;
    }
    postObject.isSpecial = data.isSpecial ? 1 : 0
    postObject.user = data.userSupplier;

    dispatch(NewSupplierActions.request(postObject, handleSubmitSuccess))
  };

  const defaultFormValues: FormData = {
    code: "",
    description: "",
    isSpecial: false,
    userSupplier: []
  }

  const form = useForm({
    defaultValues: defaultFormValues,
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onSubmit"
  });

  const { fields, append, remove } = useFieldArray<FormData>({
    control: form.control,
    name: "userSupplier",
  });

  return (
    <section className="w-full flex flex-col gap-6">
      <InnerNavigator options={navigatorOptions} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white rounded-lg p-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <InputGs
                  {...field}
                  label="Código"
                  placeholder="Código do fornecedor"
                  disabled={false}
                />
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <InputGs
                  {...field}
                  label="Fornecedor"
                  placeholder="Nome fantasia do fornecedor"
                  disabled={false}
                />
              )}
            />
            <FormField
              control={form.control}
              name="isSpecial"
              render={({ field }) => (
                <CheckboxGs
                  {...field}
                  label="É exceção?"
                  disabled={false}
                />
              )}
            />
          </div>
          {fields.map((field, index) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white rounded-lg p-4" key={field.id}>
              <FormField
                {...form.register(`userSupplier.${index}.user_id` as const)}
                control={form.control}
                name={`userSupplier.${index}.user_id`}
                render={({ field }) => (
                  <SelectGs
                    {...field}
                    label={t("comex.filterandButton.user")}
                    content={userOptions ?? []}
                    value={field.value}
                    onValueChange={(value) =>
                      form.setValue(`userSupplier.${index}.user_id`, value)
                    }
                    required
                  />
                )}
              />
              <FormField
                {...form.register(`userSupplier.${index}.expired_at` as const)}
                control={form.control}
                name={`userSupplier.${index}.expired_at`}
                render={({ field }) => (
                  <DatePickerGs
                    {...field}
                    fieldValue={form.getValues(`userSupplier.${index}.expired_at`)}
                    label={t("comex.filterandButton.dateExpired")}
                    fieldOnChange={(date: Date) => form.setValue(`userSupplier.${index}.expired_at`, date)}
                    maxDate={new Date("31/12/2100")}
                  />
                )}
              />
              {(
                <div className="w-40 flex items-center justify-center justify-self-end">
                  <Button.Root
                    size="sm"
                    variant="danger"
                    type="button"
                    onClick={() => remove(index)}
                  >
                  <X />
                </Button.Root>
                </div>
              )}
            </div>
          ))}
          <div className="flex mt-2 justify-between gap-2">
            <Button.Root
              onClick={() => {
                append({ user_id: undefined, expired_at: null });
              }}
              type="button"
            >
              {t("comex.filterandButton.addUsuario")}
            </Button.Root>
          </div>
          <div className="flex gap-2 justify-end">
            <Button.Root 
              variant="secondary" 
              size="sm" 
              type="reset"
              onClick={() => {navigate(-1)}}
            >
              Voltar
            </Button.Root>
            <Button.Root disabled={submitLoading} size="sm" type="submit">
              Cadastrar
            </Button.Root>
          </div>
        </form>
      </Form>
    </section>
  );
};
