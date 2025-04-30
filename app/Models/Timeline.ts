import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import TimelineType from './TimelineType';

export default class Timeline extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column()
  public code: string

  @column()
  public field: string

  @column()
  public aux_field: string
  
  @column()
  public max_delay: number
  
  @column()
  public step: number
  
  @column()
  public timeline_type_id: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime()
  public deleted_at: DateTime | null

  // Relacionamento
  @belongsTo(() => TimelineType, {
    foreignKey: 'timeline_type_id',
    localKey: 'id'
  })
  public timeline_type: BelongsTo<typeof TimelineType>

}
