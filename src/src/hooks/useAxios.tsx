import { useContext, useEffect } from "react";
import { AxiosResponse } from "axios";
import { AxiosCall } from "src/interfaces";
import { AuthContext, UIContext } from "src/context";
import { CustomStorage } from "src/lib/Storage";
import * as error_messages from "src/data/errors.json";
import { useNavigate } from "react-router-dom";
import { publicRoutes } from "src/models";

const errors: any = error_messages;

const useAxios = () => {
  const { setToast } = useContext(UIContext);
  const { setUserAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  let controller: AbortController;

  const callEndpoint = async (axiosCall: AxiosCall<any>) => {
    if (axiosCall.controller) controller = axiosCall.controller;
    let result = {} as AxiosResponse<any>;
    try {
      result = await axiosCall.call;
      if (CustomStorage.token && result.status === 204) {
        CustomStorage.token = "";
        CustomStorage.removeToken();
        setUserAuth(null);
        navigate(`/${publicRoutes.LOGIN}`);
        setToast({
          type: "error",
          title: "Error",
          message:
            "La sesión ha caducado, por favor vuelve a iniciar sesión en diplomado.",
          duration: 5000,
        });
      }
    } catch (error: any) {
      if (![204].includes(error.response.status)) {
        console.error(error);
        const { data } = error.response;
        setToast({
          type: "error",
          title: "Error",
          message: errors[data.error],
          duration: 3000,
        });
      } else {
        CustomStorage.token = "";
        CustomStorage.removeToken();
        setUserAuth(null);
        navigate(`/${publicRoutes.LOGIN}`);
      }
      return null;
    }
    return result;
  };

  const cancelEndpoint = () => {
    controller && controller.abort();
  };

  useEffect(() => {
    return () => {
      cancelEndpoint();
    };
  }, []);

  return { callEndpoint };
};

export default useAxios;
