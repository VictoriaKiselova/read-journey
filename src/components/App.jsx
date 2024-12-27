import { useEffect, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { selectIsAuthorized } from "../redux/auth/selectors";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import Layout from "../components/Layout/Layout";
const RecommendedBooks = lazy(() =>
  import("./RecommendedBooks/RecommendedBooks")
);
const RegisterForm = lazy(() => import("./RegisterForm/RegisterForm"));
const LoginForm = lazy(() => import("./LoginForm/LoginForm"));
const MyLibraryBooks = lazy(() => import("./MyLibraryBooks/MyLibraryBooks"));
import style from "./App.module.scss";

export default function App() {
  const navigate = useNavigate();
  const isAuthorized = useSelector(selectIsAuthorized);

  useEffect(() => {
    if (isAuthorized) {
      navigate("/recommended");
    }
  }, [isAuthorized, navigate]);

  return (
    <div className={style.app}>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<WelcomePage />}>
            <Route path="register" element={<RegisterForm />} />
            <Route path="login" element={<LoginForm />} />
            <Route index element={<Navigate to="register" replace />} />
          </Route>

          {isAuthorized && (
            <Route path="/" element={<Layout />}>
              <Route path="recommended" element={<RecommendedBooks />} />
              <Route index element={<Navigate to="recommended" replace />} />
              <Route path="library" element={<MyLibraryBooks />} />
            </Route>
          )}

          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Suspense>
    </div>
  );
}
