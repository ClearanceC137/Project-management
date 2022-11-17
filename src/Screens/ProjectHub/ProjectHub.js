import { React, useState, useEffect, useContext } from "react";     //importing required artifacts from react
import { useNavigate, useLocation } from "react-router-dom";        //importing required artifacts from react-router-dom
import { db } from "../../firebase";          //importing data from our firebase config
import { collection, getDocs, query, where } from "firebase/firestore";           //importing required artifacts from firestore
import { EmailContext } from "../../context";         //importing global email context of user logged in

import Lion from "../../images/Lion-white.png";
import "./ProjectHub.css";
import Header from "../../Components/Header/Header";          //importing header from components 
import Footer from "../../Components/Footer/Footer";          //importing footer from components
import UserStories from "../../Components/UserStories/UserStories";         //importing userStories which displays user stories from components
import Wiki from "../../Components/Wiki/Wiki";          //importing wiki which displays the wiki from components
import Kanban from "../../Components/Kanban/Kanban";        //importing kanban which displays the kanban from components
import Member from "../../Components/Member/Member";          //importing member which displays the members from components
import Insights from "../../Components/Insights/Insights";          //importing insights which displays the insights from components
import ProjectSettings from "../../Components/ProjectSettings/ProjectSettings";         //importing projectSettings from components
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";          //importing loadingSpinner from components

function ProjectHub() {
  const { state } = useLocation();  //state from previous page
  const { pName } = state; //project name from previous state
  let navigate = useNavigate();     //navigator used to navigate between pages
  const { userEmail, setUserEmail } = useContext(EmailContext);
  const projectRef = collection(db, "Projects");        //project reference in database
  const [project, setProject] = useState({});     //project in focus state
  const [toggleState, setToggleState] = useState(1);        //toggles between tabs on page
  const [loading, setLoading] = useState(true);       //loading state to check if data is available

  ////////////////////////////////////////////////////////////////
  
  useEffect(() => {       //sets project in focus state
    const getProject = async () => {
      const q = query(projectRef, where("ProjectName", "==", pName));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setProject({ ...doc.data(), id: doc.id });    //gets in focus project
        setLoading(false);      //update loading to propergate state to tabs

        //console.log('Document data:', doc.data());
      });
    };

    getProject();
  }, []);

  const toggleTab = (index) => {
    setToggleState(index);      //changes tab state focus
  };

  //////////////////////////////////////////////////////////////////////

  return (
    <div>
      <div class="header">
        <Header />
      </div>
      <div class="body">
        <h3>{pName}</h3>
        <br />
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            <span class="material-symbols-outlined">checklist</span>
            <br />
            User Stories
          </button>
          <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            <span class="material-symbols-outlined">view_kanban</span>
            <br />
            Kanban
          </button>
          <button
            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            <span class="material-symbols-outlined">import_contacts</span>
            <br />
            Wiki
          </button>
          <button
            className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(4)}
          >
            <span class="material-symbols-outlined">insights</span>
            <br />
             Insights
          </button>
          <button
            className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(5)}
          >
            <span class="material-symbols-outlined">groups</span>
            <br />
            Members
          </button>
          <button
            className={toggleState === 6 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(6)}
          >
            <span class="material-symbols-outlined">settings</span>
            <br />
            Settings
          </button>
          
        </div>
        <div className="content-tabs">
          <div className={toggleState === 1 ? "content  active-content" : "content"}>
            {loading ? <LoadingSpinner/> : <UserStories project={project} />}
          </div>

          <div className={toggleState === 2 ? "content  active-content" : "content"}>
            {loading ? <LoadingSpinner /> : <Kanban project = {project}/>}
          </div>

          <div className={toggleState === 3 ? "content  active-content" : "content"}>
            {loading ? <LoadingSpinner/> : <Wiki project={project} />}
          </div>

          <div className={toggleState === 4 ? "content  active-content" : "content"}>
            {loading ? <LoadingSpinner/> : <Insights project={project}/>}
          </div>

          <div className={toggleState === 5 ? "content  active-content" : "content"}>
            {loading ? <LoadingSpinner/> : <Member project={project} />}
          </div>

          <div className={toggleState === 6 ? "content  active-content" : "content"}>
            {loading ? <LoadingSpinner/> : <ProjectSettings project={project} />}
          </div>

        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default ProjectHub;
