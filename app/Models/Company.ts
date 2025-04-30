import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  // hasMany,
  // HasMany,
  // HasOne,
  // hasOne,
} from "@ioc:Adonis/Lucid/Orm";
// import UserCompany from "App/Models/UserCompany";
// import Account from "App/Models/Account";
// import TransitTime from "App/Models/TransitTime";

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name_fantasy: string;

  @column()
  public cnpj: string;

  @column()
  public consignee: string;

  @column()
  public plant_code: string;

  @column()
  public account_id: number;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;

  @column.dateTime()
  public deleted_at: DateTime | null;

  @column()
  public country: string;

  // Relacionamento
  // @hasMany(() => UserCompany, {
  //   foreignKey: "company_id",
  //   localKey: "id",
  // })
  // public user_company: HasMany<typeof UserCompany>;

  // @hasOne(() => Account, {
  //   foreignKey: "id",
  //   localKey: "account_id",
  // })
  // public account: HasOne<typeof Account>;

  // @hasMany(() => TransitTime, {
  //   foreignKey: "company_id",
  //   localKey: "id",
  // })
  // public transit_times: HasMany<typeof TransitTime>;
}
