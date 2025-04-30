import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Product from './Product';

export default class ProductDeadline extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public product_id: number
  
  @column()
  public deadline_days: number

  @column.dateTime()
  public begin: DateTime | null

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime()
  public deleted_at: DateTime | null

  // Relacionamento
  @belongsTo(() => Product, {
    foreignKey: 'product_id',
    localKey: 'id'
  })
  public product: BelongsTo<typeof Product>
}
