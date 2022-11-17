import { React, useState, useEffect, useContext } from "react";       //importing required artifacts from react
import { db } from "../../firebase";            //importing database from our firebase config
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";                      //importing required artifacts from firebase
import { Link, useNavigate, useLocation } from "react-router-dom";        //importing required artifacts from react-router-dom

import "./Wiki.css";
import Header from "../../Components/Header/Header";          //importing header from components
import Footer from "../../Components/Footer/Footer";          //importing footer from components

function Wiki() {
  const { state } = useLocation();        //importing state from previous page
  let navigate = useNavigate();           //navigator used to navigate between pages
  const { project } = state;            //project im focus

  const [wiki, setWiki] = useState(project.ProjectWiki);        //wiki state

  const Setwiki = (event) => {                  //function to change wiki state
    setWiki(event.target.value);
  };

  const [projects, setProjects] = useState([]); //array to store user's projects'
  const projectRef = collection(db, "Projects"); //collection reference to all projects

  const editWiki = async (wiki) => {
    //handles adding a wiki to database
    await setDoc(
      doc(db, "Projects", project.id),
      {
        ProjectWiki: wiki,
      },
      { merge: true }
    );
    alert("Wiki edited");
    goBack();
  };

  const goBack = () => {        ///router function to navigate to previous page
    navigate(-1);
  };

  return (
    <div>
      <div class="header">
        <Header />
      </div>
      <div class="body">
        <textarea
          type="text"
          className="editinput"
          defaultValue={project.ProjectWiki}
          onChange={Setwiki}
          placeholder="Wiki..."
        />

        <button className="edtbtn"onClick={() =>  editWiki(wiki)}>
          Save
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Wiki;
