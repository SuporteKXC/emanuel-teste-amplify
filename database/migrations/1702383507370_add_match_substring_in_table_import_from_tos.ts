import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'import_from_tos'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('match_substring').after('split_multiplier');
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('match_substring');
    })
  }
}
