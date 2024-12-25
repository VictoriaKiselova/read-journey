import * as Yup from "yup";
import { Link, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { fetchSignin } from "../../redux/auth/operations";
import Icon from "../Icon/Icon";
import spriteRead from "../../assets/Image/sprite-read.svg";
import clsx from "clsx";
import style from "./LoginForm.module.scss";

let loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginForm() {
  const { isPasswordVisible, togglePasswordVisibility } = useOutletContext();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = data => {
    dispatch(fetchSignin(data));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={style.registerFormContainer}>
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
            errors.email ? style.errorBorder : style.validBorder
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
            errors.password ? style.errorBorder : style.validBorder
          )}
        />
        {errors.password && (
          <p className={style.error}>{errors.password.message}</p>
        )}
      </div>

      <div className={style.registerFormButtonBox}>
        <button type="submit" className={style.registerFormButton}>
          Log in
        </button>
        <Link to="/register" className={style.registerFormLink}>
          Don’t have an account?
        </Link>
      </div>
    </form>
  );
}
