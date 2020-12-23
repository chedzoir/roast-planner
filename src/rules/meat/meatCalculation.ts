export interface MeatCalculation {
    getCookingTime: (weight : number ) => number;
    getRestingTime: () => number;
    getName: () => string;
}