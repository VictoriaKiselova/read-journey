import book1x from "../../assets/Image/book@1x.png";
import book2x from "../../assets/Image/book@2x.png";
import style from "./WindowToTheWorld.module.scss";

export default function WindowToTheWorld() {
  return (
    <div className={style.windowToTheWorldWrapper}>
      <picture className={style.imageBooks}>
        <source
          media="(min-width: 1280px)"
          srcSet={`${book2x} 2x, ${book1x} 1x`}
        />
        <img src={book1x} alt="books" className={style.imageBooks} />
      </picture>
      <p className={style.windowToTheWorldText}>
        "Books are <span className={style.windowToTheWorldSpan}>windows</span>{" "}
        to the world, and reading is a journey into the unknown."
      </p>
    </div>
  );
}
