import Vessel from "App/Models/Vessel";

export default class VesselRepository {
  public async getActiveVessels(): Promise<Vessel[]> {
    try {
      const vesselResult = await Vessel.query().whereNull("deleted_at");
      return vesselResult;
    } catch (error: any) {
      console.error("Error VesselRepository Method getActiveVessels", error.message);
      throw error;
    }
  }
}
