import { DateTime } from "luxon";
import { BaseModel, column, hasOne, HasOne } from "@ioc:Adonis/Lucid/Orm";
// import { BaseModel, column, HasMany, hasMany, hasOne, HasOne } from "@ioc:Adonis/Lucid/Orm";
import Order from "App/Models/Order";
// import OrderItemAlert from "App/Models/OrderItemAlert";
// import UserFavorit from "App/Models/UserFavorite";
import Product from "./Product";
// import Supplier from "./Supplier";

export default class OrderIten extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public po_number: string;

  @column()
  public customer_po: string;

  @column()
  public product_id: number;

  @column()
  public bdp_ref: string;

  @column.dateTime()
  public eta_date: DateTime;

  @column()
  public qty: string;

  @column()
  public process_status: string;

  @column()
  public delay_status: string;

  @column()
  public process_critical: string;

  @column.dateTime()
  public register_date: DateTime | null;

  @column()
  public item: string;

  @column()
  public doc_num: string;

  @column()
  public uom: string;

  @column()
  public gross_weight: string;

  @column()
  public net_weight: string;

  @column()
  public invoice_currency: string;

  @column()
  public invoice_value: string;

  @column()
  public modal: string;

  @column()
  public shipper: string;

  @column()
  public last_historic: string;

  @column()
  public shipper_address: string;

  @column()
  public destination: string;

  @column()
  public plant_destiny: string;

  @column()
  public carrier: string;

  @column()
  public agente_carga: string;

  @column()
  public channel: string;

  @column()
  public supplier_id: number;

  @column()
  public order_id: number;

  @column()
  public container_type: string;

  @column()
  public ncm: string;

  @column()
  public gr_actual_updated_count: number;

  @column.dateTime()
  public last_position_update: DateTime | null;

  @column.dateTime()
  public data_do_registro_da_di: DateTime | null;

  @column.dateTime()
  public nf_date: DateTime | null;

  @column.dateTime()
  public transport_doc_delivery_date: DateTime | null;

  @column()
  public current_longitude: string;

  @column()
  public current_latitude: string;

  @column()
  public angle_rotate: string;

  @column()
  public current_vessel_code: string;

  @column()
  public current_vessel: string;

  @column()
  public carrier_code: string;

  @column()
  public container_code: string;

  @column()
  public shipment_tracking_code: string;

  @column.dateTime()
  public invoice_date: DateTime;

  @column.dateTime()
  public etd_date: DateTime;

  @column.dateTime()
  public etd_date_old: DateTime;

  @column.dateTime()
  public eta_date_old: DateTime;

  @column.dateTime()
  public booking_confirmation_date: DateTime;

  @column()
  public booking_number: string;

  @column.dateTime()
  public atd_date: DateTime;

  @column.dateTime()
  public ata_date: DateTime;

  @column.dateTime()
  public port_entry_date: DateTime;

  @column.dateTime()
  public loading_at_the_terminal: DateTime;

  @column.dateTime()
  public plant_delivery: DateTime;

  @column.dateTime()
  public docs_received_date: DateTime;

  @column.dateTime()
  public protocol_mapa_in26_date: DateTime;

  @column.dateTime()
  public post_import_license_release_date: DateTime;

  @column.dateTime()
  public gr_requested_date: DateTime | null;

  @column.dateTime()
  public gr_original: DateTime | null;

  @column.dateTime()
  public gr_expected: DateTime | null;

  @column.dateTime()
  public gr_actual: DateTime | null;

  @column.dateTime()
  public gr_actual_old: DateTime | null;

  @column.dateTime()
  public gr_effective: DateTime | null;

  @column.dateTime()
  public customs_clearance_date: DateTime | null;

  @column.dateTime()
  public protocol_li_date: DateTime | null;

  @column.dateTime()
  public last_historic_update: DateTime | null;

  @column.dateTime()
  public revised_eta_date: DateTime | null;

  @column.dateTime()
  public atb_date: DateTime | null;

  @column.dateTime()
  public etb_date: DateTime | null;

  @column()
  public need_li: string;

  @column()
  public li_number: string;

  @column()
  public destination_harbor: string;

  @column()
  public port_clearance: string;

  @column()
  public process_type: string;

  @column()
  public cargo_type: string;

  @column()
  public timeline_type_id: number;

  @column()
  public container_return_required: boolean;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;

  @column.dateTime()
  public canceled_at: DateTime;

  @column.dateTime()
  public deleted_at: DateTime | null;

  @hasOne(() => Order, {
    foreignKey: "id",
    localKey: "order_id",
  })
  public order: HasOne<typeof Order>;

  // @hasMany(() => OrderItemAlert, {
  //   foreignKey: "order_item_id",
  //   localKey: "id",
  // })
  // public order_item_alert: HasMany<typeof OrderItemAlert>;

  // @hasMany(() => UserFavorit, {
  //   foreignKey: "order_item_id",
  //   localKey: "id",
  // })
  // public user_favorit: HasMany<typeof UserFavorit>;

  @hasOne(() => Product, {
    foreignKey: "id",
    localKey: "product_id",
  })
  public product: HasOne<typeof Product>;

  // @hasOne(() => Supplier, {
  //   foreignKey: "id",
  //   localKey: "supplier_id",
  // })
  // public supplier: HasOne<typeof Supplier>;
}
