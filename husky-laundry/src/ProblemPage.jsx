import React, { useEffect, useState } from "react";
import "./ProblemPage.css";

const ProblemPage = () => {
    const [currentRoom, setCurrentRoom] = useState("");
    const [currentMachine, setCurrentMachine] = useState("");
    const [currentIssue, setCurrentIssue] = useState("");

    function returnIssue() {
        let input = 
        "Room Number: "
        + document.getElementById("roomNumber").value
        + "\n"
        + "Machine Number: " + document.getElementById("machineNumber").value
        + "\n"
        + "Issue: " + document.getElementById("machineIssue").value
        setCurrentRoom("");
        setCurrentMachine("");
        setCurrentIssue("");
  }

    return (

    <div>
        <div className="home" style={{fontSize: 20, position: "absolute", top: 15, left: 50}}>
            
          <a href="/" className="goHome">Home</a>
          </div>
        <h1>Technical Support</h1>
        <p>The information that you input will be sent as a service request to admin so that the broken machine can be fixed as soon as possible.</p>
        <div>
            <input
            type="text"
            value={currentRoom}
            className = "roomNumber"
            id = "roomNumber"
            placeholder="Enter your room number"
            onChange={(event) => {
                setCurrentRoom(event.value);
            }}
            />
        </div>
        
        <div>
            <input
            type="text"
            value={currentMachine}
            className = "machineNumber"
            id = "machineNumber"
            placeholder="Enter your machine number"
            onChange={(event) => {
                setCurrentMachine(event.value);
            }}
            />
        </div>

        <div>
        <input
            type="text"
            value={currentIssue}
            className = "machineIssue"
            id = "machineIssue"
            placeholder="Report your problem here"
            onChange={(event) => {
                setCurrentIssue(event.value);
            }}
            
            onKeyPress={(event) => {
                event.key === "Enter" && returnIssue("");
            }}
            />

        </div>
        <div>
        <button className = "issueButton" onClick = {returnIssue}>Submit</button>
        </div>

    </div>

    )
}

export default ProblemPage