import { DateTime } from 'luxon';
import { BaseModel, column, HasMany, hasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import Product from 'App/Models/Product';
import OrderIten from 'App/Models/OrderItem';
import Company from 'App/Models/Company';

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public order_reference: string

  @column()
  public responsible_po: string

  @column()
  public csr_name: string

  @column()
  public product_id: number

  @column()
  public company_id: number

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime()
  public deleted_at: DateTime | null

  @hasOne(() => Product, {
    foreignKey: 'id',
    localKey: 'product_id'
  })
  public product: HasOne<typeof Product>

  @hasOne(() => Company, {
    foreignKey: 'id',
    localKey: 'company_id'
  })
  public company: HasOne<typeof Company>

  @hasMany(() => OrderIten, {
    foreignKey: 'order_id',
    localKey: 'id'
  })
  public order_itens: HasMany<typeof OrderIten>
}
