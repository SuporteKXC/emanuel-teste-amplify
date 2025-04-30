import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "order_itens";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean("container_return_required").defaultTo(true);
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("container_return_required");
    });
  }
}
