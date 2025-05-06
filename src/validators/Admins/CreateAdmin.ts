import * as Yup from 'yup';
import { getUserShape } from 'validators/Common/BaseUserValidator';

export class CreateAdminValidator {
  public get schema() {
    return Yup.object().shape({
      user: Yup.object().shape(getUserShape()),
    });
  }
}
