import { ICompany, IUser, UserState } from "src/interfaces";

type UserAction =
  | { type: "setUsers"; payload: IUser[] }
  | { type: "setCompanies"; payload: ICompany[] }
  | { type: "setTotal"; payload: number }
  | { type: "setTotalPages"; payload: number }
  | { type: "toggleRefresh" }
  | { type: "updateActive"; payload: { index: number; active: boolean } };

export const userReducer = (
  state: UserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case "setUsers":
      return {
        ...state,
        users: [...action.payload],
      };
    case "setCompanies":
      return {
        ...state,
        companies: [...action.payload],
      };
    case "setTotal":
      return {
        ...state,
        total: action.payload,
      };
    case "setTotalPages":
      return {
        ...state,
        total_pages: action.payload,
      };
    case "toggleRefresh":
      return {
        ...state,
        refresh: !state.refresh,
      };
    case "updateActive":
      const aux = state.users;
      aux[action.payload.index] = {
        ...aux[action.payload.index],
        active: action.payload.active,
      };
      return {
        ...state,
        users: aux,
      };
    default:
      return state;
  }
};
