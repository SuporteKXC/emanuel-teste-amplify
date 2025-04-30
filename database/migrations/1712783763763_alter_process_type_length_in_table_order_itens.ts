import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'order_itens'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('process_type', 255).alter()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('process_type', 20).alter()
    })
  }
}
