import * as Yup from 'yup';
import { CompanyDocumentType } from 'contracts/Common';
import { Validator } from 'utils';

export interface Props {
  selectedType: CompanyDocumentType;
}

export const getCompanyShape = (props: Props) => {
  const { selectedType } = props;
  return {
    documentType: Yup.string().required('Informe o tipo de cliente'),
    document: Yup.mixed().test({
      name: 'testDocument',
      test: function (value: string) {
        try {
          Validator.validateDocument(value, selectedType);
          return true;
        } catch (error: any) {
          return this.createError({
            message: error?.message,
          });
        }
      },
    }),
    tradeName: Yup.string().required((): string => {
      return selectedType === 'cnpj'
        ? 'Informe a razão social'
        : 'Informe o nome completo';
    }),
    // address
    addressZipcode: Yup.string().required('Informe o CEP'),
    addressStreet: Yup.string().required('Informe o logradouro'),
    addressNumber: Yup.string().required('Informe o número'),
    addressComplement: Yup.string()
      .optional()
      .nullable()
      .transform((value: string) => {
        return value ? value.trim() : null;
      }),
    addressNeighborhood: Yup.string().required('Informe o bairro'),
    addressCity: Yup.string().required('Informe a cidade'),
    addressState: Yup.string().required('Informe o estado'),
    addressCountry: Yup.string().optional(),
    addressLatitude: Yup.string().required('Informe a latitude'),
    addressLongitude: Yup.string().required('Informe a longitude'),
  };
};
