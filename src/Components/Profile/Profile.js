import React, { useState, useEffect, useContext } from "react";       //importing required artifacts from react
import { useNavigate } from "react-router-dom";       //importing required artifacts from react-router-dom
import Box from "@mui/material/Box";                                //importing required artifacts from mui materials
import Avatar from "@mui/material/Avatar";                          //
import Menu from "@mui/material/Menu";                              // 
import MenuItem from "@mui/material/MenuItem";                      //
import ListItemIcon from "@mui/material/ListItemIcon";              //
import Divider from "@mui/material/Divider";                        //
import IconButton from "@mui/material/IconButton";                  //
import Tooltip from "@mui/material/Tooltip";                        //
import List from "@mui/material/List";                              //
import ListItem from "@mui/material/ListItem";                      //
import ListItemButton from "@mui/material/ListItemButton";          //
import ListItemText from "@mui/material/ListItemText";              //
import ListItemAvatar from "@mui/material/ListItemAvatar";          //
import Logout from "@mui/icons-material/Logout";                    //
import { getAuth, signOut } from "firebase/auth";                   //importing required artifacts from firebase
import { EmailContext } from "../../context";                       //email context for user logged in
import { getDocs, collection, query, where } from "firebase/firestore";       //importing required artifacts from firestore
import { db } from "../../firebase";              //importing database from our firebase config
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";          //importing required artifacts from firestore
import { storage } from "../../firebase";     //

import bland from "../../images/bland.png"


export default function Profile() {
  const [anchorEl, setAnchorEl] = useState(null);     //state for anchor modal
  const [name, setName] = useState("");             //state for name
  const [surname, setSurname] = useState("");         //state for surname
  const { userEmail, setUserEmail } = useContext(EmailContext);
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);     
  }, 500);


  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);       //handles clicking to set an anchor to open modal
  };
  const handleClose = () => {
    setAnchorEl(null);          //handles closing the modal
  };
  const navigate = useNavigate();

  const logOut = () => {          //signs user out of the site and redirects to the home page
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const fun = async () => {       //gets users information from users table
    const q = query(collection(db, "Users"), where("Email", "==", userEmail));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setName(doc.data().Name);         //sets name to user logged in
      setSurname(doc.data().Surname);       //sets surname to user logged in
    });
  };
  useEffect(() => {
    fun();
  }, []);

  const [imageUrls, setImageUrls] = useState([]);           //array to store user profile picture
  const imagesListRef = ref(storage, userEmail+"/");

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);       //sets image URLs
        });
      });
    });
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {loading ? 
              <Avatar src={bland} sx={{ width: 42, height: 42, backgroundColor: "#F5EBD8", color: "#8E0808" }}>
                {name[0] + surname[0]}
              </Avatar>
            : 
              <Avatar src={imageUrls[0]} sx={{ width: 42, height: 42, backgroundColor: "#FFFBF4", color: "#8E0808"}}>
              {name[0] + surname[0]}
            </Avatar>}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate("/profilesettings")}>
          <Avatar alt={name + " " + surname}src={imageUrls[0]} />
          <ListItemText primary={name + " " + surname} secondary={userEmail} />
        </MenuItem>
        <Divider />
        <MenuItem onClick={logOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
