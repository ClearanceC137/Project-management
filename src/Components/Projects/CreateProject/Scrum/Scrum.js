import { React, useContext, useState } from "react";        //importing required artifacts from react
import { useNavigate } from "react-router-dom";           //importing required artifacts from react-router-dom
import Typography from "@mui/material/Typography";            //importing required artifacts from mui materials
import TextField from "@mui/material/TextField";              //
import Header from "../../../Header/Header";                  //importing header
import Button from "@mui/material/Button";                    //
import Avatar from "@mui/material/Avatar";                    //
import Divider from "@mui/material/Divider";                  //
import { doc, getDoc, setDoc, addDoc, collection, Timestamp } from "firebase/firestore";          //importing required artifacts from firestore
import { db } from "../../../../firebase";          //importing data from firebase config
import "./Scrum.css";        
import { EmailContext } from "../../../../context";

function Scrum() {
  let navigate = useNavigate();
  const { userEmail, setUserEmail } = useContext(EmailContext);

  const [projectName, setProjectName] = useState("");           //stores project name
  const [projectDesc, setProjectDesc] = useState("");           //stores project description
  const [projectCreator, setProjectCreator] = useState(userEmail);        //sets project creator to user logged in
  const [teamName, setTeamName] = useState("");           //stores team name

  const routeChange = () => {
    let path = "/landing";        //handles routing to landing page
    navigate(path);
  };

  const createNewProject = async () => {          //handles creating new project and updating database
    let timestamp = Timestamp.fromDate(new Date());         //timestamp for user stories
    await setDoc(
      doc(collection(db, "Projects")),
      {
        ProjectName: projectName,
        ProjectOwner: projectCreator,
        ProjectDesc: projectDesc,
        ProjectWiki: "",
        ProjectTeam: teamName,
        ProjectMembers: [userEmail],
        UserStories:[{UserDate: timestamp, UserPoster: userEmail, UserStatus: 'New', UserStory: 'This is your first user story', AssignedTo: userEmail}],
        Documents: []

      },
      { merge: true }
    );
    await setDoc(       //handles creating team to correspond with new project
      doc(collection(db, "Teams")),
      {
        TeamOwner: projectCreator,
        TeamName: teamName,
        TeamMembers: [userEmail],
      },
      { merge: true }
    );
    routeChange();
    
    setTeamName('');
    setProjectDesc('');
    setProjectName('');
  };

  return (
    <div>
      <Header />
      <div className="tittle">
        <Typography variant="h5">Create Project</Typography>
      </div>

      <div className="project-details">
        <Typography>New Project details</Typography>
        <TextField
          onChange={(event) => {
            setProjectName(event.target.value);
          }}
          required
          label="Project Name"
          value={projectName}
        />
        <TextField
          onChange={(event) => {
            setTeamName(event.target.value);
          }}
          multiline
          required
          label="Team Name"
          value={teamName}
        />
        <TextField
          onChange={(event) => {
            setProjectDesc(event.target.value);
          }}
          rows={3}
          multiline
          required
          label="Project Description"
          value={projectDesc}
        />
        <Button
          className="btn-create-project"
          sx={{ bgcolor: "#FF6666", width: 300, borderRadius: 5 }}
          variant="contained"
          onClick={createNewProject}
        >
          Create Project
        </Button>
      </div>
    </div>
  );
}

export default Scrum;
