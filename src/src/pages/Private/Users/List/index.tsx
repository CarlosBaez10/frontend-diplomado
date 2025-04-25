import { useContext } from "react";
import Filter from "./components/Filter";
import Table from "./components/Table";
import { AuthContext } from "src/context";
import styles from "./list.module.css";


const List = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);

  return (
    <div className={styles.user}>
      <div className={styles.user_wrapper}>
        <Filter />
        <Table />
      </div>
    </div>
  );
};

export default List;
