import * as Yup from 'yup';
import { getUserShape } from 'validators/Common/BaseUserValidator';

export class UpdateMemberValidator {
  public get schema() {
    return Yup.object().shape({
      userId: Yup.number(),
      companyId: Yup.number()
        .typeError('Selecione o cliente')
        .required('Selecione o cliente'),
      user: Yup.object().shape({
        ...getUserShape(),
        password: Yup.string().optional(),
      }),
    });
  }
}
