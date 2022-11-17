import { React, useEffect, useState } from 'react';

function Insights(props) {
    const [newNum, setNewNum] = useState(0);
    const [inNum, setInNum] = useState(0);
    const [doneNum, setDoneNum] = useState(0);

    useEffect(() => {
        props.userStories.map((story) => {
            if (story.UserStatus === "New"){
                setNewNum(newNum=>newNum+1);
            }
            else if (story.UserStatus === "In Progress"){
                setInNum(inNum=>inNum+1);
            }
            else if (story.UserStatus === "Done"){
                setDoneNum(doneNum=>doneNum+1);
            }
        })
    },[])

    return (
        <div>
            <div data-testid = "Insights-new">
                <p>{newNum}</p>
            </div>

            <div data-testid="Insights-in-progress">
                <p>{inNum}</p>
            </div>
            
            <div data-testid="Insights-done">
                <p>{doneNum}</p>
            </div>
        </div>
    )
}

export default Insights