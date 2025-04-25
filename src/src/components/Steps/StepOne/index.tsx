import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { publicRoutes } from "src/models";
import TextInfo from "src/components/UI/TextInfo";
import { UIContext } from "src/context";
import useAxios from "src/hooks/useAxios";
import { ValidateInput } from "src/interfaces";
import { AuthService } from "src/services";
import { RecoveryValidator } from "src/validators";
import errorIcon from "src/assets/icon/error.svg";
import styles from "../steps.module.css";
import * as error_messages from "src/data/errors.json";

const errors: any = error_messages;

const StepOne = () => {
  const uiContext = useContext(UIContext);
  const { callEndpoint } = useAxios();
  const { setStep, setEmail: setUIEmail } = uiContext;
  const [loading, setLoading] = useState<boolean>(false);

  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  const [email, setEmail] = useState<ValidateInput>({
    value: "",
    error: "",
    success: "",
    loading: false,
  });

  const debouncedValidateEmail = useRef(
    debounce(async (emailValue: string) => {
      setEmail((current) => ({ ...current, value: emailValue, loading: true }));
      const res = await callEndpoint(AuthService.validateEmail(emailValue));
      if (res) {
        const { data } = res;
        const isValid = data.status;
        setIsEmailValid(isValid);
        setEmail((current) => ({
          ...current,
          loading: false,
          error: !isValid ? errors[data.error!] : "",
          success: isValid ? "Correo confirmado" : "",
        }));
      }
    }, 1000)
  );

  useEffect(() => {
    return () => {
      debouncedValidateEmail.current.cancel();
    };
  }, []);

  const handleResetEmail = () => {
    setEmail((current) => ({ ...current, value: "", error: "" }));
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    const isValidFormat = RecoveryValidator.validateEmail(newEmail);
    let error = !newEmail
      ? "El correo es necesario"
      : !isValidFormat
      ? "No es un correo válido"
      : "";
    setIsEmailValid(false);
    setEmail((current) => ({
      ...current,
      value: newEmail,
      error,
      success: "",
    }));
    if (isValidFormat) debouncedValidateEmail.current(newEmail);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await callEndpoint(AuthService.recoveryPassword(email.value));
    if (res) {
      setStep(2);
      setUIEmail(email.value);
    }
    setLoading(false);
  };

  return (
    <form
      className={`animate__animated animate__fadeIn ${styles.step}`}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h3 className={styles.title_recovery}>Recuperar contraseña</h3>
      <p>
        Escribe el correo electrónico asociado a tu cuenta de usuario. En los
        próximos minutos te estaremos enviando un código de recuperación de 6
        dígitos, para que puedas recuperar tu cuenta.
      </p>
      <div className={styles.authentication__input}>
        <label htmlFor="user_email">Correo electrónico</label>
        <input
          type="email"
          id="user_email"
          className={email.error ? "invalid" : ""}
          name="user_email"
          autoComplete="off"
          value={email.value}
          onChange={handleEmailChange}
          disabled={email.loading}
          placeholder="Escribe aquí tu correo electrónico"
        />
        {email.error && (
          <img onClick={handleResetEmail} src={errorIcon} alt="error icon" />
        )}
        <TextInfo
          loading={email.loading}
          error={email.error}
          success={email.success}
        />
      </div>
      <button
        className={loading ? "loading" : ""}
        type="submit"
        disabled={!isEmailValid}
      >
        Enviar código de recuperación
        {loading && <i className="fas fa-spinner fa-pulse"></i>}
      </button>
      <Link className="btn_secondary" to={`/${publicRoutes.LOGIN}`}>
        Regresar
      </Link>
    </form>
  );
};

export default StepOne;
