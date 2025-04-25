import { useContext, useEffect, useRef } from "react";
import { UIContext } from "src/context";
import styles from "./toast.module.css";

const Toast = () => {
  const toastRef = useRef<HTMLDivElement>(null);
  const { uiState, setToast } = useContext(UIContext);

  useEffect(() => {
    if (uiState.toast) {
      setTimeout(() => {
        if (toastRef.current) {
          toastRef.current.classList.remove("animate__fadeInRight");
          toastRef.current.classList.add("animate__fadeOutRight");
          setTimeout(() => {
            setToast(null);
          }, 700);
        }
      }, uiState.toast.duration);
    }

    return () => {};
  }, [uiState.toast]);

  const getTypeToast = (type: string) => {
    switch (type) {
      case "success":
        return styles.success;
      case "warning":
        return styles.warning;
      case "error":
        return styles.error;
      default:
        return styles.hidden;
    }
  };

  return (
    uiState.toast && (
      <aside
        ref={toastRef}
        className={`animate__animated animate__faster animate__fadeInRight ${
          styles.custom_toast
        } ${getTypeToast(uiState.toast.type)}`}
      >
        <div className={styles.toast_icon}></div>
        <div className={styles.toast_content}>
          <strong>{uiState.toast.title}</strong>
          <p>{uiState.toast.message}</p>
        </div>
      </aside>
    )
  );
};

export default Toast;
