import Delegate from "./Pages/Delegate";
// import { CssBaseline, Container, Paper, Box } from "@material-ui/core";
import "./css/style.css";
import "./css/responsive.css";
import SelectAttendee from "./Pages/selectAttendee";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="registration_form">
      <div className="card">
        <h4>Event Registration</h4>
        <SelectAttendee />
        <Router>
          <Switch>
         
            <Route path="/delegate" component={Delegate} />
          </Switch>
        </Router>
        
      </div>
    </div>
  );
}

export default App;
