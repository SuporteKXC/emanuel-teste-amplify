import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'import_types'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('module_id').unsigned().nullable().references('id').inTable('modules').after('company_id')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('module_id')
      table.dropColumn('module_id')
    })
  }
}
