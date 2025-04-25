import { useContext, useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "src/components/UI/Loading";
import { AuthContext, UIContext } from "src/context";
import useAxios from "src/hooks/useAxios";
import { CustomStorage } from "src/lib/Storage";
import { publicRoutes } from "src/models";
import { AuthService } from "src/services";

type Props = {
  children: JSX.Element | JSX.Element[];
  validateAuth: boolean;
};

const RoutesWithNotFound = ({ children, validateAuth }: Props) => {
  const authContext = useContext(AuthContext);
  const { setUserAuth, authState } = authContext;
  const { uiState } = useContext(UIContext);
  const initialized = useRef<boolean>(false);
  const { callEndpoint } = useAxios();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!validateAuth && authState.user) {
      setLoading(false);
    }
    if (validateAuth && !initialized.current) {
      initialized.current = true;
      const validateAuth = async () => {
        try {
          const res = await callEndpoint(AuthService.renew());
          if (res) {
            const { data } = res.data;
            CustomStorage.token = data.token;
            setUserAuth(data.user);
          }
        } catch (error) {
          CustomStorage.removeToken();
        }
        setLoading(false);
      };
      validateAuth();
    }
    return () => {};
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Routes>
        {children}
        <Route
          path="*"
          element={<Navigate to={`/${publicRoutes.NOT_FOUND}`} />}
        ></Route>
      </Routes>
      {uiState.checking && <Loading />}
    </>
  );
};

export default RoutesWithNotFound;
