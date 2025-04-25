import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { privateRoutes } from "src/models";
import RoutesWithNotFound from "src/components/RoutesWithNotFound";
import PermissionGuard from "src/guards/PermissionGuard";
import Loading from "src/components/UI/Loading";
import Sidebar from "src/components/UI/Sidebar";
import Header from "src/components/UI/Header";
import styles from "./private.module.css";

const Private = () => {
  const Users = lazy(() => import("src/pages/Private/Users"));

  return (
    <Suspense fallback={<Loading />}>
      <Sidebar />
      <Header />
      <div className={styles.wrapper__private}>
        <RoutesWithNotFound validateAuth={false}>
          <Route element={<PermissionGuard />}>
            <Route path={`${privateRoutes.USERS}/*`} element={<Users />} />
          </Route>
        </RoutesWithNotFound>
      </div>
    </Suspense>
  );
};

export default Private;
