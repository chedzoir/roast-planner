import { MeatCalculation } from "./meatCalculation";

const turkeyCalculation: MeatCalculation = {
  getCookingTime: (weight: number) => {
    if (weight < 4.5) {
      return weight * 45 + 20;
    }
    if (weight < 6.5) {
      return weight * 40;
    }
    return weight * 35;
  },
  getRestingTime: () => 30,
  getName: () => 'Turkey'
};

export default turkeyCalculation;
