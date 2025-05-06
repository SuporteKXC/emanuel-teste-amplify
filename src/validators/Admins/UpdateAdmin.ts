import * as Yup from 'yup';
import { getUserShape } from 'validators/Common/BaseUserValidator';

export class UpdateAdminValidator {
  public get schema() {
    return Yup.object().shape({
      userId: Yup.string().required('Informe o id do usuário'),
      user: Yup.object().shape({
        ...getUserShape(),
        password: Yup.string().optional(),
      }),
    });
  }
}
