import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'db_column_names'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('table_reference').nullable().after('name');
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('table_reference');
    })
  }
}
