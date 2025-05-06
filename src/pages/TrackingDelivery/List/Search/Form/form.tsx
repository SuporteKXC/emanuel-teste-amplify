import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { RootState } from "@/store";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { DocumentsFilterListActions } from "@/store/ducks/trackingDelivery/documents";
import { ActivityIndicator } from "@/styles/components";
import { ExternalLink, SearchCheck } from "lucide-react";

const formSchema = z.object({
  documentNumber: z.string().min(1, "Informe o número da nota"),
  documentDigit: z.string().optional(),
});

export default function InvoiceSearchForm() {
  const [data, setData] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { documents, loading }: { documents: any[]; loading: boolean } =
    useSelector((state: RootState) => state.documentsFilterList);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentNumber: "",
      documentDigit: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoadingData(true);

    try {
      const result = await dispatch(
        DocumentsFilterListActions.request(
          {
            documentNumber: values.documentNumber,
            documentDigit: values.documentDigit,
          },
          undefined,
          (documents: any) => {
            setData(documents), setLoadingData(false), form.reset();
          },
          () => {
            setData([]), setLoadingData(false);
          }
        )
      );

      if ("payload" in result) {
        setData(result.payload);
        setLoadingData(false);
      }
    } catch (err) {
      console.error("Erro na request:", err);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-3xl py-10 mx-auto space-y-8"
        >
          <FormField
            control={form.control}
            name="documentNumber"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="documentNumber">Número da Nota</Label>
                <FormControl>
                  <Input
                    id="documentNumber"
                    placeholder="Ex: 123456"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="documentDigit"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="documentDigit">Série da Nota</Label>
                <FormControl>
                  <Input id="documentDigit" placeholder="Ex: 01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loadingData}>
            {loadingData ? "Buscando..." : "Buscar"}
          </Button>
        </form>
      </Form>

      <section>
        {loadingData ? (
          <ActivityIndicator />
        ) : (
          data.map((item, index) => (
            <div
              className="flex items-center justify-between gap-12"
              key={`${item.documentNumber}-${item.documentDigit}-${index}`}
            >
              <p className="font-GilroySemibold">
                {item?.documentNumber ?? "N/A"}-{item?.documentDigit ?? "N/A"} -{" "}
                {item?.carrier?.tradeName ?? "N/A"} -{" "}
                {item?.emissionDate ?? "N/A"}
              </p>
              <div className="flex gap-6">
                <a
                  href={`https://iff.webcol.systems/tracking-delivery/detail/${item?.id}`}
                  rel="noopener noreferrer"
                >
                  <SearchCheck className="cursor-pointer" />
                </a>
                <a
                  href={`https://iff.webcol.systems/tracking-delivery/detail/${item?.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="cursor-pointer" />
                </a>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
