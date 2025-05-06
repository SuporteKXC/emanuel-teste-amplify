import * as Yup from "yup";
import { getClientShape, ClientProps } from "validators/Common";

export class CreateClientValidator {
  constructor(protected readonly props: ClientProps) {}

  public get schema() {
    return Yup.object().shape({
      ...getClientShape(this.props),
      codeSap: Yup.array().of(
        Yup.object({
          addressZipcode: Yup.string(),
          addressStreet: Yup.string(),
          addressNumber: Yup.string(),
          addressNeighborhood: Yup.string(),
          addressState: Yup.string(),
          addressCity: Yup.string(),
          codeSap: Yup.string(),
        })
      ),
    });
  }
}
