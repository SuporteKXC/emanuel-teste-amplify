import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    background: #00000020;
    position: absolute;
    top: 0;
    z-index: 999;

    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(2px);

    visibility: hidden;
   

`