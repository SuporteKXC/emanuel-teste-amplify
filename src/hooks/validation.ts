import { FormHandles } from '@unform/core';
import type { ApiValidationError } from 'contracts/Common';
import React from 'react';
import * as Yup from 'yup';

export const useValidation = () => {
  return {
    handleFormErrors: (
      errors: any,
      ref: React.RefObject<FormHandles>
    ): void => {
      if (!ref.current) return;
      const validationErrors: Record<string, any> = {};

      if (errors instanceof Yup.ValidationError) {
        errors.inner.forEach((er: any) => {
          validationErrors[er.path] = er.message;
        });

        ref.current.setErrors(validationErrors);
      }
    },
    handleApiErrors: (
      errors: ApiValidationError[],
      ref: React.RefObject<FormHandles>
    ): void => {
      if (!ref.current) return;

      for (const { field, message } of errors) {
        ref.current.setFieldError(field, message);
      }
    },
  };
};
