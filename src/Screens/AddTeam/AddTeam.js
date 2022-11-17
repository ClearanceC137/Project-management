import { React, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Header from "../../../Header/Header";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import "./AddTeam.css";
import { EmailContext } from "../../context";


function AddTeam() {
    let navigate = useNavigate();
    const { userEmail, setUserEmail } = useContext(EmailContext);
    const [projectCreator, setProjectCreator] = useState(userEmail);
    const [teamName, setTeamName] = useState('');
    

    const routeChange = () => {
        let path = "/landing";
        navigate(path);
    };

    const createNewTeam = async () => {
        await setDoc(
            doc(collection(db, "Teams")),
            {
                TeamOwner: projectCreator,
                TeamName: teamName,
                TeamMembers: [userEmail],
            },
            { merge: true }
        );
        routeChange();
    }

    return (
        <div>
            <Header />
            <div className="tittle">
                <Typography variant="h5">Create Team</Typography>
                <Typography variant="body1">
                    Create your team here
                </Typography>
            </div>

            <div className="team-details">
                <Typography>New Team details</Typography>
                <TextField
                    onChange={(event) => {
                        setTeamName(event.target.value);
                    }}
                    multiline
                    required
                    label="Team Name"
                />
                
                <Button
                    className="btn-create-team"
                    sx={{ bgcolor: "#FF6666", width: 300, borderRadius: 5 }}
                    variant="contained"
                    onClick={createNewTeam}
                >
                    Create Team
                </Button>
            </div>
        </div>
    );
}

export default AddTeam;