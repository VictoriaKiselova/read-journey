import { Outlet } from "react-router-dom";
import { useState } from "react";
import iPhoneMob1x from "../../assets/Image/iPhoneMob1x.png";
import iPhoneMob2x from "../../assets/Image/iPhoneMob2x.png";
import iPhoneDesktop1x from "../../assets/Image/iPhoneDesktop1x.png";
import iPhoneDesktop2x from "../../assets/Image/iPhoneDesktop2x.png";
import Icon from "../../components/Icon/Icon";
import spriteRead from "../../assets/Image/sprite-read.svg";
import style from "./Authorization.module.scss";

export default function Authorization() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  return (
    <section className={style.welcomePageContainer}>
      <div className={style.welcomePageRegister}>
        <Icon
          sprite={spriteRead}
          id="icon-Logo-1"
          width="42px"
          height="17px"
          className={style.iconLogoMob}
        />
        <Icon
          sprite={spriteRead}
          id="icon-Logo-2"
          width="112px"
          height="32px"
          className={style.iconLogoDesk}
        />
        <h3 className={style.welcomePageTittle}>
          Expand your mind, reading{" "}
          <span className={style.welcomePageBook}>a book</span>
        </h3>
        <Outlet context={{ isPasswordVisible, togglePasswordVisibility }} />
      </div>

      <div className={style.welcomePageImg}>
        <picture className={style.iphonePicture}>
          <source
            media="(min-width: 1280px)"
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
