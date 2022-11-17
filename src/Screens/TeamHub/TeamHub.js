import { React, useState, useEffect, useContext } from "react";         //importing required artifacts from react
import { useNavigate, useLocation } from "react-router-dom";            //importing required artifacts from react-router-dom
import { db } from "../../firebase";                            //importing firebase from app configuration
import { collection, getDocs, query, where } from "firebase/firestore";             //importing required artifacts from firebase firestore
import { EmailContext } from "../../context";               //importing global email context for user logged in


import './TeamHub.css';
import Header from "../../Components/Header/Header";                //importing header from components
import Footer from "../../Components/Footer/Footer";                //importing footer from components
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";            //importing loading spinner from components

function TeamHub() {
    const { state } = useLocation();            //importing state from previous page
    const { tName } = state; //state from previous page
    const { userEmail, setUserEmail } = useContext(EmailContext);           //email address of user logged in
    const teamRef = collection(db, "Teams");                //reference of teams in database
    const [team, setTeam] = useState({});               //team in focus
    const [loading, setLoading] = useState(true);           //loading variable


    ////////////////////////////////////////////////////////////////
    useEffect(() => {
        const getTeam = async () => {               //handles getting team in focus
            const q = query(teamRef, where("TeamName", "==", tName));           

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setTeam({ ...doc.data(), id: doc.id });    //gets in focus team
                setLoading(false);      //update loading to propergate state to tabs

            });
        };

        getTeam();
    }, []);

    return (
        <div>
            <div class="header">
                <Header />
            </div>
            <div class="body">  {/*tenerary to check if data has been loaded*/}
                {loading ? <LoadingSpinner /> :  
                    <div className="teamdet-div">
                        <h1 className="teamdet-name">{team.TeamName}</h1>

                        <h6 className="title-h">Team Owner</h6>
                        <p className="projdesc">{team.TeamOwner}</p>
                        <br />
                        <h6 className="memdet-title">Team Members</h6>
                        {team.TeamMembers.map((member,index) =>{
                            return (
                                <p className="memdet" key={index}>{member}</p>
                            )
                        })}

                    </div>
                }
            </div>

            <div class="footer">
                <Footer />
            </div>
        </div>
    )
}

export default TeamHub