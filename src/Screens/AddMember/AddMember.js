import { React, useState, useEffect, useContext } from "react";       //importing required artifacts from react
import { db } from "../../firebase";        //importing database from our firebase config
import {
  collection,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";      //importing required artifacts from firebase
import { Link, useNavigate, useLocation } from "react-router-dom";      //importing required artifacts from react-router-dom

import "./AddMember.css";
import Header from "../../Components/Header/Header";      //importing header
import Footer from "../../Components/Footer/Footer";       //importing footer
import { AiOutlineConsoleSql } from "react-icons/ai";
import Lion from "../../images/Lion-white.png";

function AddMember() {
  const { state } = useLocation();      //state from previous page
  let navigate = useNavigate();
  const { project } = state;      //state of project loaded

  const [name, setName] = useState('');     //state for name
  const Setname = (event) => {
    setName(event.target.value);      //sets name to name entered in text box
  };

  const addMember = async () => {
    //handles adding a new member to the project/team
    const prref = doc(db, "Projects", project.id);
    await updateDoc(prref, {
      ProjectMembers: [...project.ProjectMembers, name],
    });
    alert("Member Added");
    goBack();
  };

  const goBack = () => {
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
          className="editmember"
          onChange={Setname}
          placeholder="New member..."
        />

        <button className="edtbtnmember" onClick={addMember}>
          Add
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default AddMember;
