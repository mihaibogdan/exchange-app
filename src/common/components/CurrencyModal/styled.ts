import styled from 'styled-components';

import { Container } from 'common/styles/layout';

export const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 0;

  .search-input {
    width: 100%;
  }

  button {
    margin-top: 40px;
    font-weight: normal;
  }

  @media only screen and (max-width: 736px) {
    width: 100%;
    padding: 20px 10px;
    margin-top: 30px;
  }
`;

export const CurrenciesList = styled.div`
  margin-top: 16px;
  background-color: ${({ theme }) => theme.palette.background.light};

  width: 100%;
  border-radius: 8px;
  overflow: hidden;

  max-height: 462px;
  overflow-y: scroll;
`;

export const Currency = styled.label`
  display: block;
  cursor: pointer;
  background-color: ${({ theme }) => theme.palette.background.light};
  transition: background-color 250ms cubic-bezier(0, 0, 0.2, 1);
  padding: 16px 24px;

  &.active,
  &:hover {
    background-color: ${({ theme }) => theme.palette.hover};
  }

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

  input[type='checkbox']:focus-visible + .content {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 14px;
  }

  input + .content .check-icon {
    transition: opacity 250ms cubic-bezier(0, 0, 0.2, 1);
    color: ${({ theme }) => theme.palette.primary.main};
    opacity: 0;
    margin-left: auto;
  }

  input:checked + .content .check-icon {
    opacity: 1;
  }

  .content {
    display: flex;
    align-items: center;
  }

  .info {
    margin-left: 16px;
  }

  .search-active {
    color: ${({ theme }) => theme.palette.text.light};
    strong {
      color: ${({ theme }) => theme.palette.text.main};
    }
  }
`;
