import { React } from 'react';          //importing required artifacts from react
import { useNavigate } from "react-router-dom";             //importing required artifacts from react-router-dom


import './AdderDocument.css';

function AdderDocument(props) {
    let navigate = useNavigate();

    const routeChange = () => {             //handles routing to the adding documents page
        let path = '/adddocument';
        navigate(path, {
            state: {
                project: props.project          //passes the project state to the adding documents page
            },
        });
    }

    return (
        <div className='AdderDocument'>
            <span class="material-symbols-outlined" id="adderdocument-icon" onClick={routeChange}>
                upload_file
            </span>
        </div>
    )
}

export default AdderDocument