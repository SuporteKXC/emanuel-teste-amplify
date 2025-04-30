import Order from "App/Models/Order";

export default class OrderRepository {
  
  public async orderWhereIn(data: string[]){
    // console.log("order_reference", data);
    const orderResult = await Order.query().whereNull("deleted_at").whereIn("order_reference", data);

    return orderResult;
  }
  
  public async createMany(data: any) {
    try {
      const orderResult = await Order.createMany(data);
      return orderResult;
    } catch (error: any) {
      console.error("Error OrderRepository Method createMany", error.message);
      throw error;
    }
  }
}