import styled from 'styled-components';

import { Container } from 'common/styles/layout';

export const Wrapper = styled(Container)`
  display: flex;
  padding: 0;
  flex-direction: column;
  h1 {
    margin-bottom: 60px;
  }

  @media only screen and (max-device-width: 736px) {
    width: 100%;
    padding: 20px 10px;

    h1 {
      margin-bottom: 30px;
    }
  }
`;

export const DarkThemeLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DarkThemeBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  margin-right: 12px;

  background-color: ${({ theme }) => theme.palette.primary.light};
  color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 50%;
`;
