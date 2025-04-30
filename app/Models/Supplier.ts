import { DateTime } from 'luxon';
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import OrderIten from 'App/Models/OrderItem';

export default class Supplier extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code: string

  @column()
  public description: string

  @column()
  public country: string

  @column()
  public is_special: boolean
  
  @column()
  public is_ignore_comex: boolean

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime()
  public deleted_at: DateTime | null

  // Relacionamento
  
  @hasMany(() => OrderIten, {
    foreignKey: 'supplier_id',
    localKey: 'id'
  })
  public order_item: HasMany<typeof OrderIten>
}
