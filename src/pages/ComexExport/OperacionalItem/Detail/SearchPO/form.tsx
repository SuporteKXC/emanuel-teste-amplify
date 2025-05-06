"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { searchOrderItem } from "@/queries/OrderItem/searchOrderItem";
import { ExternalLink, SearchCheck } from "lucide-react";
import { searchExportOrderItem } from "@/queries/ExportOrderItens/searchExportOrderItem";
import { ActivityIndicator } from "@/styles/components";

const formSchema = z.object({
  order: z.string().min(1),
});

export default function SearchPoForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { mutate, data, isPending } = useMutation({
    mutationKey: ["get-export-order-itens"],
    mutationFn: (values: z.infer<typeof formSchema>) => {
      return searchExportOrderItem(values.order);
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      mutate(values);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10"
        >
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Pesquisar..." type="text" {...field} />
                </FormControl>
                <FormDescription>Exemplo: "1234123412"</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit">
            Buscar
          </Button>
        </form>
      </Form>
      <section>
        {isPending && <ActivityIndicator />}
        {data &&
          data.map((item) => (
            <>
              <div
                className="flex justify-between items-center gap-12"
                key={item.order_item_id}
              >
                <p className="font-GilroySemibold">
                  {item.order_reference} - {item.item}: {item.description}
                </p>
                <div className="flex gap-6">
                  <a
                    href={`https://iff.webcol.systems/comex/importation/operacional/order-item/${item.order_item_id}`}
                    rel="noopener noreferrer"
                  >
                    <SearchCheck className="cursor-pointer" />
                  </a>
                  <a
                    href={`https://iff.webcol.systems/comex/importation/operacional/order-item/${item.order_item_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="cursor-pointer" />
                  </a>
                </div>
              </div>
            </>
          ))}
      </section>
    </div>
  );
}
