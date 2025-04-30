import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sales_orders'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('incoterms', 6).after('status')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('incoterms')
    })
  }
}
