import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [currentRoom, setCurrentRoom] = useState("");
    const [currentMachine, setCurrentMachine] = useState("");
    function returnRoom() {
        let input = 
        document.getElementById("roomNumber").value
        alert(input);
        setCurrentRoom("");
    }

    function returnMachine() {
        let input = 
        document.getElementById("machineNumber").value
        alert(input);
        setCurrentMachine("");
    }

    return (


    <div>
        <h1>Technical Support</h1>
        <p>The information that you input will be sent as a service request to admin so that the broken machine can be fixed as soon as possible.</p>
        <div>
            <input
            type="text"
            value={currentRoom}
            className = "roomNumber"
            placeholder="Enter your room number"
            onChange={(event) => {
                setCurrentRoom(event.target.value);
            }}
            
            onKeyPress={(event) => {
                event.key === "Enter" && returnRoom();
            }}
            />
            <button className = "roomButton" onClick = {returnRoom}>Submit</button>
        </div>
        
        <div>
            <input
            type="text"
            value={currentMachine}
            className = "machineNumber"
            placeholder="Enter your machine number"
            onChange={(event) => {
                setCurrentMachine(event.target.value);
            }}
            
            onKeyPress={(event) => {
                event.key === "Enter" && returnMachine();
            }}
            />
            <button className = "machineButton" onClick = {returnMachine}>Submit</button>
        </div>

        <div>
            <input type="text" id="issue" className="issue" placeholder="Report your problem here"/>
        </div>

    </div>

    )
}

export default App





