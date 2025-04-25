import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { privateRoutes, publicRoutes } from "src/models";
import Slider from "src/components/UI/Slider";
import TextInfo from "src/components/UI/TextInfo";
import { LoginUser, ValidateInput } from "src/interfaces";
import { AuthContext } from "src/context";
import useAxios from "src/hooks/useAxios";
import { AuthService } from "src/services";
import { LoginValidator } from "src/validators";
import { CustomStorage } from "src/lib/Storage";
import errorIcon from "src/assets/icon/error.svg";
import logo from "src/assets/logo.webp";
import eye from "src/assets/icon/eye.webp";
import noEye from "src/assets/icon/no-eye.webp";
import styles from "../auth.module.css";
import * as error_messages from "src/data/errors.json";

const errors: any = error_messages;

const currentYear = new Date().getFullYear();
const INITIAL_VALIDATION_STATE: ValidateInput = {
  value: "",
  error: "",
  success: "",
  loading: false,
};

const Login = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState<ValidateInput>(
    INITIAL_VALIDATION_STATE
  );
  const initialized = useRef<boolean>(false);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const { callEndpoint } = useAxios();
  const [email, setEmail] = useState<ValidateInput>(INITIAL_VALIDATION_STATE);
  const [loginUser, setLoginUser] = useState<LoginUser | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(
    CustomStorage.remember === "1"
  );

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const [emailLocal, passwordLocal] = CustomStorage.getData();
      if (CustomStorage.remember === "1") {
        setIsEmailValid(true);
        setIsPasswordValid(true);
      }
      setEmail((current) => ({ ...current, value: emailLocal }));
      setPassword((current) => ({ ...current, value: passwordLocal }));
    }
    return () => {};
  }, []);

  const debouncedValidateEmail = useRef(
    debounce(async (emailValue: string) => {
      setEmail((current) => ({ ...current, value: emailValue, loading: true }));
      const res = await callEndpoint(AuthService.validateEmail(emailValue));
      if (res) {
        const { data } = res;
        const isValid = data.status;
        setIsEmailValid(isValid);
        setTimeout(() => {
          if (isValid) passwordRef.current?.focus();
        }, 0);
        setEmail((current) => ({
          ...current,
          loading: false,
          error: !isValid ? errors[data.error!] : "",
          success: isValid ? "Correo confirmado" : "",
        }));
      }
    }, 1000)
  );

  const debouncedValidatePassword = useRef(
    debounce(async (emailValue: string, passwordValue: string) => {
      setPassword((current) => ({
        ...current,
        value: passwordValue,
        loading: true,
      }));
      const res = await callEndpoint(
        AuthService.login(emailValue, passwordValue)
      );
      if (res) {
        const { data } = res;
        const isValid = data.status;
        setIsPasswordValid(isValid);
        if (isValid) setLoginUser(data.data);
        setPassword((current) => ({
          ...current,
          loading: false,
          error: !isValid ? errors[data.error!] : "",
          success: isValid ? "Contraseña correcta" : "",
        }));
      }
    }, 1000)
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginUser) {
      CustomStorage.token = loginUser.token;
      authContext.setUserAuth(loginUser.user);
      loginUser.user.role === 5
        ? navigate(
            `/${privateRoutes.PRIVATE}/${privateRoutes.USERS}?q=externos`,
            { replace: true }
          )
        : navigate(`/${privateRoutes.PRIVATE}/${privateRoutes.USERS}`, {
            replace: true,
          });
    } else {
      setPassword((current) => ({
        ...current,
        loading: true,
      }));
      const res = await callEndpoint(
        AuthService.login(email.value, password.value)
      );
      if (res) {
        const { data } = res;
        const isValid = data.status;
        setPassword((current) => ({
          ...current,
          loading: false,
          error: !isValid ? errors[data.error!] : "",
        }));
        if (isValid && data.data) {
          CustomStorage.token = data.data.token;
          authContext.setUserAuth(data.data.user);
          data.data.user.role === 5
            ? navigate(
                `/${privateRoutes.PRIVATE}/${privateRoutes.USERS}?q=externos`,
                { replace: true }
              )
            : navigate(`/${privateRoutes.PRIVATE}/${privateRoutes.USERS}`, {
                replace: true,
              });
        }
      }
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    const isValidFormat = LoginValidator.validateEmail(newEmail);
    let error = !newEmail
      ? "El correo es necesario"
      : !isValidFormat
      ? "No es un correo válido"
      : "";
    setLoginUser(null);
    setEmail((current) => ({
      ...current,
      value: newEmail,
      error,
      success: "",
    }));
    setPassword((current) => ({
      ...current,
      value: "",
      error: "",
      success: "",
    }));
    setIsEmailValid(false);
    setIsPasswordValid(false);
    setRemember(false);
    CustomStorage.removeRemember();
    CustomStorage.removeData();
    if (isValidFormat) debouncedValidateEmail.current(newEmail);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    const isValidFormat = LoginValidator.validatePassword(newPassword);
    let error = !newPassword
      ? "La contraseña es necesaria"
      : !isValidFormat
      ? "No es una contraseña válida"
      : "";
    setLoginUser(null);
    setIsPasswordValid(false);
    setPassword((current) => ({
      ...current,
      value: newPassword,
      error,
      success: "",
    }));
    setRemember(false);
    CustomStorage.removeRemember();
    CustomStorage.removeData();
    if (isValidFormat)
      debouncedValidatePassword.current(email.value, newPassword);
  };

  const handleShow = () => setShow(!show);

  const handleResetEmail = () => {
    setEmail((current) => ({ ...current, value: "", error: "" }));
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setRemember(checked);
    if (checked) {
      const data = [email.value, password.value];
      CustomStorage.data = JSON.stringify(data);
      CustomStorage.remember = "1";
    } else {
      CustomStorage.removeData();
      CustomStorage.removeRemember();
    }
  };

  return (
    <article
      className={`animate__animated animate__fadeIn ${styles.authentication}`}
    >
      <section className={styles.authentication__wrapper}>
        <img src={logo} alt="Logo" />
        <form onSubmit={handleSubmit} autoComplete="off">
          <h3 className={styles.auth_login}>
            <span>Bienvenidos</span>
            Accede a tu cuenta
          </h3>
          <div className={styles.authentication__input}>
            <label htmlFor="user_email">Correo electrónico</label>
            <input
              className={email.error ? "invalid" : ""}
              type="email"
              id="user_email"
              name="user_email"
              autoComplete="off"
              placeholder="Escribe aquí tu correo electrónico"
              value={email.value}
              onChange={handleEmailChange}
              disabled={email.loading || password.loading}
            />
            {email.error && (
              <img
                onClick={handleResetEmail}
                src={errorIcon}
                alt="error icon"
              />
            )}
            <TextInfo
              loading={email.loading}
              error={email.error}
              success={email.success}
            />
          </div>
          <div className={styles.authentication__input}>
            <label htmlFor="user_password">Contraseña</label>
            <input
              className={password.error ? "invalid show" : ""}
              type={show ? "text" : "password"}
              id="user_password"
              name="user_password"
              autoComplete="off"
              placeholder="Escribe aquí tu contraseña"
              ref={passwordRef}
              value={password.value}
              onChange={handlePasswordChange}
              disabled={!isEmailValid || password.loading}
            />
            <img onClick={handleShow} src={show ? eye : noEye} alt="eye icon" />
            <TextInfo
              loading={password.loading}
              error={password.error}
              success={password.success}
            />
          </div>
          <label htmlFor={styles.remember}>
            <input
              disabled={
                password.loading ||
                (!remember && (!isEmailValid || !isPasswordValid))
              }
              className={password.loading ? "loading" : ""}
              type="checkbox"
              name="remember"
              checked={remember}
              onChange={handleOnChange}
              id={styles.remember}
            />
            <div>
              <div></div>
            </div>
            Recordar contraseña
          </label>
          <button
            type="submit"
            disabled={
              password.loading ||
              (!remember && (!isEmailValid || !isPasswordValid))
            }
          >
            Iniciar Sesión
          </button>
        </form>
        <p>© {currentYear} Todos los derechos reservados.</p>
      </section>
      <Slider />
    </article>
  );
};

export default Login;
