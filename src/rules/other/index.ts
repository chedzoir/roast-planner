import { CookingRule, EventType } from "../ruleTypes";

export class MiscCookingRule implements CookingRule {
  constructor(private name: string, private cookingTime: number) {}

  public getCookingTime() {
    return this.cookingTime;
  }

  public getCookingEvents(elementId: number) {
    return [
      {
        name: this.name,
        description: `Cook ${this.name}`,
        duration: this.getCookingTime(),
        type: EventType.cooking,
        elementId,
      },
    ];
  }

  public getDisplayName() {
    return this.name;
  }
}

export const MiscItems : Record<string, MiscCookingRule> = {
  pigsinblankets: new MiscCookingRule("Pigs in blankets", 25),
  stuffing: new MiscCookingRule("Stuffing", 25),
};
