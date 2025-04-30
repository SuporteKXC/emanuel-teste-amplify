import { IreadFileDeParam } from "App/Interfaces/ImportType";
import OrderService from "App/Services/OrderService";
import ProductService from "App/Services/ProductService";
import CompanyService from "./CompanyService";
import ImportArrayUnique from "App/Utils/ImportArrayUnique";
import OrderItemService from "./OrderItemService";
import TimelineService, { ExcludeTimelineField } from "./TimelineService";
import SearchCompany from "App/Utils/SearchCompany";
import ClientRules from "App/ClientRules";
import SupplierService from "./SupplierService";
import InfoImportLogService from "./InfoImportLogService";
import OrderIten from "App/Models/OrderItem";

export default class DtoImportService {
  public orderService: OrderService;
  public productService: ProductService;
  public companyService: CompanyService;
  public orderItemService: OrderItemService;
  public timelineService: TimelineService;
  public importArrayUnique: ImportArrayUnique;
  public searchCompany: SearchCompany;
  public clientRules: ClientRules;
  public supplierService: SupplierService;
  public infoImportLogService: InfoImportLogService;

  constructor() {
    this.orderService = new OrderService();
    this.productService = new ProductService();
    this.companyService = new CompanyService();
    this.orderItemService = new OrderItemService();
    this.timelineService = new TimelineService();
    this.importArrayUnique = new ImportArrayUnique();
    this.searchCompany = new SearchCompany();
    this.clientRules = new ClientRules();
    this.supplierService = new SupplierService();
    this.infoImportLogService = new InfoImportLogService();
  }

  public async import(data: IreadFileDeParam) {
    // Camada de tratamento dinamico e validacao da importacao
    const { orderUnique, productUnique, companyUnique, supplierUnique } =
      this.importArrayUnique.arrayUnique(data.body);

    console.log("orderUnique", orderUnique.length);
    console.log("productUnique", productUnique.length);
    console.log("companyUnique", companyUnique.length);
    console.log("supplierUnique", supplierUnique.length);

    const { orderExistArray, orderNotExistArray } =
      await this.orderService.orderVerifyExist(orderUnique);

    // const isUpdateOnly = this.clientRules.isOnlyUpdate(data.importType);

    // console.log("isUpdateOnly", isUpdateOnly);

    // if(isUpdateOnly){
    //   const orderItemUpdateOnly = await this.importUpdateOnly(data.body, orderExistArray);

    //   console.log("orderItemUpdateOnly", orderItemUpdateOnly.length);

    //   return;
    // }

    const { productExistArray, productNotExistArray } =
      await this.productService.productVerifyExist(productUnique);
    const { companyExistArray } = await this.companyService.companyVerifyExist(
      companyUnique
    );

    const productCreated = await this.productService.productCreateMany(
      data.body,
      productNotExistArray
    );

    const productUpdated = await this.productService.productUpdateMany(
      data.body,
      productExistArray
    );

    const productFinal = productUpdated.concat(productCreated);

    const {
      orderCreatedArrayObj,
      orderArrayCreateFailCompany,
      orderArrayCreateFailProduct,
    } = await this.orderService.orderCreateMany(
      data.body,
      productFinal,
      companyExistArray,
      orderNotExistArray
    );

    const orderFinal = orderExistArray.concat(orderCreatedArrayObj);

    const { supplierExistArray } =
      await this.supplierService.supplierVerifyExist(supplierUnique);

    // console.log("productFinal", productFinal.length);
    // console.log("orderFinal", orderFinal.length);

    const orderItemUnique = this.orderItemService.formatOrderItemUnique(
      data.body,
      productFinal,
      orderFinal,
      supplierExistArray,
      data.importType
    );

    // Add Campo company_id para usar no timeline
    this.searchCompany.addCompanyId(orderItemUnique, companyExistArray);
    // console.log("orderItemUnique", orderItemUnique.length);

    // Merge com o banco
    const orderItemUniqueMerge = await this.orderItemService.orderItemMerge(
      orderItemUnique
    );

    const timelineAll = await this.timelineService.index();
    this.timelineService.findTimeLine(orderItemUniqueMerge, timelineAll);

    // Camada Alteracao regra de negocio cliente
    const orderItemTreated = await this.clientRules.execute(
      orderItemUniqueMerge,
      data.importType,
      orderFinal
    );

    const steps = this.timelineService.findTimeLine(
      orderItemTreated,
      timelineAll
    );

    this.excludeFieldOrderItemByTimelineStep(steps, orderItemUniqueMerge);

    // console.log("orderItemTreated", orderItemTreated.length);

    // Camada para pesistir no sistema
    const { orderItemCreate, orderItemUpdate } =
      await this.orderItemService.orderItemArrayCreateUpdate(orderItemTreated);

    // console.log("orderItemCreate 0", orderItemCreate[0]);
    console.log("orderItemCreate lenght", orderItemCreate.length);

    const orderItemCreateMany = await this.orderItemService.createMany(
      orderItemCreate
    );

    console.log("orderItemUpdate lenght", orderItemUpdate.length);

    // Salvar os logs na planilha comex_import_logs
    await this.infoImportLogService.createLogFormatCreateUpdate(
      data.importType,
      orderItemCreateMany,
      orderItemUpdate,
      orderArrayCreateFailCompany,
      orderArrayCreateFailProduct
    );
  }

