import { createContext } from "react";
import { Toast, UIState, IDialog } from "src/interfaces";

export type UIContextProps = {
  uiState: UIState;
  toggleCheking: () => void;
  setStep: (step: number) => void;
  setEmail: (email: string) => void;
  setCode: (code: string) => void;
  setRefreshTechnicians: () => void;
  setToast: (toast: Toast | null) => void;
  setDialog: (dialog: IDialog | null) => void;
};

export const UIContext = createContext<UIContextProps>({} as UIContextProps);
