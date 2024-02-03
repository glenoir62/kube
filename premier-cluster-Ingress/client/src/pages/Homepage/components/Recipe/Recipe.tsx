import { RecipeI } from "interfaces";
import { ObjectId } from "types";
import styles from "./Recipe.module.scss";
import { MouseEvent } from "react";

function Recipe({
  recipe,
  updateRecipe,
  deleteRecipe,
}: {
  recipe: RecipeI;
  updateRecipe: (x: RecipeI) => Promise<void>;
  deleteRecipe: (x: ObjectId) => Promise<void>;
}) {
  function handleClickLike() {
    updateRecipe({
      ...recipe,
      liked: !recipe.liked,
    });
  }

  async function handleClickDelete(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();
    deleteRecipe(recipe._id);
  }

  return (
    <div onClick={handleClickLike} className={styles.recipe}>
      <i onClick={handleClickDelete} className="fa-solid fa-xmark"></i>
      <div className={styles.imageContainer}>
        <img src={recipe.image} alt="recipe" />
      </div>
      <div
        className={`${styles.recipeTitle} d-flex flex-column justify-content-center align-items-center`}
      >
        <h3 className="mb-10">{recipe.title}</h3>
        <i
          className={`fa-solid fa-heart ${recipe.liked ? "text-primary" : ""}`}
        ></i>
      </div>
    </div>
  );
}

export default Recipe;
