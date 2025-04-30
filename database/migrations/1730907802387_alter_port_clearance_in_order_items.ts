import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "order_itens";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("port_clearance", 255).nullable().alter();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("port_clearance", 30).nullable().alter();
    });
  }
}
