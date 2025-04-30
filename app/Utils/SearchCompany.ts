import { Icompany } from "App/Interfaces/Company";
import { IorderItemWithoutCompanyId } from "App/Interfaces/OrderItem";


export default class SearchCompany {
  public addCompanyId(data: IorderItemWithoutCompanyId[], companyExistArray: Icompany[]){
    data.forEach((element) => {
      const companyFound = companyExistArray.find((item) => {
        return item.plant_code == element.plant_code
      });

      element.company_id = companyFound?.id;
    });
  }
}