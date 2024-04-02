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
  const navigate = useNavigate();
  const roomId = location.state.id;
  const roomName = location.state.name;
  const time = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
  const [lastRefresh, setTime] = useState(time);

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
      return './' + Math.abs(roundedPercentage) + 'Percent.png';
    }
    else if (status.toLowerCase().includes('ext')) {
      return './' + 100 + 'Percent.png';
    }
    else {
        return './' + 0 + 'Percent.png';
    }
  }

  function renderMachine(type, status) {
    if (type.toLowerCase().includes('dry')) {
      if (status.toLowerCase() === 'available') {
        return './idleDryer.png';
      }
      else if (status.toLowerCase().includes('remaining') || status.toLowerCase().includes('ext')) {
        return './inUseDryer.png';
      }
      else {
        return './brokenDryer.png';
      }
    }
    else {
      if (status.toLowerCase().includes('available')) {
        return './idleWasher.png';
      }
      else if (status.toLowerCase().includes('remaining') || status.toLowerCase().includes('ext'))  {
        return './inUseWasher.png';
      }
      else {
        return './brokenWasher.png';
      }
    }
  }

  useEffect(() => {
    getMachines();
  }, [location.state.name]);

  useEffect(() => {
    const interval = setInterval(() => {
      getMachines();
      setTime(new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());
    }, 30000);
    return () => clearInterval(interval);
  }, [roomId]);


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
            <div className='flex-item'></div>
            <div className='flex-item'>
              <div className='time'>
                Last Refreshed: {lastRefresh}
              </div>
            </div>
        </div>
        <Footer></Footer>
    </>
  );
};

export default LaundryRoom;
