import styled from "styled-components";
import { Link } from 'react-router-dom';
import {
    Colors,
    ColorScheme,
    Fonts,
    getScrollbarStyle,
  } from 'styles/constants';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const PageHeader = styled.header`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 15px;
    align-items: center;
    font-family: ${Fonts.GilroyBold};
`

export const LinkNav = styled(Link)`
    display: flex;
    font-family: ${Fonts.GilroyRegular};
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding:15px;
    color: currentColor;
    margin-bottom: 10px;
    background-color: ${Colors.White};
    border-radius:5px;
    border-left: 3px solid ${Colors.White};
    &:hover{
        border-left:3px solid ${ColorScheme.Primary};
        cursor: pointer;
    }

`