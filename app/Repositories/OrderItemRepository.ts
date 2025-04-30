import OrderIten from "App/Models/OrderItem";

export default class OrderItemRepository {

  public async createMany(data: any){
    try{
      const orderItemResult = await OrderIten.createMany(data);
      return orderItemResult;
    } catch(error: any){
      console.error("Error OrderItemRepository Method createMany", error.message);
      throw error;
    }
  }

  public async update(id: number, data: any){
    try{
      const orderItemResult = await OrderIten.query()
        .where({id: id})
        .update(data)
      return orderItemResult;
    } catch(error: any){
      console.error("Error OrderItemRepository Method update", error.message);
      throw error;
    }
  }

  public async findWithOrder(order_id: number, item: any): Promise<OrderIten | null> {
    try {
      const orderItemResult = await OrderIten.query()
        .where({
          order_id: order_id,
          item: item,
        })
        .first();
        
      return orderItemResult;
    } catch (error: any) {
      console.error("Error OrderItemRepository Method findWithOrder", error.message);
      throw error;
    }
  }
  
  public async findJustWithOrder(order_id: number): Promise<OrderIten[] | null> {
    try {
      const orderItemResult = await OrderIten.query()
        .where({
          order_id,
        })
        
      return orderItemResult;
    } catch (error: any) {
      console.error("Error OrderItemRepository Method findWithOrder", error.message);
      throw error;
    }
  }
  
  
  public async getWithOrderAndItem(order_id: number, item:number): Promise<OrderIten[] | null> {
    try {
      const orderItemResult = await OrderIten.query()
        .where({
          order_id,
          item
        })
        
      return orderItemResult;
    } catch (error: any) {
      console.error("Error OrderItemRepository Method getWithOrderAndItem", error.message);
      throw error;
    }
  }
  
}