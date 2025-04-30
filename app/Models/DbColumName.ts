import { DateTime } from 'luxon';
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';

import ImportFromTo from 'App/Models/ImportFromTo';


export default class DbColumnName extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime()
  public deleted_at: DateTime | null

  @hasMany(() => ImportFromTo, {
    foreignKey: 'db_column_name_id',
    localKey: 'id'
  })
  public import_from_to: HasMany<typeof ImportFromTo>
}
