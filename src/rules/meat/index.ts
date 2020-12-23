import { CookingRule, Event, EventType } from "../ruleTypes";
import { MeatCalculation } from "./meatCalculation";
import turkey from "./turkey";
import turkeyCrown from "./turkeycrown";

export class MeatCookingRule implements CookingRule {
  constructor(private meat: MeatCalculation, private weight: number) {}

  public getCookingTime() {
    return this.meat.getCookingTime(this.weight);
  }

  public getCookingEvents(elementId: number) {
    // Cooking Event
    const cookingEvent: Event = {
      name: this.meat.getName(),
      description: `${this.meat.getName()} goes in the oven.`,
      duration: this.getCookingTime(),
      type: EventType.cooking,
      elementId,
    };
    // Resting Event
    const restingEvent: Event = {
      name: this.meat.getName(),
      description: `${this.meat.getName()} comes out of the oven.`,
      duration: this.meat.getRestingTime(),
      type: EventType.resting,
      elementId,
    };
    // Carving Event
    const carvingEvent: Event = {
      name: this.meat.getName(),
      description: `Carve ${this.meat.getName()}.`,
      duration: 10,
      type: EventType.serving,
      elementId,
    };
    return [cookingEvent, restingEvent, carvingEvent];
  }

  public getDisplayName() {
    return this.meat.getName();
  }
}

export const MeatOptions: Record<string, MeatCalculation> = {
  turkeycrown: turkeyCrown,
  turkey,
};

export const MeatRule: (
  meat: MeatCalculation,
  weight: number
) => MeatCookingRule = (meat: MeatCalculation, weight: number) =>
  new MeatCookingRule(meat, weight);
