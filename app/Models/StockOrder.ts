import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class StockOrder extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public order_reference: string;
  
  @column()
  public invoice_number: string;
  
  @column()
  public order_id: number;

  @column.dateTime()
  public sap_import_date: DateTime;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;
}
