import Env from "@ioc:Adonis/Core/Env";
import { Iorder } from "App/Interfaces/Order";
import OrderItemRepository from "App/Repositories/OrderItemRepository";
import { startOfDay } from "date-fns";
import { DateTime } from "luxon";
import SupplierService from "App/Services/SupplierService";


export default class OrderItemService {
  public repository: OrderItemRepository;
  public supplierService: SupplierService;

  constructor(){
    this.repository = new OrderItemRepository();
    this.supplierService = new SupplierService();

  }

  public async createMany(data: any[]){
    const orderItemResult = await this.repository.createMany(data);
    return orderItemResult;
  }

  public async update(id: number, data: any){
    const orderItemResult = await this.repository.update(id, data);
    return orderItemResult;
  }

  public async findWithOrder(order_id: number, item: any){
    const orderItemResult = await this.repository.findWithOrder(order_id, item);
    return orderItemResult;
  }

  public async findJustWithOrder(order_id: number){
    const orderItemResult = await this.repository.findJustWithOrder(order_id);
    return orderItemResult;
  }

  public async getWithOrderAndItem(order_id: number, item: number){
    const orderItemResult = await this.repository.getWithOrderAndItem(order_id, item);
    return orderItemResult;
  }

  public checkClientSlug(client_slug: string) {
    if(Env.get('CLIENT_SLUG') == client_slug) {
      return true;
    }
    return false;
  }

  public formatOrderItemUnique(body: any[], productFinal: any[], orderFinal: any[], supplierFinal: any[], importType: any) {

    const orderItemUnique: any[] = [];

    for(let element of body) {

      const supplierFind = supplierFinal.find((item) => { return item.code == element.supplier_id });
      element.supplier_id = supplierFind?.id;
      element.supplier = supplierFind;

      const productFind = productFinal.find((item) => { return item.code == element.product_code });
      const orderFind = orderFinal.find((item) => { return item.order_reference == element.order_reference });

      element.product_id = productFind?.id;
      element.order_id = orderFind?.id;

      const orderItemFind = orderItemUnique.find((item) => {
        return (
          item.order_id == element.order_id &&
          item.item == element.item
        )
      })

      if(importType.group_slug == "IFF - EXPORT" && Env.get('CLIENT_SLUG') == "IFF_SLUG") {
        if(productFind && orderFind && !orderItemFind){

          orderItemUnique.push({
            ...element
          });

        } else if(productFind && orderFind && orderItemFind){
          
          const orderItemFindIndex = orderItemUnique.findIndex((item) => {
            return (
              item.order_id == element.order_id &&
              item.item == element.item
            )
          })
          
          if(
            (element.gr_actual && !orderItemUnique[orderItemFindIndex].gr_actual) ||
            new Date(element.gr_actual) > new Date(orderItemUnique[orderItemFindIndex].gr_actual)
          ){

            orderItemUnique.splice(orderItemFindIndex, 1);
  
            orderItemUnique.push({
              ...element
            });
          }

        }
      } else {

        if(productFind && orderFind && !orderItemFind){
          orderItemUnique.push({
            ...element
          });
        }

      }
    }

    return orderItemUnique;
  }

