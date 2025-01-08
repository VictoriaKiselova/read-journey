import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignout } from "../../redux/auth/operations";
import { selectMobMenu } from "../../redux/books/selectors";
import { closeMobMenu } from "../../redux/books/slice";
import Icon from "../Icon/Icon";
import spriteRead from "../../assets/Image/sprite-read.svg";
import style from "./MobileMenu.module.scss";

export default function MobileMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isMenuOpen = useSelector(selectMobMenu);

  const handleSingOut = async () => {
    await dispatch(fetchSignout());
    navigate("/login");
  };

  const handleCloseModal = () => {
    dispatch(closeMobMenu()); 
  };

  return (
    <>
      {isMenuOpen && (
        <div className={style.overlay} onClick={handleCloseModal}></div>
      )}
      <div
        className={`${style.modalWrapperMobMenu} ${
          isMenuOpen ? style.open : style.closing
        }`}>
        <button
          type="button"
          onClick={handleCloseModal}
          className={style.buttonClose}>
          <Icon
            sprite={spriteRead}
            id={"icon-x"}
            width="28px"
            height="28px"
            className={style.iconClose}
          />
        </button>

        <nav className={style.headerLinks}>
          <Link
            to="/recommended"
            className={`${style.headerNavLink} ${
              location.pathname === "/recommended" ? style.activeLink : ""
            }`}
            onClick={handleCloseModal}>
            Home
          </Link>
          <Link
            to="/library"
            className={`${style.headerNavLink} ${
              location.pathname === "/library" ? style.activeLink : ""
            }`}
            onClick={handleCloseModal}>
            My library
          </Link>
        </nav>
        <button type="button" className={style.logOut} onClick={handleSingOut}>
          Log out
        </button>
      </div>
    </>
  );
}
