import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { Stage, Layer, Group, Text, Image, Rect} from 'react-konva';
import NavigationBar from './NavigationBar';
import { useLocation } from 'react-router-dom';

const LaundryRoom = () => {
  const location = useLocation();
  const roomId = location.state.id;
  const roomName = location.state.name;
  const [machines, setMachines] = useState([]);
  const [numMachines, setNumMachines] = useState(0);
  const [stageSize, setStageSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const imageWidth = 175;
  const imageHeight = 200;
  var machineXPosition = 0;
  var machineYPosition = 0;

  const getMachines = () => { 
    axios.get("http://localhost:5050/machines/" + roomId).then((response) => {
        setMachines(response.data);
        setNumMachines(machines.length);
    }).catch((error) => {
      console.log(error);
    })};
  
  const IdleWasher = () => {
    const idleMachine = new window.Image();
    idleMachine.src = 'src/images/idleWasher.png';
    return <Image image={idleMachine} width = {imageWidth} height = {imageHeight} />;
  };

  const InUseWasher = () => {
    const inUseMachine = new window.Image();
    inUseMachine.src = 'src/images/inUseWasher.png';
    return <Image image={inUseMachine} width = {imageWidth} height = {imageHeight}/>;
  }

  const OutofServiceWasher = () => {
    const outOfServiceWasher = new window.Image();
    outOfServiceWasher.src = 'src/images/brokenWasher.png';
    return <Image image={outOfServiceWasher} width = {imageWidth} height = {imageHeight}/>;
  }

  const IdleDryer = () => {
    const idleDryer = new window.Image();
    idleDryer.src = 'src/images/idleDryer.png';
    return <Image image={idleDryer} width = {imageWidth} height = {imageHeight}/>;
  };

  const InUseDryer = () => {
    const inUseDryer = new window.Image();
    inUseDryer.src = 'src/images/inUseDryer.png';
    return <Image image={inUseDryer} width = {imageWidth} height = {imageHeight}/>;
  }

  const OutofServiceDryer = () => {
    const outOfServiceDryer = new window.Image();
    outOfServiceDryer.src = 'src/images/brokenDryer.png';
    return <Image image={outOfServiceDryer} width = {imageWidth} height = {imageHeight}/>;
  }


  function renderImage(type, status) {
    if (type.toLowerCase().includes('dry')) {
      if (status.toLowerCase() === 'available') {
        return <IdleDryer></IdleDryer>
      }
      else if (status.toLowerCase().includes('remaining') || status.toLowerCase().includes('ext')) {
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
      else if (status.toLowerCase().includes('remaining') || status.toLowerCase().includes('ext'))  {
        return <InUseWasher></InUseWasher>
      }
      else {
        return <OutofServiceWasher></OutofServiceWasher>
      }
    }
  }
  
  function renderProgressBar(status, type, xPos, yPos) {
    var totalTime = 60;
    if (type.toLowerCase().includes('wash')) {
      totalTime = 35;
    }
    if (status.toLowerCase().includes('remaining')) {
      const percentage = (totalTime - parseInt(status.substring(0, 2))) / totalTime;
      const roundedPercentage = Math.floor((percentage * 100) / 10) * 10;
      const progressBar = new window.Image();
      progressBar.src = 'src/images/' + Math.abs(roundedPercentage) + 'Percent.png';
      return <Image image={progressBar} width = {155} height = {30} x = {xPos} y = {yPos}></Image>
    }
    else if (status.toLowerCase().includes('ext')) {
      const progressBar = new window.Image();
      progressBar.src = 'src/images/' + 100 + 'Percent.png';
      return <Image image = {progressBar} width = {155} height = {30} x = {xPos} y = {yPos}/>
    }
    else {
      const progressBar = new window.Image();
      progressBar.src = 'src/images/' + 0 + 'Percent.png';
      return <Image image = {progressBar} width = {155} height = {30} x = {xPos} y = {yPos}/>
      return <Rect></Rect>
    }
  }

  useEffect(() => {
    getMachines();
    setStageSize({
      width: window.innerWidth,
      height: Math.max(window.innerHeight, 
        ((Math.ceil(numMachines / Math.floor((window.innerWidth * 0.98) / imageWidth) * (imageHeight + 30)) + 30) 
        + (window.innerHeight * 0.5)))
    });

    const handleResize = () => {
      setStageSize({
          width: window.innerWidth,
          height: Math.max(window.innerHeight, 
            ((Math.ceil(numMachines / Math.floor((window.innerWidth * 0.98) / imageWidth) * (imageHeight + 30)) + 30) 
            + window.innerHeight * 0.5))
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

  // console.log("numperRow: " + Math.floor((window.innerWidth * 0.98) / imageWidth) 
  //  + " rows: " + Math.ceil(numMachines / Math.floor((window.innerWidth * 0.98) / imageWidth))
  //  + " height: " + ((Math.ceil(numMachines / Math.floor((window.innerWidth * 0.98) / imageWidth) * (imageHeight + 30)) + 30) 
  //  + (window.innerHeight * 0.1))
  //  + " heigh2: " + window.innerHeight)
   return (
      <Stage size = {stageSize}>
        <Layer>
          <NavigationBar></NavigationBar>
          <Group width = {window.innerWidth} height={(window.innerHeight / 10) * 6} y = {(window.innerHeight / 10) + 10}>
            <Text text = {roomName} width = {350} height={window.innerHeight * 0.01} 
            x = {(window.innerWidth * 1.02 - 350) / 2 } fontSize={25} fontStyle='bold'/>
            {machines.map((machine, index) => {
              if (index == 0) {
                machineXPosition = window.innerWidth * 0.01;
                machineYPosition += (30 + window.innerHeight * 0.01);
              }
              if (index > 0) {
                machineXPosition += imageWidth;
              }

              if (machineXPosition + imageWidth >= window.innerWidth * 0.99) {
                machineXPosition = window.innerWidth * 0.01;
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
