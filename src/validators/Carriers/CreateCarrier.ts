import * as Yup from "yup";
import { getCarrierShape, CarrierProps } from "validators/Common";

export class CreateCarrierValidator {
  constructor(protected readonly props: CarrierProps) {}

  public get schema() {
    return Yup.object().shape({
      ...getCarrierShape(this.props),
      codeSap: Yup.object({
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
