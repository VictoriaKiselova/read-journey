import { useEffect, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { selectIsAuthorized } from "../redux/auth/selectors";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Authorization from "../pages/Authorization/Authorization";
import Layout from "../components/Layout/Layout";
const RecommendedPage = lazy(() =>
  import("../pages/RecommendedPage/RecommendedPage")
);
const RegisterForm = lazy(() => import("./RegisterForm/RegisterForm"));
const LoginForm = lazy(() => import("./LoginForm/LoginForm"));
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
          {isAuthorized ? (
            <Route path="/" element={<Layout />}>
              <Route path="recommended" element={<RecommendedPage />} />
              <Route index element={<Navigate to="recommended" replace />} />
            </Route>
          ) : (
            <Route path="/" element={<Authorization />}>
              <Route path="register" element={<RegisterForm />} />
              <Route path="login" element={<LoginForm />} />
              <Route index element={<Navigate to="register" replace />} />
            </Route>
          )}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Suspense>
    </div>
  );
}
