import BaseSchema from "@ioc:Adonis/Lucid/Schema";
export default class extends BaseSchema {
  protected tableName = "timeline_types";
  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("country", 255).nullable().after("shipping_company");
      table.string("incoterm", 255).nullable().after("country");
      table.integer("module_id").unsigned().nullable().references("id").inTable("modules").after('country')
    });
  }
  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("country");
      table.dropColumn("incoterm");
      table.dropForeign("module_id");
      table.dropColumn("module_id");
    });
  }
}