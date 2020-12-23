import { Event, EventType, MeatRule } from "../rules";
import { DateTime } from "luxon";
import { PotatoRule, potatoTypes } from "../rules/potato";
import { vegRule, vegTypes } from "../rules/veg";
import { MeatCalculation } from "../rules/meat/meatCalculation";
import { MiscItems } from "../rules/other";

export interface RoastDinnerParameters {
  meat: MeatCalculation | undefined;
  weight: number | undefined;
  endTime: DateTime | undefined;
  diners: number;
  potato: string[];
  veg: string[];
  otherItems: string[];
}

export class RoastDinner {
  private events: Event[] = [];
  private elementCounter: number = 1;

  constructor(private readonly parameters: RoastDinnerParameters) {}

  public getStartTime() {
    return this.events
      .map((e) => e.startTime)
      .filter((e) => e !== undefined)
      .reduce((a, b) => minDate(a, b), this.parameters.endTime);
  }

  public getWeight() {
    return this.parameters.weight;
  }

  public getEndTime() {
    return this.parameters.endTime;
  }

  getMeatEvents() {
    const { meat, weight, endTime } = this.parameters;
    if (meat && weight) {
      const meatRule = MeatRule(meat, weight);
      return calculateTimes(
        meatRule.getCookingEvents(this.elementCounter++),
        endTime
      );
    }
  }

  getMeatCookingTime() {
    const { meat, weight } = this.parameters;
    if (meat && weight) {
      const meatRule = MeatRule(meat, weight);
      return meatRule.getCookingTime();
    }
  }

  getPotatoEvents() {
    const { potato, endTime, diners } = this.parameters;
    let res: Event[] = [];

    if (potato) {
      res = potato
        .map((type) =>
          calculateTimes(
            PotatoRule(
              potatoTypes[type.toLowerCase()],
              diners
            ).getCookingEvents(this.elementCounter++),
            endTime
          )
        )
        .reduce((a, b) => a.concat(b), []);
    }

    return res;
  }

  getVegEvents() {
    const { veg, endTime, diners } = this.parameters;
    let res: Event[] = [];
    if (veg) {
      res = veg
        .map((val) =>
          calculateTimes(
            vegRule(vegTypes[val], diners).getCookingEvents(
              this.elementCounter++
            ),
            endTime
          )
        )
        .reduce((a, b) => a.concat(b), []);
    }
    return res;
  }

  getOtherEvents() {
    const { otherItems, endTime } = this.parameters;
    let res: Event[] = [];
    if (otherItems) {
      res = otherItems
        .map((val) =>
          calculateTimes(
            MiscItems[val].getCookingEvents(this.elementCounter++),
            endTime
          )
        )
        .reduce((a, b) => a.concat(b), []);
    }
    return res;
  }

  calculate() {
    const meatEvents = this.getMeatEvents() || [];

    const potatoEvents = this.getPotatoEvents();

    const vegEvents = this.getVegEvents();

    const otherEvents = this.getOtherEvents();
    this.events = [
      ...meatEvents,
      ...potatoEvents,
      ...vegEvents,
      ...otherEvents,
    ];
    balanceEvents(this.events);
  }

  getSwimlines() {
    const res: Record<number, Event[]> = {};

    this.events.forEach((event) => {
      res[event.elementId] = res[event.elementId] || [];
      res[event.elementId].push(event);
    });

    return res;
  }

  getEventListDuration(events: Event[]) {
    let startTime: number | undefined;
    let endTime: number | undefined;
    events.forEach((e) => {
      if (!startTime || startTime > e.startTime?.toMillis()!) {
        startTime = e.startTime?.toMillis()!;
      }
      if (!endTime || endTime < e.endTime?.toMillis()!) {
        endTime = e.endTime?.toMillis()!;
      }
    });
    return endTime && startTime ? endTime - startTime : 0;
  }
  getEventList() {
    return mergeEvents(this.events);
  }
}

const mergeEvents = (events: Event[]) => {
  const res: Record<string, string[]> = {};

  events?.forEach((event) => {
    if (event.duration === 0) {
      return;
    }
    let timeLabel = "";
    if (event.startTime) {
      timeLabel = event.startTime.toLocaleString(DateTime.TIME_24_SIMPLE);
    }
    res[timeLabel] = res[timeLabel] || [];
    res[timeLabel].push(event.description);
  });

  return res;
};

const calculateTimes = (events: Event[], endTime: DateTime | undefined) => {
  if (endTime && events) {
    let eventEnd = endTime;
    for (let i = events.length - 1; i >= 0; i--) {
      events[i].endTime = eventEnd;
      eventEnd = events[i].startTime = eventEnd.minus({
        minutes: events[i].duration,
      });
    }
  }
  return events;
};

const balanceEvents = (events: Event[]) => {
  // balance prep events

  let balanced: boolean;

  do {
    const prepEvents = events
      .filter((event) => event.type === EventType.prep && event.duration > 0)
      .sort((e, f) => e.endTime!.toMillis() - f.endTime!.toMillis());
      
    balanced = true;
    for (let i = 0; i < prepEvents.length - 1; i++) {
      const evt1 = prepEvents[i];
      const evt2 = prepEvents[i + 1];
      if (
        evt2.endTime!.toMillis() > evt1.startTime!.toMillis() &&
        evt2.startTime!.toMillis() < evt1.endTime!.toMillis()
      ) {
        evt2.endTime = evt1.startTime;
        evt2.startTime = evt2.endTime?.minus({ minutes: evt2.duration });
        balanced = false;
      }
    }
  } while (!balanced);
};

const minDate = (date1: DateTime | undefined, date2: DateTime | undefined) => {
  if (!date1 && !date2) {
    return undefined;
  }
  if (!date1) {
    return date2;
  }
  if (!date2) {
    return date1;
  }

  return date1.toMillis() < date2.toMillis() ? date1 : date2;
};
