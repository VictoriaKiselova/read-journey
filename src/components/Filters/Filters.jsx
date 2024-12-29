import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchRecommendBooks } from "../../redux/books/operations";
import clsx from "clsx";
import style from "./Filters.module.scss";

export default function Filters() {
  const dispatch = useDispatch();
  const locationLibrary = useLocation().pathname.includes("library");

  let filterSchema = Yup.object({
    title: Yup.string(),
    author: Yup.string(),
    number: locationLibrary
      ? Yup.number()
          .typeError("Must be a number")
          .required("Enter number of pages")
      : Yup.mixed(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(filterSchema),
  });

  const onSubmit = data => {
    const { title, author } = data;
    if (!title && !author) {
      return;
    }
    dispatch(fetchRecommendBooks({ title, author, page: 1, limit: 10 }));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={style.filterFormContainer}>
      <p className={style.filterFormTitle}>Filters:</p>
      <div className={style.wrapperInput}>
        <label htmlFor="title" className={style.registerFormLabel}>
          Book title:
        </label>
        <input
          id="title"
          name="title"
          {...register("title")}
          className={clsx(style.registerFormInput, style.inputTitle)}
        />
      </div>

      <div className={style.wrapperInput}>
        <label htmlFor="author" className={style.registerFormLabel}>
          The author:
        </label>
        <input
          id="author"
          name="author"
          {...register("author")}
          className={clsx(style.registerFormInput, style.inputAuthor)}
        />
      </div>

      {locationLibrary && (
        <div className={style.wrapperInput}>
          <label htmlFor="number" className={style.registerFormLabel}>
            Number of pages:
          </label>
          <input
            id="number"
            name="number"
            {...register("number")}
            className={clsx(style.registerFormInput, style.inputEmail)}
          />
        </div>
      )}

      {locationLibrary ? (
        <button type="submit" className={style.registerFormButton}>
          Add book
        </button>
      ) : (
        <button type="submit" className={style.registerFormButton}>
          To apply
        </button>
      )}
    </form>
  );
}
