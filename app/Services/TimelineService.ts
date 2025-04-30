import Timeline from "App/Models/Timeline";
import TimelineRepository from "App/Repositories/TimelineRepository";
import DateDelayStatus from "App/Utils/DateDelayStatus";

export type TimelineStepType = {
  [key: string]: {
    code: string
    field: string
    step: number
  }[]
}

export type ExcludeTimelineField = {
  [key: string]: string[]
}

export default class TimelineService {
  public repository: TimelineRepository;
  public dateDelayStatus: DateDelayStatus;
  stepAux: number | null = null
  constructor() {
    this.repository = new TimelineRepository();
    this.dateDelayStatus = new DateDelayStatus();
  }

  public async index(): Promise<Timeline[]> {
    const timelineResult = await this.repository.index();
    return timelineResult;
  }

  public findTimeLine(data: any[], timeline: Timeline[]): ExcludeTimelineField {
    const timelineSteps: TimelineStepType = {};
    data.forEach((element) => {
      let count = 0;
      let already = false;

      let timelineAfter: Timeline | null = null;

      let timelineFinal: Timeline[] = this.timelineFound(element, timeline);


      const timelineCount = timelineFinal.length - 1;

      element.timeline_type_id = timelineFinal[0]?.timeline_type?.id
        ? timelineFinal[0]?.timeline_type?.id
        : null;

      for (let item of timelineFinal) {

        if(element.timeline_type_id === 1 && element.plant_delivery) {
          if(!(element.id in timelineSteps)) {
            timelineSteps[element.id] = []
          }

         if(timelineSteps[element.id].every(timeline => timeline.step !== item.step)) {
          timelineSteps[element.id].push({
            step: item.step,
            code: item.code,
            field: item.field
          })
         }
        }


        if (
          (element[item.field] || element[item.aux_field]) &&
          count == 0 &&
          !already
        ) {
          // element.process_status = item.code;
          element.process_status = "FINALIZADO";
          element.delay_status = this.dateDelayStatus.delayStatus(
            element[item.field],
            item.max_delay
          )
            ? "T"
            : "F";
          element.delay_status =
            item.max_delay == 0 ? "F" : element.delay_status;
          already = true;
        } else if (
          (element[item.field] || element[item.aux_field]) &&
          timelineAfter &&
          !already
        ) {
          element.process_status = timelineAfter.code;

          element.delay_status = this.dateDelayStatus.delayStatus(
            element[item.field],
            item.max_delay
          )
            ? "T"
            : "F";
          element.delay_status =
            item.max_delay == 0 ? "F" : element.delay_status;
          already = true;
        } else if (
          (!element[item.field] || element[item.aux_field]) &&
          count == timelineCount &&
          !already
        ) {
          element.process_status = item.code;
          already = true;
        }

        timelineAfter = item;

        count++;
      }
    });


    return  this.getExcludeSteps(timelineSteps)

  }

  public timelineFound(data: any, timelines: Timeline[]) {
    const timelineKeysArr = ['product_id', 'company_id', 'modal', 'shipping_company']
    let timelineKeysTotal = timelineKeysArr.length

    data.shipping_company = data.agente_carga

    const matchesAllKeys = (timelines: Timeline[]) => {
      const matchTimeline: Timeline[] = []
       timelines.forEach(item => {
          let foundKeys = 0;
          timelineKeysArr.forEach(key => {

              if(item.timeline_type[key] == data[key] && item.timeline_type[key] != null) {
                foundKeys++
              }
          })

          if(foundKeys == timelineKeysTotal) {
             matchTimeline.push(item)
          }
        })

        return matchTimeline
    }

    while(timelineKeysTotal > 0) {
      const getTimelines = this.findTimelines(timelineKeysArr, timelineKeysTotal, timelines)
      const matchingTimelines = matchesAllKeys(getTimelines)

      timelineKeysTotal--

      if(matchingTimelines.length > 0) {
        delete data.shipping_company;
        return matchingTimelines
      }

    }

    const defaultTimeline = timelines.filter(timeline => timelineKeysArr.every(key => {
      return timeline.timeline_type[key] == null
    }))!

    delete data.shipping_company;

    return defaultTimeline

  }


  private findTimelines(timelineKeys: string[], timelineKeysTotal: number, timelines:  Timeline[]) {
    const currentTimelines: Timeline[] = []

    timelines.forEach(timeline => {
      let keyCount = 0;

      timelineKeys.forEach(timelineKey => {
        if(timeline.timeline_type[timelineKey]) {
          keyCount++
        }
      })

      if(keyCount === timelineKeysTotal) {
        currentTimelines.push(timeline)
      }

    })

    return currentTimelines
  }


  private getExcludeSteps(timelineSteps: TimelineStepType): ExcludeTimelineField  {

    const excludeStepsArr: any = {}

    Object.entries(timelineSteps).forEach(([timelineId, timelineValue]) => {
      timelineValue.forEach(value => {
        const currentKey = value.step

        if(this.stepAux) {
          if(this.stepAux > currentKey) {

            if(!(timelineId in excludeStepsArr)) {
              excludeStepsArr[timelineId] = []
            }
            excludeStepsArr[timelineId].push(value.field)
          }

        }
        if(value.code === "CHEGADA_PLANTA" && !this.stepAux) {
          this.stepAux = currentKey
          this.getExcludeSteps(timelineSteps)
        }

      })
    })


    return excludeStepsArr

  }
}
