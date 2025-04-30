import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'holidays'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('company_id').unsigned().nullable().references('id').inTable('companies')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, table => table.dropColumn('company_id'))
  }
}
