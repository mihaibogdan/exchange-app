import styled from 'styled-components';

export const Wrapper = styled.div<{ size: number }>`
  display: inline-block;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};

  border-radius: 50%;
  overflow: hidden;
  position: relative;

  .flag {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }
`;
