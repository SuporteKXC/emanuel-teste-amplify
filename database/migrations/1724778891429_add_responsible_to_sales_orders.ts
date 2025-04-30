import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "sales_orders";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("responsible_code").after("document_id").nullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("responsible_code");
    });
  }
}
