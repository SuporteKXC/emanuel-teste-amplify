import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "order_itens";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('etd_date_old', { useTz: true }).nullable().defaultTo(null);
      table.timestamp('eta_date_old', { useTz: true }).nullable().defaultTo(null);
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('etd_date_old');
      table.dropColumn('eta_date_old');
    });
  }
}
