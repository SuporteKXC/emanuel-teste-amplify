import { isPast, isToday } from 'date-fns';
import { Validator } from 'utils';
import * as Yup from 'yup';

export class CreateOrderValidator {
  public get schema() {
    return Yup.object().shape({
      companyId: Yup.number()
        .typeError('Selecione o cliente')
        .required('Selecione o cliente'),
      warehouseId: Yup.number()
        .typeError('Selecione o armazém')
        .required('Selecione o armazém'),
      userId: Yup.number(),
      withdrawalDate: Yup.date()
        .typeError('Informe a Data de entrega')
        .required('Informe a Data de entrega')
        .test({
          name: 'withdrawalDate',
          test: function (value) {
            try {
              if (!value) {
                throw new Error('Data inválida');
              }
              if (isPast(value) && !isToday(value)) {
                throw new Error('A data não pode estar no passado');
              }
              if (isToday(value)) {
                throw new Error('A data não pode ser no dia de hoje');
              }

              return true;
            } catch (error: any) {
              return this.createError({
                message: error?.message,
              });
            }
          },
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
      driverName: Yup.string().nullable().optional().test({
        name: 'driverName',
        test: Validator.validateDriverName,
      }),
      driverCnh: Yup.string().nullable().optional().test({
        name: 'driverCnh',
        test: Validator.isValidCNH,
      }),
      vehicleTypeId: Yup.number()
        .nullable()
        .optional()
        .transform((value) => (Number.isNaN(value) ? null : value)),
      vehiclePlate: Yup.string().nullable().optional().test({
        name: 'vehiclePlate',
        test: Validator.validateVehiclePlate,
      }),
      obs: Yup.string().nullable().optional(),
    });
  }
}
