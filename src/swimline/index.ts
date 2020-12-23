import { DateTime } from "luxon";
import { Event } from "../rules";

export type SwimlineEvent = Event & {
  x: number;
  y: number;
  width: number;
  startTime: number;
  endTime: number
};

export type SwimlineData = {
  minVal : number,
  maxVal : number,
  marker: number,
  data : SwimlineEvent[]
}

const swimlineDetail = (eventsByElement: Record<string, Event[]>) => {
  const swimlines = Object.keys(eventsByElement);

  const res = swimlines
    .map((line) =>
      eventsByElement[line].map((ev: Event) => ({
        ...ev,
        startMillis: ev.startTime!.toMillis(),
        endMillis: ev.endTime!.toMillis(),
      }))
    )
    .reduce((a, b) => a.concat(b), []);

  const earliestTime = res.reduce(
    (a, b) => (a > b.startMillis ? b.startMillis : a),
    res[0].startMillis
  );

  const latestTime = res.reduce(
    (a, b) => (a < b.endMillis ? b.endMillis : a),
    res[0].endMillis
  );

  let earliestByLine = swimlines.map((line) => {
    const elementId = eventsByElement[line][0].elementId;
    const startTime = eventsByElement[line].reduce(
      (a, b) => (a > b.startTime!.toMillis() ? b.startTime!.toMillis() : a),
      eventsByElement[line][0].startTime!.toMillis()
    );
    return { elementId, startTime };
  });

  const xStrt = earliestTime - (900000 - (earliestTime % 900000));

  const sortOrder = earliestByLine
    .sort((a, b) => a.startTime - b.startTime)
    .map((a) => a.elementId);

  return {
    minVal: xStrt,
    maxVal: latestTime,
    marker: DateTime.local().toMillis(),

    data: res.map((elt) => ({
      ...elt,
      startTime: elt.startMillis,
      endTime: elt.endMillis, 
      x: (elt.startMillis - xStrt) / (latestTime - xStrt),
      y: 35 * (sortOrder.indexOf(elt.elementId) + 1),
      width: (elt.endMillis - elt.startMillis) / (latestTime - xStrt),
    })),
  };
};

export default swimlineDetail;
