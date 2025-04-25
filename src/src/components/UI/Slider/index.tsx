import { useEffect, useState } from "react";
import styles from "./slider.module.css";

const Slider = () => {
  const [inputChecked, setInputChecked] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(toggleInputs, 20000);
    return () => clearInterval(interval);
  }, []);

  const toggleInputs = () => {
    setInputChecked((prevInputChange) =>
      prevInputChange < 2 ? prevInputChange + 1 : 0
    );
  };

  return (
    <section className={styles.slider}>
      <input
        type="radio"
        name="radio-btn"
        onChange={() => setInputChecked(0)}
        id={styles.radio1}
        checked={inputChecked === 0}
      />
      <input
        type="radio"
        name="radio-btn"
        id={styles.radio2}
        onChange={() => setInputChecked(1)}
        checked={inputChecked === 1}
      />
      <input
        type="radio"
        name="radio-btn"
        id={styles.radio3}
        onChange={() => setInputChecked(2)}
        checked={inputChecked === 2}
      />
      <div className={styles.wrapper}>
        <div className={`${styles.slide} ${styles.first}`}>
          <p>
            Espacios comunitarios ó privados que se adaptan a tu manera de
            trabajar.
          </p>
        </div>
        <div className={styles.slide}>
          <p>
            Tú y tu equipo de trabajo contarán con un espacio que les permitirá
            ser más productivos, cocrear y conectar.
          </p>
        </div>
        <div className={styles.slide}>
          <p>
            Eventos, ciclos de conferencia, talleres y mucho más. nuestros
            salones y auditorios se adaptan a las necesidades de tu empresa.
          </p>
        </div>
      </div>
      <div className={styles.navigation_manual}>
        <label
          htmlFor={styles.radio1}
          className={`${styles.manual_btn} ${styles.auto_btn1}`}
        ></label>
        <label
          htmlFor={styles.radio2}
          className={`${styles.manual_btn} ${styles.auto_btn2}`}
        ></label>
        <label
          htmlFor={styles.radio3}
          className={`${styles.manual_btn} ${styles.auto_btn3}`}
        ></label>
      </div>
    </section>
  );
};

export default Slider;
