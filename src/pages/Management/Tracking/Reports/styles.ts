import styled from 'styled-components';
import { keyframes } from 'styled-components'
export { ActivityIndicator } from "styles/components";

const breatheAnimation = keyframes`
  0%, 100% { opacity: 0.05; }
  50% { opacity: 0.1; }
`

export const LoadingChart = styled.div`
  height: 500px;
  background-color: black;
  opacity: 0.15;
  border-radius: 6px;
  padding: 10px 0 40px 30px;
  margin-bottom: 20px;

  animation-name: ${breatheAnimation};
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;