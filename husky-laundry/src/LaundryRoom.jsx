// LaundryRoomKonva.js

import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { Stage, Layer, Group, Text, Image, Rect} from 'react-konva';
import useImage from 'use-image';
import machineImage from './IdleMachine.png';

const LaundryRoom = (id) => {
  const [machines, setMachines] = useState([]);
  var machineXPosition = 0;
  var machineYPosition = 0;
  var descXPosition = 0;
  var descYPosition = 0;

  const getMachines = () => { 
    axios.get("http://localhost:5050/machines/" + id).then((response) => {
        setMachines(response.data);
    }).catch((error) => {
      console.log(error);
    })};
  
  const IdleMachine = () => {
    const [image] = useImage('https://media.discordapp.net/attachments/1156784268245209140/1218639461638734004/Untitled_Artwork.png?ex=66086570&is=65f5f070&hm=b945e2a2cce918143ccd8a67d6d4f87fbc37af608635b5a3df606b2721171239&=&format=webp&quality=lossless&width=350&height=400');
    return <Image image={image}/>;
  };

  const OutofServiceMachine = () => {
    const [image] = useImage('https://media.discordapp.net/attachments/1156784268245209140/1218639461886328944/Untitled_Artwork.png?ex=66086570&is=65f5f070&hm=1d10b4bb44afed6f3f7b23d70fc7cd4d9e979323331a50739ad588126093ceb0&=&format=webp&quality=lossless&width=350&height=400');
    return <Image image={image}/>;
  }

  const Logo = () => {
    const [image] = useImage('https://cdn.discordapp.com/attachments/1214992962879230012/1218641408945033286/Untitled_Artwork.png?ex=66086741&is=65f5f241&hm=4e15fa27d4b2b964c951a3e2cd9bd7f6990cf960fcec9e30cf12b70982cfdc20&');
    return <Image image={image} width = {400} height = {window.innerHeight / 10}/>;
  };


  useEffect(() => {
    getMachines();

/*     const interval = setInterval(() => {
      getMachines();
    }, 10000);    */

  }, []);

   return (
      <Stage width = {window.innerWidth} height = {window.innerHeight}>
        <Layer>
          <Group>
            <Rect width = {window.innerWidth} height={window.innerHeight / 10} fill = 'gray'></Rect>
            <Logo></Logo>
          </Group>
          <Group width = {window.innerWidth} height={(window.innerHeight / 10) * 6} y = {(window.innerHeight / 10) + 10}>
            {machines.map((machine, index) => {
            if (index > 0) {
              machineXPosition += 200;
            }

            if (machineXPosition === 1400) {
              machineXPosition = 0;
              machineYPosition += 200;
            }
            return (
              <Group key={machine.desc} x={machineXPosition} y={machineYPosition}>
                {machine.status === 'Offline' ? (
                  <IdleMachine />
                ) : (
                  <OutofServiceMachine />
                )}
                <Text text= {machine.desc + ': ' + machine.status}/>
              </Group>
              );
            })}
          </Group>
          <Group width = {window.innerWidth} height = {window.innerHeight} y = {(window.innerHeight / 10) * 7}>
            {machines.map((machine, index) => {
              if (index > 0) {
                descXPosition += 500;
              }
              if (descXPosition === 2000) {
                descXPosition = 0;
                descYPosition += 75;
              }
              return (
                <Text text={machine.desc + ' placeholder progress bar'} x = {descXPosition} y = {descYPosition}>
                </Text>
              );
            })}
          </Group>
        </Layer>
      </Stage>
  );
};

export default LaundryRoom;
