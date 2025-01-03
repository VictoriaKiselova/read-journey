import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchAddBooks,
  fetchGetBooksOwn,
} from "../../redux/libraryFilters/operations";
import clsx from "clsx";
import style from "./AddBook.module.scss";

export default function AddBook() {
  const dispatch = useDispatch();
  const locationLibrary = useLocation().pathname.includes("library");

  let addToLibrarySchema = Yup.object({
    title: Yup.string().required("Enter title"),
    author: Yup.string().required("Enter author"),
    totalPages: Yup.number()
      .typeError("Must be a number")
      .required("Enter number of pages"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addToLibrarySchema),
  });

  const onSubmit = async data => {
    const { title, author, totalPages } = data;
    if (!title && !author && !totalPages) {
      return;
    }
    try {
      await dispatch(fetchAddBooks({ title, author, totalPages }));
      dispatch(fetchGetBooksOwn());
      reset();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={style.filterFormContainer}>
      <p className={style.filterFormTitle}>Create your library:</p>
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
          <label htmlFor="totalPages" className={style.registerFormLabel}>
            Number of pages:
          </label>
          <input
            id="totalPages"
            name="totalPages"
            {...register("totalPages")}
            className={clsx(style.registerFormInput, style.inputPages)}
          />
        </div>
      )}
      <button type="submit" className={style.registerFormButton}>
        Add book
      </button>
    </form>
  );
}
