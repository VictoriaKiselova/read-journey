import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { selectAllBooks } from "../../redux/books/selectors";
import { setFilteredBooks } from "../../redux/books/slice";
import clsx from "clsx";
import style from "./Filters.module.scss";

export default function Filters() {
  const dispatch = useDispatch();
  const allBooks = useSelector(selectAllBooks);

  let filterSchema = Yup.object({
    title: Yup.string(),
    author: Yup.string(),
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
      dispatch(setFilteredBooks(allBooks));
      return;
    }

    const filtered = allBooks.filter(book => {
      const matchesTitle = title
        ? book.title.toLowerCase().includes(title.toLowerCase())
        : true;
      const matchesAuthor = author
        ? book.author.toLowerCase().includes(author.toLowerCase())
        : true;
      return matchesTitle && matchesAuthor;
    });

    dispatch(setFilteredBooks(filtered));
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

      <button type="submit" className={style.registerFormButton}>
        To apply
      </button>
    </form>
  );
}
