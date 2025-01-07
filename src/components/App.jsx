import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  selectIsAuthorized,
  selectIsRefreshing,
} from "../redux/auth/selectors";
import { fetchRefresh } from "../redux/auth/operations";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import Layout from "../components/Layout/Layout";
import CustomModal from "../components/CustomModal/CustomModal";
import Notifications from "../components/Notifications/Notifications";
import style from "./App.module.scss";

const RecommendedPage = lazy(() => import("./RecommendedPage/RecommendedPage"));
const RegisterForm = lazy(() => import("./RegisterForm/RegisterForm"));
const LoginForm = lazy(() => import("./LoginForm/LoginForm"));
const MyLibraryBooks = lazy(() => import("./MyLibraryBooks/MyLibraryBooks"));

export default function App() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(selectIsAuthorized);
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(fetchRefresh());
  }, [dispatch]);

  return (
    <div className={style.app}>
      <CustomModal />
      <Notifications />
      {isRefreshing ? (
        <p>Loading...</p>
      ) : (
        <Suspense fallback={null}>
          <Routes>
            {!isAuthorized ? (
              <>
                <Route path="/" element={<WelcomePage />}>
                  <Route path="register" element={<RegisterForm />} />
                  <Route path="login" element={<LoginForm />} />
                  <Route index element={<Navigate to="register" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/register" replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Layout />}>
                  <Route path="recommended" element={<RecommendedPage />} />
                  <Route path="library" element={<MyLibraryBooks />} />
                  <Route
                    index
                    element={<Navigate to="recommended" replace />}
                  />
                </Route>
                <Route
                  path="*"
                  element={<Navigate to="/recommended" replace />}
                />
              </>
            )}
          </Routes>
        </Suspense>
      )}
    </div>
  );
}
