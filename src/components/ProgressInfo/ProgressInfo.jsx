import star1x from "../../assets/Image/star1x.png";
import star2x from "../../assets/Image/star2x.png";
import style from "./ProgressInfo.module.scss";

export default function ProgressInfo() {
  return (
    <div>
      <h3 className={style.addReadingTitle}>Progress</h3>
      <p className={style.addReadingInfo}>
        Here you will see when and how much you read. To record, click on the
        red button above.
      </p>
      <div className={style.addReadingImg}>
        <picture className={style.starPicture}>
          <source
            media="(min-width: 1280px)"
            srcSet={`${star2x} 2x, ${star1x} 1x`}
          />
          <source
            media="(min-width: 320px)"
            srcSet={`${star2x} 2x, ${star1x} 1x`}
          />
          <img src={star1x} alt="girl with dog" className={style.imageStar} />
        </picture>
      </div>
    </div>
  );
}
