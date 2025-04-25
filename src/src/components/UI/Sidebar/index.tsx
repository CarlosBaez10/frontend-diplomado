import { NavLink } from "react-router-dom";
import { modulesAdminRoutes, modulesGestorRoutes } from "src/models";
import logo from "src/assets/logo.webp";
import styles from "./sidebar.module.css";
import { useContext } from "react";
import { AuthContext } from "src/context";
import { RouteUI } from "src/interfaces";

const Sidebar = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);

  const routes: RouteUI[] =
    user && user.role === 5 ? modulesGestorRoutes : modulesAdminRoutes;

  return (
    <aside className={styles.sidebar}>
      <img src={logo} alt="logo" />
      <nav className={styles.sidebar__modules}>
        <div>
          <span>Menú</span>
          {user && (
            <ul>
              {routes.map((route) => (
                <li key={route.id}>
                  <NavLink
                    to={route.path}
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <img src={route.icon} alt={`Icono de ${route.title}`} />
                    {route.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
