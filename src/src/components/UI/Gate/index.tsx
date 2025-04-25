import closeGate from "src/assets/icon/close_gate.svg";
import styles from "./gate.module.css";
import { Door } from "src/interfaces";

type Props = {
  door: Door;
};

const Gate = ({ door }: Props) => {
  return (
    <section className={styles.gate}>
      <div>
        <img src={closeGate} alt="gate icon" />
        <span className={styles.badge}>{door.description}</span>
      </div>
    </section>
  );
};

export default Gate;
