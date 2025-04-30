import { IStockOrder } from "App/Interfaces/StockOrder";
import StockOrder from "App/Models/StockOrder";

export default class StockOrderRepository {
  public async create(data: Partial<IStockOrder>): Promise<StockOrder>{
    try {
      return StockOrder.firstOrCreate({
        order_reference: data.order_reference,
        order_id: data.order_id
       },
       data
      );
    } catch(error: any) {
      console.error("Error StockOrderRepository Method create", error.message);
      throw error;
    }
  }

  public async getAllIds(): Promise<StockOrder[]> {
    try {
      return StockOrder.query().select('order_id');
    } catch(error: any) {
      console.error("Error StockOrderRepository Method getAllIds", error.message);
      throw error;
    }
  }
}