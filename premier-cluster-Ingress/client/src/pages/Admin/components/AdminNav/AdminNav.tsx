import { NavLink } from "react-router-dom";
import styles from "./AdminNav.module.scss";

function AdminNav() {
  return (
    <ul className={`${styles.list} d-flex flex-column`}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="recipes"
      >
        Recettes
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="users"
      >
        Utilisateurs
      </NavLink>
    </ul>
  );
}

export default AdminNav;
