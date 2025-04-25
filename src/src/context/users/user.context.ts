import { createContext } from "react";
import { ICompany, IUser, UserState } from "src/interfaces";

export type UserContextProps = {
  userState: UserState;
  setUsers: (users: IUser[]) => void;
  setCompanies: (companies: ICompany[]) => void;
  setTotal: (total: number) => void;
  setTotalPages: (pages: number) => void;
  updateActive: (data: { index: number; active: boolean }) => void;
  toggleRefresh: () => void;
};

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);
