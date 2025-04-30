import { DateTime } from 'luxon';
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import OrderIten from 'App/Models/OrderItem';
import Order from 'App/Models/Order';
import ProductDeadline from './ProductDeadline';
// import ProductResponsible from 'App/Models/ProductResponsible';

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column()
  public code: string
  
  @column()
  public origem: string
  
  @column()
  public business_unit: string
  
  @column()
  public bu: string

  @column()
  public consignee: string

  @column()
  public alert_critical: boolean
  
  @column()
  public ignored_stock: boolean
  
  @column()
  public deadline_days: number

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime()
  public deleted_at: DateTime | null

  @hasMany(() => Order, {
    foreignKey: 'product_id',
    localKey: 'id'
  })
  public orders: HasMany<typeof Order>
  
  @hasMany(() => OrderIten, {
    foreignKey: 'product_id',
    localKey: 'id'
  })
  public order_itens: HasMany<typeof OrderIten>

  @hasMany(() => ProductDeadline, {
    foreignKey: 'product_id',
    localKey: 'id'
  })
  public product_deadline: HasMany<typeof ProductDeadline>
  
  // @hasMany(() => ProductResponsible, {
  //   foreignKey: 'product_id',
  //   localKey: 'id'
  // })
  // public product_responsible: HasMany<typeof ProductResponsible>
}
