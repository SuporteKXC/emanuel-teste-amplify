import * as Yup from 'yup';
import { getUserShape } from 'validators/Common/BaseUserValidator';

export class CreateMemberValidator {
  public get schema() {
    return Yup.object().shape({
      companyId: Yup.number()
        .typeError('Selecione o cliente')
        .required('Selecione o cliente'),
      user: Yup.object().shape({
        ...getUserShape(),
      }),
    });
  }
}
