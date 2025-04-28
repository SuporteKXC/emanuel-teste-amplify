import styled from 'styled-components';

export const BackgroundMain = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: block;
  img{
    width: 100%;
    height: 100%;
    position: absolute;
    transition: opacity 5000ms;
    opacity: 0;
    object-fit: cover;
    display: block;
  }

  img.selected{
    opacity: 1;
  }
  img.none{
    display: none;
  }

`;