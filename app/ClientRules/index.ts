import Env from "@ioc:Adonis/Core/Env";
import RulesIff from "./iff";
// import RulesOrd from "./ord";
// import RulesHaiddar from "./haiddar";
import StockOrderService from "App/Services/StockOrderService";
import RulesEnvu from "./envu";

export default class ClientRules {

  public rulesIff: RulesIff;
  public rulesEnvu: RulesEnvu
  // public rulesOrd: RulesOrd;
  // public rulesHaiddar: RulesHaiddar;
  public stockOrderService: StockOrderService;

  constructor(){
    this.rulesIff = new RulesIff();
    this.rulesEnvu = new RulesEnvu();
    // this.rulesOrd = new RulesOrd();
    // this.rulesHaiddar = new RulesHaiddar();
    this.stockOrderService = new StockOrderService();
  }

  async execute(importArray: any[], importType: any, order: any[] = []) :Promise<any[]>{
    let rulesByClient = importArray;
    switch(Env.get('CLIENT_SLUG')){
      case "IFF_SLUG":
        rulesByClient = await this.rulesIff.handle(importArray, importType, order);
        break;
      case "ENVU_SLUG":
        rulesByClient = await this.rulesEnvu.handle(importArray, importType, order)
        break;
      default:
        rulesByClient = importArray;
    }
    return rulesByClient;
  }

  isOnlyUpdate(importType: any) {

    let resultUpdateOnly = false;

    importType.import_from_to.forEach((element) => {
      if(element.is_update_only){
        resultUpdateOnly = true;
      }
    })

    return resultUpdateOnly;

  }

}
