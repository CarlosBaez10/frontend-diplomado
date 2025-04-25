import { useContext, useEffect, useRef, useState } from "react";
import styles from "./dialog.module.css";
import { UIContext } from "src/context";

const Dialog = () => {
  const dialogRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const { uiState, setDialog } = useContext(UIContext);

  useEffect(() => {
    if (uiState.dialog) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      if (uiState.dialog) {
        document.body.style.overflow = "scroll";
      }
    };
  }, [uiState.dialog]);

  const handleClose = async () => {
    if (dialogRef.current && uiState.dialog) {
      dialogRef.current.classList.remove("animate__fadeIn");
      dialogRef.current.classList.add("animate__fadeOut");
      await uiState.dialog.handleCancel();
      setTimeout(() => {
        setDialog(null);
      }, 7000);
    }
  };

  const handleAccept = async () => {
    if (uiState.dialog) {
      setLoading(true);
      await uiState.dialog.handleAccept();
      setLoading(false);
      setDialog(null);
    }
  };

  const getTypeDialog = (type: string) => {
    switch (type) {
      case "success":
        return styles.success;
      case "warning":
        return styles.warning;
      case "error":
        return styles.error;
      default:
        return styles.error;
    }
  };

  return (
    uiState.dialog && (
      <div
        ref={dialogRef}
        className={`animate__animated animate__faster animate__fadeIn ${styles.dialog_lighbox}`}
      >
        <div className={styles.dialog_content}>
          <div
            className={`${styles.dialog_icon} ${getTypeDialog(
              uiState.dialog.icon
            )}`}
          ></div>
          <div className={styles.dialog_body}>
            <h3>{uiState.dialog.title}</h3>
            <p>{uiState.dialog.message}</p>
          </div>
          <div className={styles.dialog_buttons}>
            <button className="btn_secondary" onClick={handleClose}>
              Cancelar
            </button>
            <button className={styles.accept} onClick={handleAccept}>
              {loading ? (
                <i className="fas fa-spinner fa-pulse"></i>
              ) : (
                "Aceptar"
              )}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Dialog;
