import { FormHandles } from "@unform/core";
import React from "react";
import * as Yup from "yup";

export const useValidation = () => {
  return {
    handleFormErrors: (errors: any, ref: React.RefObject<FormHandles>) => {
      if (!ref.current) return null;
      const validationErrors: Record<string, any> = {};
      if (errors instanceof Yup.ValidationError) {
        errors.inner.forEach((er: any) => {
          validationErrors[er.path] = er.message;
        });
        ref.current.setErrors(validationErrors);
      }
    },
    handleApiErrors: (errors: any, ref: React.RefObject<FormHandles>) => {
      if (!ref.current) return null;
      const validationErrors: Record<string, any> = {};
      Object.keys(errors).forEach((field: string) => {
        validationErrors[field] = errors[field];
      });
      ref.current.setErrors(validationErrors);
    },
  };
};
