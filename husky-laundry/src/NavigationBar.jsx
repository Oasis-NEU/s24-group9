// NavigationBar.js

import React, { useState } from 'react';
import { Group, Rect, Image, Text } from 'react-konva';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const NavigationBar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const textColor = isHovered ? 'blue' : 'black';
    const [isHoveredHome, setIsHoveredHome] = useState(false);
    const textColorHome = isHoveredHome ? 'blue' : 'black';

    const Logo = () => {
    const logo = new window.Image();
    logo.src = 'src/images/logo.png';
    var width = (window.innerWidth / 10) * 3
    return <Image image={logo} width={width} height={window.innerHeight / 10} />;
    };

    const navigateToProblems = useNavigate(); 
    const navigateToHome = useNavigate(); 
    
    const NavigateToProblems = () => {
        navigateToProblems('/problems');
    };

    const NavigateToHome = () => {
        navigateToHome('/');
    }


    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleMouseEnterHome = () => {
        setIsHoveredHome(true);
    };

    const handleMouseLeaveHome = () => {
        setIsHoveredHome(false);
    };

    return (
        <Group>
        <Rect width={window.innerWidth} height={window.innerHeight / 10} fill="gray" />
        <Logo />
        <Text text="Report Problems" onClick={NavigateToProblems} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        fill ={textColor} fontSize={25} fontStyle={'bold'} fontFamily={'impact'}
        x={(window.innerWidth / 10) * 3 + 15} y={window.innerHeight / 20 - 12.5}
        />
        <Text text="Home" onClick={NavigateToHome} onMouseEnter={handleMouseEnterHome} onMouseLeave={handleMouseLeaveHome}
        fill ={textColorHome} fontSize={25} fontStyle={'bold'} fontFamily={'impact'}
        x={(window.innerWidth / 10) * 3 + 250} y={window.innerHeight / 20 - 12.5}
        />
        </Group>
    );
};

export default NavigationBar;
