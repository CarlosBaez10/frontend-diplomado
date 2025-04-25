import { Link } from "react-router-dom";
import logo from "src/assets/logo.webp";
import diplomado from "src/assets/kruw.webp";
import styles from "./notfound.module.css";
import { useContext } from "react";
import { AuthContext } from "src/context";
import { privateRoutes } from "src/models";

const NotFound = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);

  return (
    <>
      <article className={styles.not_found}>
        <div className={styles.container}>
          <div className={styles.content}>
            <img className={styles.img_logo} src={logo} alt="logo diplomado"></img>
            <h2>¡Ups! Te has desviado del camino.</h2>
            <p>
              Parece que has llegado a un lugar inexplorado. No te preocupes,
              hasta los caminos más sólidos tienen algún desvío. Regresemos
              juntos al camino principal.
            </p>
            <Link
              className={styles.button_login}
              to={!user ? "/" : `/${privateRoutes.PRIVATE}`}
              replace={true}
            >
              Volver a la pantalla principal
            </Link>
          </div>

          <div className={styles.img_content}>
            <img className={styles.img_notfound} src={diplomado} alt="diplomado"></img>
          </div>
        </div>
      </article>
    </>
  );
};

export default NotFound;
