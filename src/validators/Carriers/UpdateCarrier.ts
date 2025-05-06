import * as Yup from "yup";
import { getCarrierShape, CarrierProps } from "validators/Common";

export class UpdateCarrierValidator {
  constructor(protected readonly props: CarrierProps) {}

  public get schema() {
    return Yup.object().shape({
      ...getCarrierShape(this.props),
      addressIbgeCode: Yup.string().optional(),
      codeSap: Yup.object({
        id: Yup.number().nullable(),
        addressZipcode: Yup.string(),
        addressStreet: Yup.string(),
        addressNumber: Yup.string(),
        addressNeighborhood: Yup.string(),
        addressState: Yup.string(),
        addressCity: Yup.string(),
        codeSap: Yup.string(),
      }),
    });
  }
}
