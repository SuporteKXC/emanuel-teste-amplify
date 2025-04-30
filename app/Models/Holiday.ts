import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Company from './Company'
import { DateTime } from 'luxon'

export default class Holiday extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column.dateTime()
    public holidayDate: DateTime

    @column()
    public fixed: boolean

    @column()
    public companyId: number | null

    @belongsTo(() => Company)
    public company: BelongsTo<typeof Company>

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @column.dateTime()
    public deletedAt: DateTime
}