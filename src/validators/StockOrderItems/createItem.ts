import { notify } from 'services';
import * as Yup from 'yup';

interface Props {
  availableQuantity?: number;
  factor?: number;
  unitSuffix?: string;
}
export class CreateOrderItemValidator {
  constructor(private readonly props: Props) {}

  public get schema() {
    const { availableQuantity = 0, factor = 0, unitSuffix } = this.props;

    return Yup.object().shape({
      productId: Yup.number()
        .typeError('Selecione o produto')
        .required('Selecione o produto'),
      productUnitId: Yup.number()
        .typeError('Informe a unidade de estoque')
        .required('Informe a unidade de estoque'),
      batch: Yup.string()
        .typeError('Informe o lote')
        .required('Informe o lote'),
      contractType: Yup.string().test({
        name: 'contractType',
        message: '',
        test: (value) => {
          try {
            const isIndustry = value === 'I';
            if (isIndustry)
              notify(
                'error',
                'Saldo vinculado a plataforma de terceiros. Procurar o analista responsável ou o RTV.'
              );
            return true;
          } catch (error: any) {
            notify('error', error?.message);
            return false;
          }
        },
      }),
      quantity: Yup.number()
        .min(1, 'Quantidade deve ser maior que zero')
        .typeError('Informe a quantidade')
        .required('Informe a quantidade')
        .test({
          name: 'quantity',
          message: 'Quantidade inválida',
          test: function (quantity) {
            try {
              if (typeof quantity !== 'number') {
                throw new Error('Quantidade inválida');
              }

              if (quantity > availableQuantity) {
                throw new Error('O valor excede a quantidade disponível');
              }

              if (quantity < factor) {
                throw new Error('Quantidade menor que o fator mínimo exigido');
              }

              if (quantity % factor !== 0) {
                throw new Error(
                  `O produto deve ser solicitado de ${factor} em ${factor}${unitSuffix}`
                );
              }

              return true;
            } catch (error: any) {
              return this.createError({
                message: error?.message,
              });
            }
          },
        }),
    });
  }
}
