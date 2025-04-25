import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { UserProvider } from "src/context";
import RoutesWithNotFound from "src/components/RoutesWithNotFound";
// import { userRoutes } from "src/models";
import Loading from "src/components/UI/Loading";

// const FormCompany = lazy(
//   () => import("src/pages/Private/Users/Create/FormCompany")
// );

// const FormAdmin = lazy(
//   () => import("src/pages/Private/Users/Create/FormAdmin")
// );

// const FormPersonal = lazy(
//   () => import("src/pages/Private/Users/Create/FormPersonal")
// );

// const FormVisitor = lazy(
//   () => import("src/pages/Private/Users/Create/FormVisitor")
// );

// const FormUserCompany = lazy(
//   () => import("src/pages/Private/Users/Create/FormUserCompany")
// );

const List = lazy(() => import("src/pages/Private/Users/List"));

const Users = () => {
  return (
    <UserProvider>
      <Suspense fallback={<Loading />}>
        <RoutesWithNotFound validateAuth={false}>
          <Route path="/" element={<List />} />
          {/* <Route path={userRoutes.SAVE_WIEDER} element={<FormPersonal />} />
          <Route path={userRoutes.SAVE_ADMIN} element={<FormAdmin />} />
          <Route path={userRoutes.SAVE_COMPANY} element={<FormCompany />} />
          <Route path={userRoutes.SAVE_VISITOR} element={<FormVisitor />} />
          <Route
            path={userRoutes.SAVE_USER_COMPANY}
            element={<FormUserCompany />}
          /> */}
        </RoutesWithNotFound>
      </Suspense>
    </UserProvider>
  );
};

export default Users;
