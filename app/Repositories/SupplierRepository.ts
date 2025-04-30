import Supplier from "App/Models/Supplier";

export default class SupplierRepository{

  public async create(data: any){
    try{
      const supplierResult = await Supplier.create(data);
      return supplierResult;
    } catch(error: any){
      console.error("Error SupplierRepository Method create", error.message);
      throw error;
    }
  }

  public async createMany(data: any){
    try{
      const supplierResult = await Supplier.createMany(data);
      return supplierResult;
    } catch(error: any){
      console.error("Error SupplierRepository Method createMany", error.message);
      throw error;
    }
  }

  public async index(){
    try{
      const supplierResult = await Supplier.query()
        .whereNull("deleted_at")
      
      return supplierResult;
    } catch(error: any){
      console.error("Error SupplierRepository Method index", error.message);
      throw error;
    }
  }

  public async show(id: number){
    try{
      const supplierResult = await Supplier.query()
        .where({id: id})
        .whereNull("deleted_at")
        .first()
      
      return supplierResult;
    } catch(error: any){
      console.error("Error SupplierRepository Method show", error.message);
      throw error;
    }
  }

  public async update(id: number, data: any){
    try{
      data.updated_at = new Date();
      const supplierResult = await Supplier.query()
        .where({id: id})
        .update(data)
      
      return supplierResult;
    } catch(error: any){
      console.error("Error SupplierRepository Method update", error.message);
      throw error;
    }
  }

  public async delete(id: number){
    try{
      const supplierResult = await Supplier.query()
      .where({id: id})
      .update({deleted_at: new Date()})

      return supplierResult;
    } catch(error: any){
      console.error("Error SupplierRepository Method delete", error.message);
      throw error;
    }
  }

  public async orderWhereIn(data: string[]){
    const orderResult = await Supplier.query().whereNull("deleted_at").whereIn("code", data);

    return orderResult;
  }

}