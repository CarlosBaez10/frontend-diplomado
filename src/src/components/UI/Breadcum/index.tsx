import { Link } from "react-router-dom";
import arrowIcon from "src/assets/icon/arrow.svg";
import styles from "./breadcum.module.css";

type Props = {
  path: string;
  title: string;
  subtitle: string;
};

const Breadcum = ({ path, title, subtitle }: Props) => {
  return (
    <section className={styles.breadcrumb}>
      <Link to={path}>{title}</Link>
      <img src={arrowIcon} alt="Arrow icon" />
      <p>{subtitle}</p>
    </section>
  );
};

export default Breadcum;
