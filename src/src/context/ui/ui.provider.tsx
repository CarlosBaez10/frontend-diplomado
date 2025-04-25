import { useReducer } from "react";
import { IDialog, Toast, UIState } from "src/interfaces";
import { uiReducer } from "./ui.reducer";
import { UIContext } from "./ui.context";

const INITIAL_STATE: UIState = {
  checking: false,
  step: 1,
  email: "",
  refreshTechnicians: false,
  code: "",
  toast: null,
  dialog: null,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const UIProvider = ({ children }: Props) => {
  const [uiState, dispatch] = useReducer(uiReducer, INITIAL_STATE);

  const toggleCheking = () => {
    dispatch({ type: "toggleChecking" });
  };

  const setStep = (step: number) => {
    dispatch({ type: "setStep", payload: step });
  };

  const setEmail = (email: string) => {
    dispatch({ type: "setEmail", payload: email });
  };

  const setCode = (code: string) => {
    dispatch({ type: "setCode", payload: code });
  };

  const setRefreshTechnicians = () => {
    dispatch({ type: "setRefreshTechnicians" });
  };

  const setToast = (toast: Toast | null) => {
    dispatch({ type: "setToast", payload: toast });
  };

  const setDialog = (dialog: IDialog | null) => {
    dispatch({ type: "setDialog", payload: dialog });
  };

  return (
    <UIContext.Provider
      value={{
        uiState,
        toggleCheking,
        setStep,
        setEmail,
        setCode,
        setRefreshTechnicians,
        setToast,
        setDialog,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
