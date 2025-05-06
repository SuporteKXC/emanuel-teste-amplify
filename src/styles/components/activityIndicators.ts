import styled from 'styled-components';
import { Loader } from './icons';

interface IndicatorProps {
  color?: string;
  size?: number;
}

export const ActivityIndicator = styled(Loader).attrs((props: IndicatorProps) => ({
  size: props.size || 24,
  color: props.color || 'currentColor',
}))`
  animation: Rotate 2s infinite linear;
`;
