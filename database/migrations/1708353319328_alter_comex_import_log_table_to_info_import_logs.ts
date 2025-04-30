import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'comex_import_logs'

  public async up () {
    this.schema.renameTable(this.tableName, 'info_import_logs')
  }

  public async down () {
    this.schema.renameTable('info_import_logs', this.tableName)
  }
}
