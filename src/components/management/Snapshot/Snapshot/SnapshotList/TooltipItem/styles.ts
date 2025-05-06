import styled from "styled-components"

interface Container {
  arrowPosition: number
}

export const Container = styled.div<Container>`
  position: relative;
  //display: inline-block;
  cursor: pointer;
  margin-right: 30px;
  display: flex;
  align-items: center;
  
  .tooltip-container {
    visibility: hidden;
    min-width: 120px;
    width: auto;
    background-color: black;
    color: #fff;
    border-radius: 6px;
    padding: 5px 5px;
    position: absolute;
    z-index: 1;
    background-color: #1E1E1E;
    padding: 8px 16px;
  }

  &:hover .tooltip-container {
    visibility: visible;
    z-index: 999;
    margin-left: 30px;
  }

  .tooltip-container::after {
    content: " ";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent black transparent transparent;
  }

  .tooltip-items {
    font-weight: 600;
    display: flex;
    flex-direction: column;
    text-transform: capitalize;
  }
`