import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthorized } from "../redux/auth/selectors";
import { Routes, Route, Navigate } from "react-router-dom";
import { fetchRefresh } from "../redux/auth/operations";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import Layout from "../components/Layout/Layout";
import style from "./App.module.scss";

const RecommendedBooks = lazy(() =>
  import("./RecommendedBooks/RecommendedBooks")
);
const RegisterForm = lazy(() => import("./RegisterForm/RegisterForm"));
const LoginForm = lazy(() => import("./LoginForm/LoginForm"));
const MyLibraryBooks = lazy(() => import("./MyLibraryBooks/MyLibraryBooks"));

export default function App() {
  const isAuthorized = useSelector(selectIsAuthorized);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRefresh());
  }, [dispatch]);

  return (
    <div className={style.app}>
      <Suspense fallback={<div>Загрузка...</div>}>
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
                <Route path="recommended" element={<RecommendedBooks />} />
                <Route path="library" element={<MyLibraryBooks />} />
                <Route index element={<Navigate to="recommended" replace />} />
              </Route>
              <Route
                path="*"
                element={<Navigate to="/recommended" replace />}
              />
            </>
          )}
        </Routes>
      </Suspense>
    </div>
  );
}
