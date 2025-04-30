import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'order_itens'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('fob_value').after('cargo_type').nullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('fob_value')
    })
  }
}
