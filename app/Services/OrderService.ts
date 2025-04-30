import { Iorder, IorderCreateManyReturn } from "App/Interfaces/Order";
import Order from "App/Models/Order";
import OrderRepository from "App/Repositories/OrderRepository";

export default class OrderService {
  
  public repository: OrderRepository;

  constructor(){
    this.repository = new OrderRepository();

  }

  public async orderVerifyExist(orderUnique: string[]){
    try {
      let orderExistArray: Partial<Iorder>[] = [];
      let orderNotExistArray: string[] = [];

      const orderExiste = await this.repository.orderWhereIn(orderUnique);

      orderUnique.forEach((element: string) => {
        const orderFind = orderExiste.find((item: Order) => {
          return item.order_reference == element;
        });
        if (orderFind) {
          orderExistArray.push(orderFind.toJSON());
        } else {
          orderNotExistArray.push(element);
        }
      });

      const objArrays = { orderExistArray, orderNotExistArray };

      return objArrays;
    } catch (error: any) {
      console.error("Error OrderService Method orderVerifyExist", error.message);
      throw error;
    }
  }

  public async orderCreateMany(body: any, productFinal: any, companyFinal: any, orderNotExist: string[]) : Promise<IorderCreateManyReturn>{
    try {
      let orderArrayObj: any[] = [];
      let orderVerify: string[] = [];
      let orderArrayCreate: Iorder[] = [];
      let orderArrayCreateFailCompany: Pick<Iorder, "order_reference">[] = [];
      let orderArrayCreateFailProduct: Pick<Iorder, "order_reference">[] = [];
  
      orderNotExist.forEach((element: string) => {
        body.forEach((item: any) => {
          if (item.order_reference == element && !orderVerify.includes(element)) {
            orderVerify.push(element);

            let companyFind = companyFinal.find((obj: any) => {
              return obj.plant_code == item.plant_code;
            });
            item.company_id = companyFind?.id;

            let productFind = productFinal.find((obj: any) => {
              return obj.code == item.product_code;
            });
            item.product_id = productFind?.id;


            orderArrayObj.push(item);
          }
        });
      });

      orderArrayObj.forEach((element) => {
        
        if(element.company_id && element.product_id){
          orderArrayCreate.push({
            order_reference: element.order_reference,
            product_id: element.product_id,
            company_id: element.company_id,
            responsible_po: element?.responsible_po,
            csr_name: element?.csr_name
          });
        }

        if(!element.company_id){
          orderArrayCreateFailCompany.push({
            order_reference: element.order_reference
          })
        }

        if(!element.product_id){
          orderArrayCreateFailProduct.push({
            order_reference: element.order_reference
          })
        }
        
      });

      const orderCreated = await this.repository.createMany(orderArrayCreate);

      let orderCreatedArrayObj: Iorder[] = [];

      orderCreated.forEach((element: any) => {
        orderCreatedArrayObj.push(element.toJSON());
      });

      return { orderCreatedArrayObj, orderArrayCreateFailCompany, orderArrayCreateFailProduct };
    } catch (error: any) {
      console.error("Error OrderService Method orderCreateMany", error.message);
      throw error;
    }
  }
}