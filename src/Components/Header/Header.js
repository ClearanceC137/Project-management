import { Link, useNavigate } from "react-router-dom";       //importing required artifacts from react-router-dom
import { FiFolder, FiHelpCircle, FiHome } from "react-icons/fi";        //importiing react icons
import { FaConnectdevelop } from "react-icons/fa";                       //
import { IoNotificationsOutline } from "react-icons/io5";                //
import { CgProfile } from "react-icons/cg";                              //
import { AiOutlineContacts } from "react-icons/ai";                      //

import "./Header.css";

import Profile from "../Profile/Profile";       //importing user profile
import Project from "../Projects/Project/Project";
import Lion from "../../images/LION.png";      //importing app icon

function Header() {
  let navigate = useNavigate();

  const routeChange = () => {       //handles route change to previous page
    navigate(-1);
  };
  return (
    <div className="Header">
      <header className="App-header">
        <div className="left-header">
          <img src={Lion} width="40" onClick={routeChange} />
          <p class="software">&nbsp;Lion</p>
        </div>
        <div className="right-header">
          <div className="links-header">
            <Link to="/landing" class="link">
              <FiHome />
              &nbsp;Home
            </Link>

            <Link to="/contactb" class="link">
              <AiOutlineContacts />
              &nbsp;Contact
            </Link>

            <Link to="/communityB" class="link">
              <FaConnectdevelop />
              &nbsp;Community
            </Link>

            <Profile />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
