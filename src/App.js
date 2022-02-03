import Delegate from "./Pages/Delegate";
// import { CssBaseline, Container, Paper, Box } from "@material-ui/core";
import "./css/style.css";
import './css/responsive.css';
function App() {
  return (
    <div className="registration_form">
      <div className="card">
        <h4>Event Registration</h4>
        <Delegate />
      </div>
    </div>
  );
}

export default App;
