import { Icompany } from "App/Interfaces/Company";
import Company from "App/Models/Company";
import CompanyRepository from "App/Repositories/CompanyRepository";

export default class CompanyService {
  
  public repository: CompanyRepository;

  constructor(){
    this.repository = new CompanyRepository();

  }

  public async companyVerifyExist(companyUnique: string[]){
    try {
      let companyExistArray: Icompany[] = [];

      const companyExiste = await this.repository.companyWhereIn(companyUnique);

      companyUnique.forEach((element: string) => {
        const companyFind = companyExiste.find((item: Company) => {
          return item.plant_code == element;
        });

        if (companyFind) {
          companyExistArray.push(companyFind.toJSON());
        }
      });

      const objArrays = { companyExistArray };

      return objArrays;
    } catch (error: any) {
      console.error("Error CompanyService Method companyVerifyExist", error.message);
      throw error;
    }
  }

}