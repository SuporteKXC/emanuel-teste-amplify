import ImportType from "App/Models/ImportType";
import Env from "@ioc:Adonis/Core/Env";

export default class ImportTypeRepository{

  public async index(){
    const importType = await ImportType.query()
      .preload("import_from_to", (build) => {
        build.preload("db_column_name")
        .whereNull("deleted_at")
      })
      .whereNull("deleted_at")
    
    return importType;
  }

  public async import(){

    const moduleId = Env.get("MODULE_ID");

    const importType = await ImportType.query()
      .where("module_id", moduleId)
      .preload("import_from_to", (build) => {
        build.preload("db_column_name")
        .whereNull("deleted_at")
      })
      .whereNull("deleted_at")
    
    return importType;
  }
}