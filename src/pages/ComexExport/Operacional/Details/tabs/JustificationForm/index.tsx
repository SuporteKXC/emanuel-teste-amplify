"use client";
import React, { useEffect, useState } from "react";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TextareaGs } from "@/components/ui/Forms/textareaGs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { JustificationTypesActions } from "@/store/ducks";

const formSchema = z.object({
  justification_type_id: z.string({ required_error: "Campo obrigatório" }),
  description: z.string({ required_error: "Campo obrigatório" }).min(1, "Campo obrigatório"),
});

export const JustificationForm: React.FunctionComponent<{
  handleSubmit: (values: any) => void;
  isOpen: boolean;
}> = ({ handleSubmit, isOpen }) => {
  const dispatch = useDispatch();

  const { data: justificationTypes, loading: loadingJustificationTypes } =
    useSelector((state: RootState) => state.listJustificationTypes);

  
  const justificationTypeValid = justificationTypes?.map((item) => ({
    value: `${item.id}`,
    label: item.description,
  }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
      handleSubmit(values);
      
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  useEffect(() => {
    dispatch(JustificationTypesActions.request({
     category: 'comex-export'
    }));
  }, [isOpen])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl"
      >
        <FormField
          control={form.control}
          name="justification_type_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de justificativa..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    loadingJustificationTypes ? 
                    (
                      <SelectItem disabled value="loading">Carregando...</SelectItem>
                    ) :
                    justificationTypeValid?.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem> 
                    ))
                  }
                </SelectContent>
                <FormMessage />
              </Select>
              <FormDescription>
                Qual o tipo de justificativa será descrito
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Justificativa</FormLabel>
              <FormControl>
                <TextareaGs
                  placeholder="..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Descreva a justificativa</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Confirmar</Button>
      </form>
    </Form>
  );
};

export default JustificationForm
