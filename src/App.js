import { BrowserRouter, Routes, Route } from "react-router-dom";    //importing required artifacts from react-router-dom
import { React, useState } from "react";        //importing required artifacts from react

import { EmailContext } from "./context";       //email context propagated through entire site
import Login from "./Screens/Login/Login";      //login screen
import MyProjects from "./Components/Projects/MyProjects/MyProjects";       //my projects component
import SplashScreen from "./Screens/SplashScreen/SplashScreen";       //splash screen
import SignUp from "./Screens/SignUp/SignUp";             //sign up screen
import Landing from "./Screens/Landing/Landing";          //landing screen
import ProfileSettings from "./Components/Profile/ProfileSettings";         //profile settings component
import Scrum from "./Components/Projects/CreateProject/Scrum/Scrum";        //create scum component
import ProjectHub from "./Screens/ProjectHub/ProjectHub";         //project hub screen
import Contact from "./Screens/Contact/Contact";        //contact screen when logged in
import ContactB from "./Screens/ContactB/ContactB";         //contact screen when not logged in
import Add from "./Screens/Add/Add";              //adder screen
import Wiki from "./Screens/Wiki/Wiki";           //project wiki screen
import AddMember from "./Screens/AddMember/AddMember";        //adding member screen
import ForgotPass from "./Screens/ForgotPass/ForgotPass";         //forgot password screen
import AddDocument from "./Screens/AddDocument/AddDocument";        //adding document screen
import ShowDocument from "./Screens/ShowDocument/ShowDocument";     //viewing documents screen
import Community from "./Screens/Community/Community";            //community screen when logged in
import CommunityB from "./Screens/CommunityB/CommunityB";       //contact screen when not logged in
import Intro from "./Screens/Intro/Intro";            //intro spinner
import TeamHub from "./Screens/TeamHub/TeamHub";          //teamhub screen

function App() {
  const [userEmail, setUserEmail] = useState("");

  return (
    <EmailContext.Provider value={{ userEmail, setUserEmail }}>     {/*email provider once logged in*/}
      <BrowserRouter>                                               {/*routes container for different screens*/}
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myprojects" element={<MyProjects />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="scrum" element={<Scrum />} />
          <Route path="profilesettings" element={<ProfileSettings />} />
          <Route path="projecthub" element={<ProjectHub />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contactb" element={<ContactB />} />
          <Route path="/add" element={<Add />} />
          <Route path="/Wiki" element={<Wiki />} />
          <Route path="/AddMember" element={<AddMember />} />
          <Route path="/forgotpass" element={<ForgotPass />} />
          <Route path="/adddocument" element={<AddDocument />} />
          <Route path="/showdocument" element={<ShowDocument />} />
          <Route path="/community" element={<Community />} />
          <Route path="/communityB" element={<CommunityB />} />
          <Route path="/teamhub" element={<TeamHub />} />

        </Routes>
      </BrowserRouter>
    </EmailContext.Provider>
  );
}

export default App;
