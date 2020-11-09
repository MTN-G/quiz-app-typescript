import styled, { createGlobalStyle } from 'styled-components';
import bgImage from './bgImage.jpeg';

export const GlobalStyle = createGlobalStyle`

    html {
        height: 100%;
    }

    body {
        background-image: url(${bgImage});
        background-size: cover;
        display: flex;
        justify-content: center;
    }

    * {
        box-sizing: border-box;
        padding: 0
    }
`
export const Wrapper = styled.div`

    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

    > p {
        font-family: Fascinate Inline, sans-serif;
        color: #660000;
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0;
    }

    .start, .next {
        background-color: #ff9900;
        color: #330000;
        font-size: 30px;
        min-width: 90px;
        border-radius: 50px;
        border-color: #330000;
        cursor: pointer;
    }

    .start:hover, .next:hover {
        background-color: #330000;
        color: #ff9900;
        
    }


    h1 {
        font-family: Fascinate Inline, sans-serif;
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        background-image: linear-gradient(180deg, #330000,  #660000, #b30000);
        background-size: 100%;
        filter: drop-shadow(2px, 2px, #0085a3);
        font-size: 70px;
        margin: 0;
        padding: 0;
    }

`
export const Questions = styled.div`

        box-sizing: border-box;
        border: solid;
        border-color:  #330000;
        border-radius: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.5);

    > p {
        font-family: italic;
        font-weight: bolder;
        color: #330000;
        font-size: 1.75rem;
        font-weight: bold;
        margin: 0;
    }


`
export type ButtonWrapperProps = {
    correct: boolean,
    userClicked: boolean
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`

    button {
        cursor: pointer;
        border-radius: 50px;
        border-color: #330000;
        padding: 5px;
        font-size: 1rem;
        font-weight: bold;
        margin: 2px;
        width: 250px;
        color: #ff9900;
        background: ${({ correct, userClicked }) => 
            correct 
            ? 'green' : 
            !correct && userClicked
            ? 'red' : '#330000'
        };   
    }

`