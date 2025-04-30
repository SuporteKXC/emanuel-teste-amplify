export default class ImportArrayUnique{

  public arrayUnique(data: any) {
    try {
      let orderUnique: string[] = [];
      let productUnique: string[] = [];
      let companyUnique: string[] = [];
      let supplierUnique: string[] = [];

      data.forEach((element: any) => {
        if(!orderUnique.includes(element.order_reference) && element.order_reference){
          orderUnique.push(element.order_reference);
        }
        if(!productUnique.includes(element.product_code) && element.product_code){
          productUnique.push(element.product_code);
        }
        if(!companyUnique.includes(element.plant_code) && element.plant_code){
          companyUnique.push(element.plant_code);
        }
        if(!supplierUnique.includes(element.supplier_id) && element.supplier_id){
          supplierUnique.push(element.supplier_id);
        }
      })

      return { orderUnique, productUnique, companyUnique, supplierUnique };

    } catch (error: any) {
      console.error("Error ImportArrayUnique Method arrayUnique", error.message);
      throw error;
    }
  }

}