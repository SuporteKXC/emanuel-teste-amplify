import GetFileEmailJob from "App/Jobs/GetFileEmailJob";
import schedule from "node-schedule";

export default class GetFileEmailScheduler {
  
  constructor(){
  }

  static async init(){
    const job = new GetFileEmailJob();

    schedule.scheduleJob("*/5 * * * *", () => {
      console.log("SCHEDULER JOB INICIOU");
      job.getFile();
    })
  }
}