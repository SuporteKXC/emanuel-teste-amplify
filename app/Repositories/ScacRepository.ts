import Scac from "App/Models/Scac";

export default class ScacRepository {
  
  public async getScacCodeAll() {
    try{
      const scacAll = await Scac.query().whereNull("deleted_at");
      return scacAll;
    } catch(error: any){
      console.error("Error ScacRepository Method getScacCodeAll", error.message);
      throw error;
    }
  }
} 