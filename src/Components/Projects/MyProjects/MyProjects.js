import * as React from "react";       //importing required artifacts from react
import { useState, useEffect, useContext } from "react";      //
import { useNavigate } from "react-router-dom";     //importing required artifacts from react-router-dom
import List from "@mui/material/List";                              //importing required artifacts from mui materials
import ListItem from "@mui/material/ListItem";                      //
import ListItemButton from "@mui/material/ListItemButton";          //
import ListItemText from "@mui/material/ListItemText";              //
import ListItemAvatar from "@mui/material/ListItemAvatar";          //
import Typography from "@mui/material/Typography";                  //
import Card from "@mui/material/Card";                              //
import Button from "@mui/material/Button";                          //
import Avatar from "@mui/material/Avatar";                          //
import Divider from "@mui/material/Divider";                        //
import Header from "../../Header/Header";                //importing header
import { doc, getDoc, getDocs, collection } from "firebase/firestore";        //importing required artifacts from firestore
import { db } from "../../../firebase";         //importing database from our firebase config
import { EmailContext } from "../../../context";        //email context for user logged in

import "./MyProjects.css";

export default function CheckboxListSecondary() {
  const [project, setProject] = useState([]);       //state for user project
  const [checked, setChecked] = React.useState([1]);        //state for user checked projects
  const { userEmail, setUserEmail } = useContext(EmailContext);
  const navigate = useNavigate();

  window.addEventListener("load", () => {
    getProjects();
  });
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const getProjects = async () => {         //handles fetching projects from database
    const querySnapshot = await getDocs(collection(db, "Projects"));
    const dt = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().ProjectMembers.includes(userEmail)) {
        dt.push(doc.data());
      }
    });
    setProject(dt);       //sets project user a member in
  };

  useEffect(() => {
    getProjects();
  }, []);
  
  return (
    <div>
      <Header />
      <Card className="card">
        {" "}
        <Typography
          sx={{ padding: 3, textDecoration: "underline" }}
          variant="h5"
        >
          {" "}
          My Projects
        </Typography>{" "}
        <div>
          <Button
            sx={{ bgcolor: "#FF6666", borderRadius: 4 }}
            variant="contained"
            onClick={() => {
              navigate("/scrum");
            }}
          >
            New project
          </Button>
        </div>
      </Card>
      <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
        {project.map((element) => {
          return (
            <ListItem key={""} disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar>
                    {project.length != 0 ? element.ProjectName[0] : "U"}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    project.length != 0 ? element.ProjectName : "Unavailable"
                  }
                  secondary={
                    project.length != 0
                      ? element.ProjectMembers.map((member, index) => {
                          let v = "";
                          index == element.ProjectMembers.length - 1
                            ? (v = ".")
                            : (v = ", ");
                          return member + v;
                        })
                      : "..."
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
