import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class ScacModel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public scac_code: string

  @column()
  public carrier_name: string

  @column()
  public carrier_name_abbreviation: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime()
  public deleted_at: DateTime | null
}
