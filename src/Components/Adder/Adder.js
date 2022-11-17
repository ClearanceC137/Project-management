import { React } from 'react';          //importing required artifacts from react
import { useNavigate } from "react-router-dom";         //importing required artifacts from react-router-dom


import './Adder.css';           //importing style sheet

function Adder(props) {
    let navigate = useNavigate();           

    const routeChange = () => {         //handles routing to the adding page
        let path = '/add';
        navigate(path, {
        state: {
            project : props.project         //passes the project state to the adding page
            },
        });
    }
    
    return (
        <div className='Adder'>
            <span class="material-symbols-outlined" id="adder-icon" onClick={routeChange}>
                add
            </span>
        </div>
    )
}

export default Adder