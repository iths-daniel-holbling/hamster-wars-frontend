import React from 'react';
import styled, { keyframes } from 'styled-components';
const buttonAnim = keyframes`
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
        box-shadow: 0px 0px 16px 0px white, 0px 0px 15px 5px rgba(0,0,0,0);
    }
` 

const BeautifulButtonAnimated = styled.button`
    padding: 1em;
    background-color: rgba(150,200,100,0.8);
    border: none;
    border-radius: 15%;
    animation: ${buttonAnim} 1.5s ease-in-out infinite;
    @media (min-width: 992px){
        font-size: 1.5em;
    }
`
const BeautifulButton = styled.button`
    padding: 1em;
    background-color: rgba(150,200,100,0.8);
    border: none;
    border-radius: 15%;
    @media (min-width: 992px){
        font-size: 1.5em;
    }
`



const StyledButton = ({text, handleClick, bounce}) => {

    return (
        <>
            {bounce 
            ? <BeautifulButtonAnimated onClick={handleClick}> { text } </BeautifulButtonAnimated>
            : <BeautifulButton onClick={handleClick}> { text } </BeautifulButton>}
        </>
    )
}

export default StyledButton;