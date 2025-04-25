import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { AuthContext, UIContext } from "src/context";
import TextInfo from "src/components/UI/TextInfo";
import useAxios from "src/hooks/useAxios";
import { AuthService } from "src/services";
import { CustomStorage } from "src/lib/Storage";
import { privateRoutes } from "src/models";
import { ForgotValidatorForm } from "src/validators";
import eye from "src/assets/icon/eye.webp";
import noEye from "src/assets/icon/no-eye.webp";
import styles from "../steps.module.css";

const StepThree = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const uiContext = useContext(UIContext);
  const { uiState, setEmail, setCode, setStep } = uiContext;
  const { callEndpoint } = useAxios();

  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: ForgotValidatorForm.initialState,
    validationSchema: ForgotValidatorForm.validatorSchemaForgot,
    validateOnMount: false,
    onSubmit: async ({ new_password }) => {
      if (formik.isValid) {
        setLoading(true);
        const res = await callEndpoint(
          AuthService.updatePassword(uiState.email, new_password, uiState.code)
        );
        if (res) {
          const { data } = res.data;
          if (data) {
            CustomStorage.removeRemember();
            CustomStorage.removeData();
            CustomStorage.token = data.token;
            authContext.setUserAuth(data.user);
            setCode("");
            setEmail("");
            setStep(1);
            data.user.role === 5
              ? navigate(
                  `/${privateRoutes.PRIVATE}/${privateRoutes.USERS}?q=externos`,
                  { replace: true }
                )
              : navigate(`/${privateRoutes.PRIVATE}/${privateRoutes.USERS}`, {
                  replace: true,
                });
          }
        }
        setLoading(false);
      }
    },
  });

  const handleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <form
      className={`animate__animated animate__fadeIn ${styles.step}`}
      onSubmit={formik.handleSubmit}
      autoComplete="off"
    >
      <div className={styles.authentication__input}>
        <label htmlFor="new_password">Nueva contraseña</label>
        <input
          className={
            formik.touched.new_password && formik.errors.new_password
              ? "invalid show"
              : ""
          }
          type={showNewPassword ? "text" : "password"}
          id="new_password"
          autoComplete="off"
          name="new_password"
          onBlur={formik.handleBlur}
          value={formik.values.new_password}
          onChange={formik.handleChange}
          placeholder="Escribe tu nueva contraseña"
        />
        <img
          onClick={handleShowNewPassword}
          src={showNewPassword ? eye : noEye}
          alt="eye icon"
        />
        <TextInfo
          loading={false}
          success={""}
          error={formik.errors.new_password ?? ""}
        />
      </div>
      <div className={styles.authentication__input}>
        <label htmlFor="confirm_password">Confirmar contraseña</label>
        <input
          className={
            formik.touched.confirm_password && formik.errors.confirm_password
              ? "invalid show"
              : ""
          }
          type={showConfirmPassword ? "text" : "password"}
          id="confirm_password"
          name="confirm_password"
          autoComplete="off"
          onBlur={formik.handleBlur}
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          placeholder="Confirma tu nueva contraseña"
        />
        <img
          onClick={handleShowConfirmPassword}
          src={showConfirmPassword ? eye : noEye}
          alt="eye icon"
        />
        <TextInfo
          loading={false}
          success=""
          error={formik.errors.confirm_password ?? ""}
        />
      </div>

      <div className={styles.list_rules}>
        <h4>Tu contraseña debería tener</h4>
        <ul>
          <li
            className={
              formik.touched.new_password
                ? formik.values.new_password.length >= 10
                  ? styles.success
                  : styles.error
                : ""
            }
          >
            10 dígitos
          </li>
          <li
            className={
              formik.touched.new_password
                ? /[A-Z]/.test(formik.values.new_password)
                  ? styles.success
                  : styles.error
                : ""
            }
          >
            Por lo menos una mayúscula
          </li>
          <li
            className={
              formik.touched.new_password
                ? /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(
                    formik.values.new_password
                  )
                  ? styles.success
                  : styles.error
                : ""
            }
          >
            Por lo menos 1 carácter especial
          </li>
          <li
            className={
              formik.touched.new_password
                ? /\d/.test(formik.values.new_password)
                  ? styles.success
                  : styles.error
                : ""
            }
          >
            Por lo menos un número
          </li>
        </ul>
      </div>

      <button
        className={loading ? "loading" : ""}
        type="submit"
        disabled={!formik.dirty || !formik.isValid}
      >
        Iniciar sesión
        {loading && <i className="fas fa-spinner fa-pulse"></i>}
      </button>
    </form>
  );
};

export default StepThree;
