import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRouteTitle, publicRoutes } from "src/models";
import { AuthContext } from "src/context";
import { CustomStorage } from "src/lib/Storage";
import avatar from "src/assets/avatar.svg";
import styles from "./header.module.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { authState, setUserAuth } = authContext;

  const handleLogout = () => {
    CustomStorage.removeToken();
    setUserAuth(null);
    navigate(`/${publicRoutes.LOGIN}`, { replace: true });
  };

  return (
    <nav className={styles.navbar}>
      <h4>{getRouteTitle(location.pathname)} </h4>
      <ul>
        <li>
          <input type="checkbox" name="submenu" id={styles.submenu} />
          <label htmlFor={styles.submenu}>
            <div>
              <img src={authState.user?.photo ?? avatar} alt="Avatar" />
            </div>
            {`${authState.user?.names}`}
            <ul>
              <li onClick={handleLogout}>Cerrar sesión</li>
            </ul>
          </label>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
