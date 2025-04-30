import VesselRepository from "App/Repositories/VesselRepository";
import ScacRepository from "App/Repositories/ScacRepository";
import StockOrderService from "App/Services/StockOrderService";
import ProductService from "App/Services/ProductService";


export default class RulesEnvu{

  public vesselRepository : VesselRepository;
  public scacRepository : ScacRepository;
  public stockOrderService: StockOrderService;
  public productService: ProductService;

  constructor(){
    this.vesselRepository = new VesselRepository();
    this.scacRepository = new ScacRepository();
    this.stockOrderService = new StockOrderService();
    this.productService = new ProductService();
  }

  public async handle(importArray: any[], _importType: any, _order: any[]): Promise<any[]>{

    importArray.map(element => {

      let isContainerReturnRequired = true

      if(element.modal === "AEREO" || (element.modal == "MARITIMO" && element.cargo_type == "LCL")) {
        isContainerReturnRequired = false
      }
      if(element.modal === "MARITIMO" && !element.cargo_type){
        isContainerReturnRequired = true
      }
      // console.log({
      //   isContainerReturnRequired,
      //   modal: element.modal,
      //   cargo_type: element.cargo_type || ""
      // })
      element.container_return_required = isContainerReturnRequired


    })
    return importArray;
  }
}
