import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { Stage, Layer, Group, Text, Image, Rect} from 'react-konva';
import useImage from 'use-image';
import NavigationBar from './NavigationBar';
import { useLocation } from 'react-router-dom';

const LaundryRoom = (id) => {
  const location = useLocation();
  const roomId = location.state;
  console.log(roomId);
  const [machines, setMachines] = useState([]);
  const [stageSize, setStageSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [imageWidth, setImageWidth] = useState([]);
  const [imageHeight, setImageHeight] = useState([]);
  var machineXPosition = 0;
  var machineYPosition = 0;
  var descXPosition = 0;
  var descYPosition = 0;

  const getMachines = () => { 
    axios.get("http://localhost:5050/machines/" + roomId).then((response) => {
        setMachines(response.data);
    }).catch((error) => {
      console.log(error);
    })};
  
  const IdleWasher = () => {
    const idleMachine = new window.Image();
    idleMachine.src = 'src/images/idleWasher.png';
    setImageWidth(idleMachine.width);
    setImageHeight(idleMachine.height);
    return <Image image={idleMachine}/>;
  };

  const InUseWasher = () => {
    const inUseMachine = new window.Image();
    inUseMachine.src = 'src/images/inUseWasher.png';
    return <Image image={inUseMachine}/>;
  }

  const OutofServiceWasher = () => {
    const [image] = useImage('src/images/brokenWasher.png');
    return <Image image={image}/>;
  }

  const IdleDryer = () => {
    const idleDryer = new window.Image();
    idleDryer.src = 'src/images/idleDryer.png';
    return <Image image={idleDryer}/>;
  };

  const InUseDryer = () => {
    const inUseDryer = new window.Image();
    inUseDryer.src = 'src/images/inUseDryer.png';
    return <Image image={inUseDryer}/>;
  }

  const OutofServiceDryer = () => {
    const [image] = useImage('src/images/brokenDryer.png');
    return <Image image={image}/>;
  }

  const Logo = () => {
    const logo = new window.Image();
    logo.src = 'src/images/logo.png';
    return <Image image={logo} width = {400} height = {window.innerHeight / 10}/>;
  };

  function renderImage(type, status) {
    if (type.toLowerCase().includes('dry')) {
      if (status.toLowerCase() === 'available') {
        return <IdleDryer></IdleDryer>
      }
      else if (status.toLowerCase().includes('remaining')) {
        return <InUseDryer></InUseDryer>
      }
      else {
        return <OutofServiceDryer></OutofServiceDryer>
      }
    }
    else {
      if (status.toLowerCase().includes('available')) {
        return <IdleWasher></IdleWasher>
      }
      else if (status.toLowerCase().includes('remaining')) {
        return <InUseWasher></InUseWasher>
      }
      else {
        return <OutofServiceWasher></OutofServiceWasher>
      }
    }
  }
  

  useEffect(() => {
    getMachines();
    setStageSize({
      width: window.innerWidth,
      height: (machines.length / (window.innerWidth / imageWidth)) * imageHeight 
      + window.innerHeight 
      + window.innerHeight / 10
    });

    const handleResize = () => {
      setStageSize({
          width: window.innerWidth,
          height: (machines.length / (window.innerWidth / imageWidth)) * imageHeight 
          + window.innerHeight 
          + window.innerHeight / 10 
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
  };

/*     const interval = setInterval(() => {
      getMachines();
    }, 10000);    */

  }, []);

   return (
      <Stage size = {stageSize}>
        <Layer>
          <NavigationBar></NavigationBar>
          <Group width = {window.innerWidth} height={(window.innerHeight / 10) * 6} y = {(window.innerHeight / 10) + 10}>
            {machines.map((machine, index) => {
            if (index > 0) {
              machineXPosition += imageWidth;
            }

            if (machineXPosition >= ((window.innerWidth / imageWidth) - 1) * imageWidth) {
              machineXPosition = 0;
              machineYPosition += imageHeight + 10;
            }
            return (
              <Group key={machine.desc + index} x={machineXPosition} y={machineYPosition}>
                {renderImage(machine.type, machine.status)}
                <Text text= {machine.desc + machine.type +  ': ' + machine.status}/>
              </Group>
              );
            })}
          </Group>
          <Group width = {window.innerWidth} height = {window.innerHeight} 
            y = {(Math.ceil(machines.length / Math.floor(window.innerWidth / imageWidth)) + 1) * imageHeight}>
            {machines.map((machine, index) => {
              if (index > 0) {
                descXPosition += 200;
              }
              if (descXPosition >= window.innerWidth - 200) {
                descXPosition = 0;
                descYPosition += 75;
              }
              return (
                <Text key = {index} text={machine.desc + ' placeholder progress bar'} x = {descXPosition} y = {descYPosition}>
                </Text>
              );
            })}
          </Group>
        </Layer>
      </Stage>
  );
};

export default LaundryRoom;
