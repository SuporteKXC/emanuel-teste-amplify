import {
  InnerNavigatorOption,
  InnerNavigator,
} from "@/components/ui/InnerNavigator";
import { Form, FormField } from "@/components/ui/form";
import { usePermission } from "@/hooks";
import { AppDispatch, RootState } from "@/store";
import { FC, useCallback, useEffect, useState } from "react";
import {
  InputGs,
  SelectGs
} from "@/components/ui/Forms";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/ButtonGs";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { MultiComboboxGs } from "@/components/ui/Forms/multComboboxGs";
import {
  CreateUserSupplierActions,
  UpdateSupplierActions,
  UserActions,
  UserSupplierListActions,
} from "@/store/ducks";
import { useNavigate, useParams } from "react-router-dom";
import { CreateSupplier as ICreateSupplier } from "@/store/ducks";
import {
  ResponsibleSupplierListActions,
  DeleteSupplierResponsibleActions,
} from "@/store/ducks";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import DatePickerGs from "@/components/ui/Forms/datePickerGs";
// import * as Yup from "yup";
import { X } from "lucide-react";
import { Formatter } from "utils/Formatter";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface IProps {}

/**
 * @author
 * @function @EditSupplier
 **/

type FormValues = {
  code: string;
  description: string;
  isSpecial: boolean;
};

type FormUserValues = {
  user_id: string;
  expired_at: Date;
};

const schema = z.object({
  user_id: z.string().trim().min(1, "Selecione um Usuario"),
  expired_at: z.date({
    required_error: "Selecione uma Data"
  }),
});

