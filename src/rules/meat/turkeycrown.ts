import { MeatCalculation } from "./meatCalculation";

const turkeyCrownCalculation: MeatCalculation = {
  getCookingTime: (weight: number) => {
    if (weight < 4) {
      return weight * 25 + 70;
    }
    return weight * 20 + 90;
  },
  getRestingTime: () => 30,
  getName: () => 'Turkey Crown'
};

export default turkeyCrownCalculation;
