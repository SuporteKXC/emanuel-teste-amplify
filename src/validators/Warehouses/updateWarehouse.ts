import * as Yup from 'yup';
import { getCompanyShape, Props } from 'validators/Common/BaseCompanyValidator';

export class UpdateWarehouseValidator {
  constructor(protected readonly props: Props) {}

  public get schema() {
    return Yup.object().shape({
      ...getCompanyShape(this.props),
      groupName: Yup.string()
        .optional()
        .nullable()
        .transform((value: string) => {
          return value ? value.trim() : null;
        }),
    });
  }
}
