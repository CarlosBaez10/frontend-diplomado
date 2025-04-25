import { Link } from "react-router-dom";
import arrowIcon from "src/assets/icon/arrow.svg";
import styles from "./breadcumlarge.module.css";

type Props = {
  path: string;
  subpath: string;
  title: string;
  titlesub: string;
  subtitle: string;
};

const BreadcumLarge = ({ path, subpath, title, titlesub, subtitle }: Props) => {
  return (
    <section className={styles.breadcrumb}>
      <Link to={path}>{title}</Link>
      <img src={arrowIcon} alt="Arrow icon" />
      <Link to={subpath}>{titlesub}</Link>
      <img src={arrowIcon} alt="Arrow icon" />
      <p>{subtitle}</p>
    </section>
  );
};

export default BreadcumLarge;
