import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'import_from_tos'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('split_multiplier').after('format');
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('split_multiplier');
    })
  }
}
