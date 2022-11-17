import { Link, useNavigate } from "react-router-dom";         //importing required artifacts from react-router-dom
import { FiHelpCircle, FiHome } from "react-icons/fi";        //importiing react icons
import { FaConnectdevelop } from "react-icons/fa";            //
import { IoNotificationsOutline } from "react-icons/io5";     //
import { AiOutlineContacts } from "react-icons/ai";           //

import "./HeaderB.css";
import Lion from "../../images/LION.png";

function HeaderB() {
  let navigate = useNavigate();

  const routeChange = () => {     //handles site refresh
    let path = "/";
    navigate(path);
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
            <Link to="/" class="link">
              <FiHome />
              &nbsp;Home
            </Link>
            <br />

            <Link to="/contact" class="link">
              <AiOutlineContacts />
              &nbsp;Contact
            </Link>

            <Link to="/community" class="link">
              <FaConnectdevelop />
              &nbsp;Community
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default HeaderB;
