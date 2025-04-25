import { RouteUI } from "src/interfaces";
import userIcon from "src/assets/icon/user.svg";

export const publicRoutes = {
  LOGIN: "iniciar-sesion",
  RECOVERY: "recuperar-clave",
  FORGOT: "cambiar-clave",
  NOT_FOUND: "404",
};

export const privateRoutes = {
  PRIVATE: "administrador",
  USERS: "usuarios",
};

export const userRoutes = {
  SAVE_COMPANY: "guardar-empresa",
  SAVE_WIEDER: "guardar-usuario-de-wiedii",
  SAVE_ADMIN: "guardar-administrador",
  SAVE_VISITOR: "guardar-usuario-visitante",
  SAVE_USER_COMPANY: "guardar-usuario-de-empresa",
};

export const modulesAdminRoutes: RouteUI[] = [
  {
    id: 1,
    path: `/${privateRoutes.PRIVATE}/${privateRoutes.USERS}`,
    icon: userIcon,
    title: "Usuarios",
  },
];

export const modulesGestorRoutes: RouteUI[] = [
  {
    id: 1,
    path: `/${privateRoutes.PRIVATE}/${privateRoutes.USERS}?q=externos`,
    icon: userIcon,
    title: "Usuarios",
  },
];

export const getRouteTitle = (search: string): string => {
  const route =
    modulesAdminRoutes.find(({ path }) => search.includes(path))?.title ??
    "diplomado";
  return route;
};
