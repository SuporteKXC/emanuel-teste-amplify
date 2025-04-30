import Timeline from "App/Models/Timeline";

export default class TimelineRepository {
  
  public async index(): Promise<Timeline[]> {
    try {
      const timelineResult = await Timeline.query()
        .whereNull("deleted_at")
        .whereHas("timeline_type", (query) => {
          query.where("module_id", 2);
        })
        .preload("timeline_type")
        .orderBy("step", "desc");
      return timelineResult;
    } catch (error: any) {
      console.error("Error TimelineRepository Method index", error.message);
      throw error;
    }
  }
}