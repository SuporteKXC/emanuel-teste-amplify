import { Iproduct } from "App/Interfaces/Product";
import Product from "App/Models/Product";

export default class ProductRepository {

  public async index() : Promise<Product[]> {
    try {
      const productResult = await Product.query()
        .whereNull("deleted_at")
  
      return productResult;
    } catch(error: any) {
      console.error("Error ProductRepository Method index", error.message);
      throw error;
    }

  }

  public async productDeadline() : Promise<Product[]> {
    try {
      const productResult = await Product.query()
        .preload("product_deadline", (build) => {
          build.whereNull("deleted_at")
          build.whereNotNull("deadline_days")
          build.whereNotNull("begin")
          build.orderBy("begin", "desc")
        })
        .whereNull("deleted_at")
  
      return productResult;
    } catch(error: any) {
      console.error("Error ProductRepository Method productDeadline", error.message);
      throw error;
    }

  }
  
  public async productWhereIn(data: string[]) {
    // console.log("code", data);
    const productResult = await Product.query().whereNull("deleted_at").whereIn("code", data);

    return productResult;
  }

  public async createMany(data: any){
    try{
      const productResult = await Product.createMany(data);
      return productResult;
    } catch(error: any){
      console.error("Error ProductRepository Method createMany", error.message);
      throw error;
    }
  }

  public async update(id: number , data: Omit<Iproduct, "created_at" | "updated_at" | "deleted_at">){
    try{
      const productResult = await Product.query().where({id: id}).firstOrFail();
      productResult.merge(data);
      const productSave = await productResult.save();

      return productSave;

    } catch(error: any){
      console.error("Error ProductRepository Method update", error.message);
      throw error;
    }
  }
  
}