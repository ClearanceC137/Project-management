import { React } from 'react';          //importing required artifacts from react
import { useNavigate } from "react-router-dom";    //importing required artifacts from react-router-dom


import './AdderWiki.css';

function AdderWiki(props) {
    let navigate = useNavigate();

    const routeChange = () => {         //handles routing to the adding wiki page
        let path = '/Wiki';
        navigate(path, {
            state: {
                project: props.project          //passes the project state to the adding wiki page
            },
        });
    }

    return (
        <div className='AdderWiki'>
            <span class="material-symbols-outlined" id="adderwiki-icon" onClick={routeChange}>
                edit
            </span>
        </div>
    )
}

export default AdderWiki