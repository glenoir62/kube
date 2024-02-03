import { RecipeI } from "interfaces";
import { atom } from "recoil";

export const recipesState = atom<RecipeI[]>({
  key: "recipesState",
  default: [],
});

export const wishlistDisplayState = atom({
  key: "wishlistDisplayState",
  default: false,
});
