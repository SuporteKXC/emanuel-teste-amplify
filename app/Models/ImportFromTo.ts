import { DateTime } from 'luxon';
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';

import DbColumnName from 'App/Models/DbColumName';
import ImportType from 'App/Models/ImportType';


export default class ImportFromTo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public import_type_id: number

  @column()
  public worksheet_column: string

  @column()
  public db_column_name_id: number

  @column()
  public required: boolean
  
  @column()
  public type: string
  
  @column()
  public format: string
  
  @column()
  public split_multiplier: string

  @column()
  public match_substring: string
  
  @column()
  public replacer: string
  
  @column()
  public default: string
  
  @column()
  public is_update_only: boolean

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime()
  public deleted_at: DateTime | null

  @hasOne(() => ImportType, {
    foreignKey: 'id',
    localKey: 'import_type_id'
  })
  public import_type: HasOne<typeof ImportType>

  @hasOne(() => DbColumnName, {
    foreignKey: 'id',
    localKey: 'db_column_name_id'
  })
  public db_column_name: HasOne<typeof DbColumnName>
}
