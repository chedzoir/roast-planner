import { DateTime } from "luxon";

export enum EventType {
  prep,
  cooking,
  resting,
  serving,
}

export interface Event {
  name: string;
  description: string;
  startTime?: DateTime;
  endTime?: DateTime;
  duration: number;
  type: EventType;
  elementId: number;
}

export interface CookingRule {
  getCookingEvents(elementId: number): Event[];
  getCookingTime(): number;
  getDisplayName(): string;
}
