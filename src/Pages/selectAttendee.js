import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/dropdown.js";
import "bootstrap/js/src/button.js";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
export default function SelectAttendee() {
    const history = useHistory();
    const handleClick = () => history.push('/delegate');
  return (
    <div class="selectRole">
      <div className="roles">
     <p>Positions:</p> 
        <select
          class="form-select form-select-lg mb-3"
          aria-label=".select role"
         
        >
          
          <option selected>-- Select Position --</option>
          <option value="1">Delegate</option>
          <option value="2">Sponsor</option>
          <option value="3">Exhibitor</option>
        </select>
      </div>
      

      <button className="continueBtn" onClick={handleClick}>
        Continue
      </button>
      
     
    </div>
  );
}