  public async orderItemMerge(orderItemUnique: any[]) {

    const orderItemMergeArray: any[] = [];

    const supplierAll = await this.supplierService.index();

    await Promise.all(
      orderItemUnique.map(async (element) => {

        const orderItemFind = await this.findWithOrder(element.order_id, element.item);

        const orderItemFindJson = orderItemFind?.toJSON();

        if(!element.supplier && orderItemFindJson?.supplier_id){
          element.supplier = supplierAll.find((elementSupplier) => {
            return elementSupplier.id == orderItemFindJson?.supplier_id;
          });
          element.supplier_id = element.supplier_id ? element.supplier_id : orderItemFindJson?.supplier_id;
        }

        // const orderItemMerge = Object.assign({}, orderItemFind?.toJSON(), element);
        const orderItemMerge = {
          ...orderItemFindJson,
          eta_date: orderItemFindJson?.eta_date ? startOfDay(new Date(orderItemFindJson?.eta_date)) : null,
          register_date: orderItemFindJson?.register_date ? startOfDay(new Date(orderItemFindJson?.register_date)) : null,
          invoice_date: orderItemFindJson?.invoice_date ? startOfDay(new Date(orderItemFindJson?.invoice_date)) : null,
          post_import_license_release_date: orderItemFindJson?.post_import_license_release_date ? startOfDay(new Date(orderItemFindJson?.post_import_license_release_date)) : null,
          protocol_mapa_in26_date: orderItemFindJson?.protocol_mapa_in26_date ? startOfDay(new Date(orderItemFindJson?.protocol_mapa_in26_date)) : null,
          docs_received_date: orderItemFindJson?.docs_received_date ? startOfDay(new Date(orderItemFindJson?.docs_received_date)) : null,
          plant_delivery: orderItemFindJson?.plant_delivery ? startOfDay(new Date(orderItemFindJson?.plant_delivery)) : null,
          loading_at_the_terminal: orderItemFindJson?.loading_at_the_terminal ? startOfDay(new Date(orderItemFindJson?.loading_at_the_terminal)) : null,
          port_entry_date: orderItemFindJson?.port_entry_date ? startOfDay(new Date(orderItemFindJson?.port_entry_date)) : null,
          ata_date: orderItemFindJson?.ata_date ? startOfDay(new Date(orderItemFindJson?.ata_date)) : null,
          atd_date: orderItemFindJson?.atd_date ? startOfDay(new Date(orderItemFindJson?.atd_date)) : null,
          etd_date: orderItemFindJson?.etd_date ? startOfDay(new Date(orderItemFindJson?.etd_date)) : null,
          booking_confirmation_date: orderItemFindJson?.booking_confirmation_date ? startOfDay(new Date(orderItemFindJson?.booking_confirmation_date)) : null,
          gr_requested_date: orderItemFindJson?.gr_requested_date ? startOfDay(new Date(orderItemFindJson?.gr_requested_date)) : null,
          gr_expected: orderItemFindJson?.gr_expected ? startOfDay(new Date(orderItemFindJson?.gr_expected)) : null,
          gr_original: orderItemFindJson?.gr_original ? startOfDay(new Date(orderItemFindJson?.gr_original)) : null,
          gr_effective: orderItemFindJson?.gr_effective ? startOfDay(new Date(orderItemFindJson?.gr_effective)) : null,
          gr_actual: orderItemFindJson?.gr_actual ? startOfDay(new Date(orderItemFindJson?.gr_actual)) : null,
          transport_doc_delivery_date: orderItemFindJson?.transport_doc_delivery_date ? startOfDay(new Date(orderItemFindJson?.transport_doc_delivery_date)) : null,
          nf_date: orderItemFindJson?.nf_date ? startOfDay(new Date(orderItemFindJson?.nf_date)) : null,
          data_do_registro_da_di: orderItemFindJson?.data_do_registro_da_di ? startOfDay(new Date(orderItemFindJson?.data_do_registro_da_di)) : null,
          last_position_update: orderItemFindJson?.last_position_update ? startOfDay(new Date(orderItemFindJson?.last_position_update)) : null,
          last_historic_update: orderItemFindJson?.last_historic_update ? startOfDay(new Date(orderItemFindJson?.last_historic_update)) : null,
          protocol_li_date: orderItemFindJson?.protocol_li_date ? startOfDay(new Date(orderItemFindJson?.protocol_li_date)) : null,
          customs_clearance_date: orderItemFindJson?.customs_clearance_date ? startOfDay(new Date(orderItemFindJson?.customs_clearance_date)) : null,
          revised_eta_date: orderItemFindJson?.revised_eta_date ? startOfDay(new Date(orderItemFindJson?.revised_eta_date)) : null,
          created_at: orderItemFindJson?.created_at ? new Date(orderItemFindJson?.created_at) : null,
          updated_at: DateTime.fromJSDate(new Date()).toISO(),
          canceled_at: orderItemFindJson?.canceled_at ? new Date(orderItemFindJson?.canceled_at) : null,
          deleted_at: orderItemFindJson?.deleted_at ? new Date(orderItemFindJson?.deleted_at) : null,
          gr_actual_old: orderItemFindJson?.gr_actual_old ? startOfDay(new Date(orderItemFindJson?.gr_actual_old)) : null,
          ...element
        };

        orderItemMergeArray.push(orderItemMerge);

      })
    )

    return orderItemMergeArray;
  }

