export interface UserState {
  users: IUser[];
  companies: ICompany[];
  total: number;
  total_pages: number;
  refresh: boolean;
}

export interface IUser {
  id: number;
  type_document: string;
  document: string;
  names: string;
  surnames: string;
  email: string;
  phone: string;
  active: boolean;
  number: string | null;
  code: string | null;
  expire: boolean;
}

export interface ICompany {
  id: number;
  name: string;
  email: string;
  phone: string;
  description: string;
  address: string;
  nit: string;
  responsible: string | null;
}

export interface Week {
  id: number;
  week: string;
}