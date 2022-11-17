import { React, useState, useEffect } from 'react';         //importing required artifacts from react
import { ColumnDirective, ColumnsDirective, KanbanComponent } from '@syncfusion/ej2-react-kanban';          //importing required artifacts from sync-fusion library
import { db } from '../../firebase';            //importing database from our firebase config
import { updateDoc, doc } from "firebase/firestore";            //importing required artifacts from firebase

import './Kanban.css';
import Adder from '../Adder/Adder';

function Kanban(props){
    const [stories, setStories] = useState([]);         //array to store user stories

    useEffect(() => {
        props.project.UserStories.map((story)=>{
            setStories(stories => [...stories, story]);         //populates local array with user stories
        })
    },[])

    const handleChange = async () => {      //handles change of user stories
        const prref = doc(db, 'Projects', props.project.id);
        await updateDoc(prref, {
            UserStories: []
        })

        await updateDoc(prref, {
            UserStories: [...stories]       //updates project user stories to keep data persistent
        })
    };

    return (<KanbanComponent dataSource={stories} keyField="UserStatus"

            cardSettings={{ contentField: "UserStory",headerField: "UserTitle", selectionType: "Multiple" }}

            width="100%" height="100%" dialogClose={handleChange} enablePersistence = {true} dragStop={handleChange}>
            <ColumnsDirective>
                <ColumnDirective headerText='To Do' keyField="New"></ColumnDirective>
                <ColumnDirective headerText='In Progress' keyField="In Progress"></ColumnDirective>
                <ColumnDirective headerText='Done' keyField="Done"></ColumnDirective>
            </ColumnsDirective>
        <Adder project={props.project} />

        </KanbanComponent>);
    
}


export default Kanban;