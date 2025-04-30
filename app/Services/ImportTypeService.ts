import ImportTypeRepository from "App/Repositories/ImportTypeRepository";

export default class ImportTypeService {
  
  public repository: ImportTypeRepository;

  constructor(){
    this.repository = new ImportTypeRepository();

  }

  public async index(){
    const importType = await this.repository.index();

    return importType;
  }
  
  public async import(){
    const importType = await this.repository.import();

    return importType;
  }
}