import { Iproduct } from "App/Interfaces/Product";
import Product from "App/Models/Product";
import ProductRepository from "App/Repositories/ProductRepository";

export default class ProductService {
  public repository: ProductRepository;

  constructor(){
    this.repository = new ProductRepository();
  }

  public async index() {
    try{
      const productResult = await this.repository.index();
      return productResult;
    } catch(error: any) {
      console.error("Error ProductService Method index", error.message);
      throw error;
    }
  }

  public async productDeadline() {
    try{
      const productResult = await this.repository.productDeadline();
      return productResult;
    } catch(error: any) {
      console.error("Error ProductService Method productDeadline", error.message);
      throw error;
    }
  }

  public async productVerifyExist(productUnique: string[]) {
    try {
      let productExistArray: Iproduct[] = [];
      let productNotExistArray: string[] = [];

      const productExiste = await this.repository.productWhereIn(productUnique);

      productUnique.forEach((element: string) => {
        const productFind = productExiste.find((item: Product) => {
          return item.code == element;
        });
        if (productFind) {
          productExistArray.push(productFind.toJSON());
        } else {
          productNotExistArray.push(element);
        }
      });

      const objArrays = { productExistArray, productNotExistArray };

      return objArrays;
    } catch (error: any) {
      console.error("Error ProductService Method productVerifyExist", error.message);
      throw error;
    }
  }

  public async productCreateMany(body: any, productNotExist: string[]) {
    try {
      let productArrayObj: any = [];
      let productCodeUnique: any[] = [];

      productNotExist.forEach((element: any) => {
        body.forEach((item: any) => {
          
          if(element == item.product_code){
  
            if (!productCodeUnique.includes(item.product_code) && item.product_code) {
              productCodeUnique.push(item.product_code);
              productArrayObj.push({
                code: item.product_code,
                description: item.product_description,
                origem: item.origem,
                business_unit: item.business_unit,
                bu: item.bu,
                consignee: item.consignee,
                alert_critical: item.alert_critical,
                ignored_stock: item.ignored_stock,
              });
            }
          }

        });
      });

      // console.log("productArrayObj", productArrayObj);

      const productCreated = await this.repository.createMany(productArrayObj);

      let productCreatedArrayObj: Iproduct[] = [];

      productCreated.forEach((element: any) => {
        productCreatedArrayObj.push(element.toJSON());
      });

      return productCreatedArrayObj;
    } catch (error: any) {
      console.error("Error ProductService Method productCreateMany", error.message);
      throw error;
    }
  }

  public async productUpdateMany(body: any, productExist: Iproduct[]) {
    try{

      let productArrayObj: any = [];
      let productCodeUnique: any[] = [];

      // console.log("productExist", productExist);

      productExist.forEach((element: any) => {
        body.forEach((item: any) => {
          
          if(element.code == item.product_code){
  
            if (!productCodeUnique.includes(item.product_code) && item.product_code) {
              productCodeUnique.push(item.product_code);

              productArrayObj.push({
                id: element.id,
                code: item.product_code,
                description: item.product_description || element.product_description,
                origem: item.origem || element.origem,
                business_unit: item.business_unit || element.business_unit,
                bu: item.bu || element.bu,
                consignee: item.consignee || element.consignee,
                alert_critical: item.alert_critical || element.alert_critical,
                ignored_stock: item.ignored_stock || element.ignored_stock,
              });
            }
          }

        });
      });

      let productUpdateArrayObj: Iproduct[] = [];

      await Promise.all(
        productArrayObj.map(async (element: any) => {
          const productUpdate = await this.repository.update(element.id, element);
          const productJson = productUpdate.toJSON();
          productUpdateArrayObj.push(productJson);
        })
      );

      return productUpdateArrayObj;

    } catch (error: any) {
      console.error("Error ProductService Method productUpdateMany", error.message);
      throw error;
    }
  }

}