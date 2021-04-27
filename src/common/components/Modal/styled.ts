import styled from 'styled-components';

import Button from 'common/components/Button';

export const ModalWithTransition = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  display: flex;
  justify-content: center;

  background-color: ${({ theme }) => theme.palette.background.main};

  &.grow-enter {
    transform: scale(0.97);
    opacity: 0;
  }
  &.grow-enter-active {
    transition: transform 250ms, opacity 250ms;
    transform: scale(1);
    opacity: 1;
  }
  &.grow-exit {
    transform: scale(1);
    opacity: 1;
  }
  &.grow-exit-active {
    transition: transform 250ms, opacity 250ms;
    transform: scale(0.97);
    opacity: 0;
  }
`;

export const Container = styled.div`
  margin-top: 60px;

  @media only screen and (max-device-width: 736px) {
    width: 100%;
    margin-top: 20px;
  }
`;

export const CloseButton = styled(Button)`
  position: absolute;
  right: 70px;
  top: 60px;

  @media only screen and (max-device-width: 736px) {
    right: 10px;
    top: 10px;
  }
`;
