// NavigationBar.js

import React, { useState } from 'react';
import { Group, Rect, Image, Text } from 'react-konva';
import { useNavigate } from 'react-router-dom';


const NavigationBar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const textColor = isHovered ? 'blue' : 'black';
    const navigate = useNavigate(); 

    const NavigateToHome = () => {
        navigate('/');
    }

    const Logo = () => {
    const logo = new window.Image();
    logo.src = 'src/images/logo.png';
    var width = (window.innerWidth / 10) * 3
    return <Image image={logo} width={width} height={window.innerHeight / 10} onClick={NavigateToHome}/>;
    };

    const NavigateToProblems = () => {
        navigate('/problems');
    };


    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Group>
        <Rect width={window.innerWidth} height={window.innerHeight / 10} fill="gray" />
        <Logo />
        <Text text="Report Problems" onClick={NavigateToProblems} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        fill ={textColor} fontSize={25} fontStyle={'bold'} fontFamily={'impact'}
        x={(window.innerWidth / 10) * 3 + 15} y={window.innerHeight / 20 - 12.5}
        />
        </Group>
    );
};

export default NavigationBar;
