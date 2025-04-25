import { Floor } from "./floor.interface";

export interface Wieder {
  id: number;
  names: string;
  surnames: string;
  email: string;
  type_document: number;
  document: string;
  phone: string;
  role: number;
  tag: string | null;
  initial_date: string;
  finish_date: string | null;
  password: string | null;
  confirm_password: string | null;
  floors: Floor[];
}

export interface IUserExternal {
  id: number;
  names: string;
  surnames: string;
  email: string;
  type_document: number;
  document: string;
  phone: string;
  role: number;
  code: string;
  tag: string | null;
  initial_date: string;
  finish_date: string | null;
  floors: Floor[];
  days: Days[];
}

export interface IUserCompany {
  id: number;
  id_company: number;
  names: string;
  surnames: string;
  email: string;
  type_document: number;
  document: string;
  phone: string;
  role: number;
  code: string;
  tag: string | null;
  initial_date: string;
  finish_date: string | null;
  floors: Floor[];
}

export interface ITagExternal {
  tag: string;
  code: string;
  initial_date: string;
  finish_date: string;
  floors: Floor[];
}

export interface External {
  external: IUserExternal;
  tags: ITagExternal[];
}

export interface UserCompany {
  external: IUserCompany;
  tags: ITagExternal[];
}
