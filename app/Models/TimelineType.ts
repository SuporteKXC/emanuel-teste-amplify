import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class TimelineType extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public description: string;

  @column()
  public company_id: number;

  @column()
  public product_id: number;

  @column()
  public module_id: number;

  @column()
  public modal: string;

  @column()
  public incoterm: string;

  @column()
  public country: string;

  @column()
  public shipping_company: string;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;

  @column.dateTime()
  public deleted_at: DateTime | null;
}
