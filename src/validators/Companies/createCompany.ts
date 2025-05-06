import * as Yup from 'yup';
import { getCompanyShape, Props } from 'validators/Common/BaseCompanyValidator';

export class CreateCompanyValidator {
  constructor(protected readonly props: Props) {}

  public get schema() {
    return Yup.object().shape({
      ...getCompanyShape(this.props),
    });
  }
}
