import { Link, useLocation } from "react-router-dom";
import { Menu } from "src/interfaces";
import styles from "./menufilter.module.css";

type Props = {
  menu: Menu[];
};

const MenuFilter = ({ menu }: Props) => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const optionQuery = queryParams.get("q") || menu[0].name;

  return (
    <section className={styles.menu}>
      <div className={styles.menu_filter}>
        <p>Selecciona una opción</p>
        <div className={styles.grid_columns_v3}>
          <ul>
            {menu.map((option) => (
              <li
                key={option.id}
                className={
                  option.name.toLowerCase() === optionQuery.toLowerCase()
                    ? styles.active
                    : ""
                }
              >
                <Link to={option.path}>{option.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MenuFilter;
