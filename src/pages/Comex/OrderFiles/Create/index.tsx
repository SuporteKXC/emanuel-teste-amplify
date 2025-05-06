import { Button } from "@/components/ui/ButtonGs";
import { ComboboxGs, SelectGs, TextareaGs } from "@/components/ui/Forms";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RootState } from "@/store";
import { CreateOrderFileActions, SearchOrderOptionsActions } from "@/store/ducks";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { X } from "lucide-react";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useController, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  orderId: z.string().trim().min(1, "Selecione uma PO"),
  description: z.string().trim().min(1, "Descrição obrigatória"),
  links: z
    .object({ fileLinks: z.string().trim().min(1, "Link obrigatório") })
    .array()
    .min(1),
});

interface FormData {
  orderId: string;
  description: string;
  links: { [key: string]: string }[];
}

export const CreateOrderFile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timeoutId = useRef<NodeJS.Timeout>();
  const { loading } = useSelector((state: RootState) => state.createOrderFiles);
  const { data: orders, loading: ordersLoading } = useSelector((state: RootState) => state.searchOrderOptions);
  const initialFormData: FormData = {
    orderId: "",
    description: "",
    links: [{ fileLinks: "" }],
  };

  const options = orders?.map((order) => {
    return {
      value: `${order.id}`,
      name: order.order_reference,
    };
  });

  const fetch = () => {
    dispatch(SearchOrderOptionsActions.request());
  }
  const form = useForm({
    defaultValues: initialFormData,
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { fields, append, remove } = useFieldArray<FormData>({
    control: form.control,
    name: "links",
  });

  const onSuccess = () => {
    form.reset(initialFormData);
    navigate('/comex/importation/documentos')
  }
  const handleSubmit = (data: FormData) => {
    const validData = data.links.map((link) => {
      return {
        order_id: data.orderId,
        description: data.description,
        fileLink: link.fileLinks,
      };
    });
    console.log(validData);

    dispatch(CreateOrderFileActions.request({files: validData},onSuccess));
  };

  const onSearchDebounceEffect = (value:string) => {
    clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      onSearch(value);
    }, 1000);
  };

  const onSearch = (e: string) => {
    dispatch(SearchOrderOptionsActions.request(e))
  }
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-2"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="orderId"
            render={({ field }) => (
              <div className="w-fit min-w-[20%]">
                <ComboboxGs
                  fieldName="orderId"
                  onInputChange={(e)=> onSearchDebounceEffect(e)}
                  label="Selecione uma PO"
                  loading={ordersLoading}
                  fieldValue={field.value}
                  content={options ?? [] as any}
                  form={form}
                  {...field}
                  />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <>
                <h4 className="font-GilroySemibold">Descrição</h4>
                <TextareaGs className="w-full" placeholder="Adicione a descrição da documentação" {...field} />{" "}
              </>
            )}
          />
          <div className="flex flex-col gap-2">
            <h4 className="font-GilroySemibold">
              {fields.length > 1 ? "Links" : "Link"}
            </h4>
            {fields.map((field, index) => (
              <>
                <div className="flex gap-4 items-center" key={field.id}>
                  <FormField
                    key={field.id}
                    {...form.register(`links.${index}.fileLinks` as const)}
                    control={form.control}
                    name={`links.${index}.fileLinks`}
                    render={({ field }) => (
                      <Input placeholder="Adicione o link" {...field} />
                    )}
                  />
                  {index > 0 && (
                    <Button.Root
                      size="sm"
                      variant="danger"
                      onClick={() => remove(index)}
                    >
                      <X />
                    </Button.Root>
                  )}
                </div>
                <span className="text-red-500 text-sm font-GilroySemibold">
                  {form.formState.errors.links?.[index]?.fileLinks?.message}
                </span>
              </>
            ))}
            <span className="text-red-500 text-sm font-GilroySemibold">
              {form.formState.errors?.links?.message}
            </span>
          </div>
          <div className="flex mt-2 justify-between gap-2">
            <Button.Root
              onClick={() => {
                append({ fileLinks: "" });
                // form.trigger("links");
              }}
              type="button"
            >
              Adicionar Link
            </Button.Root>
            <Button.Root type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button.Root>
          </div>
        </form>
      </Form>
    </div>
  );
};
