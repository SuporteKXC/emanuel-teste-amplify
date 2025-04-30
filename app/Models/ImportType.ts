import { DateTime } from 'luxon';
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm';

import ImportFromTo from 'App/Models/ImportFromTo';
import Company from './Company';


export default class ImportType extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  
  @column()
  public identifier: string
  
  @column()
  public group_slug: string
  
  @column()
  public company_id: number
  
  @column()
  public module_id: number

  @column()
  public storage_location_id: number
  
  @column()
  public skip_rows: number

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime()
  public deleted_at: DateTime | null

  @hasMany(() => ImportFromTo, {
    foreignKey: 'import_type_id',
    localKey: 'id'
  })
  public import_from_to: HasMany<typeof ImportFromTo>

  @hasOne(() => Company, {
    foreignKey: 'id',
    localKey: 'company_id'
  })
  public company: HasOne<typeof Company>
}
