import animation from "src/assets/loading.gif";
import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loader}>
        <img src={animation} alt="diplomado loading" />
      </div>
    </div>
  );
};

export default Loading;
