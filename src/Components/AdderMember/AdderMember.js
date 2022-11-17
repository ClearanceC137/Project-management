import { React } from "react";      //importing required artifacts from react
import { useNavigate } from "react-router-dom";       //importing required artifacts from react-router-dom

import "./AdderMember.css";     //imports style sheet 

function AdderMember(props) {
  let navigate = useNavigate();

  const routeChange = () => {       //handles routing to the adding members page
    let path = "/AddMember";
    navigate(path, {
      state: {
        project: props.project,       //passes the project state to the adding members page
      },
    });
  };

  return (
    <div className="AdderWiki">
      <span
        class="material-symbols-outlined"
        id="adderwiki-icon"
        onClick={routeChange}
      >
        person_add
      </span>
    </div>
  );
}

export default AdderMember;
