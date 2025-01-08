import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { fetchSignup } from "../../redux/auth/operations";
import { Link, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Icon from "../Icon/Icon";
import spriteRead from "../../assets/Image/sprite-read.svg";
import clsx from "clsx";
import style from "./RegisterForm.module.scss";

let registerSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long"),
  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      "Email must match the pattern 'example@domain.com'"
    )
    .required("Email is required"),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
});

export default function RegisterForm() {
  const dispatch = useDispatch();
  const { isPasswordVisible, togglePasswordVisibility } = useOutletContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const handleSignup = data => {
    dispatch(fetchSignup(data));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      className={style.registerFormContainer}>
      <div className={style.wrapperInput}>
        <label htmlFor="name" className={style.registerFormLabel}>
          Name:
        </label>
        <input
          id="name"
          name="name"
          {...register("name")}
          className={clsx(style.registerFormInput, style.inputName)}
        />
        {errors.name && <p className={style.error}>{errors.name.message}</p>}
      </div>

      <div className={style.wrapperInput}>
        <label htmlFor="email" className={style.registerFormLabel}>
          Mail:
        </label>
        <input
          id="email"
          name="email"
          {...register("email")}
          className={clsx(
            style.registerFormInput,
            style.inputEmail,
            errors.email
          )}
        />
        {errors.email && <p className={style.error}>{errors.email.message}</p>}
      </div>

      <div className={clsx(style.wrapperInput, style.wrapperInputLast)}>
        <label htmlFor="password" className={style.registerFormLabel}>
          Password:
        </label>
        {isPasswordVisible ? (
          <Icon
            onClick={togglePasswordVisibility}
            sprite={spriteRead}
            id="icon-eye"
            width="18px"
            height="18px"
            className={style.iconEye}
          />
        ) : (
          <Icon
            onClick={togglePasswordVisibility}
            sprite={spriteRead}
            id="icon-eye-off"
            width="18px"
            height="18px"
            className={style.iconEye}
          />
        )}
        <input
          id="password"
          name="password"
          type={isPasswordVisible ? "text" : "password"}
          {...register("password")}
          className={clsx(
            style.registerFormInput,
            style.inputPassword,
            errors.password
          )}
        />
        {errors.password && (
          <p className={style.error}>{errors.password.message}</p>
        )}
      </div>

      <div className={style.registerFormButtonBox}>
        <button type="submit" className={style.registerFormButton}>
          Registration
        </button>
        <Link to="/login" className={style.registerFormLink}>
          Already have an account?
        </Link>
      </div>
    </form>
  );
}
