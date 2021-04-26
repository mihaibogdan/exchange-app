import styled from 'styled-components';

export const Button = styled.button`
  cursor: pointer;
  color: ${props => props.theme.palette[props.color].main};
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  transition: opacity 200ms cubic-bezier(0, 0, 0.2, 1);

  &.contained {
    padding: 22px;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    border-radius: 80px;

    &.color-primary {
      background-color: ${({ theme }) => theme.palette.primary.main};
      color: #fff;
    }

    &.color-secondary {
      background-color: ${({ theme }) => theme.palette.secondary.main};
      color: ${({ theme }) => theme.palette.secondary.contrast};
    }
  }

  &.empty {
    padding: 2px 6px;
  }

  &.icon {
    background-color: ${({ theme }) => theme.palette.background.light};

    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    transition: background-color 250ms cubic-bezier(0, 0, 0.2, 1);

    &.small {
      width: 48px;
      height: 48px;
    }

    &:hover {
      background-color: ${({ theme }) => theme.palette.hover};
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.border};
    outline-offset: 0px;
  }

  &:disabled {
    opacity: 0.24;
    cursor: default;
  }
`;
