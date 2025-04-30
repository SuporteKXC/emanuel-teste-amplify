import InfoImportLog from "App/Models/InfoImportLog";

export default class InfoImportLogRepository {
  
  public async create(data: any) {
    try {
      const infoImportLogResult = await InfoImportLog.create(data);
      return infoImportLogResult;
    } catch (error: any) {
      console.error("Error InfoImportLogRepository Method create", error.message);
      throw error;
    }
  }
}