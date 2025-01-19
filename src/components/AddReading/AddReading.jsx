import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { modalOpen } from "../../redux/books/slice";
import {
  fetchReadingStart,
  fetchReadingFinish,
} from "../../redux/reading/operations";
import { selectBookProgress } from "../../redux/reading/selectors";
import { showToast } from "../../toastUtils";
import clsx from "clsx";
import "react-toastify/dist/ReactToastify.css";
import style from "./AddReading.module.scss";

export default function AddReading() {
  const dispatch = useDispatch();
  const bookProgress = useSelector(selectBookProgress);
  const { _id, totalPages, progress } = bookProgress || {};
  const active = bookProgress.progress.some(elem => elem.status === "active");

  const startedPage = progress.reduce((max, elem) => {
    return elem.startPage > max ? elem.startPage : max;
  }, 0);

  const lastReadedPage = progress.reduce((max, elem) => {
    return elem.finishPage > max ? elem.finishPage : max;
  }, 0);

  const pagesSchema = Yup.object({
    page: Yup.number()
      .min(1, "The page number must be at least 1")
      .max(totalPages, `The page number cannot exceed ${totalPages}`)
      .integer("The page number must be a whole number")
      .required("The page number is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(pagesSchema),
    defaultValues: { page: 1 },
  });

  const onSubmitReadingStart = async data => {
    const { page } = data;

    try {
      if (page <= totalPages && lastReadedPage === 0) {
        await dispatch(fetchReadingStart({ id: _id, page })).unwrap();
        showToast("You started reading the book!", "success");
      } else if (page <= totalPages && page > lastReadedPage) {
        await dispatch(fetchReadingStart({ id: _id, page })).unwrap();
        showToast("You continued reading the book!", "success");
      } else {
        showToast(
          "The page number must be greater than the current one.",
          "error"
        );
      }
    } catch (error) {
      showToast(`Failed to start reading: ${error.message}`, "error");
    }
  };

  const onSubmitReadingFinish = async data => {
    const { page } = data;

    try {
      if (page > startedPage && page < totalPages) {
        await dispatch(fetchReadingFinish({ id: _id, page })).unwrap();
        showToast("Your last read page is saved", "success");
      } else if (page === totalPages) {
        await dispatch(fetchReadingFinish({ id: _id, page })).unwrap();
        dispatch(modalOpen());
        showToast("You completed the book!", "success");
      } else {
        showToast("You have already read this page.", "error");
      }
    } catch (error) {
      showToast(`Failed to finish reading: ${error.message}`, "error");
    }
  };

  return (
    <div className={style.addReadingContainer}>
      <form
        onSubmit={handleSubmit(
          active ? onSubmitReadingFinish : onSubmitReadingStart
        )}
        className={style.addReadingForm}>
        <p className={style.addReadingInputTitle}>
          {active ? "Stop page:" : "Start page:"}
        </p>
        <div className={style.wrapperInput}>
          <label htmlFor="title" className={style.addReadingFormLabel}>
            Page number:
          </label>
          <input
            id="page"
            name="page"
            {...register("page")}
            className={clsx(style.addReadingFormInput, style.inputPage)}
          />
          {errors.page && (
            <span className={style.error}>{errors.page.message}</span>
          )}
        </div>

        <button type="submit" className={style.addReadingFormButton}>
          {active ? "To stop" : "To start"}
        </button>
      </form>
    </div>
  );
}
