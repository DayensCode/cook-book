export interface ISlideItem {
  id: number;
  title: string;
  description: string;
}

export interface IRecipeForm {
  title: string;
  hours: number;
  minutes: number;
  image: File[];
  category: string;
  cuisine: string;
  ingredients: string[];
  hashtags: number[];
  instructions: string[];
}

export interface IAuthState {
  token: string | null;
  isAuthorized: boolean;
  username: string | null;
  id: number | null;
}

export interface IRecipesState {
  recipes: any[];
  loading: boolean;
  error: string | null;
  query: string;
  selectedHashtags: number[];
  selectedCategory: string;
  selectedCuisine: string;
  selectedMaxTime: number | null;
}
