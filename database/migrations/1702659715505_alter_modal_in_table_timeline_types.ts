import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'timeline_types'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('modal').nullable().alter();
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('modal').notNullable().alter();
    })
  }
}
