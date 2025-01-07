import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsError } from "../../redux/auth/selectors";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Notifications() {
  const errorValue = useSelector(selectIsError);

  useEffect(() => {
    if (errorValue) {
      switch (errorValue) {
        case 409:
          toast.error("Such email already exists", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            theme: "dark",
            transition: Bounce,
          });
          break;
        case 401:
          toast.error("Invalid email or password", {
            position: "top-right",
            autoClose: 4000,
            theme: "dark",
            transition: Bounce,
          });
          break;
        case 500:
          toast.error("Server error. Please try again later.", {
            position: "top-right",
            autoClose: 4000,
            theme: "dark",
            transition: Bounce,
          });
          break;
        default:
          toast.error("An unknown error occurred", {
            position: "top-right",
            autoClose: 4000,
            theme: "dark",
            transition: Bounce,
          });
      }
    }
  }, [errorValue]);

  return <ToastContainer />;
}
