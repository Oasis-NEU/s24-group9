import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { Stage, Layer, Group, Text, Image, Rect} from 'react-konva';
import useImage from 'use-image';
import NavigationBar from './NavigationBar';
import { useLocation } from 'react-router-dom';

const LaundryRoom = () => {
  const location = useLocation();
  const roomId = location.state;
  const [machines, setMachines] = useState([]);
  const [stageSize, setStageSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  var machineXPosition = 0;
  var machineYPosition = 0;

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
    return <Image image={idleMachine} />;
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
    const outOfServiceDryer = new window.Image();
    outOfServiceDryer.src = 'src/images/brokenDryer.png';
    setImageWidth(outOfServiceDryer.width);
    setImageHeight(outOfServiceDryer.height);
    return <Image image={outOfServiceDryer}/>;
  }


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
  
  function renderProgressBar(status, type, xPos, yPos) {
    var totalTime = 60;
    if (type.toLowerCase().includes('dry')) {
      totalTime = 35;
    }
    if (status.toLowerCase().includes('remaining')) {
      const percentage = (totalTime - parseInt(status.substring(0, 2))) / totalTime;
      const roundedPercentage = Math.floor((percentage * 100) / 10) * 10;
      const progressBar = new window.Image();
      progressBar.src = 'src/images/' + roundedPercentage + 'Percent.png';
      return <Image image={progressBar} width = {155} height = {30} x = {xPos} y = {yPos}></Image>
    }
    else {
      const progressBar = new window.Image();
      progressBar.src = 'src/images/' + 0 + 'Percent.png';
      return <Image image={progressBar} width = {155} height = {30} x = {xPos} y = {yPos}></Image>
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
                machineYPosition += imageHeight + 50;
              }
              var progressYPos = machineYPosition;
              if (machineYPosition != 0) {
                progressYPos -= 50;
              }
              return (
                <Group key={machine.desc + index} x={machineXPosition} y={machineYPosition}>
                    {renderProgressBar(machine.status, machine.type, (imageWidth - 155) / 2, imageHeight)}
                    {renderImage(machine.type, machine.status)}
                    <Text text= {machine.desc + ': ' + machine.status} width = {175} align = "center" 
                      fontSize={15}
                    />
                </Group>
                );
            })}
          </Group>
        </Layer>
      </Stage>
  );
};

export default LaundryRoom;
