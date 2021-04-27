import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  100% {
    transform:rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  } 
  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`;

export const Center = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoaderWrapper = styled.div`
  flex-grow: 0;
  flex-shrink: 0;

  color: ${({ theme }) => theme.palette.primary.main};

  animation: ${rotate} 1.4s linear infinite;

  circle {
    stroke-dasharray: 80px, 200px;
    stroke-dashoffset: 0px;
    animation: ${dash} 1.4s ease-in-out infinite;

    stroke: currentColor;
  }
`;
