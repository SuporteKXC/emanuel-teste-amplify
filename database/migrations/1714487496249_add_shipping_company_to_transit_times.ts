import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "timeline_types";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
       table.string("shipping_company").after("modal").nullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
        table.dropColumn("shipping_company") ; 
    });
  }
}
