import React from "react";      //importing required artifacts from react

import './Member.css';
import AdderMember from "../AdderMember/AdderMember";     //importing add member button from components

function Member(props) {
  return (
    <div>
      <h3>Project Members</h3>
      <div className="div-members">
        <div>
          <h5>No</h5>
        </div>
        <div className="div-member">
        <h5>Member</h5>
        </div>
        <div>
        <h5>Role</h5>
        </div>
      </div>

        {props.project.ProjectMembers.map((member,index) => (
          <div className="div-row" key={index}>
            <div>
              <p>{index+1}</p>
            </div>
            <div className = 'div-member'>
              <p>{member}</p>
            </div>
            <div>
              <p>Developer</p>
            </div>
          </div>
        ))}
      <AdderMember project={props.project} />
    </div>
  );
}

export default Member;
