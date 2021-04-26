import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .search-icon {
    position: absolute;
    left: 14px;
    transition: color 250ms cubic-bezier(0, 0, 0.2, 1);

    &.empty {
      color: ${({ theme }) => theme.palette.text.light};
    }
  }
`;

export const StyledInput = styled.input`
  height: 75px;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.background.light};
  padding-left: 48px;
  border: none;
  font-size: 20px;
  color: inherit;
  border-radius: 8px;

  ::placeholder {
    color: ${({ theme }) => theme.palette.text.light};
  }
`;
