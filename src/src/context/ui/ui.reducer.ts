import { Toast, UIState, IDialog } from "src/interfaces";

type UIAction =
  | { type: "toggleChecking" }
  | { type: "setStep"; payload: number }
  | { type: "setEmail"; payload: string }
  | { type: "setRefreshTechnicians" }
  | { type: "setCode"; payload: string }
  | { type: "setToast"; payload: Toast | null }
  | { type: "setDialog"; payload: IDialog | null };

export const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case "toggleChecking":
      return {
        ...state,
        checking: !state.checking,
      };
    case "setStep":
      return {
        ...state,
        step: action.payload,
      };
    case "setEmail":
      return {
        ...state,
        email: action.payload,
      };
    case "setCode":
      return {
        ...state,
        code: action.payload,
      };
    case "setRefreshTechnicians":
      return {
        ...state,
        refreshTechnicians: !state.refreshTechnicians,
      };
    case "setToast":
      return {
        ...state,
        toast: action.payload,
      };
    case "setDialog":
      return {
        ...state,
        dialog: action.payload,
      };
    default:
      return state;
  }
};
