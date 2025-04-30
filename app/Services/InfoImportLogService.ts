import { Iorder } from "App/Interfaces/Order";
import InfoImportLogRepository from "App/Repositories/InfoImportLogRepository";

export default class InfoImportLogService {
  
  public repository: InfoImportLogRepository;

  constructor(){
    this.repository = new InfoImportLogRepository();

  }

  public async create(data: any){
    const infoImportLog = await this.repository.create(data);

    return infoImportLog;
  }

  public async createLogFormatCreateUpdate(
    importType: any,
    dataCreate: any[],
    dataUpdate: any[],
    dataCreateFailCompany: Pick<Iorder, "order_reference">[],
    orderArrayCreateFailProduct: Pick<Iorder, "order_reference">[]
  ){

    const arrayCreate: number[] = [];
    const arrayUpdate: number[] = [];
    const arrayErrorCompany: string[] = [];
    const arrayErrorProduct: string[] = [];

    dataCreate.forEach((element) => {
      arrayCreate.push(element.id);
    });

    dataUpdate.forEach((element) => {
      arrayUpdate.push(element.id);
    });

    dataCreateFailCompany.forEach((element) => {
      arrayErrorCompany.push(element.order_reference);
    });

    orderArrayCreateFailProduct.forEach((element) => {
      arrayErrorProduct.push(element.order_reference);
    });

    const data = {
      import_type_id: importType.id,
      succes_description: {
        "create": arrayCreate,
        "update": arrayUpdate,
      },
      error_description: {
        "company_not_found": arrayErrorCompany,
        "product_not_found": arrayErrorProduct
      }
    }

    const infoImportLog = await this.repository.create(data);

    return infoImportLog;
  }

  public async createLogFormatUpdate(
    importType: any,
    dataUpdate: any[],
    dataNotFound: Pick<Iorder, "order_reference">[]
  ){

    const arrayUpdate: number[] = [];
    const arrayNotFound: string[] = [];

    dataUpdate.forEach((element) => {
      arrayUpdate.push(element.id);
    });

    dataNotFound.forEach((element) => {
      arrayNotFound.push(element.order_reference);
    });

    const data = {
      import_type_id: importType.id,
      succes_description: {
        "update": arrayUpdate,
      },
      error_description: {
        "order_not_found": arrayNotFound,
      }
    }

    const infoImportLog = await this.repository.create(data);

    return infoImportLog;
  }
}