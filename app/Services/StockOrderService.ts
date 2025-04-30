import StockOrderRepository from "App/Repositories/StockOrderRepository";
import StockOrder from "App/Models/StockOrder";

export default class StockOrderService{
  stockOrderRepository: StockOrderRepository;
  constructor(){
    this.stockOrderRepository = new StockOrderRepository;
  }

  public async placeOrderAtStock(
    data: Record<string, any>,
    // orderItem: any | null,
    orders: Record<string, any>,
    orderIdUnique: Set<number>
  ) {
    // if (data && data.plant_delivery) return;

    if (data.register_date != null && data.register_date != '') {
      if (!orderIdUnique.has(data.order_id)) {
        const order = orders.find((order) => order.id === data.order_id);

        orderIdUnique.add(order?.id);

        try{
          await this.stockOrderRepository.create({
            order_reference: order?.order_reference,
            order_id: order?.id,
            invoice_number: data?.doc_num || null,
          });
        } catch(error) {
          console.log("Error no Method placeOrderAtStock Create stock_order", error.message);
        }

      }
    }
  }

  public async getAllIds(): Promise<StockOrder[]>{
    const stockOrderResult = await this.stockOrderRepository.getAllIds();
    return stockOrderResult;
  }
}