  public async importUpdateOnly(data: IreadFileDeParam) {
    // const { orderUnique, productUnique, companyUnique, supplierUnique } = this.importArrayUnique.arrayUnique(data.body);
    // console.log("productUnique", productUnique.length);
    // console.log("companyUnique", companyUnique.length);

    const { orderUnique, supplierUnique } = this.importArrayUnique.arrayUnique(
      data.body
    );

    console.log("orderUnique", orderUnique.length);
    console.log("supplierUnique", supplierUnique.length);

    const { orderExistArray } = await this.orderService.orderVerifyExist(
      orderUnique
    );

    const { supplierExistArray } =
      await this.supplierService.supplierVerifyExist(supplierUnique);

    //****company_id  */
    const { orderItemUnique, orderItemNotFound } =
      await this.orderItemService.formatOrderItemUpdateUnique(
        data.body,
        orderExistArray,
        supplierExistArray
      );

    const orderItemUpdateUniqueMerge =
      await this.orderItemService.orderItemUpdateMerge(orderItemUnique);

    const timelineAll = await this.timelineService.index();
    this.timelineService.findTimeLine(orderItemUpdateUniqueMerge, timelineAll);

    // Camada Alteracao regra de negocio cliente
    const orderItemTreated = await this.clientRules.execute(
      orderItemUpdateUniqueMerge,
      data.importType,
      orderExistArray
    );

    // retornar todos os field steps antes do plant_delivery se tiver plant_delivery preenchido
    const steps = this.timelineService.findTimeLine(
      orderItemTreated,
      timelineAll
    );

    // deleta os steps anterior ao plant_delivery
    await this.excludeFieldOrderItemByTimelineStep(steps, orderItemTreated);

    // deleta attrs para salvar
    this.excludeAttributes(orderItemTreated, ["company_id"]);

    const { orderItemUpdate } =
      await this.orderItemService.orderItemArrayUpdate(orderItemTreated);

    console.log("orderItemUpdateOnly", orderItemUpdate.length);

    // Salvar os logs na planilha comex_import_logs
    await this.infoImportLogService.createLogFormatUpdate(
      data.importType,
      orderItemUpdate,
      orderItemNotFound
    );

    return orderItemUpdate;
  }

  private async excludeFieldOrderItemByTimelineStep(
    steps: ExcludeTimelineField,
    orderItemTreated: any
  ) {
    for (let i = 0; i < orderItemTreated.length; i++) {
      if (orderItemTreated[i].id) {
        const findOrderItem = await OrderIten.findBy(
          "id",
          orderItemTreated[i].id
        );

        if (!findOrderItem?.plant_delivery) return;
      }

      if (orderItemTreated[i].id in steps) {
        for (let k = 0; k < steps[orderItemTreated[i].id].length; k++) {
          const field = steps[orderItemTreated[i].id][k];
          delete orderItemTreated[i][field];
        }
      }
    }
  }

  private excludeAttributes<T>(objectArr: T[], fields: string[]) {
    objectArr.forEach((obj) => {
      fields.forEach((field) => delete obj[field]);
    });
  }
}
