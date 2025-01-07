import { ThreeDots } from "react-loader-spinner";
import style from "./Loader.module.scss";

export default function Loader() {
  return (
    <ThreeDots
      visible={true}
      height="40"
      width="40"
      color="#686868"
      radius="7"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass={style.loader}
    />
  );
}
