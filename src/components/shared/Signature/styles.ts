import styled from "styled-components";
import logo from "assets/images/logo-webcol-signature.png";

export const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 14px;
  color: white;
  opacity: 0.7;
`;

export const Logo = styled.img.attrs({ src: logo })`
  margin-right: 4px;
`;
