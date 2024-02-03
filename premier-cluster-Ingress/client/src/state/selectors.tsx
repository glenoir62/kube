import { getRecipe } from "apis";
import { selector, selectorFamily } from "recoil";
import { ObjectId } from "types";
import { recipesState } from "./atoms";

export const selectFilteredRecipes = selectorFamily({
  key: "selectFilteredRecipes",
  get:
    (filter: string) =>
    ({ get }) => {
      const recipes = get(recipesState);
      return recipes.filter((r) => r.title.toLowerCase().startsWith(filter));
    },
});

export const selectActiveRecipe = selectorFamily({
  key: "selectActiveRecipe",
  get: (recipeId?: ObjectId) => async () =>
    recipeId ? await getRecipe(recipeId) : null,
});

export const selectWishedRecipes = selector({
  key: "selectWishedRecipes",
  get: ({ get }) => get(recipesState)?.filter((r) => r.liked),
});
