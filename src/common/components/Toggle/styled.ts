import styled from 'styled-components';

export const Wrapper = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.text.main};
  margin: 0 0 24px 0;
  position: relative;

  input[type='checkbox'] {
    width: 0px;
    height: 0px;
    position: absolute;
    right: 0;
    opacity: 0;
  }

  input[type='checkbox']:focus {
    outline: none;
  }

  input[type='checkbox']:focus-visible + .toggleSwitch {
    outline: 4px solid rgba(255, 255, 255, 0.8);
    outline-offset: 4px;
  }

  .toggleSwitch {
    cursor: pointer;
    width: 36px;
    height: 20px;
    background: ${({ theme }) => theme.palette.background.light};
    display: block;
    border-radius: 100px;
    position: relative;
    transition: background 0.3s cubic-bezier(1, 0, 0, 1);
  }

  .toggleSwitch:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    background: #20d769;
    border-radius: 90px;
    transition: all 0.2s cubic-bezier(1, 0, 0, 1);
  }

  input:checked + .toggleSwitch {
    background: rgba(32, 215, 105, 0.24);
  }

  input:checked + .toggleSwitch:after {
    left: 100%;
    transform: translateX(-100%);
  }

  input:disabled + .toggleSwitch {
    opacity: 0.2;
    cursor: default;
  }

  .toggleSwitch:active:after {
    width: 24px;
  }
`;
