import * as Yup from 'yup';
import { getUserShape } from 'validators/Common/BaseUserValidator';

export class UpdateMemberValidator {
  public get schema() {
    return Yup.object().shape({
      userId: Yup.number(),
      warehouseIds: Yup.array().of(
        Yup.number()
        .typeError('Selecione ao menos um armazém')
        .required('Selecione ao menos um armazém')
      ),
      user: Yup.object().shape({
        ...getUserShape(),
        password: Yup.string().optional(),
      }),
    });
  }
}
