import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function GraphStatistics({ percentPageRead }) {
  return (
    <CircularProgressbarWithChildren
      value={percentPageRead}
      styles={buildStyles({
        pathColor: "#30b94d",
        trailColor: "#1f1f1f",
        strokeLinecap: "round",
      })}>
      <div style={{ fontSize: 18, marginTop: -5 }}>
        <strong>100%</strong>
      </div>
    </CircularProgressbarWithChildren>
  );
}
