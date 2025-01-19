import { toast, Bounce } from "react-toastify";

export const showToast = (message, type) => {
  const options = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: true,
    theme: "dark",
    transition: Bounce,
  };

  if (type === "success") {
    toast.success(message, options);
  } else if (type === "error") {
    toast.error(message, options);
  }
};
