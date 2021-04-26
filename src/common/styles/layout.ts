import styled from 'styled-components';

export const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  padding: 60px 0;

  @media only screen and (max-device-width: 736px) {
    width: 100%;
    padding: 20px 20px;
  }
`;

export const Row = styled.div<{ spaceBetween: boolean }>`
  display: flex;

  ${({ spaceBetween }) => spaceBetween && `justify-content: space-between`}
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
