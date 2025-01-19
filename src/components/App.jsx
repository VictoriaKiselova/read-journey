import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {
  selectIsAuthorized,
  selectIsRefreshing,
} from "../redux/auth/selectors";
import { fetchRefresh } from "../redux/auth/operations";
import { selectMobMenu } from "../redux/books/selectors";
import { ToastContainer } from "react-toastify";
import Loader from "../components/Loader/Loader";
import Layout from "../components/Layout/Layout";
import CustomModal from "../components/CustomModal/CustomModal";
import MobileMenu from "../components/MobileMenu/MobileMenu";
import style from "./App.module.scss";

const WelcomePage = lazy(() => import("../pages/WelcomePage/WelcomePage"));
const RegisterForm = lazy(() => import("./RegisterForm/RegisterForm"));
const LoginForm = lazy(() => import("./LoginForm/LoginForm"));
const RecommendedPage = lazy(() => import("./RecommendedPage/RecommendedPage"));
const MyLibraryBooks = lazy(() => import("./MyLibraryBooks/MyLibraryBooks"));
import MyBook from "../components/MyBook/MyBook";

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthorized = useSelector(selectIsAuthorized);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isMenuOpen = useSelector(selectMobMenu);

  useEffect(() => {
    if (isAuthorized) {
      localStorage.setItem("lastVisitedPath", location.pathname);
    }
  }, [location, isAuthorized]);

  useEffect(() => {
    if (isAuthorized) {
      const lastVisitedPath = localStorage.getItem("lastVisitedPath");
      if (!lastVisitedPath || !lastVisitedPath.startsWith("/")) {
        localStorage.setItem("lastVisitedPath", "/recommended");
      }
    }
  }, [isAuthorized]);

  useEffect(() => {
    dispatch(fetchRefresh());
  }, [dispatch]);

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <div className={style.app}>
      {isMenuOpen && <MobileMenu />}
      <CustomModal />
      <ToastContainer />
      <Suspense fallback={<Loader />}>
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
                  path="reading/:id"
                  element={isAuthorized ? <MyBook /> : <Navigate to="/login" />}
                />
              </Route>
              <Route
                path="*"
                element={
                  <Navigate
                    to={
                      isAuthorized
                        ? localStorage
                            .getItem("lastVisitedPath")
                            ?.startsWith("/")
                          ? localStorage.getItem("lastVisitedPath")
                          : "/recommended"
                        : "/register"
                    }
                    replace
                  />
                }
              />
            </>
          )}
        </Routes>
      </Suspense>
    </div>
  );
}
