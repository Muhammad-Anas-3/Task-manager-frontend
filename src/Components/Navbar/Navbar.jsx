import { Rocket } from "@mui/icons-material";
import './Navbar.css'

function Navbar() {
  return (
    <div className="Navbar">
      <div className="logo">
        <Rocket className="Rocket" />
        <h2>Task</h2>
        <h2>Manager</h2>
      </div>
    </div>
  );
}

export default Navbar;