  public async formatOrderItemUpdateUnique(body: any[], orderFinal: any[], supplierFinal: any[]) {

    const orderItemUnique: any[] = [];
    const orderItemNotFound: Pick<Iorder, "order_reference">[] = [];

    body.forEach((element: any) => {

      const supplierFind = supplierFinal.find((item) => { return item.code == element.supplier_id });

      element.supplier_id = supplierFind?.id;

      element.supplier = supplierFind;

      const orderFind = orderFinal.find((item) => { return item.order_reference == element.order_reference });

      element.order_id = orderFind?.id;
      element.company_id = orderFind?.company_id;

      const orderItemFind = orderItemUnique.find((item) => {
        const isIffClient = this.checkClientSlug('IFF_SLUG');

        if(isIffClient) {
          return item.order_id == element.order_id;
        } else {
          return item.order_id == element.order_id && item.item == element.item;
        }
      })

      if(orderFind && !orderItemFind){
        orderItemUnique.push({
          ...element
        });
      }

      if(!orderFind){
        orderItemNotFound.push({
          order_reference: element.order_reference
        });
      }

    });

    return { orderItemUnique, orderItemNotFound };
  }

  public async orderItemUpdateMerge(orderItemUnique: any[]) {

    const orderItemMergeArray: any[] = [];

    const supplierAll = await this.supplierService.index();

    await Promise.all(
      orderItemUnique.map(async (element) => {

        let orderItemFind: any[] = [];

        const isIffClient = this.checkClientSlug('IFF_SLUG');

        if(isIffClient) {
          const findItems = await this.findJustWithOrder(element.order_id);
          
          findItems && findItems?.length > 0 && orderItemFind.push(...findItems);
        } else {
          const findItems = await this.getWithOrderAndItem(element.order_id, element.item);

          findItems && findItems?.length > 0 && orderItemFind.push(...findItems);
        }

        orderItemFind?.forEach((item) => {

          const itemJson = item?.toJSON();

          if(!element.supplier && itemJson.supplier_id){
            element.supplier = supplierAll.find((elementSupplier) => {
              return elementSupplier.id == itemJson.supplier_id;
            });
            element.supplier_id = element.supplier_id ? element.supplier_id : itemJson.supplier_id;
          }

          const orderItemMerge = {
            ...itemJson,
            eta_date: itemJson.eta_date ? startOfDay(new Date(itemJson.eta_date)) : null,
            register_date: itemJson.register_date ? startOfDay(new Date(itemJson.register_date)) : null,
            invoice_date: itemJson.invoice_date ? startOfDay(new Date(itemJson.invoice_date)) : null,
            post_import_license_release_date: itemJson.post_import_license_release_date ? startOfDay(new Date(itemJson.post_import_license_release_date)) : null,
            protocol_mapa_in26_date: itemJson.protocol_mapa_in26_date ? startOfDay(new Date(itemJson.protocol_mapa_in26_date)) : null,
            docs_received_date: itemJson.docs_received_date ? startOfDay(new Date(itemJson.docs_received_date)) : null,
            plant_delivery: itemJson.plant_delivery ? startOfDay(new Date(itemJson.plant_delivery)) : null,
            loading_at_the_terminal: itemJson.loading_at_the_terminal ? startOfDay(new Date(itemJson.loading_at_the_terminal)) : null,
            port_entry_date: itemJson.port_entry_date ? startOfDay(new Date(itemJson.port_entry_date)) : null,
            ata_date: itemJson.ata_date ? startOfDay(new Date(itemJson.ata_date)) : null,
            atd_date: itemJson.atd_date ? startOfDay(new Date(itemJson.atd_date)) : null,
            etd_date: itemJson.etd_date ? startOfDay(new Date(itemJson.etd_date)) : null,
            booking_confirmation_date: itemJson.booking_confirmation_date ? startOfDay(new Date(itemJson.booking_confirmation_date)) : null,
            gr_requested_date: itemJson.gr_requested_date ? startOfDay(new Date(itemJson.gr_requested_date)) : null,
            gr_expected: itemJson.gr_expected ? startOfDay(new Date(itemJson.gr_expected)) : null,
            gr_original: itemJson.gr_original ? startOfDay(new Date(itemJson.gr_original)) : null,
            gr_effective: itemJson.gr_effective ? startOfDay(new Date(itemJson.gr_effective)) : null,
            gr_actual: itemJson.gr_actual ? startOfDay(new Date(itemJson.gr_actual)) : null,
            transport_doc_delivery_date: itemJson.transport_doc_delivery_date ? startOfDay(new Date(itemJson.transport_doc_delivery_date)) : null,
            nf_date: itemJson.nf_date ? startOfDay(new Date(itemJson.nf_date)) : null,
            data_do_registro_da_di: itemJson.data_do_registro_da_di ? startOfDay(new Date(itemJson.data_do_registro_da_di)) : null,
            last_position_update: itemJson.last_position_update ? startOfDay(new Date(itemJson.last_position_update)) : null,
            last_historic_update: itemJson.last_historic_update ? startOfDay(new Date(itemJson.last_historic_update)) : null,
            protocol_li_date: itemJson.protocol_li_date ? startOfDay(new Date(itemJson.protocol_li_date)) : null,
            customs_clearance_date: itemJson.customs_clearance_date ? startOfDay(new Date(itemJson.customs_clearance_date)) : null,
            revised_eta_date: itemJson.revised_eta_date ? startOfDay(new Date(itemJson.revised_eta_date)) : null,
            created_at: itemJson.created_at ? new Date(itemJson.created_at) : null,
            updated_at: DateTime.fromJSDate(new Date()).toISO(),
            canceled_at: itemJson.canceled_at ? new Date(itemJson.canceled_at) : null,
            deleted_at: itemJson.deleted_at ? new Date(itemJson.deleted_at) : null,
            gr_actual_old: itemJson.gr_actual_old ? startOfDay(new Date(itemJson.gr_actual_old)) : null,
            ...element
          };

          orderItemMergeArray.push(orderItemMerge);

        })

      })
    )

    return orderItemMergeArray;
  }

