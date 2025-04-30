import Company from "App/Models/Company";

export default class CompanyRepository {
  
  public async companyWhereIn(data: string[]) {
    const companyResult = await Company.query().whereIn("plant_code", data);

    return companyResult;
  }
}