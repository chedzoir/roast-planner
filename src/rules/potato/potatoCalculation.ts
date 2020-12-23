import { Event, EventType } from "../ruleTypes";

export interface PotatoCalculation {
  getCookingEvents(elementId: number): Event[];
  getServingEvents(elementId: number): Event[];
  getCookingTime(): number;
  getName():string;
}

export const RoastPotato: PotatoCalculation = {
  getName: () => 'Roast Potato',
  getCookingTime: () => 70,
  getCookingEvents: (elementId: number) => [
    {
      name: "Roast Potato",
      description: "Parboil potatoes before roasting",
      duration: 10,
      type: EventType.cooking,
      elementId
    },
    {
      name: "Roast Potato",
      description: "Roast potatoes",
      duration: 60,
      type: EventType.cooking,
      elementId
    },
  ],
  getServingEvents: (elementId: number) => [],
};

export const MashPotato: PotatoCalculation = {
  getName: () => 'Mash Potato',
  getCookingTime: () => 70,
  getCookingEvents: (elementId: number) => [
    {
      name: "Mash Potato",
      description: "Boil potatoes",
      duration: 30,
      type: EventType.cooking,
      elementId
    },
  ],
  getServingEvents: (elementId: number) => [
    {
      name: "Mash Potato",
      description: "Mash potatoes",
      duration: 5,
      type: EventType.serving,
      elementId
    },
  ],
};
