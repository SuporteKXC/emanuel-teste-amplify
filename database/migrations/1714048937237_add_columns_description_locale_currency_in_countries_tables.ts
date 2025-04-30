import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'countries'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
     table.string('locale').nullable().after('code')
     table.string('currency').nullable().after('code')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('locale', 'currency')
     })
  }
}
