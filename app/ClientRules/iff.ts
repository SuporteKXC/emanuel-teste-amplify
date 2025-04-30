import VesselRepository from "App/Repositories/VesselRepository";
import ScacRepository from "App/Repositories/ScacRepository";
import StockOrderService from "App/Services/StockOrderService";
import ProductService from "App/Services/ProductService";
import { addDays } from "date-fns";
import { DateTime } from "luxon";
import HolidayRepository from "App/Repositories/HolidayRepository";
import { addBusinessDays } from "App/Utils/DatetimeUtils";

export default class RulesIff {
  public vesselRepository: VesselRepository;
  public scacRepository: ScacRepository;
  public stockOrderService: StockOrderService;
  public productService: ProductService;
  public holidayRepository: HolidayRepository;

  constructor() {
    this.vesselRepository = new VesselRepository();
    this.scacRepository = new ScacRepository();
    this.stockOrderService = new StockOrderService();
    this.productService = new ProductService();
    this.holidayRepository = new HolidayRepository();
  }

  public async handle(
    importArray: any[],
    importType: any,
    order: any[]
  ): Promise<any[]> {
    const vessels = await this.vesselRepository.getActiveVessels();
    const scacCodeAll = await this.scacRepository.getScacCodeAll();
    const allProduct = await this.productService.productDeadline();

    console.log(importType.group_slug);
    switch (importType.group_slug) {
      case "IFF - EXPORT":
        importArray.forEach(async (element) => {
          const dateNow = DateTime.fromJSDate(new Date()).toISO();

          if (
            typeof element?.canceled_at === "string" &&
            element?.canceled_at === "L"
          ) {
            element.canceled_at = dateNow;
          } else {
            delete element.canceled_at;
          }

          if (element.supplier?.country?.toUpperCase() === "BRASIL") {
            element.canceled_at = dateNow;
            element.deleted_at = dateNow;
          }
          if (element.supplier?.is_ignore_comex) {
            element.canceled_at = dateNow;
            element.deleted_at = dateNow;
          }

          const elementProduct = allProduct.find((product) => {
            return product.id == element.product_id;
          });

          if (elementProduct && elementProduct.product_deadline[0]) {

            const productDeadline = elementProduct?.product_deadline?.find((item) => {
              return new Date(String(item.begin)) < new Date(element.gr_actual);
            })

            if(productDeadline){
              const deadline_days = productDeadline.deadline_days ? productDeadline.deadline_days : 0;

              const holidays = await this.holidayRepository.getCompanyHolidays(
                element.company_id
              );

              // console.log(`Holidays ${element.company_id} => ${holidays}`)
              element.gr_actual = element.gr_actual
                ? addBusinessDays(
                    element.gr_actual,
                    deadline_days,
                    holidays.map((e) => e.holidayDate.toISODate()!)
                  )
                : null;
            }
          }
        });
        break;

      case "IFF - TRACKING":
        importArray.forEach((element) => {
          const containersCode =
            element?.container_code?.match(/[A-Z]{4}[0-9]{7}/g);
          element.container_code = containersCode
            ? containersCode.join(", ")
            : null;

          if (element.container_type == 1) {
            element.container_type = 20;
          } else if (element.container_type_2 == 1) {
            element.container_type = 40;
          } else {
            element.container_type = undefined;
          }
        });
        break;

      case "IFF - ORD_SHIPMENT":
        importArray.forEach((element) => {
          // current_vessel_code
          const vesselsFind = vessels.find((vessel) => {
            return (
              vessel.vessel_name === element.current_vessel ||
              vessel.abbreviation_vessel_name === element.current_vessel
            );
          });

          element.current_vessel_code = vesselsFind?.imo_number;

          // carrier_code
          const objScac = scacCodeAll.find((obj: any) => {
            return (
              obj.carrier_name == element.agente_carga ||
              obj.carrier_name_abbreviation == element.agente_carga
            );
          });

          element.carrier_code = objScac?.scac_code;

          // container_code
          const containersCode =
            element?.container_code?.match(/[A-Z]{4}[0-9]{7}/g);
          element.container_code = containersCode
            ? containersCode.join(", ")
            : null;
        });
        break;

      case "IFF - HAIDDAR":
        // const stockArrayOrdersId = await this.stockOrderService.getAllIds();
        // const orderIdUnique: Set<number> = new Set();
        // stockArrayOrdersId.map((stockOrder: any) => orderIdUnique.add(stockOrder.order_id));

        importArray.forEach((element) => {
          if (element.supplier?.is_special) {
            element.ata_date = element.eta_date;
            element.atd_date = element.etd_date;

            element.plant_delivery = element.transport_doc_delivery_date
              ? addDays(new Date(element.transport_doc_delivery_date), 2)
              : null;
          }

          // current_vessel_code
          const vesselsFind = vessels.find((vessel) => {
            return (
              vessel.vessel_name === element.current_vessel ||
              vessel.abbreviation_vessel_name === element.current_vessel
            );
          });

          element.current_vessel_code = vesselsFind?.imo_number;

          // AGENTE carrier_code
          const objScac = scacCodeAll.find((obj: any) => {
            return (
              obj.carrier_name == element.agente_carga ||
              obj.carrier_name_abbreviation == element.agente_carga
            );
          });

          element.carrier_code = objScac?.scac_code;

          // HISTORICO last_historic
          element.last_historic = element?.last_historic
            ?.normalize("NFD")
            ?.replace(/[\u0300-\u036f]/g, "");

          // Stock_Order "Nota Fical para ligar com a planilha WMS"
          // this.stockOrderService.placeOrderAtStock(element, order, orderIdUnique);
        });
        break;

      default:
        return importArray;
    }

    const stockArrayOrdersId = await this.stockOrderService.getAllIds();
    const orderIdUnique: Set<number> = new Set();
    stockArrayOrdersId.map((stockOrder: any) =>
      orderIdUnique.add(stockOrder.order_id)
    );

    importArray.forEach((element) => {
      this.stockOrderService.placeOrderAtStock(element, order, orderIdUnique);
    });

    return importArray;
  }
}