export const EditSupplier: FC<IProps> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { hasPermissionTo } = usePermission();
  const [_, setIsUpdatingSet] = useState(new Set());
  const [userOptions, setUserOptions] = useState<
    { name: string; value: string }[]
  >([]);

  const { data: userSuppliers, loading: loadingList } = useSelector(
    (state: RootState) => state.responsibleSupplierList
  );

  const {loading: updateLoading} = useSelector(
    (state: RootState) => state.updateSupplier
  )
  const { loading: submitLoading } = useSelector(
    (state: RootState) => state.createUserSupplier
  );

  const fetchUsers = useCallback(() => {
    dispatch(UserActions.request("", onSuccess));
  }, []);

  const fetchUserSuppliers = useCallback(() => {
    dispatch(ResponsibleSupplierListActions.request(id));
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
    fetchUserSuppliers();
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

  const handleSubmitSuccess = (id: string) => {
    navigate(`/config/suppliers`);
  };
  const handleSubmit = (data: FormValues) => {
    const postObject: Partial<ICreateSupplier> = {};
    if (data.code) {
      postObject.code = data.code;
    }
    if (data.description) {
      postObject.description = data.description;
    }

    postObject.isSpecial = data.isSpecial ? 1 : 0;

    dispatch(UpdateSupplierActions.request(postObject,id,handleSubmitSuccess));
  };

  const handleUserSubmit = async (data: FormUserValues) => {
    const postData: Partial<{user_id: string; supplier_id: string; expired_at: Date}> = {};
    if (data.user_id) {
      postData.user_id = data.user_id;
    }
    if (id) {
      postData.supplier_id = id;
    }
    if (data.expired_at) {
      postData.expired_at = data.expired_at;
    }

    dispatch(CreateUserSupplierActions.request(postData, fetchUserSuppliers))
  };

  const defaultFormValues: FormUserValues = {
    user_id: "",
    expired_at: new Date()
  }

  const formUser = useForm({
    defaultValues: defaultFormValues,
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onSubmit"
  });

  const form = useForm({
    defaultValues: {
      code: userSuppliers?.code,
      description: userSuppliers?.description,
      isSpecial: userSuppliers?.is_special === 1 ? true : false,
    },
  });

  useEffect(() => {
    form.reset({
      code: userSuppliers?.code,
      description: userSuppliers?.description,
      isSpecial: userSuppliers?.is_special === 1 ? true : false,
    });
  }, [userSuppliers]);

  const handleDelete = (deleteId: number) => {
    dispatch(
      DeleteSupplierResponsibleActions.request(deleteId, () =>
        fetchUserSuppliers()
      )
    );
  };

  const renderUserSuppliers = () => {
    if (!userSuppliers?.user_suppliers.length) {
      return <Label className="font-black">{t("general.config.suppliers.userUndefined")}</Label>
    } else {
      return (
        <>
          <div className="grid grid-cols-3 gap-4 rounded-lg p-4" >
            <p className="font-bold font-GilroySemibold">{t("general.config.suppliers.user")}</p>
            <p className="font-bold font-GilroySemibold">{t("general.config.suppliers.dateExpired")}</p>
          </div>

          {userSuppliers?.user_suppliers?.map((resp: any) => (
            <div className="grid grid-cols-3 gap-4 bg-white rounded-lg p-4" key={resp.id}>
              <p className="font-bold font-GilroySemibold self-center">
                {resp?.user.name}
              </p>
              <p className="font-bold font-GilroySemibold self-center">
                {resp?.expired_at ? Formatter.date(resp?.expired_at, { format: "yyyy-MM-dd" }) : t("general.config.suppliers.dateUndefined")}
              </p>
              <div className="w-40 flex items-center justify-center justify-self-end">
                <Button.Root
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(resp.id)}
                >
                <X />
                </Button.Root>
              </div>
            </div>
          ))}
        </>
      )
    }
  };

  return (
    <section className="w-full flex flex-col gap-6">
      <InnerNavigator options={navigatorOptions} />
            <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white rounded-lg p-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <InputGs
                  {...field}
                  label={t("general.config.suppliers.code")}
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
                  label={t("general.config.suppliers.supplier")}
                  placeholder="Nome fantasia do fornecedor"
                  disabled={false}
                />
              )}
            />
            <FormField
              control={form.control}
              name="isSpecial"
              render={({ field }) => (
                <div className="items-center flex gap-2">
                  <Checkbox 
                    className="data-[state=checked]:bg-primary-500" 
                    checked={form.getValues("isSpecial")} 
                    onCheckedChange={field.onChange} 
                    disabled={false} 
                  />
                  <p className="font-GilroySemibold text-sm text-slate-800">{t("general.config.suppliers.exceptionAsk")}</p>
                </div>
              )}
            />
          </div>
          <div className="flex gap-2 justify-end items-end">
            <div className="flex gap-2 justify-end">
              <Button.Root
                variant="secondary"
                size="sm"
                type="reset"
                onClick={() => navigate(-1)}
              >
                {t("general.config.suppliers.back")}
              </Button.Root>
              
              <Button.Root disabled={updateLoading} size="sm" type="submit">
                {t("general.config.suppliers.update")}
              </Button.Root>
            </div>
          </div>
          
        </form>
      </Form>

      <Form {...formUser}>
        <form
          onSubmit={formUser.handleSubmit(handleUserSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white rounded-lg p-4">
          <FormField
            control={formUser.control}
            name="user_id"
            render={({ field }) => (
              <SelectGs
                {...field}
                label={t("comex.filterandButton.user")}
                content={userOptions ?? []}
                value={field.value}
                onValueChange={(value) =>
                  formUser.setValue("user_id", value)
                }
                required
              />
            )}
          />
          <FormField
            control={formUser.control}
            name="expired_at"
            render={({ field }) => (
              <DatePickerGs
                {...field}
                fieldValue={formUser.getValues("expired_at")}
                label={t("comex.filterandButton.dateExpired")}
                fieldOnChange={(date) => formUser.setValue("expired_at", date)}
                maxDate={new Date("31/12/2100")}
              />
            )}
          />
          </div>
          <div className="flex gap-2 justify-end">
            <Button.Root disabled={submitLoading} size="sm" type="submit">
            {t("comex.filterandButton.addUsuario")}
            </Button.Root>
          </div>
        </form>
      </Form>
      <div>
        {renderUserSuppliers()}
      </div>
    </section>
  )
};