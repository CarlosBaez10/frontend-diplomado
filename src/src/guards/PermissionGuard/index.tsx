import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "src/context";
import { modulesAdminRoutes } from "src/models";

const privateValidationFragment = <Outlet />;

const PermissionGuard = () => {
  const { authState } = useContext(AuthContext);
  const location = useLocation();
  let replacePath = "/404";
  const { user } = authState;

  const validatePermission = (): boolean => {
    if (user?.role === 2) return true;
    const userModules = modulesAdminRoutes.filter(
      ({ id }) => id && user?.modules.includes(id)
    );
    const pathModules = userModules.map(({ path }) => path);
    const hasPermission = pathModules.some((path) =>
      location.pathname.includes(path)
    );
    if (!hasPermission) {
      if (pathModules.length) {
        replacePath = pathModules[0];
      }
    }
    return hasPermission;
  };

  return validatePermission() ? (
    privateValidationFragment
  ) : (
    <Navigate replace to={replacePath} />
  );
};

export default PermissionGuard;
