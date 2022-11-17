import { useNavigate } from 'react-router-dom';             //importing required artifacts from react-router-dom
import { useState, useEffect, useContext } from 'react';            //importing required artifacts from react
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";                //importing required artifacts from firebase
import { db } from '../../firebase';            //importing database from our firebase config
import { collection, getDocs, addDoc } from "firebase/firestore";               //importing required artifacts from firebase
import emailjs from 'emailjs-com';          // library used to send users emails
import project_management from "../../images/project_management.png";         
import { EmailContext } from '../../context';           //global email context for user logged in

import HeaderB from '../../Components/HeaderB/HeaderB';             //importing header from components when not logged in
import Footer from '../../Components/Footer/Footer';                //importing footer from components
import '../Login/Login.css';
import './SignUp.css';



function SignUp() {
    let navigate = useNavigate();                   //navigator used to navigate between pages
    const [name,setName] = useState('');            //state to store name
    const [password, setPassword] = useState('');       //state to store password
    const [email, setEmail] = useState('');             //state to store email address
    const [surname, setSurname] = useState('');             //state to store surname
    const { userEmail, setUserEmail } = useContext(EmailContext);           //global email context going to be set after successfull signup 

    const [isLogged, setIsLogged] = useState(null);



    const routeChange = () => {             ///router function to navigate to landing page after successful sign up
        let path = '/landing';
        navigate(path, { state: {email: email}});               //passes  the email state to next page
    }
    const loginhere = () => {       ///router function to navigate to login page of account exists
        let path = "/login";
        navigate(path);
      };
    const Setname = event => {              //handles setting name state
        setName(event.target.value);
    }
    const Setemail = event => {             //handles setting email state
        setEmail(event.target.value);
    }
    const Setpassword = event => {              //handles setting password state
        setPassword(event.target.value);    
    }
    const SetSurname = event => {               //handles setting surname state
        setSurname(event.target.value);
    }

    const auth = getAuth();
    const OnSignup = () => {            //handles entire sign up process

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                sendemail();                               // notifies the user after account has been created
                addDetails();                                //update table
                setUserEmail(email);
                routeChange();                         // change to route to login after successful signup
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(error)                      //temporary to show error message
            });
    }

    const addressRef = collection(db, "Users");                        //reference to the user collection
    const addDetails = async () => {                            //handles adding an item to database
        await addDoc(addressRef, { Email: email, Name: name, Surname: surname })
    }

    function sendemail() {
        var userid = "Uhi73WxfmyePOs3wU"
        emailjs.init(userid);

        var details = {
            email: email,               // user email
            to_name: name          /* data which will be needed from template may be extracted from here,
                         e.i ( name of user or subject of email)                   */
        };

        emailjs.send('service_ew7io57', 'template_3p2jaur', details).then(function (res) {

        },
            reason => {
                alert("Invalid user email or internet connection is low");
            })
    }

    return (
        <div >
            <div class="header">
                <HeaderB />
            </div>
            <div className='container'>
                <div className='resize'>
                    <div className="centre"><br />
                        <input className='login-input' placeholder="Name" onChange={Setname} /><br />
                        <input className='login-input' placeholder="Surname" onChange={SetSurname} /><br />
                        <input className='login-input' type="email" placeholder="Email" onChange={Setemail} /><br />
                        <input className='login-input' type="password" placeholder="Password" onChange={Setpassword} /> <br />
                        <button class="Loginbutton" onClick={OnSignup}>Sign-Up</button><br />
                        <button className='loginhere' onClick={loginhere}>Already Have An Account? Login Here</button><br />

                        <br />
                    </div>
                </div>
            </div>
            <div class = "Footer">
                <Footer />
            </div>

        </div>
    );
}

export default SignUp;