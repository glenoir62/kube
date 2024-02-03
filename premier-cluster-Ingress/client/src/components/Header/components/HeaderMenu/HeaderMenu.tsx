import styles from "./HeaderMenu.module.scss";
import { NavLink } from "react-router-dom";

function HeaderMenu({
  displayWishlist,
  hideMenu,
}: {
  displayWishlist: () => void;
  hideMenu: () => void;
}) {
  return (
    <ul onClick={hideMenu} className={`${styles.MenuContainer} card p-20`}>
      <li>
        <NavLink to="/admin">Admin</NavLink>
      </li>
      <li onClick={displayWishlist}>Wishlist</li>
      {/* <li>Connexion</li> */}
    </ul>
  );
}

export default HeaderMenu;
