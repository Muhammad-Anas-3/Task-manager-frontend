import "./Spinner.css";
import { HashLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="spinner_container">
      <HashLoader color="teal" speedMultiplier={2}/>
    </div>
  );
}

export default Spinner;
