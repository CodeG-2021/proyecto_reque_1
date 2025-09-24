export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  cost: number;
}

export interface Recipe {
  id: string;
  name: string;
  portionSize: number;
  ingredients: Ingredient[];
}

export interface Menu {
  id: string;
  name: string;
  dishes: Recipe[];
  estimatedPrice: number;
}
