import { CookingRule, Event, EventType } from "../ruleTypes";
import { vegTypes, VegCalculation } from "./vegCalculation";

export class VegCookingRule implements CookingRule {
  constructor(private veg: VegCalculation, private diners: number) {}
  public getCookingTime() {
    return this.veg.getCookingTime();
  }

  public getCookingEvents(elementId: number) {
    const prepEvent: Event = {
      name: this.veg.getName(),
      description: `Preparing ${this.veg.getName()}`,
      duration: this.veg.getPrepTime(this.diners),
      type: EventType.prep,
      elementId
    };

    const cookingEvent: Event = {
      name: this.veg.getName(),
      description: `Cook ${this.veg.getName()}`,
      duration: this.veg.getCookingTime(),
      type: EventType.cooking,
      elementId
    };

    return [prepEvent, cookingEvent];
  }

  public getDisplayName() {
    return this.veg.getName();
  }
}

export const vegRule : (veg : VegCalculation, diners: number) => VegCookingRule = (veg : VegCalculation, diners: number) =>
   new VegCookingRule(veg, diners);


export {vegTypes} ;