  public async orderItemArrayCreateUpdate(orderItemUnique: any[]) {

    const orderItemCreate: any[] = [];
    const orderItemUpdate: any[] = [];

    await Promise.all(
      orderItemUnique.map(async (element) => {

        // order-item
        delete element.id;

        // order
        delete element.order_reference;
        delete element.company_id;
        delete element.responsible_po;
        delete element.csr_name;

        // product
        delete element.product_code;
        delete element.product_description;
        delete element.origem;
        delete element.business_unit;
        delete element.bu;
        delete element.consignee;
        delete element.alert_critical;
        delete element.ignored_stock;

        // company
        delete element.plant_code;

        // supplier
        delete element.supplier;

        const orderItemFind = await this.findWithOrder(element.order_id, element.item);

        if(!orderItemFind){
          orderItemCreate.push(element);
        } else {
          orderItemUpdate.push(orderItemFind);
          await this.update(orderItemFind.id, element);
        }

      })
    )

    return { orderItemCreate, orderItemUpdate };

  }

  public async orderItemArrayUpdate(orderItemUnique: any[]) {

    const orderItemUpdate: any[] = [];

    await Promise.all(
      orderItemUnique.map(async (element) => {

        // order
        delete element.order_reference;
        delete element.company_id;
        delete element.responsible_po;
        delete element.csr_name;

        // product
        delete element.product_code;
        delete element.product_description;
        delete element.origem;
        delete element.business_unit;
        delete element.bu;
        delete element.consignee;
        delete element.alert_critical;
        delete element.ignored_stock;

        // company
        delete element.plant_code;

        // supplier
        delete element.supplier;

        delete element.container_type_2;

        await this.update(element.id, element);
        orderItemUpdate.push(element);

      })
    )

    return { orderItemUpdate };

  }
}
