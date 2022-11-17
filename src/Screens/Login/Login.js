import { useNavigate } from 'react-router-dom';             //importing required artifacts from react-router-dom
import { useState, useEffect, useContext } from 'react';            //importing required artifacts from react
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";            //importing required artifacts from firebase
import { EmailContext } from '../../context';           //importing global email context for user logged in

import HeaderB from '../../Components/HeaderB/HeaderB';             //import header from components when not logged in
import Footer from '../../Components/Footer/Footer';                //importing footer from components
import './Login.css';

function Login() {
    let navigate = useNavigate();               //navigator used to navigate between pages
    const [isLogged, setIsLogged] = useState(null);             //state for if user is logged in
    const auth = getAuth();                 
    const [email,setEmail] = useState('');          //email state
    const [password,setPassword] = useState('');            //password state
    const { userEmail, setUserEmail } = useContext(EmailContext);           //global state to be set to user after successful login

    useEffect(() => {
        //changed path if user logged in succesfully
        if (!isLogged) {
            // value is set to null because the user might try to login with the correct details later
            setIsLogged(null);
        }
            else {
            routeChange();          //login successful
        }
    }, [isLogged]);

    const routeChange = () => {             //routes to the landing page 
        let path = '/landing';
        navigate(path,{ state: { email: email}});           //passes state of user logged in
    }
    const Setemail = event => {         //handles setting email state
        setEmail(event.target.value);
    }
    const Setpassword = event => {              //handles setting password state
        setPassword(event.target.value);
    }
    
    const OnLogin = () => {
        //send a function to the database to check if log the user in

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setIsLogged(true);
                setUserEmail(email);
            })
            .catch((error) => {
                // failed to sign in
                const errorCode = error.code;
                const errorMessage = error.message;
                setIsLogged(false);
                if (errorCode === 'auth/invalid-email') {
                    alert('That email address is invalid!');                
                }
                else {
                    alert(errorMessage);
                }
            });
    }

    const OnForgot = () => {
        // need to do something if the user forgot password
        let path = "/forgotpass";
        navigate(path);
    }
    const registerhere = () => {       //router function to change navigate site
        let path = "/signup";
        navigate(path);
    };

    return (
        <div >
            <div class="header">
                <HeaderB />
            </div>
            <div className='container'>
                <div className='resize'>
                    <div className="centre"><br />
                        <input className='login-input' type="email" placeholder="Email" onChange={Setemail} /><br />
                        <input className='login-input' type="password" placeholder="Password" onChange={Setpassword} /> <br />
                        <button className='forget-password-button' onClick={OnForgot}>Forgot Password?</button><br />
                        <button class="Loginbutton" onClick={OnLogin}>Login</button>
                        <br/>
                        <button className='registerHere' onClick={registerhere}>New To Lion? Sign Up Here</button><br />

                    </div>
                </div>
                <div className='background'></div>
            </div>
            <div class="footer">
                <Footer />
            </div>
        </div>
    );
}

export default Login;