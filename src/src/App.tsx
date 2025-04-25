import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "src/models";
import Responsive from "src/components/UI/Responsive";
import Loading from "src/components/UI/Loading";
import RoutesWithNotFound from "src/components/RoutesWithNotFound";
import "./App.css";
import { AuthProvider, UIProvider } from "./context";
import AuthGuard from "./guards/AuthGuard";
import Toast from "./components/UI/Toast";
import Dialog from "./components/UI/Dialog";

function App() {
  const Login = lazy(() => import("src/pages/Auth/Login"));
  const NotFound = lazy(() => import("src/pages/NotFound"));
  const Private = lazy(() => import("src/pages/Private"));

  return (
    <>
      <div className="app">
        <Suspense fallback={<Loading />}>
          <UIProvider>
            <AuthProvider>
              <BrowserRouter>
                <Toast />
                <Dialog />
                <RoutesWithNotFound validateAuth={true}>
                  <Route
                    path="/"
                    element={<Navigate to={publicRoutes.LOGIN} />}
                  />
                  <Route path={publicRoutes.LOGIN} element={<Login />} />
                  {/* <Route path={publicRoutes.RECOVERY} element={<Recovery />} /> */}
                  <Route element={<AuthGuard privateValidation={true} />}>
                    <Route
                      path={`${privateRoutes.PRIVATE}/*`}
                      element={<Private />}
                    />
                  </Route>
                  <Route path={publicRoutes.NOT_FOUND} element={<NotFound />} />
                </RoutesWithNotFound>
              </BrowserRouter>
            </AuthProvider>
          </UIProvider>
        </Suspense>
      </div>
      <Responsive />
    </>
  );
}

export default App;
