import * as Yup from 'yup';

export const getUserShape = () => ({
  name: Yup.string().required('Informe o nome do usuário'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('Informe o email do usuário'),
  password: Yup.string().required('Informe a senha do usuário'),
});
