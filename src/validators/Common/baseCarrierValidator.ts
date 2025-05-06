import * as Yup from "yup";
import { CarrierDocumentType } from "contracts";
import { Validator } from "utils";

export interface CarrierProps {
  documentType: CarrierDocumentType;
  addressCountry: string;
}

export const getCarrierShape = (props: CarrierProps) => {
  const { documentType, addressCountry } = props;

  const brazilianAddress = {
    ibge: Yup.string()
      .optional()
      .nullable()
      .transform((value: string) => {
        return value ? value.trim() : null;
      }),
    addressZipcode: Yup.string().required("Informe o CEP"),
    addressStreet: Yup.string().required("Informe o logradouro"),
    addressNumber: Yup.string().required("Informe o número"),
    addressComplement: Yup.string()
      .optional()
      .nullable()
      .transform((value: string) => {
        return value ? value.trim() : null;
      }),
    addressNeighborhood: Yup.string().required("Informe o bairro"),
    addressCity: Yup.string().required("Informe a cidade"),
    addressState: Yup.string().required("Selecione o estado"),
    addressLatitude: Yup.string().required("Informe a latitude"),
    addressLongitude: Yup.string().required("Informe a longitude"),
  };

  const mercosulAddress = {
    ibge: Yup.mixed().transform((_) => null),
    addressZipcode: Yup.string()
      .optional()
      .nullable()
      .transform((value) => {
        return value ? value.trim() : null;
      }),
    addressStreet: Yup.string().required("Informe o logradouro"),
    addressNumber: Yup.string()
      .optional()
      .nullable()
      .transform((value) => {
        return value ? value.trim() : null;
      }),
    addressComplement: Yup.string()
      .optional()
      .nullable()
      .transform((value: string) => {
        return value ? value.trim() : null;
      }),
    addressNeighborhood: Yup.string()
      .optional()
      .nullable()
      .transform((value: string) => {
        return value ? value.trim() : null;
      }),
    addressCity: Yup.string().required("Informe a cidade"),
    addressState: Yup.string()
      .optional()
      .nullable()
      .transform((value: string) => {
        return value ? value.trim() : null;
      }),
    addressLatitude: Yup.string()
      .optional()
      .nullable()
      .transform((value: string) => {
        return value ? value.trim() : null;
      }),
    addressLongitude: Yup.string()
      .optional()
      .nullable()
      .transform((value: string) => {
        return value ? value.trim() : null;
      }),
  };

  const addressValidations =
    addressCountry === "BRASIL" ? brazilianAddress : mercosulAddress;

  return {
    documentType: Yup.string().required("Informe o tipo de cliente"),
    documentNumber: Yup.mixed().test({
      name: "testDocument",
      test: function (value: string) {
        try {
          Validator.validateDocument(value, documentType);
          return true;
        } catch (error: any) {
          return this.createError({
            message: error?.message,
          });
        }
      },
    }),
    tradeName: Yup.string().required((): string => {
      return documentType === "cnpj"
        ? "Informe a razão social"
        : "Informe o nome completo";
    }),
    addressCountry: Yup.string()
      .typeError("Selecione o país")
      .required("Selecione o país"),
    ...addressValidations,
  };
};

export const getCarrierLogoShape = () => {
  return {
    logoFile: Yup.mixed().test({
      name: "testLogoFile",
      test: function (value) {
        try {
          if (value === undefined) return true;
          if (!(value instanceof File)) {
            throw new Error("Selecione uma imagem de logo");
          }
          return true;
        } catch (error: any) {
          return this.createError({
            message: error.message,
          });
        }
      },
    }),
  };
};
