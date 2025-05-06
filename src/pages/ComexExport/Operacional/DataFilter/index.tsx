import { useState } from "react";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputGs } from "@/components/ui/Forms";

const formSchema = z.object({
  order_reference: z.string().optional(),
  product: z.string().optional()
});

export default function DataFilter() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white p-4 items-end gap-3 rounded-sm flex"
      >
        <FormField
          control={form.control}
          name="order_reference"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputGs
                  placeholder="Busque pelo número da PO"
                  type=""
                  label="PO"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="product"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputGs
                  placeholder="Busque pelo produto"
                  type=""
                  label="Produto/Descrição"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="col-end-4 row-end-3" type="submit">
          Aplicar filtro
        </Button>
      </form>
    </Form>
  );
}
