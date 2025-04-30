import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class InfoImportLog extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public import_type_id: number

  @column()
  public succes_description: JSON

  @column()
  public error_description: JSON

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime()
  public deleted_at: DateTime | null
}
