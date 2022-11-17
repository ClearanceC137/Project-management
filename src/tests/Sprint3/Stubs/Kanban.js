import { React } from 'react';

const handleStoryChange = (userStories, newStory) => {
    if (newStory !== "") {
        userStories.UserStory = newStory;
        return userStories;
    }
    else {
        return "No changes were made to the project";
    }
};


const handlePosterChange = (userStories, newPoster) => {
    if (newPoster !== "") {
        userStories.UserPoster = newPoster;
        return userStories;
    }
    else {
        return "No changes were made to the project";
    }
};


const handleAssigneeChange = (userStories, newAssignee) => {
    if (newAssignee !== "") {
        userStories.AssignedTo = newAssignee;
        return userStories;
    }
    else {
        return "No changes were made to the project";
    }
};


const handleStatusChange = (userStories, newStatus) => {
    if (newStatus !== "") {
        userStories.UserStatus = newStatus;
        return userStories;
    }
    else {
        return "No changes were made to the project";
    }
};

function Kanban(props) {

    return (
        <div>
            <h3>Kanban</h3>
            <div data-testid="Kanban-story">
                <p>{props.userStories.UserStory}</p>
            </div>
            <div data-testid="Kanban-poster">
                <p>{props.userStories.UserPoster}</p>
            </div>
            <div data-testid="Kanban-assignee">
                <p>{props.userStories.AssignedTo}</p>
            </div>
            <div data-testid="Kanban-status">
                <p>{props.userStories.UserStatus}</p>
            </div>
        </div>
    );

}


module.exports = [ Kanban, handleStoryChange, handlePosterChange, handleAssigneeChange, handleStatusChange ]