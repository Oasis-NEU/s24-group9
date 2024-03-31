import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import './LaundryRoom.css';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const LaundryRoom = () => {
  const [machines, setMachines] = useState([]);
  const location = useLocation();
  const navigateToMain = useNavigate();
  const roomId = location.state.id;
  const roomName = location.state.name;

  function getMachines() { 
    axios.get("http://localhost:5050/machines/" + roomId).then((response) => {
        setMachines(response.data);
    }).catch((error) => {
      console.log(error);
    })};

  
  function renderProgressBar(status, type) {
    var totalTime = 60;
    if (type.toLowerCase().includes('wash')) {
      totalTime = 35;
    }
    if (status.toLowerCase().includes('remaining')) {
      const percentage = (totalTime - parseInt(status.substring(0, 2))) / totalTime;
      const roundedPercentage = Math.floor((percentage * 100) / 10) * 10;
      return 'src/images/' + Math.abs(roundedPercentage) + 'Percent.png';
    }
    else if (status.toLowerCase().includes('ext')) {
      return 'src/images/' + 100 + 'Percent.png';
    }
    else {
        return 'src/images/' + 0 + 'Percent.png';
    }
  }

  function renderMachine(type, status) {
    if (type.toLowerCase().includes('dry')) {
      if (status.toLowerCase() === 'available') {
        return 'src/images/idleDryer.png';
      }
      else if (status.toLowerCase().includes('remaining') || status.toLowerCase().includes('ext')) {
        return 'src/images/inUseDryer.png';
      }
      else {
        return 'src/images/brokenDryer.png';
      }
    }
    else {
      if (status.toLowerCase().includes('available')) {
        return 'src/images/idleWasher.png';
      }
      else if (status.toLowerCase().includes('remaining') || status.toLowerCase().includes('ext'))  {
        return 'src/images/inUseWasher.png';
      }
      else {
        return 'src/images/brokenWasher.png';
      }
    }
  }

  console.log(location);
  useEffect(() => {
    getMachines();

    const interval = setInterval(() => {
      getMachines();
    }, 30000);  

  }, [location.state.name]);

   return (
    <>  
    <NavBar></NavBar>
        <div className='roomName'>
          {roomName}
        </div>
        <div className="flex-container">
            {machines.map((machine) => (
                <div key = {machine.desc} className = 'flex-item'>
                    <div className = 'machine-desc'>
                      {machine.desc}
                    </div>
                  <div className="image-stack">
                      <img src = {renderMachine(machine.type, machine.status)}
                          width = '175'
                          height= '200'
                      />
                      <img src = {renderProgressBar(machine.status, machine.type)} 
                          width= '175'
                          height= '30'
                      />                     
                  </div>
                  <div className='machine-status'>
                      {machine.status}
                  </div>
                </div>
            ))}
        </div>
        <Footer></Footer>
    </>
  );
};

export default LaundryRoom;
