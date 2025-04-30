import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'timelines'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('timeline_type_id').unsigned().notNullable().references('id').inTable('timeline_types').after('step')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('timeline_type_id')
      table.dropColumn('timeline_type_id')
    })
  }
}
