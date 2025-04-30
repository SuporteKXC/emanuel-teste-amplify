import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'order_itens'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('customer_po').after('po_number').nullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('customer_po')
    })
  }
}
