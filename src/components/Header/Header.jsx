import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectName } from "../../redux/auth/selectors";
import { fetchSignout } from "../../redux/auth/operations";
import Icon from "../Icon/Icon";
import spriteRead from "../../assets/Image/sprite-read.svg";
import style from "./Header.module.scss";

export default function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const nameUser = useSelector(selectName);

  const handleSingOut = async () => {
    await dispatch(fetchSignout());
    navigate("/login");
  };

  return (
    <header className={style.header}>
      <div>
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
          width="182px"
          height="17px"
          className={style.iconLogoDesk}
        />
      </div>

      <nav className={style.headerLinks}>
        <Link
          to="/recommended"
          className={`${style.headerNavLink} ${
            location.pathname === "/recommended" ? style.activeLink : ""
          }`}>
          Home
        </Link>
        <Link
          to="/library"
          className={`${style.headerNavLink} ${
            location.pathname === "/library" ? style.activeLink : ""
          }`}>
          My library
        </Link>
      </nav>

      <div className={style.headerNameWrapper}>
        <p className={style.firstLetter}>{nameUser.slice(0, 1)}</p>
        <p className={style.nameUser}>{nameUser}</p>
        <Icon
          sprite={spriteRead}
          id="icon-menu-04"
          width="28px"
          height="28px"
          className={style.iconBurgerMenu}
        />
        <button type="button" className={style.logOut} onClick={handleSingOut}>
          Log out
        </button>
      </div>
    </header>
  );
}
