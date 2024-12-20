import { Outlet } from "react-router-dom";
import iPhoneMob1x from "../../assets/Image/iPhoneMob1x.png";
import iPhoneMob2x from "../../assets/Image/iPhoneMob2x.png";
import iPhoneDesktop1x from "../../assets/Image/iPhoneDesktop1x.png";
import iPhoneDesktop2x from "../../assets/Image/iPhoneDesktop2x.png";
import style from "./WelcomePage.module.scss";

export default function WelcomePage() {
  return (
    <section className={style.welcomePageContainer}>
      <Outlet />
      <div className={style.welcomePageImg}>
        <picture>
          <source
            media="(min-width: 1440px)"
            srcSet={`${iPhoneDesktop2x} 2x, ${iPhoneDesktop1x} 1x`}
          />
          <source
            media="(min-width: 320px)"
            srcSet={`${iPhoneMob2x} 2x, ${iPhoneMob1x} 1x`}
          />
          <img
            src={iPhoneMob1x}
            alt="girl with dog"
            className={style.imageIphone}
          />
        </picture>
      </div>
    </section>
  );
}
