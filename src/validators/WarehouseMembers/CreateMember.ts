import * as Yup from 'yup';
import { getUserShape } from 'validators/Common/BaseUserValidator';

export class CreateMemberValidator {
  public get schema() {
    return Yup.object().shape({
      warehouseIds: Yup.array().of(
        Yup.number()
        .typeError('Selecione ao menos um armazém')
        .required('Selecione ao menos um armazém')
      ),
      user: Yup.object().shape({
        ...getUserShape(),
      }),
    });
  }
}
