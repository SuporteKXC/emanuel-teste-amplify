import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Vessel extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public vessel_name: string;

  @column()
  public imo_number: number;

  @column()
  public abbreviation_vessel_name: string;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public deleted_at: DateTime;
}
