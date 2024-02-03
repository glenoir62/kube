import styles from "./Homepage.module.scss";
import Recipe from "./components/Recipe/Recipe";
import { useState } from "react";
import Loading from "components/Loading/Loading";
import Search from "./components/Search/Search";
import { useFetchRecipes } from "../../hooks";
import { updateRecipe as updateR, deleteRecipe as deleteR } from "../../apis";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  selectFilteredRecipes,
  recipesState,
  wishlistDisplayState,
} from "state";
import Wishlist from "./components/Wishlist/Wishlist";
import { RecipeI } from "interfaces";
import { ObjectId } from "types";

function Homepage() {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading] = useFetchRecipes(page);
  const recipes = useRecoilValue(selectFilteredRecipes(filter));
  const setRecipes = useSetRecoilState(recipesState);
  const showWishlist = useRecoilValue(wishlistDisplayState);

  async function updateRecipe(updatedRecipe: RecipeI) {
    const savedRecipe = await updateR(updatedRecipe);
    setRecipes(
      recipes.map((r) => (r._id === savedRecipe._id ? savedRecipe : r))
    );
  }

  async function deleteRecipe(_id: ObjectId) {
    await deleteR(_id);
    setRecipes(recipes.filter((r) => r._id !== _id));
  }

  return (
    <>
      <div className="flex-fill container d-flex flex-column p-20">
        <h1 className={`my-30 ${styles.title}`}>
          Découvrez nos nouvelles recettes{" "}
          <small className={styles.small}>- {recipes.length}</small>
        </h1>
        <div
          className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}
        >
          <Search setFilter={setFilter} />
          {isLoading && !recipes.length ? (
            <Loading />
          ) : (
            <div className={styles.grid}>
              {recipes
                .filter((r) => r.title.toLowerCase().startsWith(filter))
                .map((r) => (
                  <Recipe
                    key={r._id}
                    recipe={r}
                    deleteRecipe={deleteRecipe}
                    updateRecipe={updateRecipe}
                  />
                ))}
            </div>
          )}
          <div className="d-flex flex-row justify-content-center align-items-center p-20">
            <button
              onClick={() => setPage(page + 1)}
              className="btn btn-primary"
            >
              Charger plus de recettes
            </button>
          </div>
        </div>
      </div>
      {showWishlist && <Wishlist />}
    </>
  );
}

export default Homepage;
