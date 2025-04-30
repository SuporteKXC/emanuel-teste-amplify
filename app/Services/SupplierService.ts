import { Isupplier } from "App/Interfaces/Supplier";
import Supplier from "App/Models/Supplier";
import SupplierRepository from "App/Repositories/SupplierRepository";

export default class SupplierService {
  
  public repository: SupplierRepository;

  constructor(){
    this.repository = new SupplierRepository();

  }

  public async supplierVerifyExist(supplierUnique: string[]){
    try {
      let supplierExistArray: Partial<Isupplier>[] = [];
      let supplierNotExistArray: string[] = [];

      const supplierExiste = await this.repository.orderWhereIn(supplierUnique);

      supplierUnique.forEach((element: string) => {
        const supplierFind = supplierExiste.find((item: Supplier) => {
          return item.code == element;
        });
        if (supplierFind) {
          supplierExistArray.push(supplierFind.toJSON());
        } else {
          supplierNotExistArray.push(element);
        }
      });

      const objArrays = { supplierExistArray, supplierNotExistArray };

      return objArrays;
    } catch (error: any) {
      console.error("Error SupplierService Method supplierVerifyExist", error.message);
      throw error;
    }
  }

  public async index(){
    try {
      const supplierAll = await this.repository.index();
      const supplierArrayJson :any[] = [];
      supplierAll.forEach((element) => {
        supplierArrayJson.push(element.toJSON());
      })
      
      return supplierArrayJson;
    } catch (error: any) {
      console.error("Error SupplierService Method index", error.message);
      throw error;
    }
  }

}