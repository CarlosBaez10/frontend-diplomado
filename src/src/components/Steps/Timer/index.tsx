import { useEffect, useState } from "react";
import circleError from "src/assets/icon/circle-error.svg";
import circleSuccess from "src/assets/icon/circle-success.svg";
import styles from "../steps.module.css";

type Props = {
  isValidCode: boolean | undefined;
  handleReset: () => void;
};

const Timer = ({ isValidCode, handleReset }: Props) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(60);
  const [loading, _] = useState<boolean>(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const progress = ((60 - timeRemaining) / 60) * 100;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <>
      <div className={styles.info_code}>
        {isValidCode === undefined && (
          <div className={styles.timer}>
            <svg width="70" height="70">
              <circle
                cx="35"
                cy="35"
                r={radius}
                stroke="#accefb"
                strokeWidth="5"
                fill="transparent"
              />
              <circle
                cx="35"
                cy="35"
                r={radius}
                stroke="#6b9af9"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <p>
              {timeRemaining} <span>seg</span>
            </p>
          </div>
        )}

        {isValidCode !== undefined && (
          <>
            <img
              onClick={handleReset}
              className={!isValidCode ? "cursor_pointer" : ""}
              src={isValidCode ? circleSuccess : circleError}
              alt="info icon"
              title={!isValidCode ? "Limpiar código" : ""}
            />
          </>
        )}
        {!isValidCode && <p>¿No recibiste el código?</p>}
      </div>
      {!isValidCode && (
        <button
          type="button"
          className={`btn_secondary ${loading ? "loading" : ""}`}
          disabled={timeRemaining !== 0}
        >
          Reenviar código
          {loading && <i className="fas fa-spinner fa-pulse"></i>}
        </button>
      )}
    </>
  );
};

export default Timer;
