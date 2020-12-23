import { CookingRule, Event, EventType } from "../ruleTypes";
import {
  MashPotato,
  PotatoCalculation,
  RoastPotato,
} from "./potatoCalculation";

export class PotatoCookingRule implements CookingRule {
  constructor(private potato: PotatoCalculation, private diners: number) {}
  public getCookingTime() {
    return this.potato.getCookingTime();
  }

  public getCookingEvents(elementId: number) {

    const peelingEvent: Event = {
      name: this.potato.getName(),
      description: `Peeling potato for ${this.diners} people`,
      duration: (20 * this.diners) / this.diners,
      type: EventType.prep,
      elementId,
    };

    const cookingEvents = this.potato.getCookingEvents(elementId);

    const servingEvents = this.potato.getServingEvents(elementId);

    return [peelingEvent, ...cookingEvents, ...servingEvents];
  }

  public getDisplayName() {
    return this.potato.getName();
  }
}

export const potatoTypes : Record<string, PotatoCalculation> = {
  mashpotato: MashPotato,
  roastpotato: RoastPotato,
};


export const PotatoRule: (
  calculation: PotatoCalculation,
  diners: number
) => PotatoCookingRule = (calculation: PotatoCalculation, diners: number) =>
  new PotatoCookingRule(calculation, diners);
