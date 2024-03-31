import React, { useEffect, useState } from "react";
import "./ProblemPage.css";
import NavBar from "./NavBar";

const ProblemPage = () => {
    const [currentRoom, setCurrentRoom] = useState("");
    const [currentMachine, setCurrentMachine] = useState("");
    const [currentIssue, setCurrentIssue] = useState("");
    function returnRoom() {
        let input = 
        document.getElementById("roomNumber").value
        setCurrentRoom("");
    }

    function returnMachine() {
        let input = 
        document.getElementById("machineNumber").value
        setCurrentMachine("");
    }

    function returnIssue() {
      let input = 
      document.getElementById("machineIssue").value
      setCurrentIssue("");
  }

    return (
    <>
        <NavBar></NavBar>
        <div>
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
                
                onKeyPress={(event) => {
                    event.key === "Enter" && returnRoom("");
                }}
                />
                <button className = "roomButton" onClick = {returnRoom}>Submit</button>
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
                
                onKeyPress={(event) => {
                    event.key === "Enter" && returnMachine("");
                }}
                />
                <button className = "machineButton" onClick = {returnMachine}>Submit</button>
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
                <button className = "issueButton" onClick = {returnIssue}>Submit</button>
            </div>

        </div>
    </>

    )
}

export default ProblemPage