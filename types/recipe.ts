export interface RecipeLineModel {
  value: string;
  unit: string;
  label: string;
  body: WordToken[];
}

export interface WordToken {
  type: string;
  value: string;
  raw: string;
}

export interface RecipeModel {
  body: RecipeLineModel[];
}
