import React from 'react';

function Member(props) {
  return (
    <div data-testid = "Member-stub">
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

          {props.project.ProjectMembers.map((member, index) => (
              <div className="div-row" key={index}>
                  <div data-testid = "Member-stub-index">
                      <p>{index + 1}</p>
                  </div>
                  <div className='div-member' data-testid = "Member-stub-member">
                      <p>{member}</p>
                  </div>
                  <div data-testid ="Member-stub-role">
                      <p>Developer</p>
                  </div>
              </div>
          ))}
    </div>
  )
}

export default Member