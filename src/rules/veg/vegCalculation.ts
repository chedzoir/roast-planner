export class VegCalculation {
  constructor(
    private name: string,
    private cookingTime: number,
    private prepTime: number
  ) {}

  public getName(): string {
    return this.name;
  }

  public getCookingTime() {
    return this.cookingTime;
  }

  public getPrepTime(diners: number) {
    return (this.prepTime * diners) / 4;
  }
}

const brusselsmushy: VegCalculation = new VegCalculation(
  "Brussel Sprouts (Mushy)",
  20,
  10
);
const brussels: VegCalculation = new VegCalculation("Brussel Sprouts", 10, 10);
const broccoli: VegCalculation = new VegCalculation("Broccoli", 10, 5);
const peas: VegCalculation = new VegCalculation("Peas (Frozen)", 10, 0);
const sweetcorn: VegCalculation = new VegCalculation(
  "Sweetcorn (Frozen)",
  10,
  0
);
const boiledparsnip: VegCalculation = new VegCalculation(
  "Boiled Parsnip",
  20,
  10
);
const roastparsnip: VegCalculation = new VegCalculation(
  "Roast Parsnip",
  35,
  10
);
const carrots: VegCalculation = new VegCalculation("Carrots", 10, 0);

export const vegTypes: Record<string, VegCalculation> = {
  brusselsmushy,
  brussels,
  broccoli,
  peas,
  sweetcorn,
  boiledparsnip,
  roastparsnip,
  carrots,
};
