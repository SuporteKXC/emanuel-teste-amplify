import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'import_from_tos'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('is_update_only').defaultTo(false).after('default');
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('is_update_only');
    })
  }
}
