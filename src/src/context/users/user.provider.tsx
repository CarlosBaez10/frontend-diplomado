import { useReducer } from "react";
import { ICompany, IUser, UserState } from "src/interfaces";
import { UserContext } from "./user.context";
import { userReducer } from "./user.reducer";

const INITIAL_STATE: UserState = {
  users: [],
  companies: [],
  total: 0,
  total_pages: 1,
  refresh: false,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const UserProvider = ({ children }: Props) => {
  const [userState, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setUsers = (users: IUser[]) => {
    dispatch({ type: "setUsers", payload: users });
  };

  const setCompanies = (companies: ICompany[]) => {
    dispatch({ type: "setCompanies", payload: companies });
  };

  const setTotal = (total: number) => {
    dispatch({ type: "setTotal", payload: total });
  };

  const setTotalPages = (pages: number) => {
    dispatch({ type: "setTotalPages", payload: pages });
  };

  const toggleRefresh = () => {
    dispatch({ type: "toggleRefresh" });
  };

  const updateActive = (data: { index: number; active: boolean }) => {
    dispatch({ type: "updateActive", payload: data });
  };

  return (
    <UserContext.Provider
      value={{
        setUsers,
        setCompanies,
        setTotal,
        setTotalPages,
        toggleRefresh,
        updateActive,
        userState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
