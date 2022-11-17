import { useNavigate } from 'react-router-dom';             //importing required artifacts from react-router-dom
import { useState, useEffect, useContext } from 'react';            //importing required artifacts from react
import { getAuth, sendPasswordResetEmail } from "firebase/auth";            //importing required artifacts from firebase

import HeaderB from '../../Components/HeaderB/HeaderB';         //importing header from components when not logged in
import Footer from '../../Components/Footer/Footer';                //importing footer from components
import '../Login/Login.css';



function ForgotPass() {
    let navigate = useNavigate();           //navigator used to navigate between pages
    const [email, setEmail] = useState('');             //email state
    const [isLogged, setIsLogged] = useState(null);


    const auth = getAuth();

    const triggerResetEmail = async () => {         //handles reseting of password
        await sendPasswordResetEmail(auth, email)
        .then(() => {
                // email sent
            routeChange(); 
            })
            .catch((error) => {
                // failed
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode , errorMessage);
            });        
        console.log("Password reset email sent");
    }
    const routeChange = () => {         ///router function to navigate to login page
        let path = '/login';
        navigate(path);
    }
    const Setemail = event => {             //handles setting email state
        setEmail(event.target.value);
    }


    return (
        <div >
            <div class="header"><HeaderB /></div>
            <div className='container'>
                <div className='resize'>
                    <div className="centre"><br />
                        <input className='login-input' type ="email"  placeholder="Email" onChange={Setemail} /><br />
                        <button class="Loginbutton" onClick={triggerResetEmail}>Reset Password</button><br />
                        <br />
                    </div>
                </div>
                <div className='background'></div>
            </div>
            <div class = "Footer">
                <Footer />
            </div>
            <div class="footer"><Footer /></div>
        </div>
    );
}

export default ForgotPass;