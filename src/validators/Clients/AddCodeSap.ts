import * as Yup from "yup";

export class AddCodeSapValidator {
  public get schema() {
    return Yup.object().shape({
      addressZipcode: Yup.string().required("Informe o CEP"),
      addressStreet: Yup.string().required("Informe o logradouro"),
      addressNumber: Yup.string().required("Informe o número"),
      addressNeighborhood: Yup.string().required("Informe o bairro"),
      addressCity: Yup.string().required("Informe a cidade"),
      addressState: Yup.string().required("Selecione o estado"),
      codeSap: Yup.string().required("Informe o código sap"),
    });
  }
}
