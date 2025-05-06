import * as Yup from 'yup';

export class CreateOrderEmailValidator {
  public get schema() {
    return Yup.object().shape({
      email: Yup
      .string()
      .email("O e-mail deve ser um e-mail válido")
      .max(250, 'Email deve ter no máximo 250 caracteres')
      .required('Email é obrigatório'),
    });
  }
}
