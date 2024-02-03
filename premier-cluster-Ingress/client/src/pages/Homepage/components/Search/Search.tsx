import { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./Search.module.scss";

function Search({
  setFilter,
}: {
  setFilter: Dispatch<SetStateAction<string>>;
}) {
  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase());
  }

  return (
    <div
      className={`d-flex flex-row justify-content-center align-items-center my-30 ${styles.searchBar}`}
    >
      <i className="fa-solid fa-magnifying-glass mr-15"></i>
      <input
        onInput={handleInput}
        className="flex-fill"
        type="text"
        placeholder="Rechercher"
      />
    </div>
  );
}

export default Search;
