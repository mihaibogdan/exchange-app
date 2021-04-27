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
    outline: 4px solid ${({ theme }) => theme.palette.border};
    outline-offset: 4px;
  }

  .toggleSwitch {
    cursor: pointer;
    width: 36px;
    height: 20px;
    background-color: rgba(32, 33, 36, 0.24);
    display: block;
    border-radius: 100px;
    position: relative;
    transition: background-color 150ms cubic-bezier(1, 0, 0, 1);
  }

  .toggleSwitch:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(32, 33, 36, 0.24);
    border-radius: 90px;
    transform: translateX(0px);
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  input:checked + .toggleSwitch {
    background-color: rgba(32, 215, 105, 0.24);
  }

  input:checked + .toggleSwitch:after {
    left: 100%;
    transform: translateX(-100%);
    background-color: #20d769;
  }

  input:disabled + .toggleSwitch {
    opacity: 0.2;
    cursor: default;
  }
`;
